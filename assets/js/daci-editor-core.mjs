/**
 * RH·XR DACI authoring core — offline only, no server, no analytics.
 * A draft is never a published RH policy. All media remain in "planned" state.
 */
import {DOCUMENTS} from './daci-data.mjs';
import {MODULES} from './learning-data.mjs';
import {CASES} from './case-data.mjs';

export const DACI_DRAFT_SCHEMA='rhxr.daci-draft.v1';
export const MAX_DRAFT_BYTES=200_000;
export const MEDIA_TYPES=Object.freeze(['3D','RA','RV','audio','video','IA','image','panorama']);
const str=(s,max=8000)=>typeof s==='string'?s.slice(0,max):'';
const plain=(v)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&Object.getPrototypeOf(v)===Object.prototype;
const slug=(s)=>String(s||'section').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,45)||'section';
export const sourceDocument=(id)=>DOCUMENTS.find(d=>d.id===id)||null;

export function makeDraft(sourceId='D01') {
 const doc=sourceDocument(sourceId);
 if(!doc)throw new Error('Document source inconnu');
 return {
  schemaVersion:DACI_DRAFT_SCHEMA,
  documentId:doc.id,baseVersion:doc.version,revision:1,
  title:doc.title,summary:doc.summary,moduleId:doc.moduleId,caseId:doc.caseId,
  reviewStatus:'brouillon — validation métier nécessaire',
  jurisdiction:'Générique — à contextualiser',
  provenance:{kind:'Adaptation locale du document RH·XR '+doc.id,sourceDocumentId:doc.id,sourceVersion:doc.version,sourceReferences:[],reviewNotes:'Relecture RH et conformité locale à prévoir'},
  sections:doc.sections.map(s=>({anchor:s.anchor,title:s.title,text:s.text,example:s.example||'',question:s.question||'',augmentation:s.augmentation,connexion:s.connexion})),
  mediaSlots:(doc.mediaSlots||[]).map(s=>({id:s.id,type:MEDIA_TYPES.includes(s.type)?s.type:'3D',status:'planned',description:s.description})),
  history:[{revision:1,note:'Copie de travail initiale — source '+doc.id+' version '+doc.version}]
 };
}
export function nextAnchor(title,sections) {
 const base=slug(title),used=new Set(sections.map(s=>s.anchor));
 if(!used.has(base))return base;
 let i=2;while(used.has(base+'-'+i))i++;
 return base+'-'+i;
}
export function addSection(draft,title='Nouvelle section'){
 const result=structuredClone(draft);
 if(result.sections.length>=12)throw new Error('Limite de douze sections atteinte');
 result.sections.push({anchor:nextAnchor(title,result.sections),title,text:'',example:'',question:'',augmentation:'',connexion:''});
 return result;
}
export function addMediaSlot(draft,type='3D'){
 if(!MEDIA_TYPES.includes(type))throw new Error('Type de média non reconnu');
 const result=structuredClone(draft);
 if(result.mediaSlots.length>=12)throw new Error('Limite de douze emplacements atteinte');
 const used=new Set(result.mediaSlots.map(x=>x.id));
 let n=1;while(used.has(result.documentId+'-SLOT'+n))n++;
 result.mediaSlots.push({id:result.documentId+'-SLOT'+n,type,status:'planned',description:'Média à produire et valider ; non disponible'});
 return result;
}
export function recordRevision(draft,note){
 const text=str(note,240).trim();
 if(text.length<8)throw new Error('Décrivez la modification en au moins huit caractères');
 const result=structuredClone(draft);
 if(result.history.length>=50)throw new Error('Historique limité à 50 révisions ; exporter le brouillon');
 result.revision+=1;
 result.history.push({revision:result.revision,note:text});
 return result;
}
export function validateDraft(d) {
 const errors=[];
 if(!plain(d))return ['Brouillon non reconnu'];
 if(d.schemaVersion!==DACI_DRAFT_SCHEMA)errors.push('Version de schéma incompatible');
 if(!sourceDocument(d.documentId))errors.push('Source documentaire inconnue');
 if(!plain(d.provenance)||d.provenance.sourceDocumentId!==d.documentId||!str(d.provenance.sourceVersion,20))errors.push('Provenance de la source manquante');
 const canonical=sourceDocument(d.documentId);
 if(canonical&&(d.baseVersion!==canonical.version||d.provenance?.sourceVersion!==canonical.version))errors.push('Version source non conforme au document canonique');
 if(!MODULES.some(m=>m.id===d.moduleId))errors.push('Module inconnu');
 if(!CASES.some(c=>c.id===d.caseId&&c.moduleId===d.moduleId))errors.push('Cas lié au mauvais module');
 if(!Number.isInteger(d.revision)||d.revision<1||d.revision>500)errors.push('Révision non valide');
 for(const key of ['title','summary','reviewStatus','jurisdiction']){
  if(!str(d[key],12000).trim())errors.push('Champ manquant : '+key);
  if(typeof d[key]!=='string'||d[key].length>8000)errors.push('Champ trop long : '+key);
 }
 if(!Array.isArray(d.sections)||d.sections.length<1||d.sections.length>12)errors.push('Nombre de sections invalide');
 else {
  const ids=new Set();
  for(const [i,s] of d.sections.entries()){
   if(!plain(s)) { errors.push('Section mal formée : '+i);continue; }
   if(typeof s.anchor!=='string'||!(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).test(s.anchor)||ids.has(s.anchor))errors.push('Identifiant de section incorrect ou dupliqué : '+i);
   ids.add(s.anchor);
   for(const key of ['title','text','example','question','augmentation','connexion']){
    if(typeof s[key]!=='string'||s[key].length>16000)errors.push('Champ de section invalide : '+i+'/'+key);
   }
   if(!str(s.title).trim()||!str(s.text,20000).trim())errors.push('Titre ou contenu manquant : section '+(i+1));
  }
 }
 if(!Array.isArray(d.mediaSlots)||d.mediaSlots.length>12)errors.push('Emplacements médias invalides');
 else {
  const ids=new Set();
  for(const [i,s] of d.mediaSlots.entries()){
   if(!plain(s)||typeof s.id!=='string'||!(/^[A-Za-z0-9-]+$/).test(s.id)||ids.has(s.id)||!MEDIA_TYPES.includes(s.type)||s.status!=='planned'||typeof s.description!=='string'||s.description.length>500)errors.push('Emplacement média invalide : '+i);
   if(plain(s)){ids.add(s.id);if('url' in s||'src' in s||'assetUrl' in s)errors.push('Média non validé : URL interdite dans le brouillon');}
  }
 }
 if(!Array.isArray(d.history)||d.history.length<1||d.history.length>50)errors.push('Historique absent ou trop long');
 else {
  for(const item of d.history)if(!plain(item)||!Number.isInteger(item.revision)||typeof item.note!=='string'||item.note.length>240)errors.push('Entrée de suivi invalide');
  if(d.history[0]?.revision!==1||d.history.some((h,i)=>i>0&&h?.revision!==d.history[i-1]?.revision+1))errors.push('Séquence de révisions invalide');
  if(d.history.at(-1)?.revision!==d.revision)errors.push('Révision et historique incohérents');
 }
 if(!Array.isArray(d.provenance?.sourceReferences)||d.provenance.sourceReferences.length>20||d.provenance.sourceReferences.some(r=>typeof r!=='string'||r.length>1000))errors.push('Sources documentaires non conformes');
 return [...new Set(errors)];
}
export function parseDraft(jsonText) {
 if(typeof jsonText!=='string'||new TextEncoder().encode(jsonText).byteLength>MAX_DRAFT_BYTES)throw new Error('Fichier trop volumineux (maximum 200 Ko)');
 let obj;
 try{obj=JSON.parse(jsonText);}catch{throw new Error('Fichier JSON invalide');}
 const errors=validateDraft(obj);
 if(errors.length)throw new Error(errors.join(' ; '));
 // Reconstruct a known schema instead of returning untrusted extra object fields.
 return {
  schemaVersion:DACI_DRAFT_SCHEMA,documentId:obj.documentId,baseVersion:str(obj.baseVersion,40),
  revision:obj.revision,title:obj.title,summary:obj.summary,moduleId:obj.moduleId,caseId:obj.caseId,
  reviewStatus:obj.reviewStatus,jurisdiction:obj.jurisdiction,
  provenance:{kind:str(obj.provenance.kind,500),sourceDocumentId:obj.documentId,sourceVersion:str(obj.provenance.sourceVersion,40),sourceReferences:[...obj.provenance.sourceReferences],reviewNotes:str(obj.provenance.reviewNotes,1000)},
  sections:obj.sections.map(s=>({anchor:s.anchor,title:s.title,text:s.text,example:s.example,question:s.question,augmentation:s.augmentation,connexion:s.connexion})),
  mediaSlots:obj.mediaSlots.map(s=>({id:s.id,type:s.type,status:'planned',description:s.description})),
  history:obj.history.map(s=>({revision:s.revision,note:s.note}))
 };
}
export function exportDraft(d){const errors=validateDraft(d);if(errors.length)throw new Error(errors.join(' ; '));return JSON.stringify(parseDraft(JSON.stringify(d)),null,2);}
export function draftMarkdown(d) {
 const errors=validateDraft(d);if(errors.length)throw new Error(errors.join(' ; '));
 const lines=['# '+d.title,'','> RH·XR — brouillon de travail, non validé pour application en situation RH réelle','',
  'Identifiant : '+d.documentId+' · Source v'+d.baseVersion+' · Révision locale : '+d.revision,
  'Module : '+d.moduleId+' · Cas : '+d.caseId,'','## Présentation','',d.summary,
  '','## Provenance','',d.provenance.kind,'','Contexte : '+d.jurisdiction,'','Statut : '+d.reviewStatus,
  '','Notes de relecture : '+d.provenance.reviewNotes,'','## Références proposées (non vérifiées)','',
  ...d.provenance.sourceReferences.map(r=>'- '+r),''];
 for(const s of d.sections){
  lines.push('## '+s.title,'','Identifiant de section : '+s.anchor,'',s.text,'','**Exemple fictif :** '+s.example,
   '','**Question de vérification :** '+s.question,'','**Augmentation envisagée :** '+s.augmentation,
   '','**Lien / connexion :** '+s.connexion,'');
 }
 lines.push('## Emplacements multimédias (tous non actifs)','');
 for(const slot of d.mediaSlots)lines.push('- '+slot.id+' ('+slot.type+') : '+slot.description+' — '+slot.status);
 lines.push('','## Historique local des révisions','',...d.history.map(h=>'- Révision '+h.revision+' : '+h.note),'');
 return lines.join('\n');
}
export function draftJsonLd(d) {
 const errors=validateDraft(d);if(errors.length)throw new Error(errors.join(' ; '));
 return {
  '@context':'https://schema.org','@type':'LearningResource',
  '@id':'urn:rhxr:daci:'+d.documentId+':draft:'+d.revision,
  identifier:d.documentId,title:d.title,name:d.title,description:d.summary,
  inLanguage:'fr',isBasedOn:'urn:rhxr:learning:'+d.documentId,
  educationalUse:'professional development',version:'draft-'+d.revision,
  isAccessibleForFree:true,
  about:[{'@type':'Thing',identifier:d.moduleId},{'@type':'Thing',identifier:d.caseId}],
  creativeWorkStatus:'Draft — expert review required'
 };
}
