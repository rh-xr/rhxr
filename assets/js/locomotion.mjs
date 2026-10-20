/** Small, testable WebXR input adapter. No persistence or access to personal data. */
export const VR_CONTROLS = Object.freeze({
  moveSpeed: 1.35, // metres/second, conservative comfort default
  stickDeadzone: 0.18,
  snapThreshold: 0.72,
  snapRelease: 0.25,
  snapRadians: Math.PI / 4
});

export function deadzone(value, cutoff = VR_CONTROLS.stickDeadzone) {
  if (!Number.isFinite(value)) return 0;
  const v = Math.max(-1, Math.min(1, value));
  if (Math.abs(v) <= cutoff) return 0;
  return Math.sign(v) * (Math.abs(v) - cutoff) / (1 - cutoff);
}

/** Quest Touch gamepads typically expose the thumbstick on axes[2,3].
 * Two-axis implementations and alternative profiles are supported as a fallback.
 */
export function thumbstick(gamepad) {
  const axes = gamepad?.axes;
  if (!axes || axes.length < 2) return { x: 0, y: 0 };
  let x = Number(axes.length >= 4 ? axes[2] : axes[0]) || 0;
  let y = Number(axes.length >= 4 ? axes[3] : axes[1]) || 0;
  if (axes.length >= 4 && Math.hypot(x, y) < 0.04) {
    const firstX = Number(axes[0]) || 0;
    const firstY = Number(axes[1]) || 0;
    if (Math.hypot(firstX, firstY) > 0.04) { x = firstX; y = firstY; }
  }
  return { x: deadzone(x), y: deadzone(y) };
}

export function readSticks(sources) {
  const sticks = { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } };
  for (const source of sources || []) {
    if ((source.handedness === 'left' || source.handedness === 'right') && source.gamepad) {
      sticks[source.handedness] = thumbstick(source.gamepad);
    }
  }
  return sticks;
}

/** Returns an XZ translation relative to the headset's flattened view direction.
 * Positive stick Y means moving backward (WebXR convention).
 */
export function displacement(stick, forward, dt, speed = VR_CONTROLS.moveSpeed) {
  const length = Math.hypot(forward.x, forward.z);
  if (length < 0.01 || !Number.isFinite(dt)) return { x: 0, z: 0 };
  const fx = forward.x / length, fz = forward.z / length;
  const rx = -fz, rz = fx;
  const duration = Math.min(Math.max(dt, 0), 0.05);
  return {
    x: (rx * stick.x - fx * stick.y) * duration * speed,
    z: (rz * stick.x - fz * stick.y) * duration * speed
  };
}

/** One 45° snap per full stick deflection; release to center before next snap. */
export function snapTurn(x, latched, settings = VR_CONTROLS) {
  if (Math.abs(x) <= settings.snapRelease) return { angle: 0, latched: false };
  if (!latched && Math.abs(x) >= settings.snapThreshold) {
    return { angle: -Math.sign(x) * settings.snapRadians, latched: true };
  }
  return { angle: 0, latched };
}
