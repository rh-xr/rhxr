import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {furniturePlan,furniturePlanV141,sourceCommit,modelHref,loadOfficeFurniture} from '../assets/js/office-furniture.mjs';

test('pinned RH office GLBs are valid glTF 2 binary containers',()=>{
  assert.equal(sourceCommit,'e9a337318157864cdbfef5aa70f68de6f0784e6b');
  assert.equal(furniturePlan.length,3);
  assert.deepEqual(furniturePlan.map(x=>x.filename).sort(),['amrchair.glb','chair.glb','desk.glb']);
  for(const spec of furniturePlan){
    const file=readFileSync(new URL('../assets/models/'+spec.filename,import.meta.url));
    assert.equal(file.toString('ascii',0,4),'glTF',spec.filename+' invalid magic');
    assert.equal(file.readUInt32LE(4),2,spec.filename+' wrong version');
    assert.equal(file.readUInt32LE(8),file.length,spec.filename+' invalid length');
    assert.ok(file.length>1000&&file.length<8_000_000,spec.filename+' out of budget');
    assert.equal(file.toString('ascii',16,20),'JSON',spec.filename+' missing JSON chunk');
    const jsonBytes=file.subarray(20,20+file.readUInt32LE(12));
    const gltf=JSON.parse(jsonBytes.toString('utf8').replace(/\\u0000/g,'').trim());
    assert.ok(String(gltf.asset.version).startsWith('2.'), 'Invalid glTF version');
    assert.ok(gltf.meshes?.length,spec.filename+' contains no meshes');
    const extensions=gltf.extensionsRequired||[];
    console.log(spec.filename+' '+(file.length/1e6).toFixed(2)+'MB meshes='+gltf.meshes.length+' textures='+(gltf.textures?.length||0)+' requiredExtensions='+extensions.join(','));
    assert.ok(extensions.every(ext=>['KHR_draco_mesh_compression','EXT_texture_webp','KHR_texture_transform'].includes(ext)),
      'Unexpected extension needs new loader support: '+spec.filename+' -> '+extensions.join(','));
    assert.ok(!extensions.includes('EXT_meshopt_compression'),'meshopt requires separate decoder: '+spec.filename);
    assert.ok(!extensions.includes('KHR_texture_basisu'),'KTX2 requires separate transcoder: '+spec.filename);
  }
});

test('furniture layout has non-overlapping office roles and metre-scale dimensions',()=>{
  const ids=new Set(),files=new Set();
  for(const m of furniturePlan){
    assert.ok(!ids.has(m.id));ids.add(m.id);
    assert.ok(!files.has(m.filename));files.add(m.filename);
    assert.ok(m.size.every(v=>v>=0.5&&v<=4));
    assert.ok(m.position.every(Number.isFinite));
    assert.ok(Number.isFinite(m.yaw));
    assert.ok(modelHref(m.filename).endsWith('/assets/models/'+m.filename));
  }
  assert.ok(furniturePlan.find(m=>m.id==='visitor').position[2]>furniturePlan.find(m=>m.id==='desk').position[2]);
});

test('GLB loader failure keeps all low-poly furniture available',async()=>{
  const calls=[];
  class FailingLoader{async loadAsync(){throw Error('synthetic failure');}}
  const result=await loadOfficeFurniture({}, {add(){throw Error('must not add');}},{
    Loader:FailingLoader,onItem:(id,ready)=>calls.push([id,ready])
  });
  assert.equal(result.length,3);
  assert.ok(result.every(x=>!x.ok));
  assert.equal(calls.length,3);
  assert.ok(calls.every(([,ready])=>ready===false));
});

test('the existing VR office keeps locomotion unchanged and loads local GLBs',()=>{
  const src=readFileSync(new URL('../assets/js/room.mjs',import.meta.url),'utf8');
  const html=readFileSync(new URL('../simulation.html',import.meta.url),'utf8');
  assert.ok(src.includes('loadOfficeFurniture(THREE,scene'));
  assert.ok(src.includes('fallback[id].forEach'));
  const loaderSrc=readFileSync(new URL('../assets/js/office-furniture.mjs',import.meta.url),'utf8');
  assert.ok(loaderSrc.includes('DRACOLoader.js?external=three'));
  assert.ok(loaderSrc.includes("setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/libs/draco/gltf/')"));
  assert.ok(src.includes('readSticks(session'));
  assert.ok(src.includes('snapAroundHead(turn.angle'));
  assert.ok(html.includes('type="importmap"'));
  assert.ok(html.includes('https://esm.sh/three@0.169.0'));
});

test('V14.1 desk is 10% smaller and both original seats are 35 cm closer',()=>{
  assert.equal(furniturePlanV141.length,3);
  const byId=(plan,id)=>plan.find(p=>p.id===id);
  const desk0=byId(furniturePlan,'desk'),desk=byId(furniturePlanV141,'desk');
  for(let i=0;i<3;i++)assert.ok(Math.abs(desk.size[i]/desk0.size[i]-.9)<1e-12);
  assert.deepEqual(desk.position,desk0.position,'Do not move the desk away from the centre');
  for(const id of ['manager','visitor']){
    const current=byId(furniturePlanV141,id),previous=byId(furniturePlan,id);
    assert.ok(Math.abs(current.position[2]-desk.position[2])<
      Math.abs(previous.position[2]-desk.position[2]));
    assert.ok(Math.abs(Math.abs(current.position[2]-previous.position[2])-.35)<1e-10);
    assert.deepEqual(current.size,previous.size,'Do not rescale the chairs');
  }
  const manager=byId(furniturePlanV141,'manager'),visitor=byId(furniturePlanV141,'visitor');
  const gapManager=(desk.position[2]-desk.size[2]/2)-(manager.position[2]+manager.size[2]/2);
  const gapVisitor=(visitor.position[2]-visitor.size[2]/2)-(desk.position[2]+desk.size[2]/2);
  assert.ok(gapManager>.3&&gapVisitor>.3,'Keep positive legroom near the desk');
});

test('V14.1-specific plan does not alter legacy S02 or V14 defaults',()=>{
  assert.equal(furniturePlan.find(x=>x.id==='manager').position[2],-4.45);
  assert.equal(furniturePlan.find(x=>x.id==='visitor').position[2],.05);
  const src=readFileSync(new URL('../assets/js/room.mjs',import.meta.url),'utf8');
  assert.ok(src.includes('plan:v141Layout||undefined'));
  assert.ok(src.includes('chair(0,managerZ'));
  assert.ok(src.includes('chair(0,visitorZ'));
  assert.ok(src.includes('if(advanced)'));
});
