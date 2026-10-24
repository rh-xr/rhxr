/** RH·XR conceptual low-poly office — experimental 3D + Quest WebXR controls.
 * The same educational scenario remains available without XR.
 */
import { readSticks, displacement, snapTurn, pivotCorrection } from './locomotion.mjs';
import { loadOfficeFurniture,furniturePlanV141 } from './office-furniture.mjs?v=20261024-badr-final';
import {createPremiumOffice} from './premium-office-v14.mjs';
import {upgradeOfficeFinish} from './premium-finish-v14-1.mjs';
import {loadArmchairAvatar,ARMCHAIR_AVATAR_PLACEMENT} from './office-avatar-v14-1.mjs?v=20261024-wall312';
import {createAvatarTurnControl,avatarYawDegrees} from './avatar-turn-v14-1.mjs?v=20261024-executive';
import {loadExecutiveAssembly,EXECUTIVE_PLACEMENT} from './office-executive-v14-2.mjs?v=20261024-badr-final';
import {createMetricsSampler,createMetricsDisplay} from './metrics-v14.mjs';

let initialized = false;
export async function mountRoom(stage) {
  if (initialized) return;
  const THREE = await import('https://esm.sh/three@0.169.0');
  const params=new URLSearchParams(window.location.search);
  const advanced=window.location.pathname.includes('/rhxr-v14-1/')||params.get('office')==='v14-1';
  const premium=advanced||params.get('office')==='v14';
  const diagnostics=premium&&params.get('metrics')==='1';
  const perf=diagnostics?createMetricsSampler():null;
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
  if(premium){renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setSize(stage.clientWidth, stage.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local-floor');
  renderer.domElement.setAttribute('aria-label', 'Vue 3D expérimentale du bureau de médiation');
  stage.insertBefore(renderer.domElement, stage.firstChild);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#d9e8f0');
  const camera = new THREE.PerspectiveCamera(65, stage.clientWidth / stage.clientHeight, 0.1, 100);

  // Moving the camera directly during WebXR is ineffective: the headset pose
  // replaces its transform. Instead move this rig, so physical tracking works.
  const playerRig = new THREE.Group();
  playerRig.name = 'rhxr-player-rig';
  playerRig.position.set(0, 0, 4.7);
  camera.position.set(0, 1.65, 0);
  playerRig.add(camera);
  scene.add(playerRig);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x758fa1, premium?1.4:2.4));
  const light = new THREE.DirectionalLight(0xfff6eb, premium?1.75:2.6);
  light.position.set(-3, 5, 4);
  scene.add(light);
  const material = color => new THREE.MeshStandardMaterial({ color, roughness: 0.75 });
  const mat = {
    wall: material('#e6edf0'),
    floor: material('#b1c4ce'),
    wood: material('#aa8665'),
    metal: material('#5b7684'),
    seat: material('#315471'),
    skin: material('#c9977a'),
    shirt: material('#4e8a99'),
    plant: material('#3d7b69')
  };
  function cube(w, h, d, x, y, z, m) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return mesh;
  }
  function sphere(r, x, y, z, m) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), m);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return mesh;
  }
  function cylinder(r1, r2, h, x, y, z, m) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, 12), m);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return mesh;
  }
  if(premium){
    // Design prototype: same Quest player rig, locomotion, GLBs and S02 state.
    createPremiumOffice(THREE,scene);
    if(advanced)upgradeOfficeFinish(THREE,scene);
  }else{
    cube(11, .2, 13, 0, -.12, -1, mat.floor);
    cube(11, 5.6, .16, 0, 2.8, -7.6, mat.wall);
    cube(.15, 5.6, 13, -5.5, 2.8, -1, mat.wall);
    cube(.15, 5.6, 13, 5.5, 2.8, -1, mat.wall);
    cube(11, .15, 13, 0, 5.6, -1, mat.wall);
  }
  const metricPanel=perf?createMetricsDisplay(THREE,scene,perf):null;
  // Preserve the validated S02/V14 layout; only V14.1 opts into these adjustments.
  // In V14.2 the executive GLB already includes its chair. Load the two
  // remaining furniture GLBs first; only load legacy manager chair on failure.
  const v141Layout=advanced?furniturePlanV141.filter(spec=>spec.id!=='manager'):null;
  const deskCenter=advanced?-2.27:-2.35;
  const managerZ=advanced?-3.75:-4.50;
  const visitorZ=advanced?-.86:.05;
  const fallback={desk:[],manager:[],visitor:[]};
  fallback.desk.push(cube(advanced?3.30:3.7, advanced?.14:.15, advanced?1.62:1.7, 0, advanced?1.0:1.03, deskCenter, mat.wood));
  for (const x of (advanced?[-1.35,1.35]:[-1.5,1.5]))
    for (const z of (advanced?[-2.81,-1.73]:[-2.95,-1.75])) {
      fallback.desk.push(cube(advanced?.11:.12,advanced?1:1,advanced?.11:.12,x,.5,z,mat.metal));
    }

  // The empty visitor chair faces the desk (-Z), so its back is +Z.
  // The occupied chair faces the visitor (+Z), so its back is -Z.
  function chair(x,z,backSide,id){
    const wider=advanced&&id==='visitor';
    fallback[id].push(cube(wider?1.06:.9,.15,wider?1.06:.85,x,.55,z,mat.seat));
    fallback[id].push(cube(wider?1.06:.9,wider?1.08:1,.13,x,1.05,z+(wider?.45:.36)*backSide,mat.seat));
  }
  chair(0,managerZ,-1,'manager');
  chair(0,visitorZ,+1,'visitor');
  // Load local, pinned GLBs *without blocking the VR render loop*.
  // Remove a low-poly placeholder only when the matching GLB is ready.
  const furnitureLoaded=new Set();
  const furnitureStatus=document.querySelector('#stage-status');
  const furnitureReady=loadOfficeFurniture(THREE,scene,{plan:v141Layout||undefined,onItem(id,ready){
    if(ready){fallback[id].forEach(m=>{m.visible=false;});furnitureLoaded.add(id);}
    perf?.markAsset(id,ready);
    if(furnitureStatus){
      furnitureStatus.textContent=(premium?'V14 • ':'Bureau 3D · ')+'mobilier GLB '+furnitureLoaded.size+'/3'+
        (ready?'':' · repli actif');
    }
  }}).catch(error=>console.warn('[RH-XR] Furniture loader unavailable; placeholders retained',error));

  // Keep the existing geometric actor as a loading/failure fallback.
  const basicAvatar=[
    cylinder(.3, .25, .8, 0, 1.18, managerZ, mat.shirt),
    sphere(.28, 0, 1.83, managerZ, mat.skin),
    cylinder(.09, .09, .55, -.35, 1.3, managerZ, mat.skin),
    cylinder(.09, .09, .55, .35, 1.3, managerZ, mat.skin)
  ];
  if(advanced){
    const avatarStatus=document.querySelector('#avatar-status');
    const avatarTurn=document.querySelector('#avatar-turn');
    const avatarTurnBack=document.querySelector('#avatar-turn-back');
    const yawParam=params.get('executiveYaw')??params.get('avatarYaw');
    const yawDegrees=yawParam!==null&&/^[0-9]{1,3}$/.test(yawParam)&&Number(yawParam)<360?
      Number(yawParam):312;
    const modelYaw=yawDegrees*Math.PI/180;
    function connectTurnButtons(model,designation){
      const updateStatus=(angle)=>{
        if(avatarStatus)avatarStatus.textContent=
          designation+' chargé · orientation : '+angle+'° · rotation par 45°';
      };
      updateStatus(avatarYawDegrees(model));
      try{
        const controls=createAvatarTurnControl(THREE,{scene,renderer,playerRig},model,{
          label:designation,onRotate:updateStatus
        });
        if(avatarTurn){
          avatarTurn.disabled=false;
          avatarTurn.onclick=()=>controls.turn(1);
          avatarTurn.textContent='↻ Tourner le personnage +45°';
        }
        if(avatarTurnBack){
          avatarTurnBack.disabled=false;
          avatarTurnBack.onclick=()=>controls.turn(-1);
          avatarTurnBack.textContent='↺ Tourner le personnage −45°';
        }
      }catch(error){console.warn('[RH-XR] Avatar rotation controls unavailable',error);}
    }
    async function restoreLegacyOccupiedChair(){
      // Keep the old V14.1 actor/seat only for recovery when new GLB fails.
      if(avatarStatus)avatarStatus.textContent='Nouveau modèle indisponible · repli vers le fauteuil précédent';
      try{
        await loadOfficeFurniture(THREE,scene,{
          plan:furniturePlanV141.filter(spec=>spec.id==='manager'),
          onItem(id,ready){
            if(ready){fallback.manager.forEach(mesh=>{mesh.visible=false;});furnitureLoaded.add(id);}
            perf?.markAsset(id,ready);
          }
        });
        const legacy=await loadArmchairAvatar(THREE,scene,{
          placement:{...ARMCHAIR_AVATAR_PLACEMENT,yawRadians:modelYaw},
          onLoaded(model){
            basicAvatar.forEach(mesh=>{mesh.visible=false;});
            connectTurnButtons(model,'Mona Lisa (repli)');
          },
          onFailed(){
            if(avatarStatus)avatarStatus.textContent='Modèles GLB indisponibles · personnages de secours affichés';
          }
        });
        return legacy;
      }catch(error){
        console.warn('[RH-XR V14.2] Legacy avatar fallback failed',error);
        if(avatarStatus)avatarStatus.textContent='Modèle intégré indisponible · géométrie de secours affichée';
      }
    }
    // Only one occupied chair/person assembly at a time. The original chair
    // GLB and Mona Lisa are not even downloaded when the new one succeeds.
    void furnitureReady.then(async()=>{
      const result=await loadExecutiveAssembly(THREE,scene,{
        placement:{...EXECUTIVE_PLACEMENT,yawRadians:modelYaw},
        onLoaded(model){
          fallback.manager.forEach(mesh=>{mesh.visible=false;});
          basicAvatar.forEach(mesh=>{mesh.visible=false;});
          furnitureLoaded.add('manager');perf?.markAsset('manager',true);
          if(furnitureStatus)furnitureStatus.textContent='V14 · mobilier et ensemble RH GLB 3/3';
          connectTurnButtons(model,'Badr Han · fauteuil intégré');
        }
      });
      if(!result.ok)await restoreLegacyOccupiedChair();
    }).catch(async error=>{
      console.warn('[RH-XR V14.2] Combined model initialization failed',error);
      await restoreLegacyOccupiedChair();
    });
  }
  if(!premium){
    for (const x of [-4, 4]) {
      cylinder(.35, .30, .45, x, .24, -6, mat.wood);
      cylinder(.06, .07, .9, x, .9, -6, mat.plant);
      sphere(.5, x, 1.5, -6, mat.plant);
    }
    cube(2.3, 1.4, .06, -2.5, 3, -7.48, mat.metal);
    cube(1.8, 1.1, .08, 2.6, 3, -7.48, mat.wood);
  }

  const debugInfo=diagnostics?document.createElement('div'):null;
  let lastDebugTextAt=-Infinity;
  if(debugInfo){
    debugInfo.id='rhxr-v14-metrics';
    debugInfo.setAttribute('role','status');
    debugInfo.style.cssText='position:absolute;left:12px;bottom:60px;max-width:85%;padding:9px;border-radius:8px;background:#102d38ef;color:#e7f8f7;font-size:12px;font-weight:600;z-index:5';
    debugInfo.textContent='V14 · mesure des intervalles de frames (pas GPU)';
    stage.appendChild(debugInfo);
    const exportButton=document.createElement('button');
    exportButton.textContent='Exporter diagnostic local';
    exportButton.type='button';
    exportButton.style.cssText='position:absolute;top:100px;left:12px;z-index:6;background:#e6eadf;color:#183945;border-radius:8px;border:1px solid #bccdd0;padding:8px';
    exportButton.addEventListener('click',()=>{
      const report={schema:'rhxr-v14-local-frame-diagnostics-v1',note:'Frame callback intervals are NOT GPU/CPU measurements',...perf.snapshot()};
      const blob=new Blob([JSON.stringify(report,null,2)],{type:'application/json'});
      const href=URL.createObjectURL(blob),a=document.createElement('a');
      a.href=href;a.download='rhxr-v14-quest-diagnostic.json';a.click();
      setTimeout(()=>URL.revokeObjectURL(href),1000);
    });
    stage.appendChild(exportButton);
  }
  const keys = new Set();
  const allowed = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD']);
  const down = e => {
    if (allowed.has(e.code) && !['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT'].includes(document.activeElement?.tagName || '')) {
      e.preventDefault();
      keys.add(e.code);
    }
  };
  const up = e => keys.delete(e.code);
  const blur = () => keys.clear();
  document.addEventListener('keydown', down);
  document.addEventListener('keyup', up);
  window.addEventListener('blur', blur);

  const clock = new THREE.Clock();
  const headWorld = new THREE.Vector3();
  const viewForward = new THREE.Vector3();
  const headRotation = new THREE.Quaternion();
  let snapLatched = false;

  const clamp = (number, min, max) => Math.max(min, Math.min(max, number));

  // Snap around the viewer's tracked head position, including room-scale offset.
  // This prevents orbiting the room center when the user has walked physically.
  function snapAroundHead(angle, xrCamera) {
    headWorld.setFromMatrixPosition(xrCamera.matrixWorld);
    const correction = pivotCorrection(headWorld, playerRig.position, angle);
    playerRig.rotation.y += angle;
    playerRig.position.x += correction.x;
    playerRig.position.z += correction.z;
    playerRig.updateMatrixWorld(true);
  }

  const frameSubscribers=new Set();
  renderer.setAnimationLoop((time) => {
    const dt = Math.min(clock.getDelta(), 0.05);
    if (renderer.xr.isPresenting) {
      const session = renderer.xr.getSession();
      const sticks = readSticks(session?.inputSources);
      const xrCamera = renderer.xr.getCamera();

      const turn = snapTurn(sticks.right.x, snapLatched);
      snapLatched = turn.latched;
      if (turn.angle) snapAroundHead(turn.angle, xrCamera);

      // Movement follows the HMD's horizontal looking direction.
      xrCamera.getWorldQuaternion(headRotation);
      viewForward.set(0, 0, -1).applyQuaternion(headRotation).setY(0);
      const move = displacement(sticks.left, viewForward, dt);

      // Restrict *virtual* translation to inside the room walls. Physical
      // headset movement remains fully controlled by WebXR tracking.
      xrCamera.getWorldPosition(headWorld);
      playerRig.position.x += clamp(headWorld.x + move.x, -4.7, 4.7) - headWorld.x;
      playerRig.position.z += clamp(headWorld.z + move.z, -6.7, 5.1) - headWorld.z;
    } else {
      snapLatched = false;
      const rotate = Number(keys.has('ArrowLeft') || keys.has('KeyA')) -
        Number(keys.has('ArrowRight') || keys.has('KeyD'));
      playerRig.rotation.y += rotate * 1.5 * dt;
      camera.position.set(0, 1.65, 0);
      camera.rotation.set(0, 0, 0);
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(playerRig.quaternion);
      const vertical = Number(keys.has('ArrowDown') || keys.has('KeyS')) -
        Number(keys.has('ArrowUp') || keys.has('KeyW'));
      const move = displacement({ x: 0, y: vertical }, forward, dt, 2);
      playerRig.position.x = clamp(playerRig.position.x + move.x, -4.7, 4.7);
      playerRig.position.z = clamp(playerRig.position.z + move.z, -6.7, 5.1);
    }
    for(const subscriber of frameSubscribers){
      try{subscriber({time,dt,xr:renderer.xr.isPresenting});}
      catch(error){console.warn('[RH-XR V14.1] Frame subscriber error',error);frameSubscribers.delete(subscriber);}
    }
    renderer.render(scene, camera);
    if(perf){
      perf.tick(time,renderer.info.render,renderer.info.memory,renderer.xr.isPresenting?'xr':'desktop');
      metricPanel?.update(time);
      // This reports animation callback pacing, not measured GPU time.
      if(debugInfo&&time-lastDebugTextAt>=1000){
        lastDebugTextAt=time;
        const info=perf.snapshot();
        debugInfo.textContent='V14 '+info.mode+' · '+(info.fpsEstimate??'…')+
          ' FPS estimées · '+(info.drawCalls??'…')+' draw calls · '+(info.triangles??'…')+' triangles';
      }
    }
  });

  const controls = document.createElement('div');
  controls.className = 'room-controls';
  controls.style.cssText = 'position:absolute;top:50px;left:12px;display:flex;gap:4px;flex-wrap:wrap;z-index:3';
  controls.innerHTML = '<button data-key="ArrowLeft">↶</button><button data-key="ArrowUp">↑</button><button data-key="ArrowDown">↓</button><button data-key="ArrowRight">↷</button>';
  controls.querySelectorAll('button').forEach(b => {
    b.type = 'button';
    b.style.cssText = 'border:1px solid #bfd3db;border-radius:7px;background:#ffffffea;padding:7px 11px;touch-action:none';
    b.addEventListener('pointerdown', e => { b.setPointerCapture(e.pointerId); keys.add(b.dataset.key); });
    for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) {
      b.addEventListener(event, () => keys.delete(b.dataset.key));
    }
  });
  stage.appendChild(controls);

  const ro = new ResizeObserver(() => {
    if (!stage.isConnected) return;
    const w = stage.clientWidth, h = stage.clientHeight;
    if (w > 0 && h > 0) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  });
  ro.observe(stage);
  const avatar = stage.querySelector('.avatar');
  if (avatar) avatar.classList.add('hidden');

  document.querySelector('#stage-hint').textContent =premium?
    'V14 prototype : bureau architectural · W/A/S/D en 3D · Quest : stick gauche + rotation 45° · ?metrics=1 pour le diagnostic':
    '3D : flèches/WASD · Quest : stick gauche = avancer, stick droit = tourner par 45°';
  if (navigator.xr?.isSessionSupported) {
    try {
      if (await navigator.xr.isSessionSupported('immersive-vr')) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'vr-btn';
        b.textContent = 'Entrer en RV';
        stage.appendChild(b);
        b.addEventListener('click', async () => {
          try {
            if (renderer.xr.isPresenting) {
              await renderer.xr.getSession().end();
              return;
            }
            const session = await navigator.xr.requestSession('immersive-vr', { optionalFeatures: ['local-floor'] });
            await renderer.xr.setSession(session);
            snapLatched = false;
            b.textContent = 'Quitter la RV';
            session.addEventListener('end', () => {
              b.textContent = 'Entrer en RV';
              snapLatched = false;
            }, { once: true });
          } catch (err) {
            console.warn('Session immersive refusée', err);
            b.textContent = 'RV indisponible';
          }
        });
      }
    } catch (err) { console.warn('WebXR non disponible', err); }
  }
  initialized = true;
  return {THREE,scene,renderer,playerRig,camera,stage,
    onFrame(callback){frameSubscribers.add(callback);return ()=>frameSubscribers.delete(callback);}};
}
