/** Progressive GLB asset loading for the RH·XR professional office.
 * Complete fallback geometry stays in memory; the simulation never depends on CDN availability.
 */
import { VISUAL_ASSETS } from './visual-assets.mjs';

export function fitSize(size, target={width:1.04,height:1.46,depth:1.08}) {
  const x=Math.max(.001,Number(size.x)||0);
  const y=Math.max(.001,Number(size.y)||0);
  const z=Math.max(.001,Number(size.z)||0);
  return Math.min(target.width/x,target.height/y,target.depth/z);
}

export async function loadProfessionalSeating(THREE,scene,seats,{
  url=VISUAL_ASSETS.chair.url,
  onStatus=()=>{}
}={}) {
  if(!Array.isArray(seats)||seats.length<1) return {status:'invalid'};
  onStatus('loading');
  try {
    const {GLTFLoader}=await import('https://esm.sh/three@0.169.0/examples/jsm/loaders/GLTFLoader.js');
    const loader=new GLTFLoader();
    const gltf=await loader.loadAsync(url);
    const source=gltf.scene;
    if(!source)throw new Error('Empty glTF scene');
    source.updateMatrixWorld(true);
    const box=new THREE.Box3().setFromObject(source);
    const size=box.getSize(new THREE.Vector3());
    if(!Number.isFinite(size.x)||size.x<=0||size.y<=0||size.z<=0)throw new Error('Invalid asset dimensions');
    const k=fitSize(size);
    const center=box.getCenter(new THREE.Vector3());
    // Geometry remains local to each root; avoid moving the original shared scene.
    const ready=[];
    for(const seat of seats){
      const cloned=source.clone(true);
      cloned.scale.setScalar(k);
      cloned.position.set(-center.x*k,-box.min.y*k,-center.z*k);
      cloned.traverse(object=>{
        if(object.isMesh){object.castShadow=false;object.receiveShadow=true;}
      });
      const root=new THREE.Group();
      root.position.set(seat.layout.x,0,seat.layout.z);
      root.rotation.y=seat.layout.yaw;
      root.add(cloned);
      ready.push(root);
    }
    // Switch atomically only after both real meshes are available.
    for(const node of ready)scene.add(node);
    for(const seat of seats)seat.fallback.visible=false;
    onStatus('ready');
    return {status:'ready',instances:ready.length,source:VISUAL_ASSETS.chair.id,scale:k};
  }catch(error){
    onStatus('fallback');
    console.warn('RH-XR detailed furniture unavailable; using validated fallback:',error);
    return {status:'fallback',reason:String(error?.message||error)};
  }
}
