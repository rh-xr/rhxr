/** RH·XR V14 — first premium architectural prototype, low-cost opaque PBR.
 * This module adds NO dynamic shadows or external textures. The three original GLB
 * models are loaded separately by office-furniture.mjs.
 */
export const PREMIUM_V14_PALETTE=Object.freeze({
  shell:"#ebe7df",ceiling:"#faf6ee",floor:"#a78d73",wood:"#815a44",
  oak:"#cba580",trim:"#465962",stone:"#d5cdc1",ink:"#183946",
  teal:"#17626a",plant:"#38634a",gold:"#b89560",luminous:"#f9e9cb"
});
export const PREMIUM_V14_ZONES=Object.freeze(["accueil","conversation","documents DACI","débriefing"]);
export function createPremiumOffice(THREE,scene){
  const root=new THREE.Group();root.name="rhxr-v14-premium-office";scene.add(root);
  const palette=PREMIUM_V14_PALETTE;
  const mats={};
  for(const [k,c] of Object.entries(palette))
    mats[k]=new THREE.MeshStandardMaterial({color:c,roughness:k==="gold"?.43:k==="stone"?.82:.77,metalness:k==="gold"?.30:0});
  mats.glow=new THREE.MeshBasicMaterial({color:"#fff1d8"});
  mats.glass=new THREE.MeshStandardMaterial({color:"#b9d9e0",roughness:.17,metalness:.12});
  const unitBox=new THREE.BoxGeometry(1,1,1);
  const unitCylinder=new THREE.CylinderGeometry(.5,.5,1,14);
  const unitSphere=new THREE.SphereGeometry(.5,14,10);
  const unique=[];
  const add=(geo,material,pos,size,rotation=0)=>{
    const m=new THREE.Mesh(geo,mats[material]);m.position.set(...pos);
    m.scale.set(...size);m.rotation.y=rotation;
    root.add(m);return m;
  };
  const box=(material,x,y,z,w,h,d)=>add(unitBox,material,[x,y,z],[w,h,d]);
  // Fixed floor and architectural shell (room extends x ±5.5, z [-7.5, 5.5]).
  box("floor",0,-.13,-1,11,.26,13);
  box("shell",0,2.8,-7.6,11,5.6,.18);
  box("shell",-5.5,2.8,-1,.18,5.6,13);
  box("shell",5.5,2.8,-1,.18,5.6,13);
  box("ceiling",0,5.6,-1,11,.14,13);
  // Calm accent panel, wall battens, baseboards and ceiling cove (all opaque).
  box("teal",0,2.65,-7.44,5.5,4.5,.07);
  for(let i=0;i<14;i++)box("oak",-2.7+i*.42,2.65,-7.35,.065,4.0,.045);
  for(const x of [-5.38,5.38])box("trim",x,.12,-1,.08,.18,12.7);
  box("trim",0,.12,-7.42,10.65,.18,.075);
  for(const z of [-6.7,4.6])box("trim",0,5.37,z,10.3,.09,.12);
  for(const x of [-4.8,4.8])box("trim",x,5.37,-1,.09,.11,12.2);
  // Acoustic ceiling coves, visual light sources: no extra realtime shadow lights.
  for(const x of [-3.5,0,3.5]){
    box("stone",x,5.39,-1,1.85,.065,7.5);
    box("glow",x,5.34,-1,1.54,.018,6.6);
  }
  // Modern windows suggested by blue framed panels (not translucent).
  box("trim",5.38,3.0,1.05,.08,2.75,4.4);
  box("glass",5.33,3.0,1.05,.05,2.53,4.15);
  for(const z of [-.38,1.12,2.62])box("trim",5.29,3.0,z,.085,2.59,.055);
  box("trim",5.30,3.09,1.05,.085,.06,4.1);
  // Modular storage on the left side: intentionally sparse to remain fast in VR.
  box("wood",-4.80,1.15,-4.35,.92,2.08,2.25);
  for(const y of [.42,1.12,1.82])box("oak",-4.27,y,-4.35,.09,.08,2.24);
  for(const z of [-5.06,-4.25,-3.45])box("stone",-4.23,.70,z,.15,.34,.49);
  // Soft rug anchors conversation zone; no transparency or shadow maps.
  box("stone",0,.008,-2.08,4.55,.028,5.05);
  box("gold",0,.028,-2.08,4.62,.009,5.12);
  box("stone",0,.041,-2.08,4.28,.009,4.80);
  // Quiet side console for DACI document prompts (display text in next lot).
  box("wood",-4.55,.58,.75,1.15,1.1,1.35);
  box("oak",-4.55,1.15,.75,1.36,.12,1.48);
  box("gold",-4.55,1.19,.75,1.18,.018,1.27);
  box("ink",-4.55,1.75,.65,.42,.75,.04);
  // A separate briefing table, clear of the central GLB desk/visitor chair.
  box("stone",3.65,.67,-4.8,1.1,.12,.85);
  box("wood",3.65,.30,-4.8,.14,.6,.15);
  // Low-poly botanical accents, a handful of draw calls each.
  for(const [x,z] of [[-4.35,3.6],[4.35,-6.4]]){
    add(unitCylinder,"stone",[x,.26,z],[.54,.52,.54]);
    add(unitCylinder,"plant",[x,.69,z],[.10,.58,.10]);
    for(let i=0;i<4;i++){
      const a=i*Math.PI/2;
      add(unitSphere,"plant",[x+Math.sin(a)*.29,1.04+((i%2)*.15),z+Math.cos(a)*.29],[.38,.65,.33]);
    }
  }
  // Wall identity, simple canvas texture rather than additional GLB/network media.
  if(typeof document!=="undefined"){
    const canvas=document.createElement("canvas");canvas.width=1024;canvas.height=256;
    const ctx=canvas.getContext("2d");
    if(ctx){
      ctx.fillStyle="#123942";ctx.fillRect(0,0,1024,256);
      ctx.fillStyle="#d7b98a";ctx.font="bold 104px system-ui";ctx.fillText("RH·XR",70,142);
      ctx.font="30px system-ui";ctx.fillStyle="#e0edf0";ctx.fillText("FORMATION  ·  SIMULATION  ·  DACI",74,203);
      const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;
      const mat=new THREE.MeshBasicMaterial({map:t});
      const geo=new THREE.PlaneGeometry(2.65,.66);
      const sign=new THREE.Mesh(geo,mat);sign.position.set(0,3.48,-7.27);root.add(sign);
      unique.push(geo,mat,t);
    }
  }
  return {
    root,
    dispose(){scene.remove(root);root.traverse(obj=>{if(obj.isMesh)obj.material?.dispose?.();});
      unitBox.dispose();unitCylinder.dispose();unitSphere.dispose();
      for(const x of unique)x.dispose?.();}
  };
}
