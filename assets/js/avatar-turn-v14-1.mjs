/** RH·XR V14.1 — Quest-visible calibration in 45° steps.
 * Rotates the already-loaded Mona Lisa pivot only, preserving scale and placement.
 * Both controller selectors and browser buttons call the same turn function.
 */
export const AVATAR_TURN_STEP_DEGREES=45;
export function avatarYawDegrees(object){
  if(!object?.rotation||!Number.isFinite(object.rotation.y))return null;
  const degrees=Math.round(object.rotation.y*180/Math.PI);
  return ((degrees%360)+360)%360;
}
export function turnAvatarStep(object,steps=1){
  if(!object?.rotation)throw Error('Mona Lisa model not available for rotation');
  if(!Number.isInteger(steps)||Math.abs(steps)!==1)
    throw Error('Avatar rotation is limited to one 45° step per action');
  const angle=avatarYawDegrees(object);
  if(angle===null)throw Error('Invalid Mona Lisa rotation');
  const next=(angle+steps*AVATAR_TURN_STEP_DEGREES+360)%360;
  object.rotation.y=next*Math.PI/180;
  object.updateMatrixWorld?.(true);
  return next;
}
export function createAvatarTurnControl(THREE,{scene,renderer,playerRig},avatar,{onRotate}={}){
  if(!scene||!renderer||!avatar)throw Error('Cannot create Mona Lisa rotation controls');
  const raycaster=new THREE.Raycaster();
  const origin=new THREE.Vector3(),direction=new THREE.Vector3();
  const plaques=[];
  const controllers=[];
  function addPlaque(steps,y,label){
    const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=300;
    const ctx=canvas.getContext('2d');
    if(!ctx)return null;
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
    const material=new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide,transparent:true,depthTest:true,depthWrite:false});
    const geometry=new THREE.PlaneGeometry(1.64,.46);
    const plaque=new THREE.Mesh(geometry,material);
    plaque.name=steps>0?'rhxr-mona-lisa-turn-plus45':'rhxr-mona-lisa-turn-minus45';
    // Near-opaque calibration controls match DACI panels, forward from back wall.
    plaque.position.set(4.02,y,-6.52);
    scene.add(plaque);
    const repaint=()=>{
      ctx.clearRect(0,0,1024,300);
      ctx.fillStyle='rgba(8,31,41,.96)';ctx.fillRect(0,0,1024,300);
      ctx.strokeStyle='rgba(211,232,227,.7)';ctx.lineWidth=3;
      ctx.strokeRect(3,3,1018,294);
      ctx.lineJoin='round';ctx.strokeStyle='rgba(8,31,39,.8)';ctx.lineWidth=5;
      const draw=(text,x,y,color)=>{
        ctx.strokeText(text,x,y);ctx.fillStyle=color;ctx.fillText(text,x,y);
      };
      ctx.font='bold 65px system-ui';draw(label,36,100,'#fbe2ab');
      ctx.font='49px system-ui';
      draw('Orientation : '+avatarYawDegrees(avatar)+'°',36,192,'#e9f7f3');
      ctx.font='34px system-ui';draw('Pointer + gâchette',36,265,'#fbe2ab');
      texture.needsUpdate=true;
    };
    plaques.push({steps,plaque,repaint,geometry,material,texture});
    return plaque;
  }
  addPlaque(1,2.05,'↻  MONA LISA +45°');
  addPlaque(-1,1.48,'↺  MONA LISA −45°');
  function turn(steps=1){
    const next=turnAvatarStep(avatar,steps);
    plaques.forEach(p=>p.repaint());
    onRotate?.(next);
    return next;
  }
  for(let i=0;i<2;i++){
    const controller=renderer.xr.getController(i);
    if(!controller.parent&&playerRig)playerRig.add(controller);
    const listener=()=>{
      controller.updateMatrixWorld(true);
      origin.setFromMatrixPosition(controller.matrixWorld);
      direction.set(0,0,-1).transformDirection(controller.matrixWorld);
      raycaster.set(origin,direction);
      const hits=raycaster.intersectObjects(plaques.map(p=>p.plaque),false);
      const hit=plaques.find(p=>p.plaque===hits[0]?.object);
      if(hit)turn(hit.steps);
    };
    controller.addEventListener('select',listener);
    controllers.push([controller,listener]);
  }
  plaques.forEach(p=>p.repaint());
  return {
    plaques:plaques.map(p=>p.plaque),
    turn,angle:()=>avatarYawDegrees(avatar),
    dispose(){
      controllers.forEach(([controller,listener])=>controller.removeEventListener('select',listener));
      plaques.forEach(p=>{scene.remove(p.plaque);p.geometry.dispose();p.material.dispose();p.texture.dispose();});
    }
  };
}
