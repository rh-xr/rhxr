import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {makeDraft} from '../assets/js/daci-editor-core.mjs';
import {createHandoff,parseHandoff,verifyHandoff,handoffReport,DACI_HANDOFF_SCHEMA} from '../assets/js/daci-handoff-core.mjs';
function prepared(){
 const d=makeDraft('D02');
 d.jurisdiction='Formation RH fictive : conformité et procédures internes à vérifier par un spécialiste.';
 d.provenance.sourceReferences=['https://www.ilo.org/skills/'];
 d.provenance.reviewNotes='Une relecture RH, juridique et documentaire reste nécessaire pour vérifier les contenus et les droits.';
 for(const s of d.sections){
  if(s.text.length<120)s.text+=' Ce contenu doit être expliqué et vérifié avec les apprenants dans une situation fictive.';
  if(s.example.length<50)s.example+=' Exemple pédagogique fictif à discuter avec le formateur.';
  if(s.question.length<25)s.question+=' Quels faits permettent de répondre ?';
  if(s.augmentation.length<25)s.augmentation+=' Une alternative accessible sans casque est requise.';
  if(s.connexion.length<25)s.connexion+=' Référence pédagogique interne à documenter.';
 }
 return d;
}
const purpose='Revoir les exemples, la provenance, les liens et les limites professionnelles de ce document fictif.';
test('handoff roundtrip stays unapproved and unpublished',async()=>{
 const p=await createHandoff(prepared(),{purpose});
 assert.equal(p.schemaVersion,DACI_HANDOFF_SCHEMA);
 assert.equal(p.approved,false);assert.equal(p.published,false);assert.equal(p.signature,null);
 assert.match(p.sha256,/^[0-9a-f]{64}$/);
 assert.ok(p.reviewRequest.humanReview.every(x=>x.status==='not-reviewed'));
 const check=await verifyHandoff(parseHandoff(JSON.stringify(p)));
 assert.equal(check.valid,true,check.errors?.join('; '));assert.equal(check.criteria,6);
 assert.match(handoffReport(check),/NON EFFECTUÉE/);
});
test('tampering is detected',async()=>{
 const p=await createHandoff(prepared(),{purpose});p.draft.sections[0].text+=' Changement suspect.';
 const check=await verifyHandoff(p);assert.equal(check.valid,false);assert.match(check.errors.join('; '),/SHA-256/);
});
test('forged approval and added executable fields are rejected',async()=>{
 for(const k of ['approved','published']){const p=await createHandoff(prepared(),{purpose});p[k]=true;assert.equal((await verifyHandoff(p)).valid,false);}
 const p=await createHandoff(prepared(),{purpose});p.approvedBy='visitor';assert.equal((await verifyHandoff(p)).valid,false);
 const x=await createHandoff(prepared(),{purpose});x.reviewRequest.humanReview[0].status='approved';assert.equal((await verifyHandoff(x)).valid,false);
});
test('incomplete provenance or invalid purpose fails preparation',async()=>{
 const d=prepared();d.provenance.sourceReferences=[];
 await assert.rejects(createHandoff(d,{purpose}),/Revue impossible/);
 await assert.rejects(createHandoff(prepared(),{purpose:'court'}),/périmètre/);
 assert.throws(()=>parseHandoff('not json'),/JSON invalide/);
 assert.throws(()=>parseHandoff(' '.repeat(450001)),/volumineux/);
});
test('review request tampering invalidates handoff',async()=>{
 const p=await createHandoff(prepared(),{purpose});p.reviewRequest.reviewPurpose+=' altération';
 assert.equal((await verifyHandoff(p)).valid,false);
});
test('handoff UI has no network publication calls',()=>{
 assert.equal(existsSync('daci-transfert.html'),true);
 const ui=readFileSync('assets/js/daci-transfert.mjs','utf8');
 assert.match(ui,/verifyHandoff/);assert.doesNotMatch(ui,/\bfetch\s*\(/);
});
