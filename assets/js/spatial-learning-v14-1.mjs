/** V14.1 — spatial mission interface for Meta Quest, mirrored in accessible DOM.
 * Deterministic content is supplied by createLearningSession().
 * The validated locomotion and WebXR session handling remain in room.mjs.
 */
// V14.1 final: anchored to the room, behind Mona Lisa, never to the headset.
// Higher contrast and a lower/left/forward placement respond to Quest legibility tests.
export const WALL_DACI_LAYOUT=Object.freeze({
  position:[0.34,2.35,-6.12],
  scale:1.12,
  transparent:true,
  backgroundAlpha:0.985
});
export const PANEL_TYPOGRAPHY=Object.freeze({
  family:'"Inter","Segoe UI",system-ui,sans-serif',
  titlePx:66,smallTitlePx:58,
  bodySizes:[50,47,44,41,38,35,32],
  smallBodySizes:[48,45,42,39,36,33]
});
export function roundedPanel(ctx,x,y,w,h,r,fill,stroke=null){
  // RoundRect is available in current Quest Browser; provide a path fallback.
  ctx.beginPath();
  if(typeof ctx.roundRect==='function')ctx.roundRect(x,y,w,h,r);
  else{
    ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);
    ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);
    ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);
    ctx.closePath();
  }
  ctx.fillStyle=fill;ctx.fill();
  if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=3;ctx.stroke();}
}
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
  // Rear wall z≈−7.35; the panels are 1.23m in front of it and 2.37m
  // behind Mona Lisa (z=-3.75). First row sits lower in the user's view.
  root.position.set(...WALL_DACI_LAYOUT.position);
  root.scale.setScalar(WALL_DACI_LAYOUT.scale);
  scene.add(root);
  const ray=new THREE.Raycaster(),origin=new THREE.Vector3(),direction=new THREE.Vector3();
  const clickable=[],disposables=[],controllers=[],rays=[];
  let hover=null,collapsed=false,disposed=false,missionPage=0;
  const pageSize=4;
  const emit=()=>onChange?.(session.view());

  function clear(){
    for(const obj of [...root.children]){root.remove(obj);obj.geometry?.dispose();
      obj.material?.map?.dispose();obj.material?.dispose();}
    clickable.length=0;disposables.length=0;hover=null;
  }
  function paint(title,body,{small=false,accent=palette.teal,kind='body'}={}){
    return ctx=>{
      ctx.clearRect(0,0,1024,512);
      ctx.save();
      // Almost opaque, professional dark gradient prevents wall decoration
      // from competing with the text. Rounded borders keep the overlay elegant.
      const gradient=ctx.createLinearGradient(8,8,1016,504);
      const opacity=WALL_DACI_LAYOUT.backgroundAlpha;
      gradient.addColorStop(0,'rgba(8,27,39,'+opacity+')');
      gradient.addColorStop(1,'rgba(15,47,59,'+opacity+')');
      roundedPanel(ctx,8,8,1008,496,28,gradient,'rgba(211,231,232,.86)');
      roundedPanel(ctx,19,21,12,470,6,accent);

      ctx.textAlign='left';
      ctx.textBaseline='alphabetic';
      ctx.font='700 '+(small?PANEL_TYPOGRAPHY.smallTitlePx:PANEL_TYPOGRAPHY.titlePx)+
        'px '+PANEL_TYPOGRAPHY.family;
      const headings=lines(ctx,title,895,2);
      ctx.fillStyle=kind==='button'?'#ffe2a3':'#ffd48a';
      headings.forEach((line,index)=>ctx.fillText(line,55,108+index*68));

      const bodyTop=headings.length>1?250:195;
      const bodyText=String(body||'');
      const choices=small?PANEL_TYPOGRAPHY.smallBodySizes:PANEL_TYPOGRAPHY.bodySizes;
      const bodyFont=size=>size+'px '+PANEL_TYPOGRAPHY.family;
      const bottom=468;
      let textLines=[],sizeUsed=choices[choices.length-1],lineStep=Math.round(sizeUsed*1.22);
      for(const size of choices){
        ctx.font=bodyFont(size);
        const candidate=lines(ctx,bodyText,905,80);
        const step=Math.round(size*1.23);
        if(bodyTop+Math.max(0,candidate.length-1)*step<=bottom){
          textLines=candidate;sizeUsed=size;lineStep=step;break;
        }
      }
      ctx.font=bodyFont(sizeUsed);
      const maxVisibleLines=Math.max(1,Math.floor((bottom-bodyTop)/lineStep)+1);
      if(textLines.length===0)textLines=lines(ctx,bodyText,905,maxVisibleLines);
      if(textLines.length>maxVisibleLines){
        textLines=textLines.slice(0,maxVisibleLines);
        const last=textLines.length-1;
        textLines[last]=textLines[last].replace(/.{0,3}$/,'…');
      }
      ctx.fillStyle='#f7fbff';
      textLines.forEach((line,index)=>ctx.fillText(line,55,bodyTop+index*lineStep));
      ctx.restore();
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
    // Seven missions cannot be compressed into a four-slot Quest panel row.
    // Page them at four without changing the accessible HTML mission list.
    const visibleMissions=session.missions.slice(missionPage*pageSize,missionPage*pageSize+pageSize);
    for(let i=0;i<visibleMissions.length;i++){
      const m=visibleMissions[i];
      add('mission-'+m.id,-1.68+i*1.13,1.10,1.08,.37,
        m.id===s.mission?'● '+m.topic:m.topic,'Choisir la mission','mission:'+m.id);
    }
    if(session.missions.length>pageSize)
      add('mission-page',2.52,1.10,.46,.36,missionPage===0?'→':'←',
        missionPage===0?'Autres missions':'Retour','mission-page');
    if(s.showBrief){
      const file=s.caseFile;
      add('brief',0,.14,3.96,1.88,'DOSSIER · '+s.topic,
        s.setting+' Rôle : '+file.role+'. Document : '+file.artefact+'. Préparer : '+file.prepare);
      add('brief-close',1.05,-1.10,1.70,.43,'DÉMARRER →',
        'Retour à la décision','brief');
      add('collapse',-1.46,-1.15,1.28,.37,'MASQUER','Libérer la vue','collapse');
      emit();return;
    }
    if(s.showDoc){
      add('document',0,.07,3.95,1.74,s.sourceTitle||'DOCUMENT DACI',
        s.quote+'\n'+s.citation);
      add('return',1.00,-1.11,1.56,.44,'← RETOUR','Revenir au dialogue','document');
    }else{
      const headline=s.ending?'PARCOURS TERMINÉ':s.actor+' · '+s.phase;
      const lead=s.ending?s.debrief.recommendedAction:s.pending?(s.feedback+' '+s.note):s.dialogue;
      add('story',-1.00,.30,1.96,1.29,headline,lead);
      if(s.ending){
        add('end',1.07,.43,1.99,.65,'BILAN',
          s.steps+' décisions · '+s.qualityProfile.appropriate+' solides · '+s.qualityProfile.risky+' à réexaminer');
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
    add('open-brief',-1.46,-.71,1.60,.37,'DOSSIER RH',
      'Objectif et préparation','brief');
    add('collapse',-1.46,-1.15,1.28,.37,'MASQUER','Libérer la vue','collapse');
    emit();
  }
  function action(id){
    if(!id)return false;
    if(id.startsWith('mission:')){
      session.setMission(id.slice(8));collapsed=false;
      missionPage=Math.floor(session.missions.findIndex(m=>m.id===id.slice(8))/pageSize);
    }
    else if(id==='mission-page')missionPage=missionPage===0?1:0;
    else if(id==='brief'){session.toggleBrief();}
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
