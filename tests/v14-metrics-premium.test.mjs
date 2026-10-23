import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createMetricsSampler,METRICS_WINDOW} from '../assets/js/metrics-v14.mjs';
import {PREMIUM_V14_PALETTE,PREMIUM_V14_ZONES} from '../assets/js/premium-office-v14.mjs';

const read=p=>readFileSync(new URL(p,import.meta.url),'utf8');

test('V14 samples animation callback pacing without claiming measured GPU frame time',()=>{
  const metrics=createMetricsSampler();
  metrics.markAsset('desk',true);
  for(let i=0;i<100;i++)metrics.tick(i*1000/72,{calls:92,triangles:176000},{textures:5,geometries:16},'xr');
  const report=metrics.snapshot();
  assert.equal(report.mode,'xr');
  assert.equal(report.frames,99);
  assert.ok(report.fpsEstimate>=71.5&&report.fpsEstimate<=72.5);
  assert.equal(report.gpuTimeMs,null);
  assert.equal(report.cpuTimeMs,null);
  assert.equal(report.drawCalls,92);
  assert.equal(report.triangles,176000);
  assert.equal(report.assets.desk,'ready');
  assert.ok(report.windowFrames<=METRICS_WINDOW);
});

test('V14 samples do not confuse browser suspensions with slow Quest frames',()=>{
  const metrics=createMetricsSampler({windowSize:4});
  metrics.tick(0,{},{});metrics.tick(16,{},{});metrics.tick(32,{},{});metrics.tick(10000,{},{});
  assert.equal(metrics.snapshot().frames,2);
  metrics.tick(10013,{},{});metrics.tick(10026,{},{});metrics.tick(10039,{},{});metrics.tick(10052,{},{});
  assert.ok(metrics.snapshot().windowFrames<=4);
  metrics.tick(10100,{}, {},'xr');
  assert.equal(metrics.snapshot().frames,0);
  assert.equal(metrics.snapshot().mode,'xr');
});

test('V14 premium scene is opt-in and does not change legacy locomotion controls',()=>{
  const room=read('../assets/js/room.mjs');
  assert.ok(room.includes("params.get('office')==='v14'"));
  assert.ok(room.includes("params.get('metrics')==='1'"));
  assert.ok(room.includes("createPremiumOffice(THREE,scene)"));
  assert.ok(room.includes("createMetricsDisplay(THREE,scene,perf)"));
  assert.ok(room.includes("snapAroundHead(turn.angle, xrCamera)"));
  assert.ok(room.includes("readSticks(session?.inputSources)"));
  assert.ok(room.includes("loadOfficeFurniture(THREE,scene"));
  assert.ok(room.includes("local-frame-diagnostics-v1"));
  assert.ok(!read('../assets/js/locomotion.mjs').includes('metrics-v14'));
});

test('V14 stays source-aligned with premium design and pedagogical separation',()=>{
  assert.equal(PREMIUM_V14_ZONES.length,4);
  assert.ok(PREMIUM_V14_ZONES.includes('documents DACI'));
  assert.ok(PREMIUM_V14_PALETTE.teal.startsWith('#'));
  const premium=read('../assets/js/premium-office-v14.mjs');
  assert.ok(premium.includes('const unitBox=new THREE.BoxGeometry(1,1,1)'));
  assert.ok(premium.includes('MeshStandardMaterial'));
  assert.ok(!premium.includes('castShadow=true'));
  assert.ok(!premium.includes('new THREE.PointLight'));
  assert.ok(premium.includes("scene.add(root)"));
});


test('V14 pilot page and root navigation expose separate normal and diagnostic modes',()=>{
  const html=read('../experiences/rhxr-v14/index.html');
  const portal=read('../assets/js/app.mjs');
  assert.ok(html.includes('simulation.html?office=v14"'));
  assert.ok(html.includes('simulation.html?office=v14&amp;metrics=1'));
  assert.ok(html.includes('simulation.html?office=glb'));
  assert.ok(html.includes('daci-v13/index.html'));
  assert.ok(portal.includes('experiences/rhxr-v14/index.html'));
  assert.ok(portal.includes("['glb','v14'].includes"));
});

test('optional diagnostics do not allocate reports in the every-frame path',()=>{
  const sampler=read('../assets/js/metrics-v14.mjs');
  const render=read('../assets/js/room.mjs');
  assert.ok(sampler.includes('if(now-last<1000)return;'));
  assert.ok(sampler.includes('GPU / CPU') || sampler.includes('GPU or CPU'));
  assert.ok(render.includes('if(debugInfo&&time-lastDebugTextAt>=1000)'));
  assert.ok(render.includes("renderer.xr.isPresenting?'xr':'desktop'"));
});
