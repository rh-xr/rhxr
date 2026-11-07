import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {EXECUTIVE_ASSET,EXECUTIVE_PLACEMENT,fitExecutiveAssembly,loadExecutiveAssembly} from '../assets/js/office-executive-v14-2.mjs';
import {furniturePlanV141} from '../assets/js/office-furniture.mjs';

const file=path=>readFileSync(new URL(path,import.meta.url),'utf8');

test('Integrated Badr Han + chair GLB matches the pinned original binary source',()=>{
  const source=readFileSync(new URL('../assets/models/badr-han-ch_c.glb',import.meta.url));
  assert.equal(EXECUTIVE_ASSET.filename,'badr-han-ch_c.glb');
  assert.equal(EXECUTIVE_ASSET.commit,'765f2ce11f30af869db98c9473224e9e26e0126b');
  assert.equal(EXECUTIVE_ASSET.blob,'4dbb45fa169373bd366918628b163de06f43f28e');
  assert.equal(source.length,4846664);
  assert.equal(source.length,EXECUTIVE_ASSET.bytes);
  assert.equal(source.toString('ascii',0,4),'glTF');
  assert.equal(source.readUInt32LE(4),2);
  assert.equal(source.readUInt32LE(8),source.length);
  assert.equal(source.toString('ascii',16,20),'JSON');
  const doc=JSON.parse(source.subarray(20,20+source.readUInt32LE(12)).toString('utf8').trim());
  assert.ok(doc.meshes?.length>=1);
  assert.ok(doc.scenes?.length>=1);
  console.log('[RH-XR integrated-model metadata]',JSON.stringify({
    bytes:source.length, meshes:doc.meshes.length,nodes:doc.nodes?.length||0,
    names:doc.nodes?.slice(0,18).map(n=>n.name||'unnamed'),
    materials:doc.materials?.length||0,textures:doc.textures?.length||0,
    positionBounds:doc.accessors?.filter(v=>v.type==='VEC3'&&v.min&&v.max)
      .slice(0,5).map(v=>({min:v.min,max:v.max}))||[],
    used:doc.extensionsUsed||[],required:doc.extensionsRequired||[],
    animations:doc.animations?.length||0,skins:doc.skins?.length||0
  }));
});

test('Executive positioning advances and lifts the one-piece assembly while keeping uniform scale',()=>{
  const c=EXECUTIVE_PLACEMENT;
  assert.deepEqual(c.position,[0,0.09,-4.02]);
  assert.ok(Math.abs(c.yawRadians-312*Math.PI/180)<1e-10);
  assert.ok(c.maxEnvelope.every(v=>v>0));
  class Vector3{constructor(x=0,y=0,z=0){Object.assign(this,{x,y,z});}}
  class Box3{
    setFromObject(object){
      const k=object.scale?.factor||1;
      this.min=new Vector3(-.75*k,-.95*k,-.7*k);
      this.max=new Vector3(.75*k,.95*k,.7*k);return this;
    }
    isEmpty(){return false;}
    getCenter(){return new Vector3(0,0,0);}
    getSize(){return new Vector3(this.max.x-this.min.x,this.max.y-this.min.y,this.max.z-this.min.z);}
  }
  class Group{
    constructor(){this.name='';this.position={set(...v){this.values=v;}};
      this.scale={factor:1,multiplyScalar(v){this.factor*=v;}};this.rotation={};this.children=[];}
    add(obj){this.children.push(obj);}
    updateMatrixWorld(){}
  }
  const model={position:{x:0,y:0,z:0},updateMatrixWorld(){}};
  const result=fitExecutiveAssembly({Box3,Vector3,Group},model);
  assert.equal(result.name,'rhxr-executive-chair-assembly');
  assert.deepEqual(result.position.values,[0,0.09,-4.02]);
  assert.equal(result.rotation.y,c.yawRadians);
  assert.equal(result.children[0],model);
  assert.ok(result.scale.factor>0&&result.scale.factor<=1.3);
  assert.equal(model.position.y,.95);
});

