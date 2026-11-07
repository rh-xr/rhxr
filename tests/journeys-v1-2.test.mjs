import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {journeys,missionLabels,getJourney,getJourneyGuides,getJourneySources,getJourneyPrompt,getPromptContext,missionHref} from '../assets/js/journeys.mjs';
import {MISSIONS} from '../assets/js/learning-v14-1.mjs';
const read=p=>readFileSync(new URL(p,import.meta.url),'utf8');
test('six pathways link real guides, references, prompts and V14.1 missions',()=>{
 assert.equal(journeys.length,6);
 const ids=new Set();
 for(const j of journeys){
  assert.ok(!ids.has(j.id));ids.add(j.id);
  assert.equal(getJourney(j.id),j);
  assert.ok(j.guideIds.length>=2);
  assert.ok(j.sourceIds.length>0);
  assert.equal(getJourneyGuides(j).length,j.guideIds.length);
  assert.equal(getJourneySources(j).length,j.sourceIds.length);
  assert.ok(getJourneyPrompt(j));
  assert.ok(MISSIONS.some(m=>m.id===j.missionId),j.missionId);
  assert.ok(missionLabels[j.missionId]);
  assert.ok(missionHref(j.missionId).includes('mission='+j.missionId));
 }
});
test('AI prompts provide contextual documentation without a generative API',()=>{
 for(const j of journeys){
  const c=getPromptContext(j.promptId);
  assert.equal(c.journey,j);
  assert.ok(c.guides.length>0&&c.sources.length>0);
  for(const s of c.sources)assert.match(s.url,/^https:\/\//);
 }
 assert.equal(getPromptContext('missing').guides.length,0);
 assert.ok(getPromptContext('p16').sources.length>0);
});
test('guided learning UI is wired to the portal and preserves immersive V14.1',()=>{
 const portal=read('../assets/js/portal.mjs');
 const page=read('../assets/js/journey-page.mjs');
 assert.ok(existsSync(new URL('../parcours-rh.html',import.meta.url)));
 assert.ok(portal.includes('showPromptContext(id)'));
 assert.ok(portal.includes('getJourneyByGuide(g.id)'));
 assert.ok(portal.includes('parcours-rh.html'));
 assert.ok(portal.includes("get('prompt')"));
 assert.ok(page.includes('getJourneySources(j)'));
 assert.ok(page.includes('missionHref(j.missionId)'));
 assert.ok(read('../experiences/rhxr-v14-1/index.html').includes('Badr Han'));
});
