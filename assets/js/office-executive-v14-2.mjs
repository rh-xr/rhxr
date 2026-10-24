/** RH·XR V14.2 — one-piece fictional executive avatar AND chair GLB.
 * Original Git object from commit 765f2ce11f30af869db98c9473224e9e26e0126b.
 * The model is kept intact: no decimation, re-rigging or furniture mesh removal.
 */
export const EXECUTIVE_ASSET=Object.freeze({
  filename:'badr-han-ch_c.glb',
  commit:'765f2ce11f30af869db98c9473224e9e26e0126b',
  blob:'4dbb45fa169373bd366918628b163de06f43f28e',
  bytes:4846664
});
export const EXECUTIVE_PLACEMENT=Object.freeze({
  // 8 cm forward from previous Badr position, 9 cm higher so that footwear
  // is visible above the floor. Whole single-piece chair/avatar moves together.
  position:[0,0.09,-4.02],
  yawRadians:312*Math.PI/180,
  // Preserve uniform scale and previous approved silhouette proportions.
  // Desk/visitor adjustments keep a theoretical >=6 cm furniture clearance.
  maxEnvelope:[1.80,1.85,1.75]
});
export const executiveHref=()=>new URL('../models/badr-han-ch_c.glb',import.meta.url).href;

/** Center the GLB on its ground contact, rotate around that point, then
 * uniformly fit the rotated overall assembly. Allows a different original
 * GLB coordinate system without distorting the furniture or occupant.
 */
export function fitExecutiveAssembly(THREE,model,placement=EXECUTIVE_PLACEMENT){
  if(!model||!placement||!Array.isArray(placement.maxEnvelope))throw Error('Executive GLB placement missing');
  model.updateMatrixWorld(true);
  const initial=new THREE.Box3().setFromObject(model);
  if(initial.isEmpty())throw Error('Executive GLB has no geometry');
  const dims=initial.getSize(new THREE.Vector3());
  if(![dims.x,dims.y,dims.z].every(v=>Number.isFinite(v)&&v>1e-5))
    throw Error('Executive GLB has invalid bounds');
  const center=initial.getCenter(new THREE.Vector3());
  model.position.x-=center.x;
  model.position.y-=initial.min.y;
  model.position.z-=center.z;
  const pivot=new THREE.Group();
  pivot.name='rhxr-executive-chair-assembly';
  pivot.position.set(...placement.position);
  pivot.rotation.y=placement.yawRadians;
  pivot.add(model);
  pivot.updateMatrixWorld(true);

  const rotated=new THREE.Box3().setFromObject(pivot);
  const boxSize=rotated.getSize(new THREE.Vector3());
  const factor=Math.min(...placement.maxEnvelope.map((limit,i)=>limit/[boxSize.x,boxSize.y,boxSize.z][i]));
  if(!Number.isFinite(factor)||factor<=0)throw Error('Executive GLB fitting failed');
  pivot.scale.multiplyScalar(factor);
  pivot.updateMatrixWorld(true);
  return pivot;
}

/** Load and install the assembled GLB. Hide old occupied chair + avatar only
 * from onLoaded after scene.add succeeds. Failed loads preserve old fallback.
 */
export async function loadExecutiveAssembly(THREE,scene,{
  Loader,onLoaded,onFailed,placement=EXECUTIVE_PLACEMENT
}={}){
  let LoaderClass=Loader,draco=null;
  try{
    if(!LoaderClass){
      const [gltf,dracoModule]=await Promise.all([
        import('https://esm.sh/three@0.169.0/examples/jsm/loaders/GLTFLoader.js?external=three'),
        import('https://esm.sh/three@0.169.0/examples/jsm/loaders/DRACOLoader.js?external=three')
      ]);
      LoaderClass=gltf.GLTFLoader;
      draco=new dracoModule.DRACOLoader();
      draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/libs/draco/gltf/');
      draco.setWorkerLimit(1);
    }
    const loader=new LoaderClass();
    if(draco)loader.setDRACOLoader(draco);
    const gltf=await loader.loadAsync(executiveHref());
    const root=fitExecutiveAssembly(THREE,gltf.scene,placement);
    scene.add(root);
    onLoaded?.(root);
    return {ok:true,object:root};
  }catch(error){
    console.warn('[RH-XR V14.2] Integrated avatar/chair fallback:',error);
    onFailed?.(error);
    return {ok:false,object:null};
  }finally{draco?.dispose();}
}
