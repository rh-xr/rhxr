/** Optional CC-BY V3 accent sofa. Never blocks the VR experience. */
import {V3_ASSETS} from './v3-assets.mjs';

export async function loadAccentSofa(THREE,scene,{enabled=true,onStatus=()=>{}}={}){
  if(!enabled)return {status:'skipped'};
  onStatus('loading');
  try{
    const {GLTFLoader}=await import('https://esm.sh/three@0.169.0/examples/jsm/loaders/GLTFLoader.js');
    const loader=new GLTFLoader();
    const gltf=await loader.loadAsync(V3_ASSETS.sofa.url);
    const source=gltf.scene;
    if(!source)throw Error('GLB sans scène');
    source.updateMatrixWorld(true);
    const bound=new THREE.Box3().setFromObject(source);
    const size=bound.getSize(new THREE.Vector3());
    if(!(size.x>0&&size.y>0&&size.z>0))throw Error('Dimensions GLB invalides');
    const factor=Math.min(2.05/size.x,1.23/size.y,1.08/size.z);
    const center=bound.getCenter(new THREE.Vector3());
    source.position.set(-center.x*factor,-bound.min.y*factor,-center.z*factor);
    source.scale.setScalar(factor);
    source.traverse(node=>{if(node.isMesh){node.castShadow=false;node.receiveShadow=true;}});
    const root=new THREE.Group();
    root.name='RH-XR V3 / Licensed Sofa';
    root.position.set(-4.16,0,2.4);
    root.rotation.y=Math.PI/2;
    root.add(source);
    scene.add(root);
    onStatus('ready');
    return {status:'ready',root,scale:factor};
  }catch(error){
    console.warn('RH-XR V3 optional sofa unavailable',error);
    onStatus('fallback');
    return {status:'fallback'};
  }
}
