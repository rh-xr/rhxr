/** RH·XR conceptual low-poly office — experimental 3D + Quest WebXR controls.
 * The same educational scenario remains available without XR.
 */
import { readSticks, displacement, snapTurn, pivotCorrection } from './locomotion.mjs';
import { loadOfficeFurniture } from './office-furniture.mjs';

let initialized = false;
export async function mountRoom(stage) {
  if (initialized) return;
  const THREE = await import('https://esm.sh/three@0.169.0');
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
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

  scene.add(new THREE.HemisphereLight(0xffffff, 0x758fa1, 2.4));
  const light = new THREE.DirectionalLight(0xfff6eb, 2.6);
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
  cube(11, .2, 13, 0, -.12, -1, mat.floor);
  cube(11, 5.6, .16, 0, 2.8, -7.6, mat.wall);
  cube(.15, 5.6, 13, -5.5, 2.8, -1, mat.wall);
  cube(.15, 5.6, 13, 5.5, 2.8, -1, mat.wall);
  cube(11, .15, 13, 0, 5.6, -1, mat.wall);
  const fallback={desk:[],manager:[],visitor:[]};
  fallback.desk.push(cube(3.7, .15, 1.7, 0, 1.03, -2.35, mat.wood));
  for (const x of [-1.5, 1.5]) for (const z of [-2.95, -1.75]) {
    fallback.desk.push(cube(.12, 1, .12, x, .5, z, mat.metal));
  }

  // The empty visitor chair faces the desk (-Z), so its back is +Z.
  // The occupied chair faces the visitor (+Z), so its back is -Z.
  function chair(x,z,backSide,id){
    fallback[id].push(cube(.9,.15,.85,x,.55,z,mat.seat));
    fallback[id].push(cube(.9,1,.13,x,1.05,z+.36*backSide,mat.seat));
  }
  chair(0,-4.5,-1,'manager');
  chair(0,.05,+1,'visitor');
  // Load local, pinned GLBs *without blocking the VR render loop*.
  // Remove a low-poly placeholder only when the matching GLB is ready.
  const furnitureLoaded=new Set();
  const furnitureStatus=document.querySelector('#stage-status');
  void loadOfficeFurniture(THREE,scene,{onItem(id,ready){
    if(ready){fallback[id].forEach(m=>{m.visible=false;});furnitureLoaded.add(id);}
    if(furnitureStatus){
      furnitureStatus.textContent='Bureau 3D · mobilier GLB '+furnitureLoaded.size+'/3'+
        (ready?'':' · repli actif');
    }
  }}).catch(error=>console.warn('[RH-XR] Furniture loader unavailable; placeholders retained',error));

  cylinder(.3, .25, .8, 0, 1.18, -4.5, mat.shirt);
  sphere(.28, 0, 1.83, -4.5, mat.skin);
  cylinder(.09, .09, .55, -.35, 1.3, -4.5, mat.skin);
  cylinder(.09, .09, .55, .35, 1.3, -4.5, mat.skin);
  for (const x of [-4, 4]) {
    cylinder(.35, .30, .45, x, .24, -6, mat.wood);
    cylinder(.06, .07, .9, x, .9, -6, mat.plant);
    sphere(.5, x, 1.5, -6, mat.plant);
  }
  cube(2.3, 1.4, .06, -2.5, 3, -7.48, mat.metal);
  cube(1.8, 1.1, .08, 2.6, 3, -7.48, mat.wood);

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

  renderer.setAnimationLoop(() => {
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
    renderer.render(scene, camera);
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

  document.querySelector('#stage-hint').textContent =
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
}
