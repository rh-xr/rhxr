import test from 'node:test';
import assert from 'node:assert/strict';
import {SECTION_ACTIVITIES,getSectionActivity,activityHref,returnHref,sectionReturnToken,validateSectionActivities,activityTypeLabel} from '../assets/js/daci-section-activities.mjs';
import {DOCUMENTS} from '../assets/js/daci-data.mjs';
import {CASES} from '../assets/js/case-data.mjs';
import {BRANCHING_SCENARIOS} from '../assets/js/branching-scenarios.mjs';
import {KNOWLEDGE_GRAPH,validateGraph,graphAsJsonLd} from '../assets/js/knowledge-graph.mjs';
import {readFileSync} from 'node:fs';

test('each of 18 canonical DACI sections has exactly one actionable pedagogical link',()=>{
 assert.equal(SECTION_ACTIVITIES.length,18);
 assert.deepEqual(validateSectionActivities(),[]);
 const actual=DOCUMENTS.reduce((n,d)=>n+d.sections.length,0);
 assert.equal(actual,18);
 for(const doc of DOCUMENTS)for(const section of doc.sections){
   const item=getSectionActivity(doc.id,section.anchor);
   assert.ok(item,doc.id+':'+section.anchor);
   assert.match(activityHref(item),/^(cas-pratiques|dialogues|atelier)\.html\?/);
   assert.ok(item.task.length>=40);
   assert.ok(item.why.length>40);
 }
});
test('each outgoing link leads to a relevant real exercise and an anchored return',()=>{
 for(const item of SECTION_ACTIVITIES){
  const href=activityHref(item);
  const [relative,hash='']=href.split('#');
  const u=new URL(relative,'https://rhxr.invalid/');
  const token=u.searchParams.get('returnTo');
  assert.equal(token,item.documentId+':'+item.anchor);
  const back=returnHref(token);
  assert.ok(back);
  assert.equal(back,'daci.html?doc='+item.documentId+'#'+item.documentId+'-'+item.anchor);
  if(item.kind==='case'){
   assert.ok(CASES.some(c=>c.id===item.id));
   assert.equal(u.pathname,'/cas-pratiques.html');
  }
  if(item.kind==='dialogue'){
   assert.ok(BRANCHING_SCENARIOS.some(s=>s.id===item.id));
   assert.equal(u.pathname,'/dialogues.html');
  }
  if(item.kind==='quiz')assert.equal(hash,'quiz');
  if(item.kind==='template')assert.equal(hash,'template');
 }
});
test('safe return parsing rejects external redirects and fabricated anchors',()=>{
 for(const token of ['https://evil.example/','//evil.example','D02:nonexistant','D99:avant','D02:../../evil','D02:dialogue?foo=bar','','D02%3Adialogue']){
   assert.equal(returnHref(token),null,token);
 }
 assert.equal(sectionReturnToken('D99','avant'),null);
 assert.equal(activityHref({...SECTION_ACTIVITIES[0],kind:'invalid'}),null);
 assert.equal(getSectionActivity('D99','avant'),null);
 assert.equal(activityTypeLabel('quiz'),'Autoévaluation');
});
test('semantic graph preserves the editorial document-section provenance of every activity',()=>{
 assert.deepEqual(validateGraph(),[]);
 const edges=KNOWLEDGE_GRAPH.edges.filter(e=>e.relation==='hasSectionActivity');
 assert.equal(edges.length,18);
 for(const a of SECTION_ACTIVITIES){
  assert.ok(edges.some(e=>e.from===a.documentId&&e.section===a.anchor));
 }
 const ld=graphAsJsonLd();
 assert.equal(ld['@graph'].length,KNOWLEDGE_GRAPH.nodes.length);
 assert.equal(ld['@graph'].reduce((n,x)=>n+(x.relatedTo?.length||0),0),KNOWLEDGE_GRAPH.edges.length);
});
test('reader and activity pages have wired forward and return affordances',()=>{
 const reader=readFileSync('assets/js/learning-app.mjs','utf8');
 const dialogue=readFileSync('assets/js/dialogues-app.mjs','utf8');
 const atelier=readFileSync('assets/js/content-lab.mjs','utf8');
 assert.match(reader,/sectionPractice\(d,s\)/);
 assert.match(reader,/returnHref\(params\.get\('returnTo'\)\)/);
 assert.match(dialogue,/returnHref\(new URLSearchParams\(location\.search\)/);
 assert.match(atelier,/returnHref\(qs\.get\('returnTo'\)\)/);
});
