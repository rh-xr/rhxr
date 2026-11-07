/** Browser QA of RH·XR's static branch; no real employee data or API keys. */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir,readFile,stat} from 'node:fs/promises';
import {chromium} from 'playwright';
const base='http://127.0.0.1:4173/';
const shots='qa-screenshots';
const problems=[];
const findings=[];
await mkdir(shots,{recursive:true});
const server=spawn(process.execPath,['scripts/serve.mjs'],{stdio:['ignore','pipe','pipe'],env:{...process.env,PORT:'4173'}});
server.stderr.on('data',v=>process.stderr.write(v));
function record(test,ok,extra=''){
 findings.push({test,ok,extra});
 if(!ok)problems.push(test+(extra?' · '+extra:''));
 console.log((ok?'PASS ':'FAIL ')+test+(extra?' — '+extra:''));
}
async function check(name,fn){
 try{await fn();record(name,true);}
 catch(err){record(name,false,String(err?.message||err).slice(0,1000));}
}
async function ready(){
 for(let i=0;i<65;i++){try{const r=await fetch(base);if(r.status===200)return;}catch{}
 await new Promise(r=>setTimeout(r,300));}
 throw Error('Local server did not start');
}
async function open(page,path,selector='#contenu'){
 const response=await page.goto(new URL(path,base).href,{waitUntil:'domcontentloaded',timeout:30000});
 assert.equal(response?.status(),200,'HTTP '+response?.status()+' for '+path);
 await page.locator(selector).waitFor({state:'attached',timeout:13000});
 return response;
}
async function noOverflow(page,route,px){
 const x=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:window.innerWidth}));
 assert.ok(x.scroll<=x.width+2,route+' document overflows '+x.scroll+' > '+x.width+' at '+px+'px');
}
async function noDeadInternalLinks(page,path){
 const paths=await page.evaluate(()=>{
  const origin=location.origin;
  return [...document.querySelectorAll('a[href]')].map(a=>new URL(a.getAttribute('href'),location.href))
   .filter(url=>url.origin===origin).map(url=>url.pathname).filter((v,i,all)=>all.indexOf(v)===i);
 });
 for(const pathName of paths){
  const r=await fetch(new URL(pathName,base),{method:'GET'});
  assert.equal(r.status,200,'Dead internal link on '+path+': '+pathName+' ('+r.status+')');
 }
}
let browser;
try{
 await ready();
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader']});
 const desktop=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
 const mobile=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 const desk=await desktop.newPage(),phone=await mobile.newPage();
 const errors=[];
 for(const [page,tag] of [[desk,'desktop'],[phone,'mobile']]){
  page.on('pageerror',e=>errors.push(tag+': '+e.message));
 }
 const routes=['index.html','ressources.html','bibliotheque.html','parcours-rh.html','parcours-rh.html?id=recrutement-responsable','fiche.html?id=donnees-rh','ia.html?prompt=p19&theme=recrutement','formation.html','politique.html'];
 for(const [ctx,page,width,label] of [[desktop,desk,1440,'desktop'],[mobile,phone,390,'mobile']]){
  for(const [i,route] of routes.entries()){
   await check(label+' '+route,async()=>{
    await open(page,route,'#contenu');
    assert.equal(await page.locator('h1').count(),1,'exactly one H1');
    assert.ok((await page.locator('h1').first().innerText()).trim().length>6);
    if(label==='mobile')await noOverflow(page,route,width);
    if(['index.html','parcours-rh.html','formation.html','ia.html?prompt=p19&theme=recrutement'].includes(route)){
     await page.screenshot({path:shots+'/'+label+'-'+(i+1)+'.png',fullPage:true,animations:'disabled',timeout:30000});
    }
    if(label==='desktop')await noDeadInternalLinks(page,route);
   });
  }
 }
 await check('recruitment guided route has four stages',async()=>{
  await open(desk,'parcours-rh.html?id=recrutement-responsable');
  assert.equal(await desk.locator('.journey-step').count(),4);
  assert.ok((await desk.locator('a[href*="mission=recrutement"]').count())>0);
  assert.ok((await desk.locator('a[href*="prompt=p19"]').count())>0);
 });
 await check('AI Studio deep-linked prompt and references',async()=>{
  await open(desk,'ia.html?prompt=p19&theme=recrutement');
  assert.match(await desk.locator('#promptTitle').innerText(),/Entretien RH structuré/);
  assert.ok((await desk.locator('#promptContext a').count())>=2,'missing contextual references');
 });
 await check('AI Studio generates a local training document',async()=>{
  await open(desk,'ia.html');
  await desk.locator('#planKind').selectOption('formation');
  await desk.locator('#planRole').fill('Responsable de formation');
  await desk.locator('#planObjective').fill('Construire une progression de compétences fictive');
  await desk.locator('#planSkills').fill('Écoute; Organisation');
  await desk.locator('#planForm button[type="submit"]').click();
  assert.match(await desk.locator('#planOutput').innerText(),/PLAN DE DÉVELOPPEMENT DES COMPÉTENCES/);
  assert.equal(await desk.locator('#planDownload').isEnabled(),true);
 });
 await check('recruitment / documentation filters are functional',async()=>{
  await open(desk,'ressources.html');
  await desk.locator('#filterTopic').selectOption('recrutement');
  assert.ok((await desk.locator('#cards article').count())>=2);
  await open(desk,'bibliotheque.html');
  await desk.locator('#filterArea').selectOption('Maroc');
  assert.ok((await desk.locator('#cards article').count())>=2);
  assert.ok((await desk.locator('#cards').innerText()).includes('Maroc'));
 });
 await check('keyboard skip link exists and is focusable',async()=>{
  await open(desk,'index.html');
  await desk.keyboard.press('Tab');
  assert.equal(await desk.locator(':focus').getAttribute('href'),'#contenu');
 });
 await check('V14.1 3D model and seven missions: structural readiness',async()=>{
  const b=await readFile('assets/models/badr-han-ch_c.glb');
  assert.equal(b.toString('ascii',0,4),'glTF');
  assert.equal(b.readUInt32LE(4),2);
  assert.ok(b.length>1000000);
  const scene=await readFile('experiences/rhxr-v14-1/index.html','utf8');
  assert.ok(scene.includes('Badr Han'));
  assert.ok(scene.includes('createLearningSession'));
  await open(desk,'experiences/rhxr-v14-1/index.html','#stage');
  assert.ok(await desk.locator('#mission').count()>0);
  await desk.screenshot({path:shots+'/immersive-structure-desktop.png',fullPage:true,animations:'disabled',timeout:30000});
 });
 await check('no page-level JavaScript exceptions on desktop/mobile',async()=>{
  assert.deepEqual(errors,[]);
 });
 await desktop.close();await mobile.close();
}finally{
 if(browser)await browser.close();
 server.kill('SIGTERM');
}
console.log('QA summary: '+findings.filter(x=>x.ok).length+' passed / '+findings.length+' checks');
if(problems.length){console.error('QA failures:\n'+problems.join('\n'));process.exitCode=1;}
