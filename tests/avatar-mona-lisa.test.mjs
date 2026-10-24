import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {ARMCHAIR_AVATAR_PLACEMENT,AVATAR_SOURCE,fitAvatarToArmchair,loadArmchairAvatar} from '../assets/js/office-avatar-v14-1.mjs';
import {avatarYawDegrees,turnAvatarStep,AVATAR_TURN_STEP_DEGREES} from '../assets/js/avatar-turn-v14-1.mjs';

const sourceCommit='8587c40216a1bcbc881445b9123fe0168058f6ab';
test('Mona Lisa avatar is original pinned glTF 2 GLB and inspect its structure',()=>{
  assert.equal(sourceCommit.length,40);
  const b=readFileSync(new URL('../assets/models/mona-lisa.glb',import.meta.url));
  assert.equal(b.toString('ascii',0,4),'glTF');
  assert.equal(b.readUInt32LE(4),2);
  assert.equal(b.readUInt32LE(8),b.length);
  assert.equal(b.toString('ascii',16,20),'JSON');
  const doc=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)).toString('utf8').trim());
  assert.ok(doc.meshes?.length,'Mona Lisa GLB has no mesh');
  const bounding=doc.accessors?.filter(a=>a.type==='VEC3'&&a.min&&a.max).map(a=>({min:a.min,max:a.max}))||[];
  console.log('[mona-lisa metadata]',JSON.stringify({
    bytes:b.length,asset:doc.asset,required:doc.extensionsRequired||[],used:doc.extensionsUsed||[],
    nodeNames:doc.nodes?.map(n=>n.name).slice(0,15),rootScenes:doc.scenes,
    meshes:doc.meshes?.length,skins:doc.skins?.length||0,animations:doc.animations?.length||0,
    positionBounds:bounding.slice(0,8),textures:doc.textures?.length||0
  }));
  assert.ok(b.length>=100000&&b.length<=12000000,'Avatar must fit the Quest prototype budget');
});

test('avatar retained at exact original Git blob and seated-height envelope is realistic',()=>{
  assert.equal(AVATAR_SOURCE.blob,'b49417c0050d7e1c7dfe4773c8ea8d65806f4f6d');
  assert.equal(AVATAR_SOURCE.commit,sourceCommit);
  assert.equal(AVATAR_SOURCE.bytes,3020580);
  assert.deepEqual(ARMCHAIR_AVATAR_PLACEMENT.position,[0,0,-3.75]);
  assert.ok(Math.abs(ARMCHAIR_AVATAR_PLACEMENT.yawRadians-312*Math.PI/180)<1e-12,'312° is the user-confirmed default');
  assert.deepEqual(ARMCHAIR_AVATAR_PLACEMENT.maxEnvelope,[1.001,1.463,1.012]);
  for(const [updated,previous] of [[1.001,.91],[1.463,1.33],[1.012,.92]]){
    assert.ok(Math.abs(updated/previous-1.1)<1e-12,'Envelope grows exactly 10% per axis');
  }
  assert.ok(ARMCHAIR_AVATAR_PLACEMENT.seatHeight>=.42&&ARMCHAIR_AVATAR_PLACEMENT.seatHeight<=.7);
  assert.ok(ARMCHAIR_AVATAR_PLACEMENT.maxEnvelope.every(v=>v>0&&v<1.6));
});

test('avatar fitted proportionately and aligned with existing manager armchair cushion',()=>{
  class Vector3 {constructor(x=0,y=0,z=0){Object.assign(this,{x,y,z});}}
  class Box3{
    setFromObject(obj){const k=obj.scale.current;
      this.min=new Vector3(-.695758*k,-.950264*k,-.578279*k);
      this.max=new Vector3(.693429*k,.948494*k,.574576*k);return this;}
    isEmpty(){return false;}
    getSize(){return new Vector3(this.max.x-this.min.x,this.max.y-this.min.y,this.max.z-this.min.z);}
    getCenter(){return new Vector3((this.max.x+this.min.x)/2,(this.max.y+this.min.y)/2,(this.max.z+this.min.z)/2);}
  }
  class Group{constructor(){this.position={set(...values){this.xyz=values;}};this.rotation={y:0};this.children=[];}
    add(obj){this.children.push(obj);}
  }
  const model={scale:{current:1,multiplyScalar(k){this.current*=k;}},position:{x:0,y:0,z:0},updateMatrixWorld(){}};
  const result=fitAvatarToArmchair({Box3,Vector3,Group},model);
  assert.equal(result.name,'rhxr-mona-lisa-armchair-avatar');
  assert.equal(result.children[0],model);
  assert.deepEqual(result.position.xyz,[0,0,-3.75]);
  assert.ok(Math.abs(result.rotation.y-312*Math.PI/180)<1e-12);
  const baselineScale=Math.min(.91/(.693429+.695758),1.33/(.948494+.950264),.92/(.574576+.578279));
  assert.ok(Math.abs(model.scale.current-baselineScale*1.1)<1e-10,
    'Actual uniform model scale should increase by 10%');
  assert.ok(Math.abs(model.position.y-.950264*model.scale.current-ARMCHAIR_AVATAR_PLACEMENT.seatHeight)<.001);
  assert.ok(model.scale.current>.5&&model.scale.current<.8);
});

