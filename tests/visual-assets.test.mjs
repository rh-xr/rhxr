import test from 'node:test';
import assert from 'node:assert/strict';
import {VISUAL_ASSETS,QUALITY_PROFILES,visualQuality} from '../assets/js/visual-assets.mjs';
import {TEXTURE_SETTINGS} from '../assets/js/pbr-textures.mjs';
import {fitSize} from '../assets/js/professional-models.mjs';

test('licensed sample model has a pinned reference, CC0 and traceable source',()=>{
  const v=VISUAL_ASSETS.chair;
  assert.equal(v.license,'CC0-1.0');
  assert.match(v.pinnedCommit,/^[0-9a-f]{40}$/);
  assert.ok(v.url.includes('@'+v.pinnedCommit+'/'));
  assert.ok(v.licenseUrl.startsWith('https://github.com/'));
});
test('GLB chair size fits a cautious progressive download budget',()=>{
  assert.ok(VISUAL_ASSETS.chair.bytes < 5*1024*1024);
});
test('Quest settings are more conservative than desktop',()=>{
  assert.ok(QUALITY_PROFILES.quest.pixelRatio <= QUALITY_PROFILES.desktop.pixelRatio);
  assert.ok(QUALITY_PROFILES.quest.shadows <= QUALITY_PROFILES.desktop.shadows);
  assert.ok(QUALITY_PROFILES.quest.pixelRatio<=1.5);
  assert.equal(QUALITY_PROFILES.safe.modelChair,false);
});
test('user agent detects the Quest browser',()=>{
  assert.equal(visualQuality('OculusBrowser/35.0 (Quest 3S)').pixelRatio,QUALITY_PROFILES.quest.pixelRatio);
  assert.equal(visualQuality('desktop chrome').pixelRatio,QUALITY_PROFILES.desktop.pixelRatio);
});
test('procedural textures stay small and defined',()=>{
  assert.ok(TEXTURE_SETTINGS.resolution <= 512);
  assert.ok(TEXTURE_SETTINGS.maxAnisotropy<=4);
  assert.ok(TEXTURE_SETTINGS.styles.includes('wood'));
  assert.ok(TEXTURE_SETTINGS.styles.includes('fabric'));
});
test('a large glTF chair is scaled down consistently without distortion',()=>{
  assert.equal(fitSize({x:2,y:2,z:2}),.52);
  assert.ok(fitSize({x:1,y:1,z:1})>0);
});
test('invalid model dimension is bounded instead of generating Infinity',()=>{
  assert.ok(Number.isFinite(fitSize({x:0,y:0,z:0})));
});
