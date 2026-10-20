import test from 'node:test';
import assert from 'node:assert/strict';
import { OFFICE_LAYOUT as L } from '../assets/js/office-layout.mjs';
test('visitor chair is rotated 180° from manager chair', () => assert.equal(L.visitorChair.yaw - L.managerChair.yaw, Math.PI));
test('visitor chair back is on entrance side, leaving seat facing desk', () => {
  assert.ok(L.visitorChair.backOffsetZ > 0);
  assert.ok(L.visitorChair.z > L.desk.z);
  assert.ok(L.managerChair.backOffsetZ < 0);
});
test('desk, chairs and spawn are inside safe floor limits', () => {
 for(const point of [L.desk,L.managerChair,L.visitorChair,L.visitorSpawn]){
  assert.ok(point.x > L.bounds.minX && point.x < L.bounds.maxX);
  assert.ok(point.z > L.bounds.minZ && point.z < L.bounds.maxZ);
 }
});
test('Quest quality settings stay deliberately conservative', () => {
 assert.ok(L.performance.maxPixelRatio <= 1.6);
 assert.ok(L.performance.shadowMapSize <= 1024);
 assert.equal(L.performance.textures, 'procedural-only');
});
