/** V14 opt-in frame pacing diagnostics, with no storage or network telemetry. */
export const METRICS_WINDOW=120;
export const round=(v,places=1)=>Number.isFinite(v)?Number(v.toFixed(places)):null;
export function createMetricsSampler({windowSize=METRICS_WINDOW}={}){
  const frames=[];let last=null,mode=null,assets={desk:"pending",manager:"pending",visitor:"pending"};
  let samples=0,latest={};
  function reset(nextMode=null){frames.length=0;last=null;mode=nextMode;samples=0;latest={};}
  function markAsset(id,ok){if(Object.prototype.hasOwnProperty.call(assets,id))assets[id]=ok?"ready":"fallback";}
  function snapshot(){
    const ordered=[...frames].sort((a,b)=>a-b),sum=frames.reduce((a,b)=>a+b,0);
    const avg=frames.length?sum/frames.length:null;
    const p95=ordered.length?ordered[Math.min(ordered.length-1,Math.ceil(ordered.length*.95)-1)]:null;
    return {
      mode:mode||"waiting",frames:samples,windowFrames:frames.length,
      fpsEstimate:avg?round(1000/avg):null,frameIntervalMs:round(avg,2),
      frameIntervalP95Ms:round(p95,2),
      // Interval between submitted animation callbacks, NOT a GPU or CPU frame-time measurement.
      gpuTimeMs:null,cpuTimeMs:null,
      drawCalls:latest.calls??null,triangles:latest.triangles??null,
      geometries:latest.geometries??null,textures:latest.textures??null,
      assets:{...assets}
    };
  }
  function tick(time,render={},memory={},nextMode="desktop"){
    if(mode!==nextMode)reset(nextMode);
    if(Number.isFinite(time)&&last!==null){
      const delta=time-last;
      // Ignore suspended tabs and large pauses, but keep real missed frames.
      if(delta>0&&delta<300){frames.push(delta);if(frames.length>windowSize)frames.shift();samples++;}
    }
    if(Number.isFinite(time))last=time;
    latest={calls:Number.isFinite(render?.calls)?render.calls:null,
      triangles:Number.isFinite(render?.triangles)?render.triangles:null,
      geometries:Number.isFinite(memory?.geometries)?memory.geometries:null,
      textures:Number.isFinite(memory?.textures)?memory.textures:null};
    return snapshot();
  }
  return {tick,snapshot,reset,markAsset};
}

export function createMetricsDisplay(THREE,scene,sampler){
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=512;
  const ctx=canvas.getContext('2d');
  if(!ctx)return {update(){},dispose(){}};
  const tex=new THREE.CanvasTexture(canvas);
  tex.colorSpace=THREE.SRGBColorSpace;
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(2.24,1.12),
    new THREE.MeshBasicMaterial({map:tex,depthWrite:false,side:THREE.DoubleSide}));
  mesh.name="rhxr-v14-performance-panel";
  mesh.position.set(-3.30,2.05,-6.10);scene.add(mesh);
  let last=-Infinity;
  function update(now){
    if(now-last<1000)return;
    last=now;const s=sampler.snapshot();
    ctx.fillStyle="#0d2630";ctx.fillRect(0,0,1024,512);
    ctx.fillStyle="#e6c993";ctx.fillRect(0,0,1024,12);
    ctx.fillStyle="#ffffff";ctx.font="bold 46px system-ui";ctx.fillText("RH·XR  |  V14 DIAGNOSTIC",35,68);
    ctx.fillStyle="#bfe2e7";ctx.font="33px system-ui";
    const rows=[
      "MODE  "+s.mode+"   FPS estimées: "+(s.fpsEstimate??"…"),
      "INTERVALLE  "+(s.frameIntervalMs??"…")+" ms   P95: "+(s.frameIntervalP95Ms??"…")+" ms",
      "DRAW CALLS  "+(s.drawCalls??"…")+"     TRIANGLES  "+(s.triangles??"…"),
      "GLB  "+Object.entries(s.assets).map(([id,v])=>id+":"+v).join("  "),
      "Échantillon RAF — pas une mesure GPU / CPU."
    ];
    rows.forEach((row,i)=>ctx.fillText(row,35,141+i*70,935));
    tex.needsUpdate=true;
  }
  update(0);
  return {update,dispose(){scene.remove(mesh);mesh.geometry.dispose();mesh.material.dispose();tex.dispose();}};
}
