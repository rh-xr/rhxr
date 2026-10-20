import {DOCUMENTS} from './daci-data.mjs';
import {MODULES} from './learning-data.mjs';
import {CASES} from './case-data.mjs';
import {makeDraft,sourceDocument,validateDraft,addSection,addMediaSlot,recordRevision,parseDraft,exportDraft,draftMarkdown,draftJsonLd,MEDIA_TYPES} from './daci-editor-core.mjs';
import {reviewPreflight,makeReviewRequest,reviewRequestMarkdown} from './daci-review-core.mjs';

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const $=id=>document.getElementById(id);
const query=new URLSearchParams(location.search);
let draft=makeDraft(sourceDocument(query.get('doc'))?.id||'D01');
let chosen=draft.sections[0].anchor,dirty=false;
const nav=[['index.html','⌂','Accueil'],['parcours.html','▦','Parcours'],['dialogues.html','◎','Dialogues'],['daci.html','▤','Documents DACI'],['daci-studio.html','✎','Atelier DACI'],['reseau.html','⇄','Réseau DACI'],['simulation.html','◈','Simulation VR']];
const shell='<div class="shell"><aside class="side"><div><a class="brand" href="index.html">RH<span>·</span>XR <small>LAB</small></a><div class="brand-sub">Création documentaire — locale et temporaire</div></div><div><div class="navlabel">EXPLORER</div><nav class="nav" aria-label="Navigation principale">'+nav.map(([href,sym,title])=>'<a href="'+href+'" class="'+(href==='daci-studio.html'?'active':'')+'"><span aria-hidden="true">'+sym+'</span>'+esc(title)+'</a>').join('')+'</nav></div><div class="side-foot">Aucun compte ni enregistrement serveur. Ne pas saisir de données RH personnelles.</div></aside><main class="main"><header class="top"><span>RH·XR / <strong>Atelier DACI</strong></span><span class="pill neutral">Brouillon local</span></header>'+
'<div class="eyebrow">Document augmenté · connecté · intelligent</div><h1 class="title">Concevoir un document DACI</h1><p class="lead">Adapter un document pédagogique, assurer sa traçabilité, préparer les médias futurs et exporter des brouillons vérifiables.</p>'+
'<div class="notice"><strong>Brouillon temporaire :</strong> votre travail n’est ni enregistré ni publié. Exportez un JSON pour pouvoir le réimporter. Ne saisissez aucune donnée RH identifiante. Les ressources RA/RV/3D et l’IA restent inactives.</div>'+
'<div class="control-bar studio-topbar"><label for="source-doc">Document source</label><select id="source-doc" class="input">'+DOCUMENTS.map(d=>'<option value="'+esc(d.id)+'">'+esc(d.id+' · '+d.title)+'</option>').join('')+'</select><button id="reset-draft" class="secondary" type="button">Réinitialiser</button><label for="import-json" class="secondary import-label">Importer un JSON</label><input type="file" id="import-json" accept=".json,application/json" class="visually-hidden" aria-describedby="import-help"/></div>'+
'<p id="import-help" class="tiny">Import limité à 200 Ko, au schéma de brouillon local. Aucun média importé ne devient actif.</p><div id="studio-status" class="notice" role="status" aria-live="polite">Document source chargé.</div>'+
'<div class="studio-grid"><section class="panel studio-editor" aria-label="Édition du brouillon"><div class="row space"><h2>1. Métadonnées et provenance</h2><span class="pill neutral" id="revision-pill"></span></div>'+
'<div class="studio-fields"><label>Titre<input id="draft-title" class="input" maxlength="180"></label><label>Résumé<textarea id="draft-summary" class="input" rows="3" maxlength="2000"></textarea></label>'+
'<div class="studio-two"><label>Module lié<select id="draft-module" class="input">'+MODULES.map(m=>'<option value="'+esc(m.id)+'">'+esc(m.id+' · '+m.title)+'</option>').join('')+'</select></label><label>Cas lié<select id="draft-case" class="input"></select></label></div>'+
'<label>Contexte / territoire<textarea id="draft-jurisdiction" class="input" rows="2" maxlength="300"></textarea></label>'+
'<label>Statut de revue<input id="draft-review" class="input" maxlength="300"></label>'+
'<label>Provenance<textarea id="draft-provenance" class="input" rows="2" maxlength="500"></textarea></label>'+
'<label>Notes de revue<textarea id="draft-review-notes" class="input" rows="3" maxlength="1000"></textarea></label>'+
'<label>Références ajoutées, une par ligne<textarea id="draft-sources" class="input" rows="3" maxlength="2500" placeholder="Références proposées, à vérifier"></textarea></label></div>'+
'<div class="studio-divider"></div><div class="row space"><h2>2. Sections</h2><button type="button" id="add-section" class="secondary">+ Section</button></div>'+
'<div class="studio-fields"><label for="section-select">Section à modifier</label><select id="section-select" class="input"></select><div id="section-fields" class="studio-fields"></div><div class="btnrow"><button type="button" id="move-up" class="secondary">↑ Monter</button><button type="button" id="move-down" class="secondary">↓ Descendre</button><button type="button" id="remove-section" class="secondary">Supprimer</button></div></div>'+
'<div class="studio-divider"></div><div class="row space"><h2>3. Augmentations futures</h2><button type="button" id="add-media" class="secondary">+ Média prévu</button></div><p class="tiny">Les emplacements représentent des intentions éditoriales, pas des médias publiés.</p><div id="media-list" class="studio-media"></div>'+
'<div class="studio-divider"></div><h2>4. Historique des notes de révision</h2><p class="tiny">Les notes ne sont pas des snapshots restaurables. Exportez chaque version du brouillon.</p><label for="revision-note">Modification réalisée</label><textarea id="revision-note" class="input" rows="2" maxlength="240"></textarea><div class="btnrow"><button type="button" id="save-revision" class="secondary">Ajouter une révision</button></div><ol id="revision-history" class="learning-history"></ol></section>'+
'<aside class="panel studio-preview"><h2>Contrôler et exporter</h2><p>La validation technique ne remplace pas une relecture RH, documentaire ou réglementaire.</p><div class="btnrow"><button type="button" class="secondary" id="validate-draft">Vérifier</button><button type="button" class="secondary" id="preview-draft">Actualiser l’aperçu</button></div><div id="validation-result" class="notice" role="status" aria-live="polite">Aucune vérification demandée.</div><h3>Formats disponibles</h3><div class="studio-export"><button type="button" class="secondary" id="export-json">Brouillon JSON</button><button type="button" class="secondary" id="export-md">Document Markdown</button><button type="button" class="secondary" id="export-ld">Métadonnées JSON-LD</button></div><div class="studio-divider"></div><h3>5. Préparer une revue éditoriale</h3><p class="tiny">Cet outil produit une demande de relecture, jamais une autorisation de publication. L'identité et l'habilitation du relecteur ne sont pas vérifiées.</p><label for="review-purpose">Finalité et périmètre de la revue</label><textarea class="input" id="review-purpose" rows="3" maxlength="500" placeholder="Objectifs pédagogiques et questions à contrôler..."></textarea><label for="review-role">Rôle du relecteur pressenti (facultatif)</label><input class="input" id="review-role" maxlength="120" placeholder="Formateur RH, documentaliste..."><div class="btnrow"><button type="button" class="secondary" id="preflight-review">Contrôler avant revue</button><button type="button" class="secondary" id="export-review-json">Dossier de revue JSON</button><button type="button" class="secondary" id="export-review-md">Checklist Markdown</button></div><div id="review-preflight" class="notice" role="status" aria-live="polite">Aucun contrôle préalable demandé.</div><p class="tiny">Les URL des références sont vérifiées uniquement dans leur forme : leur contenu, leur licence et leur autorité doivent être contrôlés par un humain.</p><div class="studio-divider"></div><h3>Aperçu du brouillon</h3><article id="draft-preview" class="studio-paper"></article></aside></div>'+
'<footer class="footer">Atelier DACI expérimental · aucune transmission de brouillons · aucune publication ni activation de média.</footer></main></div>';
document.querySelector('#app').innerHTML=shell;
const status=(message,kind='info')=>{const el=$('studio-status');el.textContent=message;el.dataset.kind=kind;};
const modified=()=>{dirty=true;$('revision-pill').textContent='Révision '+draft.revision+' · modifiée';};
const sec=()=>draft.sections.find(s=>s.anchor===chosen)||draft.sections[0];
function renderCases(){
 $('draft-case').innerHTML=CASES.filter(c=>c.moduleId===draft.moduleId).map(c=>'<option value="'+esc(c.id)+'">'+esc(c.id+' · '+c.title)+'</option>').join('');
 $('draft-case').value=draft.caseId;
}
function renderSection(){
 if(!draft.sections.some(s=>s.anchor===chosen))chosen=draft.sections[0].anchor;
 $('section-select').innerHTML=draft.sections.map((s,i)=>'<option value="'+esc(s.anchor)+'">'+esc(i+1+'. '+s.title)+'</option>').join('');
 $('section-select').value=chosen;
 const s=sec(),definitions=[['title','Titre',1],['text','Texte de référence',6],['example','Exemple fictif',3],['question','Question de vérification',2],['augmentation','Augmentation envisagée',2],['connexion','Relation documentaire',2]];
 $('section-fields').innerHTML='<div class="tiny">Identifiant stable : <code>'+esc(s.anchor)+'</code></div>'+definitions.map(([key,label,rows])=>'<label>'+esc(label)+(rows===1?'<input class="input" maxlength="400" data-field="'+key+'" value="'+esc(s[key])+'">':'<textarea class="input" rows="'+rows+'" maxlength="16000" data-field="'+key+'">'+esc(s[key])+'</textarea>')+'</label>').join('');
 $('section-fields').querySelectorAll('[data-field]').forEach(e=>e.addEventListener('input',()=>{
  s[e.dataset.field]=e.value;modified();
  if(e.dataset.field==='title')$('section-select').selectedOptions[0].textContent=(draft.sections.indexOf(s)+1)+'. '+s.title;
 }));
 const idx=draft.sections.indexOf(s);
 $('move-up').disabled=idx===0;$('move-down').disabled=idx===draft.sections.length-1;$('remove-section').disabled=draft.sections.length<=1;
}
function renderMedia(){
 $('media-list').innerHTML=draft.mediaSlots.map((s,i)=>'<div class="media-item"><div class="row space"><b>'+esc(s.id)+'</b><span class="pill neutral">À produire · inactif</span></div><div class="studio-two"><label>Type<select class="input" data-media-type="'+i+'">'+MEDIA_TYPES.map(t=>'<option '+(s.type===t?'selected':'')+' value="'+esc(t)+'">'+esc(t)+'</option>').join('')+'</select></label><label>Description<input class="input" maxlength="500" data-media-description="'+i+'" value="'+esc(s.description)+'"></label></div><button class="secondary" type="button" data-media-remove="'+i+'">Retirer</button></div>').join('');
 $('media-list').querySelectorAll('[data-media-type]').forEach(el=>el.addEventListener('change',()=>{draft.mediaSlots[Number(el.dataset.mediaType)].type=el.value;modified();}));
 $('media-list').querySelectorAll('[data-media-description]').forEach(el=>el.addEventListener('input',()=>{draft.mediaSlots[Number(el.dataset.mediaDescription)].description=el.value;modified();}));
 $('media-list').querySelectorAll('[data-media-remove]').forEach(el=>el.addEventListener('click',()=>{draft.mediaSlots.splice(Number(el.dataset.mediaRemove),1);modified();renderMedia();}));
}
function renderHistory(){
 $('revision-history').innerHTML=draft.history.map(h=>'<li><strong>r'+h.revision+'</strong> — '+esc(h.note)+'</li>').join('');
}
function preview(){
 const el=$('draft-preview'),head=document.createElement('h3'),info=document.createElement('p'),summary=document.createElement('p');
 head.textContent=draft.title;info.textContent='Brouillon non validé · '+draft.documentId+' · r'+draft.revision;summary.textContent=draft.summary;
 el.replaceChildren(head,info,summary);
 for(const s of draft.sections){
  const section=document.createElement('section'),h=document.createElement('h4'),text=document.createElement('p'),example=document.createElement('p'),question=document.createElement('p');
  h.textContent=s.title;text.textContent=s.text;example.textContent='Exemple fictif : '+s.example;question.textContent='Question : '+s.question;
  section.append(h,text,example,question);el.append(section);
 }
 const end=document.createElement('p');end.textContent='Médias prévus non actifs : '+draft.mediaSlots.length+' · Module : '+draft.moduleId+' · Cas : '+draft.caseId;el.append(end);
}
function render(){
 $('source-doc').value=draft.documentId;
 $('draft-title').value=draft.title;$('draft-summary').value=draft.summary;
 $('draft-module').value=draft.moduleId;renderCases();
 $('draft-jurisdiction').value=draft.jurisdiction;$('draft-review').value=draft.reviewStatus;
 $('draft-provenance').value=draft.provenance.kind;$('draft-review-notes').value=draft.provenance.reviewNotes;
 $('draft-sources').value=draft.provenance.sourceReferences.join('\n');
 $('revision-pill').textContent='Révision '+draft.revision+(dirty?' · modifiée':'');
 renderSection();renderMedia();renderHistory();preview();
}
const basic=[['draft-title',v=>draft.title=v],['draft-summary',v=>draft.summary=v],['draft-jurisdiction',v=>draft.jurisdiction=v],['draft-review',v=>draft.reviewStatus=v],['draft-provenance',v=>draft.provenance.kind=v],['draft-review-notes',v=>draft.provenance.reviewNotes=v],['draft-sources',v=>draft.provenance.sourceReferences=v.split(/\r?\n/).map(x=>x.trim()).filter(Boolean)]];
for(const [id,fn] of basic)$(id).addEventListener('input',e=>{fn(e.target.value);modified();});
$('draft-module').addEventListener('change',e=>{
 draft.moduleId=e.target.value;draft.caseId=CASES.find(c=>c.moduleId===draft.moduleId)?.id||'';renderCases();modified();
});
$('draft-case').addEventListener('change',e=>{draft.caseId=e.target.value;modified();});
$('section-select').addEventListener('change',e=>{chosen=e.target.value;renderSection();});
$('add-section').addEventListener('click',()=>{
 try{draft=addSection(draft);chosen=draft.sections.at(-1).anchor;modified();renderSection();status('Section ajoutée. Renseignez son contenu avant tout export.');}
 catch(e){status(e.message,'error');}
});
$('remove-section').addEventListener('click',()=>{
 if(draft.sections.length<=1||!window.confirm('Supprimer cette section locale ?'))return;
 const idx=draft.sections.findIndex(s=>s.anchor===chosen);draft.sections.splice(idx,1);
 chosen=draft.sections[Math.min(idx,draft.sections.length-1)].anchor;modified();renderSection();
});
for(const [id,step] of [['move-up',-1],['move-down',1]])$(id).addEventListener('click',()=>{
 const i=draft.sections.findIndex(s=>s.anchor===chosen),j=i+step;
 if(j<0||j>=draft.sections.length)return;
 [draft.sections[i],draft.sections[j]]=[draft.sections[j],draft.sections[i]];modified();renderSection();
});
$('add-media').addEventListener('click',()=>{try{draft=addMediaSlot(draft);modified();renderMedia();}catch(e){status(e.message,'error');}});
$('save-revision').addEventListener('click',()=>{
 try{draft=recordRevision(draft,$('revision-note').value);$('revision-note').value='';modified();renderHistory();status('Révision ajoutée au brouillon temporaire. Exportez votre travail en JSON pour le conserver.','ok');}
 catch(e){status(e.message,'error');}
});
function verify(){
 const errors=validateDraft(draft),el=$('validation-result');el.replaceChildren();
 const h=document.createElement('strong');h.textContent=errors.length?'Corriger '+errors.length+' point(s)':'Structure valide — relecture humaine nécessaire';el.append(h);
 if(errors.length){const ul=document.createElement('ul');for(const error of errors){const li=document.createElement('li');li.textContent=error;ul.append(li);}el.append(ul);}
 else{const p=document.createElement('p');p.textContent='Liens pédagogiques cohérents, médias non actifs. Vérifiez ensuite la pertinence RH, les références et les droits.';el.append(p);}
 el.dataset.kind=errors.length?'error':'ok';return errors.length===0;
}
$('validate-draft').addEventListener('click',verify);
$('preview-draft').addEventListener('click',()=>{preview();status('Aperçu actualisé.');});
function download(name,content,type){
 const u=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1200);
}
function renderReviewPreflight(){
 const result=reviewPreflight(draft),el=$('review-preflight');
 el.replaceChildren();
 const heading=document.createElement('strong');
 heading.textContent=result.readyForReview?'Prêt à soumettre à une relecture humaine — non approuvé.':'Préparation de la revue incomplète.';
 el.append(heading);
 const list=(label,items)=>{
  if(!items.length)return;
  const h=document.createElement('h4');h.textContent=label;el.append(h);
  const ul=document.createElement('ul');
  for(const value of items){const li=document.createElement('li');li.textContent=value;ul.append(li);}
  el.append(ul);
 };
 list('Points bloquants',result.errors);
 list('Avertissements',result.warnings);
 const caption=document.createElement('p');
 caption.textContent=result.checks.filter(c=>c.ok).length+'/'+result.checks.length+' contrôles positifs ; '+result.links.length+' liens pédagogiques documentaires.';
 el.append(caption);
 el.dataset.kind=result.readyForReview?'ok':'error';
 return result;
}
$('preflight-review').addEventListener('click',renderReviewPreflight);
for(const format of ['json','md'])$('export-review-'+format).addEventListener('click',()=>{
 const result=renderReviewPreflight();
 if(!result.readyForReview){status('La demande de revue ne peut pas être exportée avant correction des blocages.','error');return;}
 try{
  const packet=makeReviewRequest(draft,{purpose:$('review-purpose').value,reviewerRole:$('review-role').value});
  const base='RHXR-'+draft.documentId+'-demande-revue-r'+draft.revision;
  if(format==='json')download(base+'.review.json',JSON.stringify(packet,null,2),'application/json;charset=utf-8');
  else download(base+'.review.md',reviewRequestMarkdown(packet),'text/markdown;charset=utf-8');
  status('Dossier de revue exporté localement. Aucune approbation ni publication effectuée.','ok');
 }catch(e){status('Export de revue impossible : '+e.message,'error');}
});
for(const fmt of ['json','md','ld'])$('export-'+fmt).addEventListener('click',()=>{
 if(!verify())return;
 try{
  const n='RHXR-'+draft.documentId+'-draft-r'+draft.revision;
  if(fmt==='json')download(n+'.json',exportDraft(draft),'application/json;charset=utf-8');
  if(fmt==='md')download(n+'.md',draftMarkdown(draft),'text/markdown;charset=utf-8');
  if(fmt==='ld')download(n+'.jsonld',JSON.stringify(draftJsonLd(draft),null,2),'application/ld+json;charset=utf-8');
  if(fmt==='json'){dirty=false;$('revision-pill').textContent='Révision '+draft.revision;}
  status('Export '+fmt+' effectué localement. Seul le JSON complet permet de restaurer ce brouillon.','ok');
 }catch(e){status('Export impossible : '+e.message,'error');}
});
$('source-doc').addEventListener('change',e=>{
 const id=e.target.value;
 if(dirty&&!window.confirm('Perdre les changements non exportés et charger un autre document ?')){$('source-doc').value=draft.documentId;return;}
 draft=makeDraft(id);chosen=draft.sections[0].anchor;dirty=false;
 history.replaceState(null,'','daci-studio.html?doc='+encodeURIComponent(id));render();status('Source '+id+' chargée.');
});
$('reset-draft').addEventListener('click',()=>{
 if(!window.confirm('Réinitialiser ce brouillon et perdre les modifications non exportées ?'))return;
 draft=makeDraft(draft.documentId);chosen=draft.sections[0].anchor;dirty=false;render();status('Brouillon réinitialisé.');
});
$('import-json').addEventListener('change',async e=>{
 const file=e.target.files?.[0];if(!file)return;
 try{
  if(file.size>200_000)throw new Error('Fichier supérieur à 200 Ko');
  if(dirty&&!window.confirm('Remplacer le brouillon non exporté par le fichier importé ?'))return;
  draft=parseDraft(await file.text());chosen=draft.sections[0].anchor;dirty=false;
  history.replaceState(null,'','daci-studio.html?doc='+encodeURIComponent(draft.documentId));
  render();status('Import JSON vérifié et chargé localement. Les références restent à relire.','ok');
 }catch(err){status('Import refusé : '+err.message,'error');}
 finally{e.target.value='';}
});
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
render();
