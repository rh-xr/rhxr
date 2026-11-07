/** RH·XR V14.1 — Original avatar from GitHub commit 8587c402...
 * Static Draco glTF 2.0, without skin or authored animation.
 * The placement envelope is a visual fit, not a pose deformation.
 */
export const AVATAR_SOURCE=Object.freeze({
  commit:"8587c40216a1bcbc881445b9123fe0168058f6ab",
  blob:"b49417c0050d7e1c7dfe4773c8ea8d65806f4f6d",
  filename:"mona-lisa.glb",bytes:3020580
});
export const ARMCHAIR_AVATAR_PLACEMENT=Object.freeze({
  // Matches the V14.1 manager armchair tucked close to the desk.
  position:[0,0,-3.75],seatHeight:0.51,
  // User-validated 312° orientation and prior 10% avatar enlargement.
  maxEnvelope:[1.001,1.463,1.012],yawRadians:312*Math.PI/180
});
export const avatarHref=()=>new URL("../models/mona-lisa.glb",import.meta.url).href;
export function fitAvatarToArmchair(THREE,model,spec=ARMCHAIR_AVATAR_PLACEMENT){
  if(!model||!spec)throw Error("Avatar GLB / placement not available");
  model.updateMatrixWorld(true);
  const raw=new THREE.Box3().setFromObject(model);
  if(raw.isEmpty())throw Error("Mona Lisa GLB: empty model bounds");
  const dims=raw.getSize(new THREE.Vector3());
  if(![dims.x,dims.y,dims.z].every(v=>Number.isFinite(v)&&v>0))throw Error("Avatar GLB invalid dimensions");
  const factor=Math.min(...spec.maxEnvelope.map((v,i)=>v/[dims.x,dims.y,dims.z][i]));
  if(!Number.isFinite(factor)||factor<=0)throw Error("Avatar GLB scaling failed");
  model.scale.multiplyScalar(factor);
  model.updateMatrixWorld(true);
  const fitted=new THREE.Box3().setFromObject(model);
  const center=fitted.getCenter(new THREE.Vector3());
  // Local pose keeps the model upright and puts its visual base at armchair cushion height.
  model.position.x-=center.x;
  model.position.z-=center.z;
  model.position.y+=spec.seatHeight-fitted.min.y;
  const pivot=new THREE.Group();pivot.name="rhxr-mona-lisa-armchair-avatar";
  pivot.position.set(...spec.position);
  pivot.rotation.y=spec.yawRadians;
  pivot.add(model);
  return pivot;
}
/** Loads once, with Draco worker cap. Removes the procedural actor ONLY on successful load.
 * Returns {ok,object} and does not throw on network/decoding problems.
 */
export async function loadArmchairAvatar(THREE,scene,{Loader,onLoaded,onFailed,placement=ARMCHAIR_AVATAR_PLACEMENT}={}){
  let LoaderClass=Loader,draco=null;
  try{
    if(!LoaderClass){
      const [gltf,dracoModule]=await Promise.all([
        import("https://esm.sh/three@0.169.0/examples/jsm/loaders/GLTFLoader.js?external=three"),
        import("https://esm.sh/three@0.169.0/examples/jsm/loaders/DRACOLoader.js?external=three")
      ]);
      LoaderClass=gltf.GLTFLoader;
      draco=new dracoModule.DRACOLoader();
      draco.setDecoderPath("https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/libs/draco/gltf/");
      draco.setWorkerLimit(1);
    }
    const loader=new LoaderClass();
    if(draco)loader.setDRACOLoader(draco);
    const gltf=await loader.loadAsync(avatarHref());
    const model=fitAvatarToArmchair(THREE,gltf.scene,placement);
    scene.add(model);
    onLoaded?.(model);
    return {ok:true,object:model};
  }catch(error){
    console.warn("[RH-XR V14.1] Mona Lisa avatar fallback:",error);
    onFailed?.(error);
    return {ok:false,object:null};
  }finally{draco?.dispose();}
}
