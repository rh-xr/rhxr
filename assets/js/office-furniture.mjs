/** RH·XR local GLB furniture; immutable source commit e9a3373. */
export const sourceCommit='e9a337318157864cdbfef5aa70f68de6f0784e6b';
export const furniturePlan=Object.freeze([
  Object.freeze({id:'desk',filename:'desk.glb',position:[0,0,-2.35],size:[3.55,1.15,1.75],yaw:0}),
  Object.freeze({id:'manager',filename:'amrchair.glb',position:[0,0,-4.45],size:[1.12,1.42,1.05],yaw:0}),
  Object.freeze({id:'visitor',filename:'chair.glb',position:[0,0,0.05],size:[1.02,1.18,1.02],yaw:Math.PI})
]);
/** V14.1 opt-in layout only; preserve the previously validated S02 and V14 room layout.
 * The chairs are tucked close to the desk with 7–9 cm envelope clearance; desk is 90%.
 */
export const furniturePlanV141=Object.freeze([
  Object.freeze({id:'desk',filename:'desk.glb',position:[0,0,-2.35],size:[3.195,1.035,1.575],yaw:0}),
  Object.freeze({id:'manager',filename:'amrchair.glb',position:[0,0,-3.75],size:[1.12,1.42,1.05],yaw:0}),
  Object.freeze({id:'visitor',filename:'chair.glb',position:[0,0,-0.98],size:[1.02,1.18,1.02],yaw:Math.PI})
]);
export const modelHref=filename=>new URL('../models/'+filename,import.meta.url).href;
export function fitModel(THREE,object,spec){
  if(!spec||!spec.size||!object)throw Error('Missing furniture placement');
  object.updateMatrixWorld(true);
  const box=new THREE.Box3().setFromObject(object);
  if(box.isEmpty())throw Error('Empty GLB model');
  const dims=box.getSize(new THREE.Vector3());
  if(!Number.isFinite(dims.x+dims.y+dims.z)||dims.x<.00001||dims.y<.00001||dims.z<.00001)throw Error('Invalid GLB bounds');
  const scale=Math.min(...spec.size.map((target,i)=>target/Math.max(.00001,[dims.x,dims.y,dims.z][i])));
  object.scale.multiplyScalar(scale);object.updateMatrixWorld(true);
  const fitted=new THREE.Box3().setFromObject(object),center=fitted.getCenter(new THREE.Vector3());
  object.position.x+=spec.position[0]-center.x;
  object.position.y+=spec.position[1]-fitted.min.y;
  object.position.z+=spec.position[2]-center.z;
  const pivot=new THREE.Group();pivot.name='rhxr-furniture-'+spec.id;
  pivot.position.set(...spec.position);object.position.sub(pivot.position);pivot.rotation.y=spec.yaw;pivot.add(object);
  return pivot;
}
export async function loadOfficeFurniture(THREE,scene,{onItem,Loader,plan=furniturePlan}={}){
  let LoaderClass=Loader, draco=null;
  if(!LoaderClass){try{
    const [gltf,dracoModule]=await Promise.all([
      import('https://esm.sh/three@0.169.0/examples/jsm/loaders/GLTFLoader.js?external=three'),
      import('https://esm.sh/three@0.169.0/examples/jsm/loaders/DRACOLoader.js?external=three')
    ]);
    LoaderClass=gltf.GLTFLoader;
    draco=new dracoModule.DRACOLoader();
    draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/libs/draco/gltf/');
    draco.setWorkerLimit(2); // Limit worker/memory use on Quest 3S.
  }catch(error){
    console.warn('[RH-XR] GLTF / Draco loader unavailable',error);
    return plan.map(spec=>{onItem?.(spec.id,false,null);return {id:spec.id,ok:false};});
  }}
  const loader=new LoaderClass();
  if(draco)loader.setDRACOLoader(draco);
  const results=await Promise.all(plan.map(async spec=>{
    try{
      const gltf=await loader.loadAsync(modelHref(spec.filename));
      const root=fitModel(THREE,gltf.scene,spec);
      scene.add(root);onItem?.(spec.id,true,root);
      return {id:spec.id,ok:true};
    }catch(error){
      onItem?.(spec.id,false,null);
      console.warn('[RH-XR] GLB fallback for '+spec.id,error);
      return {id:spec.id,ok:false};
    }
  }));
  if(draco)draco.dispose();
  return results;
}