test('failed Mona Lisa GLB load keeps geometric actor available',async()=>{
  class FailLoader{async loadAsync(){throw Error('simulated Draco or GLB failure');}}
  let called=false;
  const r=await loadArmchairAvatar({},null,{Loader:FailLoader,onFailed:()=>{called=true;}});
  assert.equal(r.ok,false);assert.equal(r.object,null);assert.equal(called,true);
  const room=readFileSync(new URL('../assets/js/room.mjs',import.meta.url),'utf8');
  assert.ok(room.includes('if(advanced){'));
  assert.ok(room.includes('loadExecutiveAssembly(THREE,scene'));
  assert.ok(room.includes('restoreLegacyOccupiedChair'));
  assert.ok(room.includes('basicAvatar.forEach(mesh=>{mesh.visible=false;})'));
  assert.ok(room.includes('const yawDegrees=')&&room.includes('Number(yawParam):312'),
    'Default yaw is 312°, with safe optional numeric comparison');
});


test('Mona Lisa rotation advances in ±45° steps without shifting or rescaling the avatar',()=>{
  const avatar={rotation:{y:Math.PI},scale:{x:.68,y:.68,z:.68},
    position:{x:0,y:0,z:-3.75},updates:0,updateMatrixWorld(force){if(force)this.updates++;}};
  assert.equal(AVATAR_TURN_STEP_DEGREES,45);
  assert.equal(avatarYawDegrees(avatar),180);
  assert.equal(turnAvatarStep(avatar,1),225);
  assert.equal(turnAvatarStep(avatar,-1),180);
  assert.equal(turnAvatarStep(avatar,-1),135);
  assert.equal(avatar.scale.x,.68);
  assert.deepEqual(avatar.position,{x:0,y:0,z:-3.75});
  for(let i=0;i<5;i++)turnAvatarStep(avatar,1);
  assert.equal(avatarYawDegrees(avatar),0);
  for(let i=0;i<8;i++)turnAvatarStep(avatar,1);
  assert.equal(avatarYawDegrees(avatar),0);
  assert.throws(()=>turnAvatarStep(avatar,4),/one 45/);
  assert.throws(()=>turnAvatarStep(avatar,0),/one 45/);
  assert.ok(avatar.updates>=12);
});

test('V14.1 loads fresh modules and exposes +45° / −45° Quest and desktop controls',()=>{
  const room=readFileSync(new URL('../assets/js/room.mjs',import.meta.url),'utf8');
  const html=readFileSync(new URL('../experiences/rhxr-v14-1/index.html',import.meta.url),'utf8');
  const control=readFileSync(new URL('../assets/js/avatar-turn-v14-1.mjs',import.meta.url),'utf8');
  assert.ok(room.includes('office-avatar-v14-1.mjs?v=20261024-wall312'));
  assert.ok(room.includes('avatar-turn-v14-1.mjs?v=20261024-executive'));
  assert.ok(html.includes('room.mjs?v=20261024-executive-1'));
  assert.ok(html.includes('id="avatar-turn"'));
  assert.ok(html.includes('id="avatar-turn-back"'));
  assert.ok(room.includes('avatarTurn.onclick=()=>controls.turn(1)'));
  assert.ok(room.includes('avatarTurnBack.onclick=()=>controls.turn(-1)'));
  assert.ok(control.includes("controller.addEventListener('select',listener)"));
  assert.ok(control.includes('intersectObjects(plaques.map(p=>p.plaque)'));
  assert.ok(control.includes('turnAvatarStep(avatar,steps)'));
  assert.ok(control.includes('avatarYawDegrees(avatar)'));
});


test('312° default responds to 45° steps without losing its exact calibrated angle',()=>{
  const avatar={rotation:{y:312*Math.PI/180},updateMatrixWorld(){}};
  assert.equal(avatarYawDegrees(avatar),312);
  assert.equal(turnAvatarStep(avatar,1),357);
  assert.equal(turnAvatarStep(avatar,1),42);
  assert.equal(turnAvatarStep(avatar,-1),357);
  assert.equal(turnAvatarStep(avatar,-1),312);
});
