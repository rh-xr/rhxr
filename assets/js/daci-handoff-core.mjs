/**
 * RH·XR: integrity-checked handoff of an editorial DACI draft.
 * NEVER authenticates a reviewer, approves a document, or publishes anything.
 * Hashes detect accidental/post-creation edits, not origin or authenticity.
 */
import {parseDraft,exportDraft} from './daci-editor-core.mjs';
import {makeReviewRequest,reviewPreflight,REVIEW_REQUIREMENTS,DACI_REVIEW_SCHEMA} from './daci-review-core.mjs';

export const DACI_HANDOFF_SCHEMA='rhxr.daci-handoff.v1';
export const MAX_HANDOFF_BYTES=450_000;
const enc=new TextEncoder();
const size=s=>enc.encode(s).byteLength;
async function sha256(input) {
 if(!globalThis.crypto?.subtle)throw new Error('SHA-256 nécessite Web Crypto (HTTPS ou localhost).');
 const data=await globalThis.crypto.subtle.digest('SHA-256',enc.encode(input));
 return Array.from(new Uint8Array(data),b=>b.toString(16).padStart(2,'0')).join('');
}
function assertShape(p){
 if(!p||typeof p!=='object'||Array.isArray(p))throw new Error('Dossier de transmission non reconnu.');
 const allowed=['schemaVersion','status','approved','published','signature','documentId','sha256','draft','reviewRequest'];
 if(Object.keys(p).sort().join('|')!==allowed.sort().join('|'))throw new Error('Champs de transmission inconnus ou manquants.');
 if(p.schemaVersion!==DACI_HANDOFF_SCHEMA||p.status!=='review-required'||p.approved!==false||p.published!==false||p.signature!==null)throw new Error('Le dossier local ne peut être ni approuvé ni publié.');
 if(!/^[0-9a-f]{64}$/.test(p.sha256)||p.documentId!==p.draft?.documentId)throw new Error('Identifiant ou empreinte incohérent.');
 const req=p.reviewRequest;
 if(req?.schemaVersion!==DACI_REVIEW_SCHEMA||req.status!=='editorial-review-request-only'||req.publicationAuthorized!==false||req.technicalValidationOnly!==true)throw new Error('Demande de revue non conforme.');
 if(!Array.isArray(req.humanReview)||req.humanReview.length!==REVIEW_REQUIREMENTS.length||req.humanReview.some((item,i)=>item.id!==REVIEW_REQUIREMENTS[i].id||item.status!=='not-reviewed'))throw new Error('La validation humaine doit rester non effectuée.');
}
export async function createHandoff(draft,{purpose='',reviewerRole=''}={}) {
 // This removes unexpected object fields and validates against the existing draft schema.
 const clean=parseDraft(exportDraft(draft));
 const reviewRequest=makeReviewRequest(clean,{purpose,reviewerRole});
 const canonical=exportDraft(clean);
 const result={
  schemaVersion:DACI_HANDOFF_SCHEMA,status:'review-required',
  approved:false,published:false,signature:null,
  documentId:clean.documentId,sha256:await sha256(canonical),
  draft:clean,reviewRequest
 };
 if(size(JSON.stringify(result))>MAX_HANDOFF_BYTES)throw new Error('Dossier trop volumineux (450 Ko maximum).');
 return result;
}
export function parseHandoff(json) {
 if(typeof json!=='string'||size(json)>MAX_HANDOFF_BYTES)throw new Error('Fichier trop volumineux (450 Ko maximum).');
 let obj;try{obj=JSON.parse(json);}catch{throw new Error('Fichier JSON invalide.');}
 assertShape(obj);
 return obj;
}
export async function verifyHandoff(packet) {
 try {
  if(size(JSON.stringify(packet))>MAX_HANDOFF_BYTES)throw new Error('Fichier trop volumineux.');
  assertShape(packet);
  const safe=parseDraft(JSON.stringify(packet.draft));
  // Prevent hidden extra fields that a viewer could misinterpret as instructions.
  if(JSON.stringify(safe)!==JSON.stringify(packet.draft))throw new Error('Le brouillon contient des champs non canoniques.');
  const preflight=reviewPreflight(safe);
  if(!preflight.readyForReview)throw new Error('Le document ne satisfait plus les conditions de revue.');
  const actual=await sha256(exportDraft(safe));
  if(actual!==packet.sha256)throw new Error('Empreinte SHA-256 différente : le document a changé.');
  const req=packet.reviewRequest;
  const regenerated=makeReviewRequest(safe,{purpose:req.reviewPurpose,reviewerRole:req.intendedReviewerRole});
  if(JSON.stringify(regenerated)!==JSON.stringify(req))throw new Error('La demande de revue a été altérée.');
  return {valid:true,errors:[],documentId:safe.documentId,revision:safe.revision,sha256:actual,sections:safe.sections.length,criteria:req.humanReview.length,status:'awaiting-human-review'};
 }catch(error){
  return {valid:false,errors:[error.message||String(error)],status:'invalid'};
 }
}
export function handoffReport(check){
 return ['# RH·XR — Contrôle du dossier DACI','',
  '**Résultat :** '+(check.valid?'Structure et empreinte cohérentes. Revue humaine NON EFFECTUÉE.':'Dossier invalide.'),'',
  ...(check.valid?['Document : '+check.documentId,'Révision : '+check.revision,'SHA-256 : '+check.sha256,'Sections : '+check.sections,'Critères à examiner : '+check.criteria]:check.errors.map(s=>'- '+s)),
  '','_Ni signature, ni vérification de la source externe, ni approbation, ni publication._'
 ].join('\n');
}