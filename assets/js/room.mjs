/** RH·XR conceptual low-poly office. Optional, on-demand WebXR; text fallback always available. */
let initialized=false;
export async function mountRoom(stage){
 if(initialized)return;
 const THREE=await import('https://esm.sh/three@0.169.0');
 const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));
 renderer.setSize(stage.clientWidth,stage.clientHeight);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.xr.enabled=true;
 renderer.domElement.setAttribute('aria-label','Vue 3D expérimentale du bureau de médiation');
 stage.insertBefore(renderer.domElement,stage.firstChild);
 const scene=new THREE.Scene();scene.background=new THREE.Color('#d9e8f0');
 const camera=new THREE.PerspectiveCamera(65,stage.clientWidth/stage.clientHeight,.1,100);
 camera.position.set(0,1.65,4.7);camera.lookAt(0,1.4,-2.7);
 scene.add(new THREE.HemisphereLight(0xffffff,0x758fa1,2.4));
 const light=new THREE.DirectionalLight(0xfff6eb,2.6);light.position.set(-3,5,4);scene.add(light);
 const material=c=>new THREE.MeshStandardMaterial({color:c,roughness:.75});
 const mat={wall:material('#e6edf0'),floor:material('#b1c4ce'),wood:material('#aa8665'),metal:material('#5b7684'),seat:material('#315471'),skin:material('#c9977a'),shirt:material('#4e8a99'),plant:material('#3d7b69')};
 function cube(w,h,d,x,y,z,m){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);scene.add(mesh);return mesh;}
 function sphere(r,x,y,z,m){const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,18,12),m);mesh.position.set(x,y,z);scene.add(mesh);return mesh;}
 function cylinder(r1,r2,h,x,y,z,m){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,12),m);mesh.position.set(x,y,z);scene.add(mesh);return mesh;}
 cube(11,.2,13,0,-.12,-1,mat.floor);cube(11,5.6,.16,0,2.8,-7.6,mat.wall);cube(.15,5.6,13,-5.5,2.8,-1,mat.wall);cube(.15,5.6,13,5.5,2.8,-1,mat.wall);cube(11,.15,13,0,5.6,-1,mat.wall);
 cube(3.7,.15,1.7,0,1.03,-2.35,mat.wood);for(const x of [-1.5,1.5])for(const z of [-2.95,-1.75])cube(.12,1,.12,x,.5,z,mat.metal);
 function chair(x,z){cube(.9,.15,.85,x,.55,z,mat.seat);cube(.9,1,.13,x,1.05,z-.36,mat.seat);}
 chair(0,-4.5);chair(0,.1);
 cylinder(.3,.25,.8,0,1.18,-4.5,mat.shirt);sphere(.28,0,1.83,-4.5,mat.skin);cylinder(.09,.09,.55,-.35,1.3,-4.5,mat.skin);cylinder(.09,.09,.55,.35,1.3,-4.5,mat.skin);
 for(const x of [-4,4]){cylinder(.35,.30,.45,x,.24,-6,mat.wood);cylinder(.06,.07,.9,x,.9,-6,mat.plant);sphere(.5,x,1.5,-6,mat.plant)}
 cube(2.3,1.4,.06,-2.5,3,-7.48,mat.metal);cube(1.8,1.1,.08,2.6,3,-7.48,mat.wood);
 let yaw=0,x=0,z=4.7;const keys=new Set();
 const down=e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyA','KeyS','KeyD'].includes(e.code)&&!['INPUT','TEXTAREA','BUTTON','SELECT'].includes(document.activeElement?.tagName||'')){e.preventDefault();keys.add(e.code)}};
 const up=e=>keys.delete(e.code);
 document.addEventListener('keydown',down);document.addEventListener('keyup',up);
 renderer.setAnimationLoop(()=>{if(!renderer.xr.isPresenting){yaw+=((keys.has('ArrowLeft')||keys.has('KeyA')?1:0)-(keys.has('ArrowRight')||keys.has('KeyD')?1:0))*.025;const v=((keys.has('ArrowUp')||keys.has('KeyW')?1:0)-(keys.has('ArrowDown')||keys.has('KeyS')?1:0))*.045;x=Math.max(-4.4,Math.min(4.4,x+Math.sin(yaw)*v));z=Math.max(-6.1,Math.min(5.1,z-Math.cos(yaw)*v));camera.position.set(x,1.65,z);camera.rotation.set(0,yaw,0)}renderer.render(scene,camera)});
 const controls=document.createElement('div');controls.className='room-controls';controls.style.cssText='position:absolute;top:50px;left:12px;display:flex;gap:4px;flex-wrap:wrap;z-index:3';
 controls.innerHTML='<button data-key="ArrowLeft">↶</button><button data-key="ArrowUp">↑</button><button data-key="ArrowDown">↓</button><button data-key="ArrowRight">↷</button>';
 controls.querySelectorAll('button').forEach(b=>{b.type='button';b.style.cssText='border:1px solid #bfd3db;border-radius:7px;background:#ffffffea;padding:7px 11px;touch-action:none';b.addEventListener('pointerdown',e=>{b.setPointerCapture(e.pointerId);keys.add(b.dataset.key)});for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,()=>keys.delete(b.dataset.key))});stage.appendChild(controls);
 const ro=new ResizeObserver(()=>{if(!stage.isConnected)return;const w=stage.clientWidth,h=stage.clientHeight;if(w>0&&h>0){camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)}});ro.observe(stage);
 const avatar=stage.querySelector('.avatar');if(avatar)avatar.classList.add('hidden');document.querySelector('#stage-hint').textContent='WASD / flèches ou boutons pour explorer · RV si compatible';
 if(navigator.xr?.isSessionSupported){try{if(await navigator.xr.isSessionSupported('immersive-vr')){const b=document.createElement('button');b.type='button';b.className='vr-btn';b.textContent='Entrer en RV';stage.appendChild(b);b.addEventListener('click',async()=>{try{if(renderer.xr.isPresenting){await renderer.xr.getSession().end();return}const session=await navigator.xr.requestSession('immersive-vr',{optionalFeatures:['local-floor']});await renderer.xr.setSession(session);b.textContent='Quitter la RV';session.addEventListener('end',()=>b.textContent='Entrer en RV')}catch(e){console.warn('Session immersive refusée',e);b.textContent='RV indisponible'}})}}catch(e){console.warn('WebXR non disponible',e)}}
 initialized=true;
}
