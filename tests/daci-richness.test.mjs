import test from 'node:test';
import assert from 'node:assert/strict';
import {DOCUMENTS,semanticRecord} from '../assets/js/daci-data.mjs';

test('all DACI guides are substantive, not just annotation placeholders',()=>{
 assert.equal(DOCUMENTS.length,6);
 for(const doc of DOCUMENTS){
  assert.equal(doc.sections.length,3);
  assert.ok(doc.version==='0.2');
  assert.ok(doc.provenance.reviewStatus.includes('prévoir'));
  for(const sec of doc.sections){
   assert.ok(sec.text.length>=400,doc.id+' '+sec.anchor);
   assert.ok(sec.example.length>60);
   assert.ok(sec.question.length>20);
   assert.ok(sec.augmentation.length>20);
   assert.ok(sec.connexion.length>20);
  }
 }
});
test('future media slots are clearly unavailable with no invented URLs',()=>{
 for(const d of DOCUMENTS){
  assert.equal(d.mediaSlots.length,2);
  for(const slot of d.mediaSlots){
   assert.equal(slot.status,'planned');
   assert.ok(slot.description.includes('non')||slot.description.includes('envisagé'));
   assert.equal(Object.hasOwn(slot,'url'),false);
  }
 }
});
test('semantic records use stable identifiers without fabricated site addresses',()=>{
 for(const doc of DOCUMENTS){
  const record=semanticRecord(doc);
  assert.equal(record['@id'],'urn:rhxr:learning:'+doc.id);
  assert.equal(record.identifier,doc.id);
  assert.equal(record.name,doc.title);
 }
});
