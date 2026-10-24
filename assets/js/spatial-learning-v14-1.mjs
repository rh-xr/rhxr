/** V14.1 — spatial mission interface for Meta Quest, mirrored in accessible DOM.
 * Deterministic content is supplied by createLearningSession().
 * The validated locomotion and WebXR session handling remain in room.mjs.
 */
// Screen-space texts remain static in the room behind Mona Lisa, but are placed
// well clear of the decorated wall and use a near-opaque high-contrast backing.
export const WALL_DACI_LAYOUT=Object.freeze({
  position:[0.72,2.65,-6.52],
  scale:1.05,
  transparent:true,
  backgroundAlpha:0.96
});
function lines(ctx,value,maxWidth,max=4){
  const words=String(value||'').split(/\s+/),result=[];let current='';
  for(const word of words){if(!word)continue;
    const next=current?current+' '+word:word;
    if(ctx.measureText(next).width>maxWidth&&current){result.push(current);current=word;}else current=next;
  }
  if(current)result.push(current);
  if(result.length>max){const first=result.slice(0,max);first[max-1]=first[max-1].slice(0,-3)+'…';return first;}
  return result;
}
function face(THREE,width,height,draw,clickable=false){
  const c=document.createElement('canvas');c.width=1024;c.height=512;
  const ctx=c.getContext('2d');if(!ctx)return null;
  draw(ctx,1024,512);
  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;
  tex.anisotropy=2;
  const mat=new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,depthTest:true,side:THREE.DoubleSide});
  const geo=new THREE.PlaneGeometry(width,height);
  const mesh=new THREE.Mesh(geo,mat);
  mesh.userData.hubClickable=clickable;
  return mesh;
}
const palette={navy:'#092b38',teal:'#166c78',aqua:'#cce8e6',gold:'#eac486',paper:'#f0f5f2'};
export function createSpatialLearningHub(THREE,{scene,playerRig,camera,renderer},session,{onChange}={}){
  if(!playerRig||!renderer||!session?.view)throw Error('V14.1 hub requires a scene and learning session');
  const root=new THREE.Group();root.name='rhxr-v14-1-spatial-learning-hub';
  // Rear wall z≈−7.35; shift panels 0.83m in front of it, still 2.77m behind
  // Mona Lisa. Never attach these panels to the HMD/player rig.
  root.position.set(...WALL_DACI_LAYOUT.position);
  root.scale.setScalar(WALL_DACI_LAYOUT.scale);
  scene.add(root);
  const ray=new THREE.Raycaster(),origin=new THREE.Vector3(),direction=new THREE.Vector3();
  const clickable=[],disposables=[],controllers=[],rays=[];
  let hover=null,collapsed=false,disposed=false;
  const emit=()=>onChange?.(session.view());

  function clear(){
    for(const obj of [...root.children]){root.remove(obj);obj.geometry?.dispose();
      obj.material?.map?.dispose();obj.material?.dispose();}
    clickable.length=0;disposables.length=0;hover=null;
  }
  function paint(title,body,{small=false,accent=palette.teal,kind='body'}={}){
    return ctx=>{
      ctx.clearRect(0,0,1024,512);
      // 96% opacity: wall decoration is only very faintly perceptible through
      // the panel, keeping text readable on Quest while retaining slight depth.
      ctx.fillStyle='rgba(8,31,41,'+WALL_DACI_LAYOUT.backgroundAlpha+')';
      ctx.fillRect(0,0,1024,512);
      ctx.fillStyle=accent;
      ctx.fillRect(0,0,13,512);
      ctx.strokeStyle='rgba(211,232,227,.7)';
      ctx.lineWidth=3;ctx.strokeRect(3,3,1018,506);

      // Larger heading and body text than the previous 0.82x panel version.
      // Adapt font size only when the authored text cannot fit on this canvas.
      ctx.textBaseline='alphabetic';
      ctx.textAlign='left';
      ctx.font=(small?'700 53px':'700 60px')+' system-ui';
      const headline=lines(ctx,title,925,2);
      const titleStart=76;
      ctx.fillStyle=kind==='button'?'#ffe8b8':'#ffde9c';
      headline.forEach((line,i)=>ctx.fillText(line,42,titleStart+i*62));

      const bodyTop=headline.length>1?205:169;
      const bodyText=String(body||'');
      const sizes=small?[45,42,39,36,33]:[46,43,40,37,34,31];
      let fontSize=sizes[sizes.length-1],bodyLines=[],spacing=fontSize*1.22;
      for(const size of sizes){
        ctx.font=size+'px system-ui';
        const candidate=lines(ctx,bodyText,932,80);
        const step=Math.round(size*1.22);
        if(bodyTop+Math.max(0,candidate.length-1)*step<=475){
          fontSize=size;bodyLines=candidate;spacing=step;break;
        }
      }
      ctx.font=fontSize+'px system-ui';
      const maxLines=Math.max(1,Math.floor((475-bodyTop)/spacing)+1);
      if(!bodyLines.length)bodyLines=lines(ctx,bodyText,932,maxLines);
      if(bodyLines.length>maxLines){
        bodyLines=bodyLines.slice(0,maxLines);
        bodyLines[maxLines-1]=bodyLines[maxLines-1].replace(/.{0,3}$/,'…');
      }
      ctx.fillStyle='#f6fffd';
      bodyLines.forEach((line,i)=>ctx.fillText(line,43,bodyTop+i*spacing));
    };
  }
  function add(id,x,y,w,h,title,body,action=null,kind=''){
    const mesh=face(THREE,w,h,paint(title,body,{small:!!action,accent:action?palette.gold:palette.teal,kind:action?'button':kind}));
    if(!mesh)return;
    mesh.position.set(x,y,0);
    mesh.name='rhxr-hub-'+id;
    mesh.userData.action=action;
    root.add(mesh);
    if(action)clickable.push(mesh);
  }
  function display(){
    clear();const s=session.view();
    if(collapsed){add('restore',1.40,.60,1.85,.45,'OUVRIR LE GUIDE','Afficher missions et décisions','restore');emit();return;}
    for(let i=0;i<session.missions.length;i++){
      const m=session.missions[i];
      add('mission-'+m.id,-1.68+i*1.13,1.10,1.08,.37,
        m.id===s.mission?'● '+m.topic:m.topic,'Changer de mission','mission:'+m.id);
    }
    if(s.showDoc){
      add('document',0,.07,3.95,1.74,s.sourceTitle||'DOCUMENT DACI',
        s.quote+'\n'+s.citation);
      add('return',1.00,-1.11,1.56,.44,'← RETOUR','Revenir au dialogue','document');
    }else{
      const headline=s.ending?'PARCOURS TERMINÉ':s.actor+' · '+s.phase;
      const lead=s.ending?s.objective:s.pending?(s.feedback+' '+s.note):s.dialogue;
      add('story',-1.00,.30,1.96,1.29,headline,lead);
      if(s.ending){
        add('end',1.07,.43,1.99,.65,'BILAN',s.steps+' décisions · '+s.completed+' référence(s) DACI');
        add('restart',1.07,-.35,1.99,.61,'RECOMMENCER','Reprendre le parcours','restart');
      }else if(s.pending){
        add('reaction',1.07,.40,1.99,.73,'CONSÉQUENCE · '+s.quality,
          s.reaction||'Observez l’effet de ce choix sur la situation.');
        add('next',1.06,-.27,1.99,.43,'CONTINUER →','Passer à la suite','next');
        if(s.citation)add('document-open',1.06,-.79,1.99,.40,'OUVRIR LE DACI','Voir l’extrait et la source','document');
      }else{
        add('question',1.07,.68,1.99,.48,'VOTRE DÉCISION',s.question);
        const choices=s.choices.slice(0,3);
        choices.forEach((c,i)=>add('choice-'+c.id,1.07,.08-i*.46,1.99,.43,
          c.key+' · '+c.label,'Appuyez sur la gâchette','choice:'+c.id));
      }
    }
    add('collapse',-1.46,-1.15,1.28,.37,'MASQUER','Libérer la vue','collapse');
    emit();
  }
  function action(id){
    if(!id)return false;
    if(id.startsWith('mission:')){session.setMission(id.slice(8));collapsed=false;}
    else if(id.startsWith('choice:')){if(!session.choose(id.slice(7)))return false;}
    else if(id==='next'){if(!session.next())return false;}
    else if(id==='document'){if(!session.view().pending)return false;session.toggleDocument();}
    else if(id==='restart')session.reset();
    else if(id==='collapse')collapsed=true;
    else if(id==='restore')collapsed=false;
    else if(id==='toggle')collapsed=!collapsed;
    else return false;
    display();return true;
  }
  function updateHighlight(hit){
    if(hover===hit)return;
    if(hover)hover.material.color.set('#ffffff');
    hover=hit;
    if(hover)hover.material.color.set('#fff0bf');
  }
  function pickFromController(controller){
    controller.updateMatrixWorld(true);
    origin.setFromMatrixPosition(controller.matrixWorld);
    direction.set(0,0,-1).transformDirection(controller.matrixWorld);
    ray.set(origin,direction);
    return ray.intersectObjects(clickable,false)[0]?.object||null;
  }
  function update(){
    if(disposed||!renderer.xr.isPresenting){updateHighlight(null);rays.forEach(line=>line.visible=false);return;}
    let target=null;
    for(const control of controllers){const obj=pickFromController(control);if(obj&&!target)target=obj;}
    updateHighlight(target);
    rays.forEach(line=>line.visible=true);
  }
  function onDesktopClick(e){
    if(renderer.xr.isPresenting||disposed)return;
    const rect=renderer.domElement.getBoundingClientRect();
    if(!rect.width||!rect.height)return;
    const mouse=new THREE.Vector2(((e.clientX-rect.left)/rect.width)*2-1,
      -((e.clientY-rect.top)/rect.height)*2+1);
    camera.updateMatrixWorld(true);ray.setFromCamera(mouse,camera);
    const obj=ray.intersectObjects(clickable,false)[0]?.object;
    if(obj)action(obj.userData.action);
  }
  renderer.domElement.addEventListener('click',onDesktopClick);
  for(let i=0;i<2;i++){
    const controller=renderer.xr.getController(i);
    playerRig.add(controller);
    const geom=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,-3)]);
    const material=new THREE.LineBasicMaterial({color:'#ffd48d',opacity:.78,transparent:true});
    const line=new THREE.Line(geom,material);line.visible=false;controller.add(line);
    controller.addEventListener('select',()=>{const target=pickFromController(controller);if(target)action(target.userData.action);});
    controllers.push(controller);rays.push(line);
  }
  display();
  return {
    view:()=>session.view(),action,update,refresh:display,
    dispose(){disposed=true;renderer.domElement.removeEventListener('click',onDesktopClick);
      clear();scene.remove(root);
      for(const c of controllers){playerRig.remove(c);for(const child of [...c.children]){
        child.geometry?.dispose();child.material?.dispose();c.remove(child);
      }}
    }
  };
}
