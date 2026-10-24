/** V14.1 optional finishes: texture detail and visual hierarchy without real-time shadow lights.
 * Keeps V14 original scene fully unchanged when the feature flag is absent.
 */
export function upgradeOfficeFinish(THREE,scene){
  const room=scene.getObjectByName('rhxr-v14-premium-office');
  if(!room)throw Error('Premium scene not mounted');
  const additions=new THREE.Group();additions.name='rhxr-v14-1-finishes';room.add(additions);
  const geometries=[],materials=[],textures=[];
  const canvas=(w,h,draw)=>{
    const c=document.createElement('canvas');c.width=w;c.height=h;
    const ctx=c.getContext('2d');if(!ctx)return null;
    draw(ctx,w,h);const t=new THREE.CanvasTexture(c);
    t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;textures.push(t);return t;
  };
  // Restrained parquet grain: fine boards and muted natural variation, tiled with mipmaps.
  const wood=canvas(1024,1024,(ctx,w,h)=>{
    ctx.fillStyle='#a98a6c';ctx.fillRect(0,0,w,h);
    for(let y=0;y<h;y+=128){
      const alternate=Math.floor(y/128)%3;
      ctx.fillStyle=['#a88c70','#b49577','#aa8a6d'][alternate];ctx.fillRect(0,y,w,127);
      ctx.fillStyle='rgba(38,29,22,.12)';ctx.fillRect(0,y,w,2);
      for(let i=0;i<16;i++){
        const yy=y+7+i*7.4;
        ctx.strokeStyle='rgba(95,58,37,'+(i%4===0?'.11':'.045')+')';ctx.lineWidth=i%4===0?2:1;
        ctx.beginPath();ctx.moveTo(0,yy);ctx.bezierCurveTo(230,yy+4,780,yy-4,w,yy+2);ctx.stroke();
      }
      ctx.strokeStyle='rgba(42,29,21,.09)';ctx.beginPath();
      const joint=(Math.floor(y/128)%2)*450+60;ctx.moveTo(joint,y);ctx.lineTo(joint,y+127);ctx.stroke();
    }
  });
  const floor=room.children.find(o=>o.isMesh&&Math.abs(o.position.y+.13)<.003&&o.scale.x===11&&o.scale.z===13);
  let floorMaterial=null;
  if(wood&&floor){
    wood.wrapS=THREE.RepeatWrapping;wood.wrapT=THREE.RepeatWrapping;wood.repeat.set(4,5);
    floorMaterial=new THREE.MeshStandardMaterial({map:wood,roughness:.85,metalness:0});
    materials.push(floorMaterial);
    floor.material=floorMaterial;
  }
  const addRect=(w,h,x,y,z,mat)=>{
    const geo=new THREE.PlaneGeometry(w,h);geometries.push(geo);
    const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);additions.add(mesh);return mesh;
  };
  const brass=new THREE.MeshBasicMaterial({color:'#bb9b69'});materials.push(brass);
  // Two framed prints are rendered as single opaque textures, no external fetch.
  for(const [i,x] of [-3.85,3.85].entries()){
    const art=canvas(600,650,(ctx,w,h)=>{
      ctx.fillStyle='#f4eee1';ctx.fillRect(0,0,w,h);
      const grd=ctx.createLinearGradient(0,30,w,h);
      if(i===0){grd.addColorStop(0,'#294c55');grd.addColorStop(.65,'#86a49f');grd.addColorStop(1,'#e9c6a0');}
      else {grd.addColorStop(0,'#cfbaa0');grd.addColorStop(.55,'#a3bbb4');grd.addColorStop(1,'#2c5965');}
      ctx.fillStyle=grd;ctx.fillRect(60,50,480,550);
      ctx.fillStyle='#f4eee1';ctx.globalAlpha=.85;
      ctx.beginPath();ctx.ellipse(320,330,170,220,i===0?.58:-.44,0,Math.PI*2);ctx.fill();
      ctx.globalAlpha=1;ctx.fillStyle='#2e6068';ctx.beginPath();
      ctx.ellipse(285,325,108,147,i===0?-.48:.45,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#f1e2c9';ctx.fillRect(58,598,485,12);
    });
    const frameGeo=new THREE.PlaneGeometry(1.62,1.73);geometries.push(frameGeo);
    const mat=brass;
    const frame=new THREE.Mesh(frameGeo,mat);frame.position.set(x,3.07,-7.375);additions.add(frame);
    if(art){const artMat=new THREE.MeshBasicMaterial({map:art});materials.push(artMat);
      addRect(1.5,1.62,x,3.07,-7.34,artMat);}
  }
  // Low-cost light strips (visual cues only; no additional dynamic lights).
  const cove=new THREE.MeshBasicMaterial({color:'#ffedc9'});materials.push(cove);
  for(const x of [-4.86,4.86]){
    const geo=new THREE.BoxGeometry(.055,.025,6.5);geometries.push(geo);
    const strip=new THREE.Mesh(geo,cove);strip.position.set(x,5.20,-1.1);additions.add(strip);
  }
  // Formally named acoustic wall details improve depth without texture fetches.
  const acoustic=new THREE.MeshStandardMaterial({color:'#ded6c8',roughness:1});materials.push(acoustic);
  const slatGeometry=new THREE.BoxGeometry(.035,1.1,.045);geometries.push(slatGeometry);
  for(const x of [-4.40,-4.13,-3.86,-3.59,3.59,3.86,4.13,4.40]){
    const slat=new THREE.Mesh(slatGeometry,acoustic);
    slat.position.set(x,1.90,-7.36);additions.add(slat);
  }
  return {root:additions,dispose(){
    room.remove(additions);
    if(floor&&floor.material===floorMaterial){
      // Keep the original neutral floor renderable if this test layer is removed.
      floor.material=new THREE.MeshStandardMaterial({color:'#a78d73',roughness:.77});
    }
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());
  }};
}
