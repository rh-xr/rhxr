/** Provenance and quality budgets for the optional V3 accent furniture. */
export const V3_ASSETS = Object.freeze({
  sofa:Object.freeze({
    id:'khronos-glam-velvet-sofa',
    url:'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@15cd02d304e54cb42a4db4eefe719f76190f4b68/Models/GlamVelvetSofa/glTF-Binary/GlamVelvetSofa.glb',
    source:'https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/GlamVelvetSofa',
    licenseUrl:'https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/GlamVelvetSofa/LICENSE.md',
    license:'CC-BY-4.0',
    author:'Eric Chadwick / Wayfair, LLC',
    bytes:3149844,
    credits:'GlamVelvetSofa © 2021 Wayfair, LLC — Eric Chadwick; CC BY 4.0; used without modifications, dynamically scaled and placed.'
  })
});
export const V3_PRESETS=Object.freeze({
  economique:Object.freeze({name:'Éco',pixelRatio:1,architecture:false,sofa:false}),
  equilibree:Object.freeze({name:'Équilibrée',pixelRatio:1.15,architecture:true,sofa:false}),
  immersive:Object.freeze({name:'Immersive',pixelRatio:1.6,architecture:true,sofa:true})
});
export function v3RecommendedPreset(userAgent=''){
  return /Quest|OculusBrowser|Mobile VR/i.test(userAgent)?'equilibree':'immersive';
}
export function normalizedPreset(name,userAgent=''){
  const fallback=v3RecommendedPreset(userAgent);
  return Object.prototype.hasOwnProperty.call(V3_PRESETS,name)?name:fallback;
}
