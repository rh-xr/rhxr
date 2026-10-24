import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {MISSIONS,createLearningSession} from '../assets/js/learning-v14-1.mjs';
import {WALL_DACI_LAYOUT,PANEL_TYPOGRAPHY} from '../assets/js/spatial-learning-v14-1.mjs';
import {furniturePlanV141} from '../assets/js/office-furniture.mjs';
import {ARMCHAIR_AVATAR_PLACEMENT} from '../assets/js/office-avatar-v14-1.mjs';

const read=p=>readFileSync(new URL(p,import.meta.url),'utf8');
const bundle=JSON.parse(read('../experiences/daci-v13/v13-bundle.json'));

test('V14.1 respects the original V13 bundle and its 54 authored answers',()=>{
  assert.equal(bundle.version,'V13');assert.equal(bundle.fictional_only,true);
  assert.equal(Object.keys(bundle.answers).length,54);
  assert.equal(MISSIONS.length,4);
  for(const s of bundle.stories){
    for(const node of s.nodes.filter(n=>n.kind==='decision'))
      for(const choice of node.choices){
        const id=s.slug+':'+node.id+':'+choice.id;
        assert.ok(bundle.answers[id],id+' must keep an authored source/feedback');
        assert.ok(bundle.answers[id].feedback);
      }
  }
});

test('all 4 V14.1 missions can be completed via the renderer-free state machine',()=>{
  const h=createLearningSession(bundle);
  for(const mission of MISSIONS){
    h.setMission(mission.id);let v=h.view(),count=0;
    assert.equal(v.mission,mission.id);
    while(!v.ending&&count<20){
      assert.ok(v.choices.length>=2,'decision choices missing for '+mission.id);
      assert.ok(h.choose(v.choices[0].id),'choice rejected in '+mission.id+' step '+count);
      const feedback=h.view();assert.equal(feedback.pending,true);
      assert.ok(feedback.feedback.length>20);
      if(mission.id==='s02'){
        assert.equal(feedback.citation,'','S02 cannot fabricate a DACI citation');
        assert.equal(h.toggleDocument(),false);
      }else{
        assert.ok(feedback.citation.startsWith('urn:rhxr:daci:'));
        assert.equal(h.toggleDocument(),true);
        assert.equal(h.view().showDoc,true);
        assert.equal(h.toggleDocument(),false);
        assert.equal(h.view().showDoc,false);
      }
      assert.equal(h.next(),true);
      v=h.view();count++;
    }
    assert.equal(v.ending,true,'mission '+mission.id+' did not end');
    assert.ok(count>=2,'too short: '+mission.id);
    assert.equal(v.history.length,count);
    assert.equal(h.choose('wrong'),false);
  }
});

test('invalid mission/choice cannot corrupt training state',()=>{
  const h=createLearningSession(bundle);
  assert.throws(()=>h.setMission('unknown'));
  assert.equal(h.choose('not-an-option'),false);
  assert.equal(h.view().mission,'onboarding');
  assert.equal(h.view().steps,0);
  assert.equal(h.next(),false);
  h.setMission('s02');assert.equal(h.view().mission,'s02');
  h.reset();assert.equal(h.view().steps,0);
});

