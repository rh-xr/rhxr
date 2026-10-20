/** RH·XR DACI publication preparation. This module NEVER publishes or approves.
 * It compiles an inspectable editorial review request using a validated local draft.
 * A checked box or role text is NOT proof of identity, authorization or expert review.
 */
import {validateDraft} from './daci-editor-core.mjs';
import {sourceDocument} from './daci-editor-core.mjs';
import {SECTION_ACTIVITIES,validateSectionActivities} from './daci-section-activities.mjs';

export const DACI_REVIEW_SCHEMA='rhxr.daci-review-request.v1';
export const REVIEW_REQUIREMENTS=Object.freeze([
 {id:'accuracy',label:'Exactitude RH et adéquation pédagogique',question:'Le contenu, les exemples et les réponses proposés ont-ils été relus par une personne compétente ?'},
 {id:'jurisdiction',label:'Contexte juridique et organisationnel',question:'Les règles ou procédures locales sont-elles identifiées et distinguées du contenu générique ?'},
 {id:'accessibility',label:'Accessibilité',question:'La structure, les alternatives non immersives et les formulations sont-elles utilisables sans casque ?'},
 {id:'privacy',label:'Protection des informations RH',question:'Les cas sont-ils fictifs et les données nominatives réellement absentes du document ?'},
 {id:'provenance',label:'Provenance et licences',question:'Les sources sont-elles consultées et les droits des textes/médias vérifiés, sans se fier aux seules URL ?'},
 {id:'traceability',label:'Liens et versions',question:'Les identifiants, activités associées et changements de version sont-ils cohérents ?'}
]);
const clean=s=>typeof s==='string'?s.trim():'';
const isHttps=s=>{try{const u=new URL(s);return u.protocol==='https:'&&!!u.hostname&&!u.username&&!u.password;}catch{return false;}};
export function reviewPreflight(draft){
 const errors=validateDraft(draft),warnings=[],checks=[];
 const base=sourceDocument(draft?.documentId);
 const sections=Array.isArray(draft?.sections)?draft.sections:[];
 const references=Array.isArray(draft?.provenance?.sourceReferences)?draft.provenance.sourceReferences:[];
 const notes=clean(draft?.provenance?.reviewNotes);
 const jurisdiction=clean(draft?.jurisdiction);
 if(clean(draft?.title).length<15)errors.push('Titre à préciser (15 caractères minimum).');
 if(clean(draft?.summary).length<50)errors.push('Résumé de finalité pédagogique insuffisant (50 caractères minimum).');
 if(references.length<1)errors.push('Référence documentaire à renseigner pour la revue (au moins une URL HTTPS).');
 for(const ref of references)if(!isHttps(ref))errors.push('Source non conforme : renseigner une URL HTTPS sans identifiants dans son adresse.');
 // URLs are only checked structurally: no requests, copyright assessment or authenticity checks.
 if(references.length)warnings.push('La présence de références ne prouve ni leur validité scientifique ni la vérification de leur contenu.');
 if(notes.length<30)errors.push('Notes de relecture et de provenance à développer (30 caractères minimum).');
 if(jurisdiction.length<15||/^\s*g[ée]n[ée]rique\b/i.test(jurisdiction))errors.push('Contexte d’application non précisé : distinguer explicitement l’usage fictif des règles locales.');
 if(!sections.length)errors.push('Le document n’a aucune section à relire.');
 for(const sec of sections){
  const label='Section '+(sec?.anchor||'?');
  if(clean(sec?.text).length<120)errors.push(label+' : contenu trop bref pour un guide autonome (120 caractères minimum).');
  if(clean(sec?.example).length<50)errors.push(label+' : exemple pédagogique absent ou trop bref.');
  if(clean(sec?.question).length<25)errors.push(label+' : question de vérification à préciser.');
  if(clean(sec?.augmentation).length<25)errors.push(label+' : augmentation documentaire non décrite.');
  if(clean(sec?.connexion).length<25)errors.push(label+' : relation de connaissance non explicitée.');
  if(!base?.sections.some(s=>s.anchor===sec.anchor))warnings.push(label+' : ancre non présente dans la version source, vérifier les liens de retour.');
 }
 if(Array.isArray(draft?.mediaSlots)){
  for(const media of draft.mediaSlots){
   if(media.status!=='planned')errors.push('Média non sécurisé : seul le statut prévu est autorisé dans ce dossier.');
  }
  if(draft.mediaSlots.length)warnings.push('Tous les médias sont des intentions éditoriales : aucun contenu RA/RV/3D/IA n’est activé ou certifié.');
 }
 const linked=SECTION_ACTIVITIES.filter(item=>item.documentId===draft?.documentId);
 if(!linked.length)warnings.push('Aucun exercice contextuel lié au document canonique.');
 if(validateSectionActivities().length)errors.push('Liaisons DACI du catalogue non conformes : corriger avant la revue.');
 checks.push({label:'Document source connu',ok:!!base});
 checks.push({label:'Sections suffisamment développées',ok:sections.length>0&&sections.every(s=>clean(s.text).length>=120)});
 checks.push({label:'Références HTTPS renseignées',ok:references.length>0&&references.every(isHttps)});
 checks.push({label:'Provenance et contexte précisés',ok:notes.length>=30&&jurisdiction.length>=15&&!/^\s*g[ée]n[ée]rique\b/i.test(jurisdiction)});
 checks.push({label:'Médias inactifs',ok:Array.isArray(draft?.mediaSlots)&&draft.mediaSlots.every(m=>m.status==='planned')});
 checks.push({label:'Ressources pédagogiques reliées',ok:linked.length>0});
 return {readyForReview:errors.length===0,errors:[...new Set(errors)],warnings,checks,links:linked.map(x=>({documentId:x.documentId,sectionAnchor:x.anchor,activityKind:x.kind,activityId:x.id}))};
}
export function makeReviewRequest(draft,{purpose='',reviewerRole=''}={}){
 const preflight=reviewPreflight(draft);
 if(!preflight.readyForReview)throw new Error('Revue impossible : '+preflight.errors.join(' ; '));
 const role=clean(reviewerRole).slice(0,120),reason=clean(purpose).slice(0,500);
 if(reason.length<30)throw new Error('Précisez le besoin et le périmètre de la revue (30 caractères minimum).');
 const packet={
  schemaVersion:DACI_REVIEW_SCHEMA,
  status:'editorial-review-request-only',
  publicationAuthorized:false,
  technicalValidationOnly:true,
  subject:{documentId:draft.documentId,baseVersion:draft.baseVersion,localRevision:draft.revision,title:draft.title,moduleId:draft.moduleId,caseId:draft.caseId},
  provenance:{sourceDocumentId:draft.provenance.sourceDocumentId,sourceVersion:draft.provenance.sourceVersion,sourceReferences:[...draft.provenance.sourceReferences],reviewNotes:draft.provenance.reviewNotes,jurisdiction:draft.jurisdiction},
  reviewPurpose:reason,
  intendedReviewerRole:role||'Relecteur RH compétent à désigner',
  humanReview:REVIEW_REQUIREMENTS.map(x=>({...x,status:'not-reviewed'})),
  editorialWarnings:[...preflight.warnings],
  sections:draft.sections.map(s=>({anchor:s.anchor,title:s.title,question:s.question})),
  sectionLearningLinks:preflight.links,
  mediaSlots:draft.mediaSlots.map(m=>({id:m.id,type:m.type,status:'planned',description:m.description})),
  revisionNotes:draft.history.map(x=>({revision:x.revision,note:x.note})),
  operationalLimit:'Ce fichier est une demande de revue non signée, sans authentification, sans décision de publication ni validation de droits.'
 };
 return packet;
}
export function reviewRequestMarkdown(packet){
 if(packet?.schemaVersion!==DACI_REVIEW_SCHEMA||packet.publicationAuthorized!==false)throw new Error('Dossier de revue inconnu ou invalide.');
 return [
 '# Dossier de revue DACI — '+packet.subject.title,'',
 '**Statut : demande de revue uniquement. Aucune publication ni approbation.**','',
 'Document : '+packet.subject.documentId+' · Source v'+packet.subject.baseVersion+' · Révision locale '+packet.subject.localRevision,
 'Module : '+packet.subject.moduleId+' · Cas : '+packet.subject.caseId,'',
 '## Finalité et périmètre','',packet.reviewPurpose,'',
 '## Relecteur pressenti','',packet.intendedReviewerRole,'',
 '## Références proposées — à vérifier','',...packet.provenance.sourceReferences.map(x=>'- '+x),'',
 '## Checklist de validation humaine (non effectuée)','',
 ...packet.humanReview.map(x=>'- [ ] **'+x.label+'** : '+x.question),'',
 '## Sections et questions','',...packet.sections.flatMap(x=>['- '+x.anchor+' — '+x.title+' : '+x.question]),'',
 '## Liens pédagogiques','',...packet.sectionLearningLinks.map(x=>'- '+x.sectionAnchor+' → '+x.activityKind+' '+x.activityId),'',
 '## Médias (aucun n’est actif)','',...packet.mediaSlots.map(x=>'- '+x.id+' ('+x.type+') : prévu ; '+x.description),'',
 '## Risques et limites','',...packet.editorialWarnings.map(x=>'- '+x),'',
 packet.operationalLimit,
 '','_Après une vraie revue et une approbation authentifiée, un système CMS distinct pourra gérer les droits et publier ; cet atelier ne le fait pas._'
 ].join('\n');
}
