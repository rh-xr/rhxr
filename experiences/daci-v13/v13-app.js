'use strict';
/* RH-XR-DACI V13: self-contained WebGL/WebXR, no CDN, fictitious corpus only.
   Interactive controller surfaces: choices / continue / source. No remote API in HTTPS export. */
(() => {
  const $=id=>document.getElementById(id);
  const app={bundle:null, story:null, current:null, pending:null, trace:[],sourceOpen:false, xrAnchors:[],
    session:null,baseSpace:null,refSpace:null,gl:null,canvas:null,program:null,mesh:{},panels:[],targets:[],
    hovered:new Map(),yaw:0,desktopYaw:0,desktopPitch:0,rig:{x:0,z:0},snapReady:true,lastTime:null,vrSupported:false,
    camDrag:false,clientX:0,clientY:0,glError:false,desktopPos:{x:0,z:1.55},desktopKeys:new Set(),dragStart:null,lastDesktopTime:null};
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const safeString=(s)=>typeof s==='string'?s:'';
  const sourceText=(s,max=190)=>{const t=safeString(s);return t.length>max?t.slice(0,max-1)+'…':t;};
  const byId=id=>app.story?.nodes.find(n=>n.id===id);
  const node=(tag,text)=>{const e=document.createElement(tag);e.textContent=text;return e;};
  const setStatus=s=>{$('xrstate').textContent=s;};
  const reset=()=>{app.trace=[];app.pending=null;app.sourceOpen=false;app.current=byId(app.story.start);render();};
  function setScenario(slug){const story=app.bundle.stories.find(s=>s.slug===slug);if(!story)return;
    app.story=story;$('scenario').value=slug;app.xrAnchors=(app.bundle.xr_anchors.find(s=>s.slug===slug)||{}).anchors||[];reset();}
  function stepResponse(choice){const current=app.current;if(!current||current.kind!=='decision'||app.pending)return null;
    if(!current.choices.some(c=>c.id===choice))return null;
    return app.bundle.answers[`${app.story.slug}:${current.id}:${choice}`]||null;}
  function selectChoice(id){if(app.pending||app.current.kind==='ending')return;
    const r=stepResponse(id);if(!r||r.status!=='completed_step'||r.node_id!==app.current.id)return;
    app.pending={id,response:r};render();}
  function proceed(){if(!app.pending)return;
    const {id,response}=app.pending;
    app.trace.push({node_id:response.node_id,choice_id:id});
    app.pending=null;app.sourceOpen=false;app.current=byId(response.next_node_id);render();}
  function toggleSource(){app.sourceOpen=!app.sourceOpen;render();}
  function switchStory(direction){const stories=app.bundle?.stories||[];if(!stories.length)return;
    const index=stories.findIndex(s=>s.slug===app.story?.slug);
    setScenario(stories[(index+direction+stories.length)%stories.length].slug);
  }
  function render(){const n=app.current;if(!n)return;
    $('actor').textContent=n.actor||'Formateur';
    $('dialogue').textContent=n.dialogue||'Fin de la simulation.';
    $('question').textContent=n.question||'';
    $('meta').textContent=app.story.title+' · '+safeString(n.phase)+' · '+n.id;
    $('counter').textContent=`Décisions : ${app.trace.length}`;
    const anchor=app.xrAnchors.find(a=>a.node_id===n.id);$('anchor').textContent=`Point XR : ${anchor?.anchor_id||'fin de parcours'}`;
    const zone=$('choices');zone.replaceChildren();
    const result=$('feedback');result.hidden=!app.pending;
    if(app.pending){const r=app.pending.response;
      result.textContent=`${r.character_reaction}\n\n${r.feedback}\n\n${r.pedagogical_note}\n\nRéférence : ${r.citation}`;
    }else{result.textContent='';}
    $('continue').hidden=!app.pending;
    if(n.kind==='ending'){
      zone.append(node('p','Parcours terminé. Vous pouvez recommencer ou choisir une autre situation.'));
    }else if(!app.pending){
      n.choices.forEach((c,i)=>{const b=node('button',`${String.fromCharCode(65+i)} · ${c.label}`);b.type='button';b.onclick=()=>selectChoice(c.id);zone.append(b);});
    }
    $('show-source').disabled=!anchor&&!app.pending;
    const src=$('source');src.hidden=!app.sourceOpen;
    const currentSource=app.pending?.response;
    if(app.sourceOpen){src.replaceChildren();src.append(node('strong',currentSource?.source_title||anchor?.document_title||'Source DACI fictive'));
      const c=node('code',currentSource?.citation||anchor?.citation||'—');src.append(c);
      src.append(node('p',currentSource?.quote||'Le passage complet est présenté après validation d’une décision.'));
    }
    buildPanels();
  }
  // Math helpers, column-major matrices (WebGL and WebXR).
  const model=(x,y,z,sx,sy,sz)=>new Float32Array([sx,0,0,0,0,sy,0,0,0,0,sz,0,x,y,z,1]);
  function perspective(fovy,aspect,near,far){const f=1/Math.tan(fovy/2),q=1/(near-far);
    return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(near+far)*q,-1,0,0,2*near*far*q,0]);}
  const sub=(a,b)=>a.map((v,i)=>v-b[i]);
  const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const norm=a=>{const l=Math.hypot(...a)||1;return a.map(v=>v/l);};
  function lookAt(eye,center){const z=norm(sub(eye,center)),x=norm(cross([0,1,0],z)),y=cross(z,x);
    return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,
      -dot(x,eye),-dot(y,eye),-dot(z,eye),1]);}
  function shader(gl,type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('GLSL '+gl.getShaderInfoLog(s));return s;}
  function makeMesh(verts){const gl=app.gl,b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verts),gl.STATIC_DRAW);return {buffer:b,count:verts.length/8};}
  function geometry(){const v=[];
    function quad(a,b,c,d,n){for(const [pt,uv] of [[a,[0,0]],[b,[1,0]],[c,[1,1]],[a,[0,0]],[c,[1,1]],[d,[0,1]]])v.push(...pt,...uv,...n);}
    const cube=[];
    function face(a,b,c,d,n){for(const [pt,uv] of [[a,[0,0]],[b,[1,0]],[c,[1,1]],[a,[0,0]],[c,[1,1]],[d,[0,1]]])cube.push(...pt,...uv,...n);}
    face([-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[0,0,1]);
    face([.5,-.5,-.5],[-.5,-.5,-.5],[-.5,.5,-.5],[.5,.5,-.5],[0,0,-1]);
    face([-.5,-.5,-.5],[-.5,-.5,.5],[-.5,.5,.5],[-.5,.5,-.5],[-1,0,0]);
    face([.5,-.5,.5],[.5,-.5,-.5],[.5,.5,-.5],[.5,.5,.5],[1,0,0]);
    face([-.5,.5,.5],[.5,.5,.5],[.5,.5,-.5],[-.5,.5,-.5],[0,1,0]);
    face([-.5,-.5,-.5],[.5,-.5,-.5],[.5,-.5,.5],[-.5,-.5,.5],[0,-1,0]);
    quad([-.5,-.5,0],[.5,-.5,0],[.5,.5,0],[-.5,.5,0],[0,0,1]);
    app.mesh={box:makeMesh(cube),quad:makeMesh(v)};
  }
  function initGL(){const canvas=app.canvas=$('canvas');const gl=canvas.getContext('webgl',{xrCompatible:true,antialias:true,alpha:false,preserveDrawingBuffer:false});
    if(!gl){$('fallback').hidden=false;setStatus('WebGL indisponible · mode texte actif');return false;}
    app.gl=gl;
    const vert=`attribute vec3 aPosition;attribute vec2 aUV;attribute vec3 aNormal;uniform mat4 uProjection;uniform mat4 uView;uniform mat4 uModel;varying vec2 vUV;varying float vLight;void main(){vec3 l=normalize(vec3(.5,.8,.7));vLight=max(.58,dot(normalize(aNormal),l)*.34+.68);vUV=aUV;gl_Position=uProjection*uView*uModel*vec4(aPosition,1.);}`;
    const frag=`precision mediump float;uniform vec4 uColor;uniform sampler2D uTexture;uniform float uUseTexture;varying vec2 vUV;varying float vLight;void main(){vec4 col=mix(uColor,texture2D(uTexture,vUV),uUseTexture);gl_FragColor=vec4(col.rgb*vLight,col.a);}`;
    const p=app.program=gl.createProgram();gl.attachShader(p,shader(gl,gl.VERTEX_SHADER,vert));gl.attachShader(p,shader(gl,gl.FRAGMENT_SHADER,frag));gl.linkProgram(p);
    if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));gl.useProgram(p);
    app.loc={position:gl.getAttribLocation(p,'aPosition'),uv:gl.getAttribLocation(p,'aUV'),normal:gl.getAttribLocation(p,'aNormal'),
      projection:gl.getUniformLocation(p,'uProjection'),view:gl.getUniformLocation(p,'uView'),model:gl.getUniformLocation(p,'uModel'),
      color:gl.getUniformLocation(p,'uColor'),useTex:gl.getUniformLocation(p,'uUseTexture'),tex:gl.getUniformLocation(p,'uTexture')};
    geometry();gl.enable(gl.DEPTH_TEST);gl.clearColor(.69,.84,.88,1);
    canvas.tabIndex=0;
    canvas.addEventListener('pointerdown',e=>{if(app.session)return;app.camDrag=true;app.clientX=e.clientX;app.clientY=e.clientY;
      app.dragStart={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
    canvas.addEventListener('pointerup',e=>{
      if(!app.session&&app.dragStart&&Math.hypot(e.clientX-app.dragStart.x,e.clientY-app.dragStart.y)<9){
        activateHit(desktopPick(e.clientX,e.clientY));
      }
      app.dragStart=null;app.camDrag=false;
    });
    canvas.addEventListener('pointercancel',()=>{app.camDrag=false;app.dragStart=null;});
    canvas.addEventListener('pointermove',e=>{
      if(!app.session&&!app.camDrag){
        const hit=desktopPick(e.clientX,e.clientY);app.hovered.set('desktop',hit);
        canvas.style.cursor=hit?'pointer':'grab';
      }
    });
    canvas.addEventListener('pointerleave',()=>app.hovered.delete('desktop'));
    document.addEventListener('keydown',e=>{
      if(app.session||!app.gl)return;
      if(['INPUT','SELECT','TEXTAREA','BUTTON'].includes(document.activeElement?.tagName||''))return;
      const supported=['KeyW','KeyA','KeyS','KeyD','KeyQ','KeyE','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter'];
      if(supported.includes(e.code)){e.preventDefault();app.desktopKeys.add(e.code);}
      if(e.code==='Enter'&&!e.repeat)activateHit(desktopPickCenter());
    });
    document.addEventListener('keyup',e=>app.desktopKeys.delete(e.code));
    window.addEventListener('blur',()=>app.desktopKeys.clear());
    canvas.addEventListener('pointermove',e=>{if(!app.camDrag||app.session)return;
      app.desktopYaw+=(e.clientX-app.clientX)*.004;
      app.desktopPitch=clamp(app.desktopPitch-(e.clientY-app.clientY)*.003,-1.22,1.22);app.clientX=e.clientX;app.clientY=e.clientY;});
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();app.glError=true;$('fallback').hidden=false;$('vr').disabled=true;setStatus('Contexte WebGL perdu · parcours textuel actif.');});
    return true;}
  function wrap(ctx,str,width,maxLines=5){const words=safeString(str).split(/\s+/);const lines=[];let line='';
    for(const word of words){if(!word)continue;const candidate=line?line+' '+word:word;
      if(ctx.measureText(candidate).width>width&&line){lines.push(line);line=word;}else line=candidate;
    }if(line)lines.push(line);if(lines.length>maxLines){const result=lines.slice(0,maxLines);result[maxLines-1]=result[maxLines-1].slice(0,-4)+'…';return result;}return lines;}
  function textTexture(title,body,kind='info'){if(!app.gl)return null;const gl=app.gl;
    const c=document.createElement('canvas');c.width=1024;c.height=512;const ctx=c.getContext('2d');
    const palette=kind==='action'?['#e5f6ef','#b2cdb8','#124d52']:kind==='outcome'?['#fff0d9','#d6b583','#513c2c']:['#f7fafb','#a5ccd5','#133b4c'];
    ctx.fillStyle=palette[0];ctx.fillRect(0,0,1024,512);
    ctx.fillStyle=palette[1];ctx.fillRect(0,0,1024,12);ctx.strokeStyle=palette[1];ctx.lineWidth=8;ctx.strokeRect(4,4,1016,504);
    ctx.fillStyle=palette[2];ctx.font='bold 39px Segoe UI, Arial';
    wrap(ctx,title,930,2).forEach((line,i)=>ctx.fillText(line,42,78+i*45));
    ctx.fillStyle='#172e3d';ctx.font='29px Segoe UI, Arial';
    wrap(ctx,body,940,7).forEach((line,i)=>ctx.fillText(line,42,184+i*43));
    const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);return t;}
  function clearPanels(){if(app.gl)for(const p of app.panels)app.gl.deleteTexture(p.tex);app.panels=[];app.targets=[];}
  function panel(id,x,y,z,w,h,title,body,kind,clickable=false){const p={id,x,y,z,w,h,tex:textTexture(title,body,kind),kind};app.panels.push(p);if(clickable)app.targets.push(p);}
  function buildPanels(){clearPanels();if(!app.gl||!app.current)return;const n=app.current;
    // Comfortable seated/standing reading zone (eye height approximately 1.6 m).
    // When a reference is open, show its actual excerpt instead of an opaque URN alone.
    if(app.sourceOpen){const r=app.pending?.response;
      const citation=r?.citation||app.xrAnchors.find(a=>a.node_id===n.id)?.citation||'—';
      const excerpt=r?.quote||'Sélectionnez une décision pour afficher un extrait documentaire.';
      panel('reference',0,1.77,-2.32,3.9,1.96,r?.source_title||'DOCUMENT DACI FICTIF',
        sourceText(excerpt+'   Référence : '+citation,400),'info');
      panel('source',0,.46,-2.30,1.7,.55,'FERMER LE DOCUMENT','Retour aux décisions','action',true);
      return;
    }
    panel('dialogue',0,2.16,-2.75,3.9,1.15,n.actor||'RH',sourceText(n.dialogue,250));
    if(n.kind==='ending'){
      panel('end',0,.99,-2.55,3.55,.85,'Parcours terminé','Aucun score RH. Recommencez pour explorer un autre déroulement.');
      panel('restart',0,.87,-2.50,1.4,.55,'↻ RECOMMENCER','Sélectionnez avec la gâchette.','action',true);
    }else if(app.pending){const r=app.pending.response;
      panel('outcome',0,1.28,-2.66,3.7,.66,'Conséquence · '+r.quality,sourceText(r.character_reaction+' '+r.feedback,185),'outcome');
      panel('next',-.86,.70,-2.5,1.72,.62,'CONTINUER →',sourceText(r.next_question||'Étape suivante',70),'action',true);
      panel('source',.98,.70,-2.5,1.55,.62,'DOCUMENT DACI',sourceText(r.source_title,50),'action',true);
    }else{
      panel('prompt',0,1.51,-2.65,3.45,.41,'QUESTION',sourceText(n.question,135));
      const choices=n.choices||[];
      choices.forEach((c,i)=>{const x=(i-(choices.length-1)/2)*1.3;
        panel('choice:'+c.id,x,.92,-2.54,1.2,.65,`${String.fromCharCode(65+i)} · CHOISIR`,sourceText(c.label,95),'action',true);});
    }
    // Story navigation stays inside VR; changing paths never writes an employee record.
    panel('story-prev',-2.62,1.13,-2.58,1.12,.64,'◀ PARCOURS','Précédent','action',true);
    panel('story-next',2.62,1.13,-2.58,1.12,.64,'PARCOURS ▶','Suivant','action',true);
  }
  const COLOR=(s)=>{const r=parseInt(s.slice(1,3),16)/255,g=parseInt(s.slice(3,5),16)/255,b=parseInt(s.slice(5,7),16)/255;return [r,g,b,1];};
  function draw(mesh,m,col,tex){const gl=app.gl,l=app.loc,b=app.mesh[mesh];gl.bindBuffer(gl.ARRAY_BUFFER,b.buffer);
    gl.enableVertexAttribArray(l.position);gl.vertexAttribPointer(l.position,3,gl.FLOAT,false,32,0);
    gl.enableVertexAttribArray(l.uv);gl.vertexAttribPointer(l.uv,2,gl.FLOAT,false,32,12);
    gl.enableVertexAttribArray(l.normal);gl.vertexAttribPointer(l.normal,3,gl.FLOAT,false,32,20);
    gl.uniformMatrix4fv(l.model,false,m);gl.uniform4fv(l.color,col);gl.uniform1f(l.useTex,tex?1:0);
    if(tex){gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);gl.uniform1i(l.tex,0);}gl.drawArrays(gl.TRIANGLES,0,b.count);}
  const cube=(x,y,z,w,h,d,color)=>draw('box',model(x,y,z,w,h,d),COLOR(color));
  function renderWorld(proj,view){const gl=app.gl;if(!gl||app.glError)return;gl.useProgram(app.program);
    gl.uniformMatrix4fv(app.loc.projection,false,proj);gl.uniformMatrix4fv(app.loc.view,false,view);
    // Sober, fully procedural RH office, no 3D models or network resources.
    cube(0,-.075,-3.0,10,.15,12,'#dce4e2');cube(0,2.8,-8.95,10,5.6,.13,'#d0e0e4');
    cube(-5,2.8,-3.0,.13,5.6,12,'#a4bdc6');cube(5,2.8,-3.0,.13,5.6,12,'#a4bdc6');
    cube(0,5.5,-3,10,.14,12,'#f8fbf9');
    cube(-2.55,1.32,-4.5,1.05,.15,.68,'#547b81');cube(-2.55,.67,-4.5,.08,1.15,.08,'#37505b');
    cube(2.6,.73,-4.1,1.6,.14,.77,'#9a8974');cube(2.1,.39,-4.0,.11,.65,.10,'#625f53');cube(3.1,.39,-4.0,.11,.65,.10,'#625f53');
    cube(2.58,1.03,-4.3,.74,.13,.05,'#e8eef0');cube(2.55,1.03,-4.38,.42,.38,.06,'#3c6570');
    // Character silhouette, simplified neutral instructor.
    cube(-2.45,1.05,-4.7,.47,.87,.26,'#237d84');cube(-2.45,1.68,-4.7,.31,.35,.31,'#d7b7a1');
    cube(-2.45,1.91,-4.72,.36,.12,.32,'#354b54');cube(-2.45,.38,-4.7,.15,.55,.19,'#345461');
    cube(-2.12,3.12,-8.78,2,.12,.12,'#62939e');cube(2.2,3.12,-8.78,2,.12,.12,'#62939e');
    for(const p of app.panels){if(app.targets.includes(p)){
        const pointed=[...app.hovered.values()].includes(p);
        cube(p.x,p.y,p.z-.05,p.w+(pointed?.09:.025),p.h+(pointed?.09:.035),.08,pointed?'#edb74b':'#1d6874');
      }
      draw('quad',model(p.x,p.y,p.z,p.w,p.h,1),[1,1,1,1],p.tex);}
  }
  function desktopCamera(){
    const eye=[app.desktopPos.x,1.65,app.desktopPos.z],yaw=app.desktopYaw,pitch=app.desktopPitch;
    const forward=[Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch)];
    return {eye,forward,right:[Math.cos(yaw),0,Math.sin(yaw)],
      up:[-Math.sin(yaw)*Math.sin(pitch),Math.cos(pitch),Math.cos(yaw)*Math.sin(pitch)]};
  }
  function desktopPick(clientX,clientY){
    if(!app.gl||app.session)return null;
    const rect=app.canvas.getBoundingClientRect(),cam=desktopCamera();
    if(!rect.width||!rect.height)return null;
    const nx=2*(clientX-rect.left)/rect.width-1,ny=1-2*(clientY-rect.top)/rect.height;
    const t=Math.tan(65*Math.PI/360),a=rect.width/rect.height;
    return pointerHit(cam.eye,norm(cam.forward.map((v,i)=>v+cam.right[i]*nx*t*a+cam.up[i]*ny*t)));
  }
  function desktopPickCenter(){const r=app.canvas.getBoundingClientRect();return desktopPick(r.left+r.width/2,r.top+r.height/2);}
  function updateDesktop(dt){
    const k=app.desktopKeys;
    const f=Number(k.has('KeyW')||k.has('ArrowUp'))-Number(k.has('KeyS')||k.has('ArrowDown'));
    const strafe=Number(k.has('KeyD'))-Number(k.has('KeyA'));
    const turn=Number(k.has('KeyE')||k.has('ArrowRight'))-Number(k.has('KeyQ')||k.has('ArrowLeft'));
    app.desktopYaw+=turn*dt*1.4;
    const length=Math.hypot(f,strafe)||1,speed=2.0*dt,yaw=app.desktopYaw;
    app.desktopPos.x=clamp(app.desktopPos.x+speed*(Math.sin(yaw)*f+Math.cos(yaw)*strafe)/length,-4.4,4.4);
    app.desktopPos.z=clamp(app.desktopPos.z+speed*(-Math.cos(yaw)*f+Math.sin(yaw)*strafe)/length,-7.8,2.75);
  }
  function frameDesktop(t){
    const dt=app.lastDesktopTime===null?0:Math.min((t-app.lastDesktopTime)/1000,.05);app.lastDesktopTime=t;
    if(!app.session&&!app.glError&&app.gl){const canvas=app.canvas,gl=app.gl;updateDesktop(dt);
      const ratio=clamp(window.devicePixelRatio||1,1,2);
      const w=Math.max(2,Math.floor(canvas.clientWidth*ratio)),h=Math.max(2,Math.floor(canvas.clientHeight*ratio));
      if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
      gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,w,h);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      const camera=desktopCamera(),center=camera.eye.map((v,i)=>v+camera.forward[i]);
      renderWorld(perspective(65*Math.PI/180,w/h,.05,80),lookAt(camera.eye,center));}
    requestAnimationFrame(frameDesktop);
  }
  function inputAxes(source){const a=source?.gamepad?.axes||[];return a.length>=4?[a[2]||0,a[3]||0]:[a[0]||0,a[1]||0];}
  function updateLocomotion(session,delta){let changed=false;for(const source of session.inputSources){if(!source.gamepad)continue;
      const [x,y]=inputAxes(source);
      if(source.handedness==='left'){
        const vx=Math.abs(x)>.19?x*delta*1.5:0,vz=Math.abs(y)>.19?y*delta*1.5:0;
        if(vx||vz){app.rig.x=clamp(app.rig.x+vx*Math.cos(app.yaw)+vz*Math.sin(app.yaw),-2.8,2.8);
          app.rig.z=clamp(app.rig.z-vx*Math.sin(app.yaw)+vz*Math.cos(app.yaw),-3,2.0);changed=true;}
      }else if(source.handedness==='right'){
        if(Math.abs(x)>.7&&app.snapReady){app.yaw+=Math.sign(x)*Math.PI/6;app.snapReady=false;changed=true;}
        if(Math.abs(x)<.25)app.snapReady=true;
      }}
    if(changed){const q={x:0,y:Math.sin(-app.yaw/2),z:0,w:Math.cos(-app.yaw/2)};
      app.refSpace=app.baseSpace.getOffsetReferenceSpace(new XRRigidTransform({x:-app.rig.x,y:0,z:-app.rig.z},q));}}
  function pointerHit(origin,direction){let hit=null,best=Infinity;
    for(const p of app.targets){if(Math.abs(direction[2])<.0001)continue;
      const t=(p.z-origin[2])/direction[2];if(t<=.03||t>=best)continue;
      const px=origin[0]+direction[0]*t,py=origin[1]+direction[1]*t;
      if(Math.abs(px-p.x)<=p.w/2&&Math.abs(py-p.y)<=p.h/2){hit=p;best=t;}}
    return hit;}
  function rayPose(frame,space,source){const pose=frame.getPose(source.targetRaySpace,space);if(!pose)return null;
    const p=pose.transform.position,q=pose.transform.orientation;
    // Rotate [0,0,-1] by input-source quaternion.
    const x=-2*(q.x*q.z+q.w*q.y), y=-2*(q.y*q.z-q.w*q.x), z=-1+2*(q.x*q.x+q.y*q.y);
    return {origin:[p.x,p.y,p.z],dir:[x,y,z]};}
  function pick(input,frame){if(!frame||!app.refSpace)return null;
    const ray=rayPose(frame,app.refSpace,input);return ray?pointerHit(ray.origin,ray.dir):null;}
  function activateHit(p){if(!p)return;const id=p.id;
    if(id.startsWith('choice:'))selectChoice(id.slice(7));
    else if(id==='next')proceed();
    else if(id==='source')toggleSource();
    else if(id==='restart')reset();
    else if(id==='story-prev')switchStory(-1);
    else if(id==='story-next')switchStory(1);}
  function xrFrame(t,frame){if(!app.session)return;const session=frame.session;
    const delta=app.lastTime===null?0:Math.min((t-app.lastTime)/1000,.05);app.lastTime=t;
    updateLocomotion(session,delta);
    const pose=frame.getViewerPose(app.refSpace);
    if(pose){const gl=app.gl,layer=session.renderState.baseLayer;
      gl.bindFramebuffer(gl.FRAMEBUFFER,layer.framebuffer);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      for(const view of pose.views){const vp=layer.getViewport(view);gl.viewport(vp.x,vp.y,vp.width,vp.height);
        renderWorld(view.projectionMatrix,view.transform.inverse.matrix);}
      for(const src of session.inputSources){try{app.hovered.set(src,pick(src,frame));}catch(_){}}
    }
    session.requestAnimationFrame(xrFrame);}
  async function enterVR(){if(app.session){await app.session.end();return;}
    if(!app.gl||app.glError){setStatus('WebGL indisponible · parcours textuel actif.');return;}
    if(!navigator.xr||!window.isSecureContext){setStatus('VR requiert HTTPS et un navigateur compatible.');return;}
    let s;
    try{
      // Must request immersive session directly from the click handler to preserve user activation.
      s=await navigator.xr.requestSession('immersive-vr',{optionalFeatures:['local-floor','bounded-floor']});
      if(app.gl.makeXRCompatible)await app.gl.makeXRCompatible();
      app.session=s;app.lastTime=null;app.rig={x:0,z:0};app.yaw=0;app.snapReady=true;
      s.addEventListener('end',()=>{app.session=null;app.hovered.clear();$('vr').textContent='Entrer en VR';setStatus('Session VR terminée · aperçu 3D disponible.');});
      s.addEventListener('select',event=>{try{activateHit(pick(event.inputSource,event.frame)||app.hovered.get(event.inputSource));}catch(e){setStatus('Contrôleur : '+e.message);}});
      s.updateRenderState({baseLayer:new XRWebGLLayer(s,app.gl,{alpha:false,antialias:true})});
      try{app.baseSpace=await s.requestReferenceSpace('local-floor');}catch(_){app.baseSpace=await s.requestReferenceSpace('local');}
      app.refSpace=app.baseSpace;
      $('vr').textContent='Sortir de VR';setStatus('VR active · gâchettes et joysticks');s.requestAnimationFrame(xrFrame);
    }catch(err){if(s&&!s.ended){try{await s.end();}catch(_){}}app.session=null;setStatus('Session VR indisponible : '+err.message);}
  }
  async function initVR(){const b=$('vr');b.onclick=enterVR;
    const desktop=$('desktop-tour');
    desktop.onclick=async()=>{
      if(!app.gl||app.glError){setStatus('La visite 3D nécessite WebGL. Le parcours texte reste disponible.');return;}
      try{if(document.fullscreenElement)await document.exitFullscreen();
        else await $('stage').requestFullscreen();
        app.canvas.focus({preventScroll:true});
      }catch(e){setStatus('Visite 3D disponible dans la page · plein écran refusé : '+e.message);}
    };
    document.addEventListener('fullscreenchange',()=>{
      desktop.textContent=document.fullscreenElement?'Quitter le plein écran':'Visite 3D sur PC · plein écran';
    });
    desktop.disabled=!app.gl||app.glError;
    if(!app.gl||app.glError){b.disabled=true;setStatus('WebGL indisponible · parcours textuel actif.');return;}
    if(!navigator.xr||!window.isSecureContext){b.disabled=true;setStatus('Visite 3D sur PC disponible · VR immersive : casque WebXR requis.');return;}
    try{app.vrSupported=await navigator.xr.isSessionSupported('immersive-vr');b.disabled=!app.vrSupported;
      setStatus(app.vrSupported?'Casque WebXR détecté · entrée VR disponible':'Visite 3D sur PC disponible · aucun casque VR détecté.');}
    catch(e){b.disabled=true;setStatus('Visite 3D sur PC disponible · VR non détectée : '+e.message);}
  }
  async function boot(){try{
      const r=await fetch('./v13-bundle.json',{cache:'no-store'});
      if(!r.ok)throw Error('Corpus indisponible : HTTP '+r.status);
      app.bundle=await r.json();
      if(app.bundle.version!=='V13'||!app.bundle.fictional_only)throw Error('Données non conformes');
      if(!app.bundle.stories?.length||!app.bundle.answers)throw Error('Scénarios absents');
      const s=$('scenario');s.replaceChildren();app.bundle.stories.forEach(p=>{const o=node('option',p.title);o.value=p.slug;s.append(o);});
      s.onchange=()=>setScenario(s.value);$('restart').onclick=reset;$('continue').onclick=proceed;$('show-source').onclick=toggleSource;
      let glReady=false;
      try{glReady=initGL();}
      catch(err){app.glError=true;app.gl=null;$('fallback').hidden=false;setStatus('Initialisation WebGL impossible · parcours textuel actif.');console.warn('WebGL V13',err);}
      if(glReady)requestAnimationFrame(frameDesktop);
      setScenario(app.bundle.stories.find(x=>x.slug==='onboarding')?.slug||app.bundle.stories[0].slug);
      await initVR();
    }catch(err){setStatus('Erreur V13 : '+err.message);$('dialogue').textContent='Vérifiez les fichiers du kit et démarrez son serveur Windows.';}
  }
  document.addEventListener('DOMContentLoaded',boot);
})();