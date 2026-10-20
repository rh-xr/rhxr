/** Public, independently licensed visual sample assets. External model
 * loading is optional; local geometry remains the production-safe fallback.
 */
export const VISUAL_ASSETS = Object.freeze({
  chair: Object.freeze({
    id: 'khronos-sheen-chair',
    source: 'KhronosGroup/glTF-Sample-Assets',
    license: 'CC0-1.0',
    copyright: '2020 Wayfair, LLC',
    bytes: 4125648,
    pinnedCommit: '15cd02d304e54cb42a4db4eefe719f76190f4b68',
    sourcePath: 'Models/SheenChair/glTF-Binary/SheenChair.glb',
    url: 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@15cd02d304e54cb42a4db4eefe719f76190f4b68/Models/SheenChair/glTF-Binary/SheenChair.glb',
    licenseUrl: 'https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/SheenChair/LICENSE.md',
    note: 'Sample model used to test actual PBR furniture integration; not yet the final ARTDACI-style production model.'
  })
});
export const QUALITY_PROFILES = Object.freeze({
  desktop: Object.freeze({pixelRatio:1.7,modelChair:true,shadows:512}),
  quest: Object.freeze({pixelRatio:1.25,modelChair:true,shadows:512}),
  safe: Object.freeze({pixelRatio:1,modelChair:false,shadows:256})
});
export function visualQuality(userAgent='', xr=false){
  const quest = xr || /OculusBrowser|Quest/i.test(userAgent);
  return quest ? QUALITY_PROFILES.quest : QUALITY_PROFILES.desktop;
}