test('Badr Han load failure keeps original chair and actor fallback possible',async()=>{
  class FailedLoader{async loadAsync(){throw Error('simulated Quest GLB decoder failure');}}
  let failed=false;
  const v=await loadExecutiveAssembly({},null,{Loader:FailedLoader,onFailed:()=>failed=true});
  assert.equal(v.ok,false);
  assert.equal(v.object,null);
  assert.equal(failed,true);
  const room=file('../assets/js/room.mjs');
  assert.ok(room.includes('restoreLegacyOccupiedChair'));
  assert.ok(room.includes("spec.id!=='manager'"));
  assert.ok(room.includes("spec.id==='manager'"));
  assert.ok(room.includes('if(!result.ok)await restoreLegacyOccupiedChair()'));
  assert.ok(room.includes('fallback.manager.forEach(mesh=>{mesh.visible=false;})'));
  assert.ok(room.includes('basicAvatar.forEach(mesh=>{mesh.visible=false;})'));
});

test('Previous desk/visitor remain untouched and original V14/ S02 paths use their original models',()=>{
  const furn=file('../assets/js/office-furniture.mjs');
  const room=file('../assets/js/room.mjs');
  assert.match(furn,/id:'desk'.*size:\[3\.30,1\.07,1\.62\]/);
  assert.match(furn,/id:'visitor'.*position:\[0,0,-0\.86\]/);
  assert.ok(room.includes("const advanced=window.location.pathname.includes('/rhxr-v14-1/')"));
  assert.ok(room.includes("plan:v141Layout||undefined"));
  const html=file('../experiences/rhxr-v14-1/index.html');
  assert.ok(html.includes('Ensemble personnage et fauteuil Badr Han'));
  assert.ok(html.includes('room.mjs?v=20261024-badr-final-1'));
});

test('The rotated original 3D bounds preserve near-life-size appearance beside the desk',()=>{
  const b=readFileSync(new URL('../assets/models/badr-han-ch_c.glb',import.meta.url));
  const meta=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)).toString('utf8').trim());
  const pos=meta.accessors.find(a=>a.type==='VEC3'&&a.min&&a.max);
  assert.ok(pos,'GLB accessors need position bounds for size checks');
  const [w,h,d]=pos.min.map((v,i)=>pos.max[i]-v);
  const angle=EXECUTIVE_PLACEMENT.yawRadians;
  const rotatedWidth=Math.abs(w*Math.cos(angle))+Math.abs(d*Math.sin(angle));
  const rotatedDepth=Math.abs(w*Math.sin(angle))+Math.abs(d*Math.cos(angle));
  const scale=Math.min(EXECUTIVE_PLACEMENT.maxEnvelope[0]/rotatedWidth,
    EXECUTIVE_PLACEMENT.maxEnvelope[1]/h,
    EXECUTIVE_PLACEMENT.maxEnvelope[2]/rotatedDepth);
  const height=h*scale,depth=rotatedDepth*scale;
  const desk=furniturePlanV141.find(x=>x.id==='desk');
  const deskRearEdge=desk.position[2]-desk.size[2]/2;
  const frontEdge=EXECUTIVE_PLACEMENT.position[2]+depth/2;
  const clearance=deskRearEdge-frontEdge;
  assert.ok(height>1.70&&height<2.05,'Full chair-and-figure model should be near human scale');
  assert.ok(clearance>.05&&clearance<.1,'Assembled chair should fit close to desk without overlapping');
  assert.ok(Math.abs(clearance-.065)<.000001,'Desk shift protects 6.5cm horizontal clearance');
  assert.equal(EXECUTIVE_PLACEMENT.position[1],.09,'Entire assembly rises 9cm to reveal footwear');
  console.log('[RH-XR executive fit estimate]',JSON.stringify({scale,height,depth,clearance}));
});
