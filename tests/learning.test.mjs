import test from 'node:test';
import assert from 'node:assert/strict';
import {MODULES,MODULE_IDS,getModule,validateCatalog} from '../assets/js/learning-data.mjs';
import {CASES,getCase,validateCases} from '../assets/js/case-data.mjs';
import {DOCUMENTS,getDocument,linkedDocuments,semanticRecord,validateDocuments} from '../assets/js/daci-data.mjs';

test('eight complete learning modules, each with three taught sequences',()=>{
 assert.equal(MODULES.length,8);
 assert.equal(validateCatalog().length,0);
 assert.equal(MODULES.reduce((sum,m)=>sum+m.lessons.length,0),24);
 assert.equal(new Set(MODULE_IDS).size,8);
});
test('all pedagogical sequences have concrete learning evidence',()=>{
 for(const m of MODULES){assert.equal(m.objectives.length,3);for(const l of m.lessons){assert.ok(l.activity.length>20);assert.ok(l.evidence.length>=10);}}
});
test('12 professional cases are linked to valid modules and provide formative feedback',()=>{
 assert.equal(CASES.length,12);
 assert.deepEqual(validateCases(CASES,MODULE_IDS),[]);
 for(const c of CASES){assert.equal(c.options.length,3);assert.equal(c.options.filter(o=>o.preferred).length,1);assert.ok(getModule(c.moduleId));}
});
test('six connected DACI documents have three unique annotated sections each',()=>{
 assert.equal(DOCUMENTS.length,6);
 assert.deepEqual(validateDocuments(DOCUMENTS,MODULE_IDS,CASES.map(c=>c.id)),[]);
 assert.equal(DOCUMENTS.reduce((total,d)=>total+d.sections.length,0),18);
 for(const d of DOCUMENTS){assert.ok(getCase(d.caseId));assert.ok(linkedDocuments(d.moduleId).some(x=>x.id===d.id));}
});
test('unknown content IDs do not expose unrelated records',()=>{
 assert.equal(getModule('missing'),null);
 assert.equal(getCase('missing'),null);
 assert.equal(getDocument('missing'),null);
});
test('DACI exports a compact schema.org LearningResource JSON-LD record',()=>{
 const item=semanticRecord(DOCUMENTS[0]);
 assert.equal(item['@context'],'https://schema.org');
 assert.equal(item['@type'],'LearningResource');
 assert.equal(item.identifier,DOCUMENTS[0].id);
 assert.equal(item.inLanguage,'fr');
 assert.ok(item.name.length>5);
});
test('Daci passages include augmentation and connection affordances',()=>{
 for(const d of DOCUMENTS)for(const section of d.sections){
   assert.ok(section.augmentation.length>=15);
   assert.ok(section.connexion.length>=15);
 }
});
