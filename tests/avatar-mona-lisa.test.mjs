import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {ARMCHAIR_AVATAR_PLACEMENT,AVATAR_SOURCE,fitAvatarToArmchair,loadArmchairAvatar} from '../assets/js/office-avatar-v14-1.mjs';
import {avatarYawDegrees,turnAvatarHalfCircle} from '../assets/js/avatar-turn-v14-1.mjs';

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
  assert.deepEqual(ARMCHAIR_AVATAR_PLACEMENT.position,[0,0,-4.45]);
  assert.equal(ARMCHAIR_AVATAR_PLACEMENT.yawRadians,Math.PI,'Default avatar must face opposite direction');
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
  assert.deepEqual(result.position.xyz,[0,0,-4.45]);
  assert.equal(result.rotation.y,Math.PI);
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
  assert.ok(room.includes('void furnitureReady.then(()=>loadArmchairAvatar'));
  assert.ok(room.includes('basicAvatar.forEach(mesh=>{mesh.visible=false;})'));
  assert.ok(room.includes("params.get('avatarYaw')==='0'?0:ARMCHAIR_AVATAR_PLACEMENT.yawRadians"),
    'The 0° orientation should remain available as an explicit comparison only');
});


test('actual avatar pivot is turned by 180° without changing its scale or position',()=>{
  const a={rotation:{y:Math.PI},scale:{x:.68,y:.68,z:.68},position:{x:0,y:0,z:-4.45},
    worldUpdates:0,updateMatrixWorld(force){if(force)this.worldUpdates++;}};
  assert.equal(avatarYawDegrees(a),180);
  const next=turnAvatarHalfCircle(a);
  assert.equal(next,0);
  assert.equal(a.rotation.y,0);
  assert.equal(a.scale.x,.68);
  assert.equal(a.position.z,-4.45);
  assert.equal(turnAvatarHalfCircle(a),180);
  assert.equal(a.rotation.y,Math.PI);
  assert.equal(a.worldUpdates,2);
});

test('V14.1 explicitly bypasses old Quest cache and provides a VR + desktop yaw control',()=>{
  const room=readFileSync(new URL('../assets/js/room.mjs',import.meta.url),'utf8');
  const html=readFileSync(new URL('../experiences/rhxr-v14-1/index.html',import.meta.url),'utf8');
  const control=readFileSync(new URL('../assets/js/avatar-turn-v14-1.mjs',import.meta.url),'utf8');
  assert.ok(room.includes("office-avatar-v14-1.mjs?v=20261023-quest-facing"));
  assert.ok(html.includes("room.mjs?v=20261023-quest-facing-1"));
  assert.ok(html.includes('id="avatar-turn"'));
  assert.ok(room.includes("avatarTurn.onclick=()=>controls.turn()"));
  assert.ok(control.includes("controller.addEventListener('select',listener)"));
  assert.ok(control.includes("raycaster.intersectObject(plaque,false)"));
  assert.ok(control.includes('turnAvatarHalfCircle(avatar)'));
  assert.ok(control.includes('avatarYawDegrees(avatar)'));
});
