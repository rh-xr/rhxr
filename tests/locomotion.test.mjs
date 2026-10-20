import test from 'node:test';
import assert from 'node:assert/strict';
import { deadzone, thumbstick, readSticks, displacement, snapTurn, VR_CONTROLS } from '../assets/js/locomotion.mjs';

test('deadzone removes controller noise without changing direction', () => {
  assert.equal(deadzone(0.12), 0);
  assert.equal(deadzone(-0.12), 0);
  assert.ok(deadzone(0.9) > 0);
  assert.ok(deadzone(-0.9) < 0);
});
test('Quest Touch thumbstick is read from axes 2 and 3', () => {
  const result = thumbstick({ axes: [0, 0, 1, -1] });
  assert.deepEqual(result, { x: 1, y: -1 });
});
test('2-axis controller fallback and disconnected controllers are supported', () => {
  assert.deepEqual(thumbstick({ axes: [-1, 1] }), { x: -1, y: 1 });
  assert.deepEqual(thumbstick(null), { x: 0, y: 0 });
  assert.deepEqual(readSticks([]), { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
});
test('left and right controllers remain separate regardless of source order', () => {
  const result = readSticks([
    { handedness: 'right', gamepad: { axes: [0, 0, 1, 0] } },
    { handedness: 'left', gamepad: { axes: [0, 0, 0, -1] } }
  ]);
  assert.deepEqual(result, { left: { x: 0, y: -1 }, right: { x: 1, y: 0 } });
});
test('forward/back and strafe movement respond to headset heading', () => {
  assert.ok(displacement({ x: 0, y: -1 }, { x: 0, z: -1 }, .05).z < 0);
  assert.ok(displacement({ x: 1, y: 0 }, { x: 0, z: -1 }, .05).x > 0);
  assert.ok(displacement({ x: 0, y: -1 }, { x: 1, z: 0 }, .05).x > 0);
});
test('motion is frame-time capped to prevent teleport jumps', () => {
  assert.deepEqual(displacement({ x: 0, y: -1 }, { x: 0, z: -1 }, 5), displacement({ x: 0, y: -1 }, { x: 0, z: -1 }, .05));
});
test('snap turn is 45 degrees and does not repeat until stick is released', () => {
  const first = snapTurn(1, false);
  assert.equal(first.angle, -Math.PI / 4);
  assert.equal(first.latched, true);
  assert.equal(snapTurn(1, true).angle, 0);
  const released = snapTurn(0, true);
  assert.equal(released.latched, false);
  assert.equal(snapTurn(-1, released.latched).angle, Math.PI / 4);
});
test('snap thresholds and speed are finite safe values', () => {
  assert.ok(VR_CONTROLS.snapRelease < VR_CONTROLS.snapThreshold);
  assert.ok(VR_CONTROLS.moveSpeed > 0 && VR_CONTROLS.moveSpeed < 2);
});
