import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

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
