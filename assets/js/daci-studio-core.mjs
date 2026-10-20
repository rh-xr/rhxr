/** RH·XR DACI studio: offline-first document composition, no account, tracking or AI service. */
import {DOCUMENTS} from './daci-data.mjs';
import {MODULES} from './learning-data.mjs';
import {CASES} from './case-data.mjs';

export const DACI_SCHEMA_VERSION='1.0.0';
export const MEDIA_KINDS=Object.freeze(['image','audio','video','model-3d','ar','vr','ai']);
export const MEDIA_STATUSES=Object.freeze(['planned','review','ready']);
const clean=v=>String(v??'').trim();
const bounded=(v,max)=>clean(v).slice(0,max);
const plainSlug=v=>clean(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9-]/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'').slice(0,64);
const validUrl=v=>{try{const u=new URL(v);return u.protocol==='https:'&&!!u.hostname;}catch{return false;}};
export function blankDocument(){
 return {schemaVersion:DACI_SCHEMA_VERSION,id:'daci-nouveau',title:'Nouveau document pédagogique',summary:'Document de démonstration à compléter.',language:'fr',version:'0.1.0',reviewStatus:'draft',moduleId:'M1',caseId:'C01',authorRole:'Équipe pédagogique RH·XR',sections:[{id:'introduction',title:'Introduction',body:'Décrire les objectifs, le contexte et les consignes pédagogiques.',question:'Quelle vérification serait utile ?'}],media:[],editorialNotes:'Vérification métier RH requise avant diffusion.'};
}
export function fromCatalog(id){
 const d=DOCUMENTS.find(x=>x.id===id);
 if(!d)return blankDocument();
 return {schemaVersion:DACI_SCHEMA_VERSION,id:'draft-'+d.id.toLowerCase(),title:d.title,summary:d.summary,language:'fr',version:d.version+'.0',reviewStatus:'draft',moduleId:d.moduleId,caseId:d.caseId,authorRole:'Équipe pédagogique RH·XR',sections:d.sections.map(s=>({id:s.anchor,title:s.title,body:s.text,question:s.question||''})),media:(d.mediaSlots||[]).map((m,i)=>({id:'media-'+(i+1),kind:m.type==='IA'?'ai':m.type==='RA'?'ar':m.type==='3D/VR'?'model-3d':'video',status:'planned',label:m.description,url:'',license:'',alt:'',source:''})),editorialNotes:'Document dérivé de '+d.id+' ; contrôler le fond, la version, les droits et les médias avant publication.'};
}
export function normalizeDocument(input){
 if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Format documentaire incorrect');
 const d=blankDocument();
 return {...d,id:bounded(input.id,64),title:bounded(input.title,200),summary:bounded(input.summary,1200),language:bounded(input.language,8)||'fr',version:bounded(input.version,30),reviewStatus:['draft','review','approved'].includes(input.reviewStatus)?input.reviewStatus:'draft',moduleId:bounded(input.moduleId,20),caseId:bounded(input.caseId,20),authorRole:bounded(input.authorRole,140),editorialNotes:bounded(input.editorialNotes,2000),
 sections:Array.isArray(input.sections)?input.sections.slice(0,30).map(s=>({id:bounded(s?.id,64),title:bounded(s?.title,180),body:bounded(s?.body,8000),question:bounded(s?.question,500)})):[],
 media:Array.isArray(input.media)?input.media.slice(0,30).map(m=>({id:bounded(m?.id,64),kind:bounded(m?.kind,24),status:bounded(m?.status,12),label:bounded(m?.label,200),url:bounded(m?.url,2048),license:bounded(m?.license,120),alt:bounded(m?.alt,500),source:bounded(m?.source,2048)})):[]
 };
}
export function validateDocument(input){
 const d=normalizeDocument(input),errors=[],warnings=[];
 if(!/^[a-z0-9][a-z0-9-]{2,63}$/.test(d.id))errors.push('Identifiant : 3 à 64 caractères minuscules, chiffres et tirets.');
 if(d.title.length<8)errors.push('Titre trop court (8 caractères minimum).');
 if(d.summary.length<25)errors.push('Résumé trop court (25 caractères minimum).');
 if(!MODULES.some(m=>m.id===d.moduleId))errors.push('Le parcours lié est inexistant.');
 if(!CASES.some(c=>c.id===d.caseId))errors.push('Le cas pratique lié est inexistant.');
 if(!d.sections.length)errors.push('Ajouter au moins une section.');
 const seen=new Set();for(const s of d.sections){
  if(!/^[a-z0-9][a-z0-9-]{1,63}$/.test(s.id)||seen.has(s.id))errors.push('Ancre de section invalide ou en doublon : '+s.id);
  seen.add(s.id);
  if(s.title.length<4||s.body.length<40)errors.push('Section incomplète : '+(s.title||s.id));
  if(!s.question)warnings.push('Question de vérification absente dans '+s.id);
 }
 for(const m of d.media){
  if(!MEDIA_KINDS.includes(m.kind))errors.push('Type de média inconnu : '+m.kind);
  if(!MEDIA_STATUSES.includes(m.status))errors.push('Statut de média inconnu : '+m.id);
  if(m.url && !validUrl(m.url))errors.push('Média : URL HTTPS requise pour '+m.id);
  if(m.source && !validUrl(m.source))errors.push('Provenance : URL HTTPS requise pour '+m.id);
  if(m.status==='ready'&&(!m.url||!m.license||!m.alt||!m.source))errors.push('Média prêt sans URL, licence, description accessible ou provenance : '+m.id);
  if(m.status!=='ready')warnings.push('Média non publié : '+(m.label||m.id));
 }
 if(d.reviewStatus==='approved')warnings.push('L’approbation indiquée ici ne constitue pas une validation métier réelle.');
 if(!d.editorialNotes)warnings.push('Ajouter une note de provenance et de vérification.');
 return {valid:errors.length===0,errors,warnings,document:d};
}
export function exportRecord(d){
 const result=validateDocument(d);
 if(!result.valid)throw new Error('Document incomplet : '+result.errors.join(' '));
 const x=result.document;
 return {'@context':'https://schema.org','@type':'LearningResource','@id':'urn:rhxr:daci:'+x.id,identifier:x.id,name:x.title,description:x.summary,inLanguage:x.language,version:x.version,learningResourceType:'Document pédagogique augmenté',educationalUse:'Professional learning',isBasedOn:'urn:rhxr:'+x.moduleId,about:[{'@id':'urn:rhxr:'+x.caseId}],hasPart:x.sections.map(s=>({'@type':'CreativeWork',identifier:s.id,name:s.title,text:s.body})),encoding:x.media.filter(m=>m.status==='ready').map(m=>({'@type':'MediaObject',name:m.label,contentUrl:m.url,license:m.license,description:m.alt}))};
}
export function exportMarkdown(d){
 const result=validateDocument(d);if(!result.valid)throw new Error(result.errors.join(' '));
 const x=result.document;
 return ['# '+x.title,'','> Document RH·XR de travail — '+x.id+' · v'+x.version,'','**Parcours :** '+x.moduleId+' · **Cas lié :** '+x.caseId,'',''+x.summary,'',...x.sections.flatMap(s=>['## '+s.title,'',s.body,'','**Question de vérification :** '+(s.question||'À compléter'),'',]),'## Médias et ressources','',...(x.media.length?x.media.map(m=>'- **'+m.label+'** ('+m.kind+', '+m.status+') — '+(m.status==='ready'&&m.url?m.url:'non disponible')+' ; licence : '+(m.license||'à vérifier')):['Aucun média associé.']),'','## Provenance et validation','',x.editorialNotes,'','_La validation métier et les droits des médias doivent être vérifiés hors de cet éditeur._'].join('\n');
}
export function recommendedId(label){return plainSlug(label)||'nouveau-document';}
export function csvAuditRow(d){
 const result=validateDocument(d);return {id:result.document.id,sections:result.document.sections.length,media:result.document.media.length,errors:result.errors.length,warnings:result.warnings.length};
}
