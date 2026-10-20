import test from 'node:test';
import assert from 'node:assert/strict';
import {V3_ASSETS,V3_PRESETS,v3RecommendedPreset,normalizedPreset} from '../assets/js/v3-assets.mjs';
test('premium model has visible CC BY license and pinned immutable source',()=>{
 const a=V3_ASSETS.sofa;
 assert.equal(a.license,'CC-BY-4.0');
 assert.ok(a.credits.includes('CC BY 4.0'));
 assert.ok(a.licenseUrl.includes('LICENSE.md'));
 assert.match(a.url,/@[a-f0-9]{40}\//);
 assert.ok(a.bytes>1e6&&a.bytes<5e6);
});
test('automatic performance profile is Quest-first',()=>{
 assert.equal(v3RecommendedPreset('OculusBrowser/35 Quest 3S'),'equilibree');
 assert.equal(v3RecommendedPreset('Mozilla Firefox desktop'),'immersive');
 assert.equal(normalizedPreset('__unknown__','Quest 3S'),'equilibree');
});
test('eco renders lower than immersive without premium sofa',()=>{
 assert.ok(V3_PRESETS.economique.pixelRatio < V3_PRESETS.immersive.pixelRatio);
 assert.equal(V3_PRESETS.economique.sofa,false);
 assert.equal(V3_PRESETS.equilibree.architecture,true);
});
