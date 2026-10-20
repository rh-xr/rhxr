/** Fixed-size training room (metres). Shared by the procedural scene and acceptance tests. */
export const OFFICE_LAYOUT = Object.freeze({
  bounds: Object.freeze({ minX: -5.5, maxX: 5.5, minZ: -7.6, maxZ: 5.5 }),
  floorY: 0,
  desk: Object.freeze({ x: 0, z: -2.35, width: 3.6, depth: 1.55, height: 1.02 }),
  managerChair: Object.freeze({ x: 0, z: -4.5, yaw: 0, backOffsetZ: -0.4 }),
  visitorChair: Object.freeze({ x: 0, z: 0.1, yaw: Math.PI, backOffsetZ: 0.4 }),
  visitorSpawn: Object.freeze({ x: 0, y: 1.65, z: 4.7 }),
  performance: Object.freeze({ maxPixelRatio: 1.6, shadowMapSize: 512, textures: 'procedural-only' })
});
