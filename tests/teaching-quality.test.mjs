import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {DOSSIERS,QUESTIONS,TEMPLATES,GLOSSARY,REFERENCES,teachingPack,quizFor,templateFor,checkAnswer,auditPedagogy} from '../assets/js/pedagogy-plus.mjs';
import {MODULES} from '../assets/js/learning-data.mjs';
import {DOCUMENTS} from '../assets/js/daci-data.mjs';
import {CASES} from '../assets/js/case-data.mjs';
import {KNOWLEDGE_GRAPH,validateGraph,neighbors,learningPath,graphAsJsonLd} from '../assets/js/knowledge-graph.mjs';

test('every one of eight domains has a complete substantial teaching dossier',()=>{
 assert.equal(DOSSIERS.length,8);
 assert.deepEqual(auditPedagogy(),[]);
 for(const module of MODULES){
  const d=teachingPack(module.id);
  assert.ok(d,'Missing dossier '+module.id);
  assert.equal(d.chapters.length,3);
  assert.ok(d.introduction.length>70);
  assert.ok(d.workshop.instruction.length>70);
  for(const chapter of d.chapters){
   assert.ok(chapter.text.length>220,chapter.id+' is too short');
   assert.ok(chapter.example.length>60,chapter.id+' missing example');
  }
 }
});
test('24 quiz questions have safe explanations and exactly one valid answer each',()=>{
 assert.equal(QUESTIONS.length,24);
 assert.equal(new Set(QUESTIONS.map(q=>q.id)).size,QUESTIONS.length);
 for(const module of MODULES){
  assert.equal(quizFor(module.id).length,3);
  for(const q of quizFor(module.id)){
   assert.equal(q.answers.length,3);
   assert.ok(q.correct>=0&&q.correct<=2);
   assert.ok(checkAnswer(q.id,q.correct).correct);
   for(let i=0;i<3;i++)if(i!==q.correct)assert.equal(checkAnswer(q.id,i).correct,false);
   assert.ok(q.explanation.length>25);
  }
 }
 assert.equal(checkAnswer('unknown',0),null);
 assert.equal(checkAnswer(QUESTIONS[0].id,-1),null);
});
test('each domain has its own offline-ready facilitator template',()=>{
 assert.equal(TEMPLATES.length,8);
 for(const module of MODULES){
  const template=templateFor(module.id);
  assert.ok(template);
  assert.ok(template.sections.length>=5);
  assert.ok(template.sections.every(s=>s.includes('[à compléter]')));
 }
});
test('a 24-term glossary covers each module without collisions',()=>{
 assert.equal(GLOSSARY.length,24);
 assert.equal(new Set(GLOSSARY.map(g=>g.term)).size,24);
 for(const m of MODULES)assert.equal(GLOSSARY.filter(g=>g.moduleId===m.id).length,3);
});
test('references are official HTTPS URLs, not placeholder citations',()=>{
 assert.ok(REFERENCES.length>=3);
 for(const s of REFERENCES){
  const url=new URL(s.url);
  assert.equal(url.protocol,'https:');
  assert.ok(['www.ilo.org','www.unesco.org','www.w3.org'].includes(url.host));
 }
});
test('semantic graph has unique IDs and no dangling references',()=>{
 assert.deepEqual(validateGraph(),[]);
 assert.equal(KNOWLEDGE_GRAPH.nodes.length,71);
 assert.equal(KNOWLEDGE_GRAPH.edges.length,74);
 assert.equal(new Set(KNOWLEDGE_GRAPH.nodes.map(n=>n.id)).size,71);
});
test('all documents have a traversable path to their module and case',()=>{
 for(const d of DOCUMENTS){
  const ids=new Set(neighbors(d.id).map(n=>n.id));
  assert.ok(ids.has(d.moduleId),'No module neighbor '+d.id);
  assert.ok(ids.has(d.caseId),'No case neighbor '+d.id);
 }
});
test('knowledge paths include modules, lessons, cases, courses and templates',()=>{
 for(const m of MODULES){
  const p=learningPath(m.id);
  assert.ok(p.some(n=>n.type==='module'));
  assert.equal(p.filter(n=>n.type==='lesson').length,3);
  assert.ok(p.some(n=>n.type==='case'));
  assert.ok(p.some(n=>n.type==='dossier'));
  assert.ok(p.some(n=>n.type==='template'));
 }
});
test('graph export uses semantic types and URN identifiers',()=>{
 const doc=graphAsJsonLd();
 assert.equal(doc['@context']['@vocab'],'https://schema.org/');
 assert.equal(doc['@graph'].length,KNOWLEDGE_GRAPH.nodes.length+KNOWLEDGE_GRAPH.edges.length);
 assert.ok(doc['@graph'].some(n=>n['@type']==='LearningResource'));
 assert.ok(doc['@graph'].every(n=>n['@id'].startsWith('urn:rhxr:')));
});
test('new navigable pages and scripts exist under the static root',async()=>{
 for(const file of ['parcours.html','cas-pratiques.html','daci.html','atelier.html','reseau.html','dialogues.html','simulation.html','studio.html']){
  assert.ok(existsSync(file),'Missing '+file);
  const html=await readFile(file,'utf8');
  assert.match(html,/<html lang="fr">/);
  assert.match(html,/<main|<div id="app">/);
  assert.match(html,/name="viewport"/);
 }
 for(const file of ['assets/js/learning-app.mjs','assets/js/content-lab.mjs','assets/js/knowledge-graph.mjs','assets/js/dialogues-app.mjs','assets/css/learning.css'])assert.ok(existsSync(file),'Missing '+file);
});
test('content additions do not modify the validated Quest engine',async()=>{
 const room=await readFile('assets/js/room.mjs','utf8');
 assert.match(room,/readSticks/);
 assert.match(room,/snapTurn/);
 assert.match(room,/playerRig/);
});
test('training resources remain fictitious and support pedagogical choices',()=>{
 assert.ok(CASES.every(c=>c.notes.includes('fictive')));
 assert.ok(DOCUMENTS.every(d=>d.status.includes('fictif')));
});
