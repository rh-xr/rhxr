/** Mona Lisa Quest-visible yaw calibration. No telemetry or saved personal state.
 * The GLB is never reloaded: rotate only the model's scene pivot in place.
 */
export const avatarYawDegrees=object=>{
  if(!object?.rotation||!Number.isFinite(object.rotation.y))return null;
  const d=Math.round(((object.rotation.y*180/Math.PI)%360+360)%360);
  return d===360?0:d;
};
export function turnAvatarHalfCircle(object){
  if(!object?.rotation)throw Error('Mona Lisa model not available for rotation');
  const current=avatarYawDegrees(object);
  // Restrict QA choices to 0° or 180°, preserve scale and pivot position.
  object.rotation.y=current===180?0:Math.PI;
  object.updateMatrixWorld?.(true);
  return avatarYawDegrees(object);
}
export function createAvatarTurnControl(THREE,{scene,renderer,playerRig},avatar,{onRotate}={}){
  if(!scene||!renderer||!avatar)throw Error('Cannot create Mona Lisa rotation control');
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=300;
  const ctx=canvas.getContext('2d');
  if(!ctx)return {dispose(){}};
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  const material=new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide,depthTest:true,depthWrite:true});
  const geometry=new THREE.PlaneGeometry(1.92,.56);
  const plaque=new THREE.Mesh(geometry,material);
  plaque.name='rhxr-mona-lisa-turn-180';
  // Mounted next to the manager chair; front of plaque faces the visitor (+Z).
  plaque.position.set(2.15,1.80,-3.85);
  scene.add(plaque);
  function paint(){
    ctx.fillStyle='#133b49';ctx.fillRect(0,0,1024,300);
    ctx.fillStyle='#e5b76b';ctx.fillRect(0,0,14,300);
    ctx.fillStyle='#ffffff';ctx.font='bold 55px system-ui';
    ctx.fillText('↻  TOURNER MONA LISA',34,100);
    ctx.fillStyle='#cfe8e6';ctx.font='42px system-ui';
    ctx.fillText('180° · orientation actuelle : '+avatarYawDegrees(avatar)+'°',34,197);
    ctx.fillStyle='#e5b76b';ctx.font='28px system-ui';
    ctx.fillText('Pointer + gâchette',34,267);
    texture.needsUpdate=true;
  }
  function turn(){
    const next=turnAvatarHalfCircle(avatar);
    paint();onRotate?.(next);
    return next;
  }
  const raycaster=new THREE.Raycaster();
  const pos=new THREE.Vector3(),dir=new THREE.Vector3();
  const controllers=[];
  function onSelect(controller){
    controller.updateMatrixWorld(true);
    pos.setFromMatrixPosition(controller.matrixWorld);
    dir.set(0,0,-1).transformDirection(controller.matrixWorld);
    raycaster.set(pos,dir);
    // Prevent a click on any other panel from rotating Mona Lisa accidentally.
    if(raycaster.intersectObject(plaque,false).length)turn();
  }
  for(let i=0;i<2;i++){
    const controller=renderer.xr.getController(i);
    if(!controller.parent&&playerRig)playerRig.add(controller);
    const listener=()=>onSelect(controller);
    controller.addEventListener('select',listener);
    controllers.push([controller,listener]);
  }
  // DOM button remains accessible on desktop and after exiting VR.
  // No desktop canvas listener: the same button works reliably without pointer-lock conflicts.
  paint();
  return {plaque,turn,angle:()=>avatarYawDegrees(avatar),
    dispose(){
      controllers.forEach(([controller,listener])=>controller.removeEventListener('select',listener));
      scene.remove(plaque);geometry.dispose();material.dispose();texture.dispose();
    }};
}
