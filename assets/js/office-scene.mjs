/** RH·XR V2: modern HR mediation office, modelled procedurally.
 * Visual-only scene module: Quest input, safety and learning engine live elsewhere.
 * No remote models or person-related assets are loaded.
 */
import { OFFICE_LAYOUT as L } from './office-layout.mjs';

export function createOfficeScene(THREE, scene, renderer) {
  scene.background = new THREE.Color('#b9d2de');
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.24;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const material = (color, metalness = 0, roughness = .78, extras = {}) =>
    new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extras });
  const m = {
    wall: material('#f1f2f0'), blueWall: material('#315267', 0, .92),
    trim: material('#e2e6e8'), oak: material('#b9926b'), oakLight: material('#d1aa7e'),
    oakDark: material('#927258'), floor: material('#cba37d'),
    rug: material('#879fab'), rugEdge: material('#69838f'),
    charcoal: material('#30465a'), ink: material('#1e3547'),
    pale: material('#ecf0f1'), chrome: material('#9ba9b4', .74, .24),
    brass: material('#c5a479', .62, .36), glass: material('#adc9da', .1, .12, {transparent: true, opacity: .64, depthWrite: false}),
    chair: material('#496d78'), cushion: material('#607f8a'), chairSide: material('#345b67'),
    leather: material('#b2b9ad'), suit: material('#364e61'), trousers: material('#293b4b'),
    shirt: material('#f0ece5'), tie: material('#a47766'),
    skin: material('#bb8c6c'), skinLight: material('#d5a684'),
    hair: material('#343331'), plant: material('#437c65'),
    plantDeep: material('#2f6851'), pot: material('#d8d4cd'),
    slate: material('#596f7a'), book1: material('#d1ab77'), book2: material('#6f8989'), book3: material('#a6b7ac'),
    black: material('#202e36'), white: material('#ffffff'),
    screen: new THREE.MeshStandardMaterial({color:'#c9e5e7',emissive:'#4e7c86',emissiveIntensity:.3,metalness:.05,roughness:.34})
  };
  const boxGeometry = new Map();
  const geomBox = (w,h,d) => {
    const k=[w,h,d].join('/');
    if(!boxGeometry.has(k))boxGeometry.set(k,new THREE.BoxGeometry(w,h,d));
    return boxGeometry.get(k);
  };
  const addBox = (parent,w,h,d,x,y,z,mat,cast=true) => {
    const mesh=new THREE.Mesh(geomBox(w,h,d),mat);
    mesh.position.set(x,y,z);mesh.castShadow=cast;mesh.receiveShadow=true;parent.add(mesh);return mesh;
  };
  const sphere=(parent,r,x,y,z,mat,segments=16)=>{
    const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,segments,12),mat);
    mesh.position.set(x,y,z);mesh.castShadow=true;parent.add(mesh);return mesh;
  };
  const cylinder=(parent,rt,rb,h,x,y,z,mat,sides=12)=>{
    const mesh=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,sides),mat);
    mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
  };
  const horizontal=(parent,rt,rb,len,x,y,z,mat) => {
    const mesh=cylinder(parent,rt,rb,len,x,y,z,mat);
    mesh.rotation.z=Math.PI/2;return mesh;
  };
  const between=(parent,p1,p2,r,mat)=>{
    const a=new THREE.Vector3(...p1),b=new THREE.Vector3(...p2);
    const v=b.clone().sub(a);
    const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,v.length(),10),mat);
    mesh.position.copy(a.add(b).multiplyScalar(.5));mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());
    mesh.castShadow=true;parent.add(mesh);return mesh;
  };

  scene.add(new THREE.HemisphereLight('#f7fbff','#779098',2.0));
  const sun=new THREE.DirectionalLight('#fff1d9',2.4);
  sun.position.set(1.5,5.0,1.9);
  sun.castShadow=true;sun.shadow.mapSize.set(L.performance.shadowMapSize,L.performance.shadowMapSize);
  sun.shadow.camera.left=-8;sun.shadow.camera.right=8;sun.shadow.camera.top=8;sun.shadow.camera.bottom=-8;
  sun.shadow.camera.near=.5;sun.shadow.camera.far=25;sun.shadow.bias=-.0004;
  sun.shadow.normalBias=.03;
  scene.add(sun);scene.add(sun.target);
  const indirect=new THREE.PointLight('#ddf5ff',18,12,2);
  indirect.position.set(4.5,4,-1);scene.add(indirect);

  // Architecture: matte cream walls, deep blue rear accent, ceiling lights,
  // mouldings, wood parquet and a restrained rug. Entrance at +Z stays open.
  addBox(scene,11,.18,13,0,-.15,-1,m.floor,false);
  addBox(scene,11,5.6,.16,0,2.8,-7.6,m.blueWall,false);
  addBox(scene,.16,5.6,13,-5.5,2.8,-1,m.wall,false);
  addBox(scene,.16,5.6,13,5.5,2.8,-1,m.wall,false);
  addBox(scene,11,.15,13,0,5.6,-1,m.wall,false);
  for(let i=0;i<36;i++){
    const x=-5.35+(i%9)*1.2, z=-6.7+Math.floor(i/9)*3.5;
    // Brisk parquet accent lines while keeping mesh count low.
    const strip=addBox(scene,1.17,.012,3.47,x,-.052,z,
      (i%3===0?m.oakLight:i%3===1?m.oak:m.floor),false);
    strip.receiveShadow=true;
  }
  for(let z=-6.9;z<5.4;z+=2.5){
    addBox(scene,.025,.10,2.40,-5.39,.19,z,m.trim,false);
    addBox(scene,.025,.10,2.40,5.39,.19,z,m.trim,false);
  }
  addBox(scene,10.7,.09,.1,0,.18,-7.47,m.trim,false);
  addBox(scene,5.3,.035,3.75,0,-.02,-2.35,m.rug,false);
  for(let xx of [-2.58,2.58])addBox(scene,.06,.04,3.75,xx,.004,-2.35,m.rugEdge,false);

  // Decorative daylight window on right wall: designed without transparent
  // world geometry to avoid multi-pass Quest costs.
  addBox(scene,.08,2.55,3.5,5.36,3.11,.5,m.pale,false);
  addBox(scene,.09,2.35,3.22,5.29,3.13,.5,m.glass,false);
  addBox(scene,.13,2.55,.09,5.24,3.11,.5,m.chrome,false);
  for(let z of [-1.1,2.1])addBox(scene,.13,2.6,.09,5.22,3.11,z,m.chrome,false);
  addBox(scene,.11,.08,3.5,5.21,3.2,.5,m.chrome,false);
  addBox(scene,.14,.15,3.65,5.23,1.82,.5,m.oakLight,false);

  // Ceiling panels mimic diffuse overhead illumination.
  const lightPanel=new THREE.MeshBasicMaterial({color:'#f5faf7'});
  for(const x of [-2.3,2.3])for(const z of [-4.3,1.0]){
    addBox(scene,1.45,.035,.85,x,5.49,z,m.chrome,false);
    addBox(scene,1.28,.045,.72,x,5.46,z,lightPanel,false);
  }

  // Desk: a thick hardwood top, an off-center drawer and brushed metal feet.
  addBox(scene,L.desk.width,.12,L.desk.depth,0,L.desk.height,-2.35,m.oak);
  addBox(scene,L.desk.width-.16,.035,L.desk.depth-.12,0,1.1,-2.35,m.oakLight);
  for(const x of [-1.42,1.42]){
    addBox(scene,.12,.96,.15,x,.50,-2.97,m.chrome);
    addBox(scene,.12,.96,.15,x,.50,-1.74,m.chrome);
  }
  addBox(scene,1.08,.30,1.12,1.04,.82,-2.40,m.oakDark);
  addBox(scene,.85,.07,.035,1.05,.82,-1.83,m.brass);

  // Desk objects and accessories (moderate triangle budget).
  addBox(scene,.8,.025,.5,-.98,1.13,-2.28,m.leather);
  addBox(scene,.53,.03,.35,-.95,1.17,-2.18,m.pale);
  addBox(scene,.44,.018,.32,.75,1.135,-2.15,m.slate);
  cylinder(scene,.07,.07,.12,1.36,1.19,-2.17,m.chrome);
  cylinder(scene,.23,.23,.025,1.36,1.255,-2.17,m.oakLight);
  addBox(scene,.38,.28,.02,-.09,1.29,-2.65,m.chrome);
  addBox(scene,.30,.20,.024,-.09,1.29,-2.636,m.screen);
  addBox(scene,.14,.04,.14,-.09,1.14,-2.54,m.chrome);

  // Reusable upholstered swivel chair. The default faces the visitor (+Z).
  // Visitor version is rotated by 180° to face the manager and desk (-Z).
  function makeChair(data){
    const group=new THREE.Group();
    group.position.set(data.x,0,data.z);
    group.rotation.y=data.yaw;
    scene.add(group);
    cylinder(group,.055,.055,.42,0,.31,0,m.chrome);
    cylinder(group,.35,.22,.06,0,.12,0,m.chrome);
    for(let i=0;i<5;i++){
      const a=i*2*Math.PI/5;
      between(group,[0,.13,0],[Math.sin(a)*.37,.10,Math.cos(a)*.37],.035,m.chrome);
      sphere(group,.07,Math.sin(a)*.41,.08,Math.cos(a)*.41,m.black,10);
    }
    addBox(group,.98,.14,.91,0,.57,0,m.chairSide);
    addBox(group,.91,.12,.82,0,.66,.02,m.cushion);
    addBox(group,.98,.95,.16,0,1.13,-.42,m.chairSide);
    addBox(group,.83,.80,.08,0,1.15,-.326,m.cushion);
    addBox(group,.99,.17,.21,0,1.68,-.41,m.chairSide);
    for(const x of [-.51,.51]){
      addBox(group,.09,.57,.11,x,.88,-.12,m.chrome);
      addBox(group,.13,.08,.7,x,1.16,-.13,m.chairSide);
    }
    return group;
  }
  makeChair(L.managerChair);
  makeChair(L.visitorChair);

  // More articulate but deliberately stylized seated training avatar:
  // hands, face, jacket/shirt and legs. Not a photorealistic likeness.
  const person=new THREE.Group();person.position.set(0,0,L.managerChair.z);scene.add(person);
  addBox(person,.67,.62,.34,0,1.20,.07,m.suit);
  addBox(person,.22,.36,.07,0,1.35,.26,m.shirt);
  addBox(person,.04,.22,.025,0,1.3,.30,m.tie);
  sphere(person,.235,0,1.80,.12,m.skinLight,20);
  sphere(person,.23,0,1.90,.035,m.hair,18);
  addBox(person,.45,.11,.12,0,2.04,.012,m.hair);
  sphere(person,.022,-.09,1.82,.335,m.ink,10);
  sphere(person,.022,.09,1.82,.335,m.ink,10);
  between(person,[-.37,1.40,.07],[-.45,1.00,.42],.105,m.suit);
  between(person,[.37,1.40,.07],[.45,1.00,.42],.105,m.suit);
  sphere(person,.085,-.45,.97,.46,m.skin,12);
  sphere(person,.085,.45,.97,.46,m.skin,12);
  for(const x of [-.21,.21]){
    between(person,[x,.84,.08],[x,.50,.34],.13,m.trousers);
    addBox(person,.19,.11,.39,x,.40,.56,m.black);
  }

  // Left credenza with books and certificate.
  addBox(scene,1.75,.87,.43,-4.42,.47,-4.5,m.oakDark);
  addBox(scene,1.85,.055,.49,-4.42,.93,-4.5,m.oakLight);
  for(const x of [-4.9,-4.4,-3.9])addBox(scene,.025,.43,.025,x,.59,-4.27,m.brass);
  for(let i=0;i<7;i++){
    const c=[m.book1,m.book2,m.book3][i%3];
    addBox(scene,.10,.23+.03*(i%3),.23,-4.93+i*.14,1.09,-4.53,c);
  }

  // Rear wall artwork and room branding, in calm corporate colors.
  addBox(scene,2.85,1.52,.10,-2.60,3.42,-7.42,m.brass,false);
  addBox(scene,2.69,1.36,.11,-2.60,3.42,-7.35,m.pale,false);
  addBox(scene,2.09,.085,.06,-2.60,3.60,-7.27,m.blueWall,false);
  addBox(scene,1.5,.06,.06,-2.60,3.37,-7.27,m.rugEdge,false);
  addBox(scene,2.05,.05,.06,-2.60,3.15,-7.27,m.oakLight,false);
  addBox(scene,2.65,1.29,.12,2.48,3.44,-7.40,m.ink,false);
  addBox(scene,2.46,1.12,.13,2.48,3.44,-7.31,m.pale,false);
  const canvas=document.createElement('canvas');
  canvas.width=512;canvas.height=256;
  const ctx=canvas.getContext('2d');
  if(ctx){
    ctx.fillStyle='#edf2f0';ctx.fillRect(0,0,512,256);
    ctx.fillStyle='#2b5c70';ctx.font='bold 67px sans-serif';ctx.textAlign='center';
    ctx.fillText('RH·XR',256,122);
    ctx.fillStyle='#668999';ctx.font='26px sans-serif';ctx.fillText('PEOPLE • LEARNING • XR',256,179);
    const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=2;
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(2.40,1.05),new THREE.MeshBasicMaterial({map:tex}));
    sign.position.set(2.48,3.44,-7.225);scene.add(sign);
  }

  // Greenery and large natural-fiber ceramic pots.
  const potPlant=(x,z,scale=1)=>{
    const group=new THREE.Group();group.position.set(x,0,z);group.scale.setScalar(scale);scene.add(group);
    cylinder(group,.24,.18,.43,0,.24,0,m.pot);
    cylinder(group,.20,.20,.03,0,.47,0,m.oakDark);
    cylinder(group,.045,.05,.90,0,.82,0,m.plantDeep);
    for(let i=0;i<6;i++){
      const a=i*Math.PI/3;
      const leaf=sphere(group,.30,Math.sin(a)*.30,1.24+(i%2)*.17,Math.cos(a)*.27,m.plant,12);
      leaf.scale.set(.60,1.15,.45);
    }
    const leaf=sphere(group,.34,0,1.60,0,m.plantDeep,12);leaf.scale.set(.8,1.0,.8);
  };
  potPlant(-4.5,-6.3,1.03);
  potPlant(4.3,-5.9,.92);
  potPlant(-4.6,3.3,.75);

  // Low-poly objects intentionally remain modest in polygon count;
  // 3D source content and PBR model upgrades will follow in a separate phase.
  return { layout:L, visualVersion:'v2-procedural', geometryMode:'procedural', controlsUntouched:true };
}
