/**
 * Optional real-time Image-Based Lighting probe for metallic PBR materials.
 * Uses a generated Three.js RoomEnvironment (not an imported photographic HDRI).
 * In case of CDN failure or WebGL limitation the base lamps remain untouched.
 */
let cached=null;
let pending=null;
export async function installSoftPbrReflections(THREE,renderer,scene){
  if(cached){scene.environment=cached;return {status:'ready',cached:true};}
  if(pending)return pending;
  pending=(async()=>{
    try{
      const {RoomEnvironment}=await import('https://esm.sh/three@0.169.0/examples/jsm/environments/RoomEnvironment.js');
      const generator=new THREE.PMREMGenerator(renderer);
      const room=new RoomEnvironment();
      let target;
      try{
        target=generator.fromScene(room,.04);
      }finally{
        room.dispose?.();
        generator.dispose();
      }
      cached=target.texture;
      scene.environment=cached;
      return {status:'ready',cached:false};
    }catch(error){
      console.warn('RH-XR premium reflections unavailable; daylight fallback active',error);
      return {status:'fallback'};
    }
  })().finally(()=>{pending=null;});
  return pending;
}
