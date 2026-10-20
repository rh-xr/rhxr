import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {DOCUMENTS} from '../assets/js/daci-data.mjs';
import {makeDraft} from '../assets/js/daci-editor-core.mjs';
import {DACI_REVIEW_SCHEMA,REVIEW_REQUIREMENTS,reviewPreflight,makeReviewRequest,reviewRequestMarkdown} from '../assets/js/daci-review-core.mjs';

function prepare(id='D02'){
 const d=makeDraft(id);
 d.jurisdiction='Contexte de formation fictif : vérifier les règles et procédures locales avant usage';
 d.provenance.sourceReferences=['https://www.ilo.org/skills/'];
 d.provenance.reviewNotes='Source indicative proposée. Un formateur RH doit contrôler la pertinence, le contexte et les droits avant de diffuser.';
 d.sections.forEach(s=>{
  if(s.text.trim().length<120)s.text+=' Expliquer les critères de la formation et permettre une relecture constructive.';
  if(s.example.trim().length<50)s.example+=' Exemple fictif à contextualiser et à faire relire.';
  if(s.question.trim().length<25)s.question+=' Quel fait permet de vérifier votre réponse ?';
  if(s.augmentation.trim().length<25)s.augmentation+=' Rendre ce guidage accessible sans casque.';
  if(s.connexion.trim().length<25)s.connexion+=' Utiliser les références du parcours relié.';
 });
 return d;
}
test('the six canonical documents have blocked default review status',()=>{
 for(const doc of DOCUMENTS){
  const result=reviewPreflight(makeDraft(doc.id));
  assert.equal(result.readyForReview,false,doc.id);
  assert.ok(result.errors.some(x=>x.includes('Référence documentaire')));
  assert.ok(result.errors.some(x=>x.includes('Contexte')));
  assert.equal(result.links.length,3);
  assert.throws(()=>makeReviewRequest(makeDraft(doc.id),{purpose:'Demande de relecture pédagogique de tout le document'}),/Revue impossible/);
 }
});
test('a complete human-review request is exportable without claiming approval or publication',()=>{
 const d=prepare();
 const check=reviewPreflight(d);
 assert.deepEqual(check.errors,[]);
 assert.equal(check.readyForReview,true);
 assert.equal(check.links.length,3);
 assert.ok(check.warnings.some(x=>x.includes('prouve')));
 const packet=makeReviewRequest(d,{purpose:'Contrôler la pertinence pédagogique et les consignes de ce guide dans un contexte fictif.',reviewerRole:'Formateur RH à désigner'});
 assert.equal(packet.schemaVersion,DACI_REVIEW_SCHEMA);
 assert.equal(packet.status,'editorial-review-request-only');
 assert.equal(packet.publicationAuthorized,false);
 assert.equal(packet.technicalValidationOnly,true);
 assert.equal(packet.subject.documentId,'D02');
 assert.equal(packet.humanReview.length,REVIEW_REQUIREMENTS.length);
 assert.ok(packet.humanReview.every(x=>x.status==='not-reviewed'));
 assert.ok(packet.mediaSlots.every(x=>x.status==='planned'));
 assert.ok(!('signature' in packet));
 const markdown=reviewRequestMarkdown(packet);
 assert.match(markdown,/Aucune publication ni approbation/);
 assert.match(markdown,/Checklist de validation humaine/);
 assert.match(markdown,/\- \[ \]/);
 assert.match(markdown,/D02/);
 assert.ok(!markdown.includes('approuvé et publié'));
});
test('review packet requires explicit review purpose, not a checkbox-only approval',()=>{
 const d=prepare();
 assert.throws(()=>makeReviewRequest(d,{purpose:'Court'}),/périmètre/);
 assert.throws(()=>makeReviewRequest(d),/périmètre/);
 const packet=makeReviewRequest(d,{purpose:'Examen de la qualité pédagogique sur des cas fictifs, sans diffusion.'});
 assert.equal(packet.intendedReviewerRole,'Relecteur RH compétent à désigner');
});
test('untrusted references do not pass HTTPS-only formatting gate',()=>{
 const invalid=['http://example.org/source','javascript:alert(1)','https://user:secret@example.org','relative-document.pdf','ftp://example.org/doc'];
 for(const url of invalid){
  const d=prepare();
  d.provenance.sourceReferences=[url];
  const result=reviewPreflight(d);
  assert.equal(result.readyForReview,false,url);
  assert.ok(result.errors.some(x=>x.includes('URL HTTPS')));
 }
});
test('missing examples or media activation always blocks a review request',()=>{
 const d=prepare();
 d.sections[0].example='';
 assert.equal(reviewPreflight(d).readyForReview,false);
 const other=prepare();
 other.mediaSlots[0].status='active';
 assert.equal(reviewPreflight(other).readyForReview,false);
});
test('review packet cannot be promoted to an approved export via a local property',()=>{
 const d=prepare();
 const packet=makeReviewRequest(d,{purpose:'Contrôler les références et la version avant une relecture humaine.'});
 packet.publicationAuthorized=true;
 assert.throws(()=>reviewRequestMarkdown(packet),/invalide/);
});
test('the DACI studio exposes review controls, no publishing API',()=>{
 assert.ok(existsSync('assets/js/daci-review-core.mjs'));
 const script=readFileSync('assets/js/daci-studio.mjs','utf8');
 assert.match(script,/preflight-review/);
 assert.match(script,/export-review-json/);
 assert.match(script,/export-review-md/);
 assert.match(script,/makeReviewRequest/);
 assert.doesNotMatch(script,/\bfetch\s*\(/);
});
