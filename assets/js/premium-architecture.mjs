/**
 * RH·XR V3 premium architectural dressing for the mediation room.
 * This is a real-time architectural enhancement, NOT a photorealistic imported room.
 * Kept separate from all WebXR navigation and teaching logic.
 */
export function createPremiumArchitecture(THREE, scene, renderer, office) {
  const root = new THREE.Group();
  root.name = 'rhxr-v3-architectural-pass';
  scene.add(root);

  const mat = (color, metalness=0, roughness=.8, extra={}) =>
    new THREE.MeshStandardMaterial({color,metalness,roughness,...extra});
  const palette={
    bronze:mat('#af906a',.65,.28),
    bronzeDark:mat('#625443',.45,.48),
    walnut:mat('#644937',0,.48),
    oak:mat('#b99063',0,.54),
    fabric:mat('#9aa89f',0,1),
    glass:mat('#c8e7f2',.18,.14,{transparent:true,opacity:.21,depthWrite:false}),
    velvet:mat('#374e58',0,.78),
    stone:mat('#e6dfd1',0,.84),
    frame:mat('#c7c9bf',.5,.38),
    concrete:mat('#b8c3bb',0,.96),
    white:mat('#faf4e8',0,.62),
    black:mat('#343a3c',.28,.38)
  };
  const geometry=new Map();
  const box=(w,h,d,x,y,z,m,cast=false)=>{
    const id=[w,h,d].join('/');
    if(!geometry.has(id))geometry.set(id,new THREE.BoxGeometry(w,h,d));
    const mesh=new THREE.Mesh(geometry.get(id),m);
    mesh.position.set(x,y,z);
    mesh.castShadow=cast;mesh.receiveShadow=true;root.add(mesh);return mesh;
  };
  const cyl=(rTop,rBottom,h,x,y,z,m,sides=16)=>{
    const mesh=new THREE.Mesh(new THREE.CylinderGeometry(rTop,rBottom,h,sides),m);
    mesh.position.set(x,y,z);mesh.castShadow=true;root.add(mesh);return mesh;
  };
  // Long cornices and articulated wall slats: richer visual depth without a
  // costly second architecture mesh or any additional shadowcasting light.
  for(const x of [-5.38,5.38]){
    box(.065,.18,12.65,x,5.34,-1,palette.stone);
    box(.055,.12,12.65,x,.26,-1,palette.stone);
  }
  box(10.65,.20,.08,0,5.3,-7.45,palette.stone);
  box(10.65,.12,.08,0,.29,-7.43,palette.stone);
  for(let x=-5.15;x<=5.15;x+=.29){
    // A walnut vertical-slat feature strip on the rear accent wall. Draws are
    // deliberately disabled in Quest performance mode when requested.
    box(.046,2.15,.075,x,2.05,-7.34,palette.walnut);
  }
  // Repetition at the room edge gives a premium architectural rhythm.
  for(const z of [-6.7,-6.4,-6.1,3.75,4.06,4.37]){
    box(.09,2.20,.06,-5.27,2.50,z,palette.oak);
  }

  // Recessed alcove, floating shelf and polished ceramic features.
  box(1.72,1.35,.11,-4.28,3.52,-7.24,palette.walnut);
  box(1.47,1.10,.15,-4.28,3.54,-7.15,palette.stone);
  for(const y of [3.15,3.81])box(1.42,.07,.24,-4.28,y,-7.01,palette.walnut);
  cyl(.16,.13,.39,-4.75,3.40,-6.99,palette.concrete);
  cyl(.10,.10,.20,-4.12,3.29,-7.00,palette.bronze);
  const vase=new THREE.Mesh(new THREE.SphereGeometry(.16,18,12),palette.white);
  vase.scale.set(.75,1.42,.75);vase.position.set(-4.12,3.96,-6.99);root.add(vase);

  // A bay-window illusion: a warm daylight city prospect rendered locally to
  // canvas texture. It makes the view deeper but is not a live HDRI or real city.
  const backdrop=document.createElement('canvas');
  backdrop.width=1024;backdrop.height=512;
  const ctx=backdrop.getContext('2d');
  if(ctx){
    const sky=ctx.createLinearGradient(0,0,0,512);
    sky.addColorStop(0,'#8cbac8');sky.addColorStop(.46,'#dbe8df');sky.addColorStop(1,'#f3ddba');
    ctx.fillStyle=sky;ctx.fillRect(0,0,1024,512);
    // Deterministic silhouette for screenshot-to-screenshot comparisons.
    const rand=(seed)=>{const s=Math.sin(seed*78.233)*43758.5453;return s-Math.floor(s)};
    for(let layer=0;layer<3;layer++){
      ctx.fillStyle=['#a5bcc1','#7c9da3','#607f89'][layer];
      for(let i=0;i<31;i++){
        const width=20+rand(i*3+layer*70)*46;
        const height=50+rand(i*5+layer*71)*155;
        const xx=i*37-16+rand(i*17+layer)*12;
        const yy=318+layer*49-height;
        ctx.fillRect(xx,yy,width,height);
        if(layer===2){ctx.fillStyle='#d6ddd6';
          for(let t=0;t<5;t++)ctx.fillRect(xx+5+(t%3)*11,yy+7+Math.floor(t/3)*23,3,5);
          ctx.fillStyle='#607f89';
        }
      }
    }
    ctx.fillStyle='#6e8784';ctx.fillRect(0,422,1024,90);
    const tex=new THREE.CanvasTexture(backdrop);
    tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=2;
    const material=new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide});
    const window=new THREE.Mesh(new THREE.PlaneGeometry(3.10,2.38),material);
    window.rotation.y=-Math.PI/2;
    window.position.set(5.15,3.15,.50);
    window.name='rhxr-v3-city-window';
    root.add(window);
  }
  // Metal frames and sill: positioned toward the viewer, no real transparency
  // over the backdrop and therefore fewer Quest draw passes.
  for(const z of [-1.08,.50,2.08])box(.075,2.6,.095,5.04,3.16,z,palette.bronze);
  for(const y of [1.88,3.14,4.44])box(.075,.075,3.28,5.025,y,.50,palette.bronze);
  box(.32,.12,3.40,5.0,1.85,.50,palette.stone);

  // Drop ceiling LED rail and pendant shades over the desk.
  box(4.4,.08,.10,0,5.41,-2.36,palette.bronzeDark);
  const lanternGlass=mat('#fff0cf',0,.48,{emissive:'#d9bd8e',emissiveIntensity:.32});
  for(const x of [-1.2,0,1.2]){
    cyl(.023,.023,.45,x,5.14,-2.35,palette.black,12);
    cyl(.29,.21,.21,x,4.83,-2.35,palette.bronzeDark,24);
    cyl(.20,.20,.055,x,4.72,-2.35,lanternGlass,24);
  }

  // Curved modern visitor side-tables, subtle bronze detail.
  const t1=cyl(.28,.27,.038,2.35,.51,1.04,palette.walnut,28);
  cyl(.035,.035,.46,2.35,.28,1.04,palette.bronze,12);
  cyl(.19,.19,.035,2.35,.05,1.04,palette.bronzeDark,28);
  t1.receiveShadow=true;
  cyl(.08,.11,.15,2.35,.62,1.04,palette.concrete,18);

  // Privacy partition of narrow vertical timber elements behind lounge.
  for(let i=0;i<9;i++){
    const z=1.9+i*.32;
    box(.12,2.15,.09,-2.98,1.08,z,palette.walnut);
  }
  box(.17,.12,2.75,-2.98,2.2,3.15,palette.bronzeDark);
  box(.17,.12,2.75,-2.98,.13,3.15,palette.bronzeDark);

  // Floor-contact pouf / lobby seat. A decorative object: non-interactable.
  const cushion=new THREE.Mesh(new THREE.CylinderGeometry(.52,.49,.35,32),palette.velvet);
  cushion.position.set(-3.78,.19,3.28);cushion.castShadow=true;root.add(cushion);
  cyl(.40,.40,.04,-3.78,.036,3.28,palette.bronze,24);

  // Style metadata is for QA and does not claim photorealism.
  return {
    visualStyle:'executive-suite-2026',
    enhancements:['architectural-details','depth-window','pendant-lighting','lobby'],
    setDetailEnabled(enabled) { root.visible=Boolean(enabled); },
    dispose() {
      root.traverse(o=>{
        if(o.isMesh){o.geometry?.dispose();if(o.material?.map)o.material.map.dispose();}
      });
      scene.remove(root);
    }
  };
}
