import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const room=readFileSync(new URL('../assets/js/room.mjs',import.meta.url),'utf8');
const source=readFileSync(new URL('../assets/js/v3-visual-controls.mjs',import.meta.url),'utf8');
const architecture=readFileSync(new URL('../assets/js/premium-architecture.mjs',import.meta.url),'utf8');
test('Quest validated locomotion signatures remain in the V3 room',()=>{
 assert.match(room,/snapAroundHead/);
 assert.match(room,/readSticks\(session\?\.inputSources\)/);
 assert.match(room,/snapTurn\(sticks\.right\.x/);
 assert.match(room,/displacement\(sticks\.left/);
 assert.match(room,/renderer\.xr\.getSession\(\)\.end\(\)/);
 assert.match(room,/getWorldPosition\(headWorld\)/);
});
test('visual controls are independent of the immersive session management',()=>{
 assert.doesNotMatch(source,/navigator\.xr|requestSession|isSessionSupported/);
 assert.match(source,/aria-label/);
 assert.match(source,/noopener noreferrer/);
});
test('premium architecture batches repetitive meshes',()=>{
 assert.match(architecture,/InstancedMesh/);
 assert.match(architecture,/finCount=36/);
});