test('Quest panels and DOM guide share one authority with no separate data writes',()=>{
  const hub=read('../assets/js/spatial-learning-v14-1.mjs');
  const html=read('../experiences/rhxr-v14-1/index.html');
  assert.ok(hub.includes('renderer.xr.getController(i)'));
  assert.ok(hub.includes("controller.addEventListener('select'"));
  assert.ok(hub.includes('scene.add(root)'));
  assert.ok(hub.includes('scene.remove(root)'));
  assert.ok(!hub.includes('playerRig.add(root)'));
  assert.ok(hub.includes('transparent:true'));
  assert.ok(hub.includes('ctx.clearRect(0,0,1024,512)'));
  assert.ok(hub.includes("action('toggle')")||hub.includes("id==='toggle'"));
  assert.ok(hub.includes('session.toggleDocument()'));
  assert.ok(html.includes('createLearningSession'));
  assert.ok(html.includes('createSpatialLearningHub'));
  assert.ok(html.includes("hub.action(action)"));
  assert.ok(html.includes('room.onFrame(()=>hub.update())'));
  assert.ok(html.includes('aria-live="polite"'));
  const match=html.match(/<script type="module">([\s\S]*?)<\/script>/);
  assert.ok(match,'new page needs executable module');
  const check=spawnSync(process.execPath,['--input-type=module','--check'],{input:match[1],encoding:'utf8'});
  assert.equal(check.status,0,check.stderr);
});

test('V14.1 upgraded visuals are optional and preserve stable V14 entry and locomotion',()=>{
  const room=read('../assets/js/room.mjs');
  const premium=read('../assets/js/premium-finish-v14-1.mjs');
  assert.ok(room.includes("pathname.includes('/rhxr-v14-1/')"));
  assert.ok(room.includes('if(advanced)upgradeOfficeFinish(THREE,scene)'));
  assert.ok(room.includes('snapAroundHead(turn.angle, xrCamera)'));
  assert.ok(room.includes('readSticks(session?.inputSources)'));
  assert.ok(premium.includes('RepeatWrapping'));
  assert.ok(!premium.includes('PointLight'));
  assert.ok(!premium.includes('castShadow=true'));
});


test('DACI remains behind Mona Lisa with larger text, high-opacity backdrop and room-anchored panels',()=>{
  const hub=read('../assets/js/spatial-learning-v14-1.mjs');
  const avatarControl=read('../assets/js/avatar-turn-v14-1.mjs');
  assert.equal(WALL_DACI_LAYOUT.transparent,true);
  assert.equal(WALL_DACI_LAYOUT.backgroundAlpha,.985);
  assert.equal(WALL_DACI_LAYOUT.scale,1.12);
  assert.deepEqual(WALL_DACI_LAYOUT.position,[.34,2.35,-6.12]);
  assert.ok(WALL_DACI_LAYOUT.position[2]<-3.75,'Text must stay behind Mona Lisa');
  assert.ok(WALL_DACI_LAYOUT.position[2]>-7.0,'Text must clear the rear wall');
  assert.ok(hub.includes('root.position.set(...WALL_DACI_LAYOUT.position)'));
  assert.ok(hub.includes('root.scale.setScalar(WALL_DACI_LAYOUT.scale)'));
  assert.ok(hub.includes('transparent:true,depthWrite:false'));
  assert.ok(hub.includes('ctx.fillRect(0,0,1024,512)'),'DACI backdrop must cover the canvas');
  assert.equal(PANEL_TYPOGRAPHY.titlePx,66);
  assert.deepEqual(PANEL_TYPOGRAPHY.bodySizes,[50,47,44,41,38,35,32]);
  assert.ok(avatarControl.includes('transparent:true,depthTest:true,depthWrite:false'));
  assert.ok(avatarControl.includes('plaque.position.set(4.02,y,-6.52)'));
  assert.ok(avatarControl.includes("ctx.fillStyle='rgba(8,31,41,.96)'"));
});

test('The user-validated 312° avatar and close-fitting furniture remain untouched',()=>{
  assert.ok(Math.abs(ARMCHAIR_AVATAR_PLACEMENT.yawRadians*180/Math.PI-312)<1e-10);
  assert.equal(ARMCHAIR_AVATAR_PLACEMENT.position[2],-3.75);
  assert.deepEqual(furniturePlanV141.map(({id,position})=>[id,position[2]]),[
    ['desk',-2.35],['manager',-3.75],['visitor',-.98]
  ]);
  assert.deepEqual(furniturePlanV141[0].size,[3.195,1.035,1.575]);
});
