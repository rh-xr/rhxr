import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=path=>readFileSync(new URL(path,import.meta.url),'utf8');
test('the RH portal links to the restored V14.1 office and to its seven missions',()=>{
  const portal=read('../assets/js/portal.mjs');
  assert.ok(portal.includes("bureau:'experiences/rhxr-v14-1/index.html'"));
  assert.ok(portal.includes('experiences/rhxr-v14-1/parcours.html'));
  assert.ok(portal.includes('mission=recrutement'));
  assert.ok(portal.includes('mission=confidentialite'));
  assert.ok(portal.includes('simulation.html'));
});
test('the restored immersive page, DACI corpus, and model files are present',()=>{
  for(const path of ['../experiences/rhxr-v14-1/index.html','../experiences/rhxr-v14-1/parcours.html','../experiences/daci-v13/v13-bundle.json','../assets/models/badr-han-ch_c.glb','../assets/models/desk.glb','../assets/models/chair.glb'])
    assert.ok(existsSync(new URL(path,import.meta.url)),path+' absent');
  const html=read('../experiences/rhxr-v14-1/index.html');
  assert.ok(html.includes('createSpatialLearningHub'));
  assert.ok(html.includes('Badr Han'));
});
test('S02 activates the premium office and keeps a 3D-free fallback',()=>{
  const room=read('../assets/js/room.mjs');
  const simulation=read('../simulation.html');
  assert.ok(room.includes("!params.has('office')&&window.location.pathname.endsWith('/simulation.html')"));
  assert.ok(room.includes('restoreLegacyOccupiedChair'));
  assert.ok(room.includes('loadExecutiveAssembly(THREE,scene'));
  assert.ok(simulation.includes('type="importmap"'));
  assert.ok(simulation.includes('legacy-nav.mjs'));
});
