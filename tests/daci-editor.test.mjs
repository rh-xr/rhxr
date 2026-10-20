import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {DOCUMENTS} from '../assets/js/daci-data.mjs';
import {MODULES} from '../assets/js/learning-data.mjs';
import {CASES} from '../assets/js/case-data.mjs';
import {DACI_DRAFT_SCHEMA,MAX_DRAFT_BYTES,MEDIA_TYPES,makeDraft,nextAnchor,addSection,addMediaSlot,recordRevision,validateDraft,parseDraft,exportDraft,draftMarkdown,draftJsonLd} from '../assets/js/daci-editor-core.mjs';

test('all six canonical documents open as traceable offline drafts',()=>{
 for(const doc of DOCUMENTS){
  const d=makeDraft(doc.id);
  assert.equal(d.schemaVersion,DACI_DRAFT_SCHEMA);
  assert.equal(d.documentId,doc.id);
  assert.equal(d.provenance.sourceVersion,doc.version);
  assert.equal(d.baseVersion,doc.version);
  assert.equal(d.revision,1);
  assert.equal(d.sections.length,3);
  assert.deepEqual(validateDraft(d),[]);
  assert.ok(MODULES.some(m=>m.id===d.moduleId));
  assert.ok(CASES.some(c=>c.id===d.caseId&&c.moduleId===d.moduleId));
  assert.ok(d.mediaSlots.every(slot=>slot.status==='planned'));
 }
 assert.throws(()=>makeDraft('nonexistent'),/inconnu/);
});
test('safe JSON export roundtrip removes unknown prototype-shaped metadata',()=>{
 const original=makeDraft('D02');
 const imported=parseDraft(exportDraft(original));
 assert.deepEqual(imported,original);
 const malicious=JSON.parse(exportDraft(original));
 malicious.executable='<img src=x onerror=alert(1)>';
 malicious.sections[0].javascript='evil';
 const normal=parseDraft(JSON.stringify(malicious));
 assert.equal('executable' in normal,false);
 assert.equal('javascript' in normal.sections[0],false);
 assert.deepEqual(validateDraft(normal),[]);
});
test('import rejects files over 200 KB, unknown source and malformed data',()=>{
 const base=makeDraft('D01');
 assert.throws(()=>parseDraft('invalid'),/JSON invalide/);
 assert.throws(()=>parseDraft(' '.repeat(MAX_DRAFT_BYTES+1)),/volumineux/);
 base.documentId='D99';
 assert.ok(validateDraft(base).some(x=>x.includes('inconnue')));
 assert.throws(()=>parseDraft(JSON.stringify(base)),/inconnue/);
});
test('prevent activating unverified XR, AI and video assets via imported metadata',()=>{
 for(const k of ['url','src','assetUrl']){
  const d=makeDraft('D01');
  d.mediaSlots[0][k]='javascript:alert(1)';
  assert.ok(validateDraft(d).some(x=>x.includes('URL interdite')));
  assert.throws(()=>parseDraft(JSON.stringify(d)),/URL interdite/);
 }
 const d=makeDraft('D01');d.mediaSlots[0].status='active';
 assert.ok(validateDraft(d).some(x=>x.includes('invalide')));
});
test('section CRUD preserves unique stable anchors and limits',()=>{
 const d=makeDraft('D01');
 assert.equal(nextAnchor('Avant l’arrivée',d.sections),'avant-l-arrivee');
 assert.equal(nextAnchor('Avant l’arrivée',[{anchor:'avant-l-arrivee'}]),'avant-l-arrivee-2');
 const extended=addSection(d,'Préparer une réunion');
 assert.equal(extended.sections.length,4);
 assert.equal(d.sections.length,3);
 assert.ok(extended.sections[3].anchor);
 assert.ok(validateDraft(extended).some(x=>x.includes('contenu manquant')));
 assert.equal(MEDIA_TYPES.includes('RA'),true);
 let next=extended;
 for(let i=0;i<8;i++)next=addSection(next,'Nouvelle section');
 assert.equal(next.sections.length,12);
 assert.throws(()=>addSection(next),/douze/);
});
test('local revision history increments and rejects empty notes',()=>{
 const d=makeDraft('D03');
 const next=recordRevision(d,'Amélioration des consignes et du tableau');
 assert.equal(next.revision,2);
 assert.equal(next.history.length,2);
 assert.equal(d.revision,1);
 assert.deepEqual(validateDraft(next),[]);
 assert.throws(()=>recordRevision(d,'court'),/huit/);
 next.history.pop();
 assert.ok(validateDraft(next).some(s=>s.includes('incohérents')));
});
test('source provenance is pinned to the original editorial version',()=>{
 const d=makeDraft('D01');
 d.provenance.sourceVersion='9.9';
 assert.ok(validateDraft(d).some(e=>e.includes('Version source')));
 assert.throws(()=>parseDraft(JSON.stringify(d)),/Version source/);
 const other=makeDraft('D01');other.baseVersion='1.0';
 assert.ok(validateDraft(other).some(e=>e.includes('Version source')));
});
test('revision history must be consecutive, not just end at the requested number',()=>{
 const d=makeDraft('D01');
 d.revision=4;
 d.history.push({revision:4,note:'Saut de deux numéros'});
 assert.ok(validateDraft(d).some(e=>e.includes('Séquence de révisions')));
});

test('semantic and markdown exports remain clearly draft-only and source-linked',()=>{
 const d=makeDraft('D06'),md=draftMarkdown(d),ld=draftJsonLd(d);
 assert.ok(md.includes('brouillon de travail'));
 assert.ok(md.includes('non actifs'));
 assert.ok(md.includes('Provenance'));
 assert.equal(ld['@type'],'LearningResource');
 assert.ok(ld['@id'].startsWith('urn:rhxr:daci:D06:draft:'));
 assert.equal(ld.isBasedOn,'urn:rhxr:learning:D06');
 assert.ok(!JSON.stringify(ld).includes('https://rhxr.example'));
});
test('all supported authoring media are planned, including RA RV and DACI AI',()=>{
 const d=makeDraft('D04');
 for(const type of MEDIA_TYPES){
  const n=addMediaSlot(d,type);
  assert.equal(n.mediaSlots.at(-1).status,'planned');
  assert.equal(n.mediaSlots.at(-1).type,type);
 }
 assert.throws(()=>addMediaSlot(d,'iframe'),/non reconnu/);
});
test('editor page and module exist and preserve source files',()=>{
 assert.ok(existsSync('daci-studio.html'));
 assert.ok(existsSync('assets/js/daci-studio.mjs'));
 const page=readFileSync('daci-studio.html','utf8');
 assert.match(page,/<html lang="fr">/);
 assert.match(page,/name="viewport"/);
 const script=readFileSync('assets/js/daci-studio.mjs','utf8');
 assert.match(script,/beforeunload/);
 assert.match(script,/parseDraft/);
 assert.match(script,/replaceChildren/);
});
