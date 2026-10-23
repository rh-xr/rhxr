import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {MISSIONS,createLearningSession} from '../assets/js/learning-v14-1.mjs';

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
  assert.ok(hub.includes('playerRig.add(root)'));
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
