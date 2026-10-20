import {MODULES,getModule} from './learning-data.mjs';
import {CASES,getCase} from './case-data.mjs';
import {DOCUMENTS,DACI_CAPABILITIES,getDocument,linkedDocuments,semanticRecord} from './daci-data.mjs';

const page=document.body.dataset.page;
const params=new URLSearchParams(location.search);
const esc=value=>String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const resourceHref=(kind,id)=>kind==='module'?'parcours.html?module='+encodeURIComponent(id):kind==='case'?'cas-pratiques.html?case='+encodeURIComponent(id):'daci.html?doc='+encodeURIComponent(id);
const navigation=[['index.html','⌂','Tableau de bord','home'],['parcours.html','▦','Parcours','parcours'],['itineraires.html','🧭','Itinéraires guidés','itineraires'],['cas-pratiques.html','◉','Cas pratiques','cases'],['daci.html','▤','Documents DACI','daci'],['atelier.html','✎','Atelier & outils','atelier'],['reseau.html','⇄','Réseau DACI','reseau'],['simulation.html','◎','Simulation VR','simulation'],['studio.html','▧','Studio','studio']];
const pill=(value,extra='')=>'<span class="pill '+extra+'">'+esc(value)+'</span>';
const shell=html=>'<div class="shell"><aside class="side"><div><a class="brand" href="./index.html">RH<span>·</span>XR <small>LAB</small></a><div class="brand-sub">Apprendre et expérimenter les RH<br>Contenus pédagogiques structurés</div></div><div><div class="navlabel">EXPLORER</div><nav class="nav" aria-label="Navigation principale">'+navigation.map(([url,ico,label,id])=>'<a href="./'+url+'" class="'+(page===id?'active':'')+'"><span aria-hidden="true">'+ico+'</span>'+esc(label)+'</a>').join('')+'</nav></div><div class="side-foot">Contenus fictifs et formatifs.<br>Aucune donnée RH personnelle sauvegardée.</div></aside><main class="main"><header class="top"><span>RH·XR / <strong>'+({'parcours':'Parcours pédagogiques','cases':'Cas pratiques','daci':'Documents DACI'}[page]||'Ressources')+'</strong></span><div class="head-right">'+pill('Contenu V1','neutral')+'<span class="initials">RH</span></div></header>'+html+'<footer class="footer">RH·XR · Contenus pédagogiques de démonstration. DACI : liens et règles locales actifs ; IA générative et médias RA/RV futurs, non connectés. Aucune notation pour décisions RH.</footer></main></div>';
function title(eyebrow,heading,lead){return '<div class="eyebrow">'+esc(eyebrow)+'</div><h1 class="title">'+esc(heading)+'</h1><p class="lead">'+esc(lead)+'</p>';}
function moduleCard(m){
 const related=CASES.filter(c=>c.moduleId===m.id).length;
 return '<article class="learning-card"><div class="row space">'+pill(m.id)+'<span class="tiny">'+related+' cas liés</span></div><h3>'+esc(m.title)+'</h3><p>'+esc(m.summary)+'</p><div class="tiny">'+m.lessons.length+' séquences · '+esc(m.duration)+'</div><div class="btnrow"><a class="secondary" href="'+resourceHref('module',m.id)+'">Explorer ce parcours →</a></div></article>';
}
function moduleDetail(m){
 const docs=linkedDocuments(m.id),cases=CASES.filter(c=>c.moduleId===m.id);
 return '<section class="panel learning-detail" id="detail"><div class="row space">'+pill(m.id)+'<a class="textlink" href="parcours.html">Tous les parcours ↗</a></div><h2>'+esc(m.title)+'</h2><p>'+esc(m.summary)+'</p><p class="tiny">'+esc(m.duration)+' · '+esc(m.audience)+'</p><h3>Objectifs d’apprentissage</h3><ul>'+m.objectives.map(o=>'<li>'+esc(o)+'</li>').join('')+'</ul><h3>Progression en trois séquences</h3><div class="timeline">'+m.lessons.map((l,i)=>'<article class="lesson"><div class="row space"><b>'+esc(l.title)+'</b>'+pill('Séquence '+(i+1),'neutral')+'</div><p>'+esc(l.description)+'</p><p><strong>Activité :</strong> '+esc(l.activity)+'</p><p><strong>Production :</strong> '+esc(l.evidence)+'</p></article>').join('')+'</div><div class="notice"><strong>Extensions envisagées :</strong> '+esc(m.xr)+'</div><h3>Approfondir avec les ressources liées</h3><div class="related"><a href="atelier.html?module='+esc(m.id)+'">✎ Étudier le cours, faire les exercices et préparer une fiche</a><a href="reseau.html?module='+esc(m.id)+'">⇄ Explorer les relations DACI du module</a></div><div class="related">'+cases.map(c=>'<a href="'+resourceHref('case',c.id)+'">◉ '+esc(c.id+' · '+c.title)+'</a>').join('')+docs.map(d=>'<a href="'+resourceHref('doc',d.id)+'">▤ '+esc(d.id+' · '+d.title)+'</a>').join('')+'</div></section>';
}
function parcours(){
 return title('Bibliothèque de formation','Parcours RH·XR','Huit parcours pédagogiques et vingt-quatre séquences : objectifs, activités concrètes, productions attendues et passerelles vers les documents DACI.')+'<div class="notice">Les contenus peuvent être consultés sans casque. La RA, la RV et l’IA générative sont des possibilités futures : elles ne sont pas nécessaires pour suivre les séquences actuelles.</div><div class="control-bar"><label for="module-search">Rechercher un thème</label><input class="input" id="module-search" type="search" placeholder="Ex. onboarding, feedback, sécurité…" autocomplete="off"><span class="tiny" id="module-count">'+MODULES.length+' parcours</span></div><div class="related"><a href="itineraires.html">🧭 Choisir un itinéraire adapté à mon objectif</a><a href="atelier.html">✎ Accéder aux cours détaillés et aux quiz</a><a href="reseau.html">⇄ Explorer les connaissances reliées</a></div><div id="module-detail"></div><div class="learning-grid" id="module-results">'+MODULES.map(moduleCard).join('')+'</div>';
}
function caseCard(c){
 return '<article class="learning-card"><div class="row space">'+pill(c.moduleId)+'<span class="tiny">'+esc(c.id)+'</span></div><h3>'+esc(c.title)+'</h3><p>'+esc(c.context)+'</p><a class="textlink" href="'+resourceHref('case',c.id)+'">Examiner le cas →</a></article>';
}
function caseDetail(c){
 return '<section class="panel learning-detail" id="detail"><div class="row space">'+pill(c.id+' · '+c.moduleId)+'<a class="textlink" href="cas-pratiques.html">Tous les cas ↗</a></div><h2>'+esc(c.title)+'</h2><div class="quote"><strong>SITUATION FICTIVE</strong>'+esc(c.context)+'</div><h3>'+esc(c.question)+'</h3><div id="case-choices">'+c.options.map((o,i)=>'<button class="choice" type="button" data-answer="'+i+'"><b>Option '+(i+1)+'</b> · '+esc(o.text)+'</button>').join('')+'</div><div id="case-feedback" class="feedback hidden" role="status" aria-live="polite"></div><div class="btnrow"><button class="secondary" id="case-retry" type="button">Essayer une autre réponse</button><a class="secondary" href="'+resourceHref('module',c.moduleId)+'">Voir le parcours associé</a></div><div class="related"><a href="atelier.html?module='+esc(c.moduleId)+'">✎ S’entraîner avec trois autres questions</a></div><h3>Question de réflexion</h3><p>'+esc(c.reflection)+'</p><p class="tiny">'+esc(c.notes)+'</p></section>';
}
function cases(){
 return title('Atelier des décisions','Cas pratiques RH','Douze situations fictives et contextualisées pour comparer des décisions professionnelles, recevoir un feedback explicatif et approfondir un parcours.')+'<div class="notice">Les réponses restent sur cet écran et ne sont ni enregistrées ni transmises. Une réponse privilégiée indique une piste de discussion, pas une évaluation individuelle.</div><div class="control-bar"><label for="case-filter">Filtrer par module</label><select class="input" id="case-filter"><option value="all">Tous les modules</option>'+MODULES.map(m=>'<option value="'+esc(m.id)+'">'+esc(m.id+' · '+m.title)+'</option>').join('')+'</select><span class="tiny" id="case-count">'+CASES.length+' cas</span></div><div id="case-detail"></div><div class="learning-grid" id="case-results">'+CASES.map(caseCard).join('')+'</div><div class="notice"><strong>Pour aller plus loin :</strong> le scénario <a href="simulation.html">S02 avec trois étapes</a> reste une expérience distincte, déjà exploitable en 2D et WebXR.</div>';
}
function docCard(d){
 return '<article class="learning-card"><div class="row space">'+pill(d.id)+'<span class="tiny">'+esc(d.moduleId)+'</span></div><h3>'+esc(d.title)+'</h3><p>'+esc(d.summary)+'</p><a class="textlink" href="'+resourceHref('doc',d.id)+'">Ouvrir le document DACI →</a></article>';
}
function docDetail(d){
 const m=getModule(d.moduleId),c=getCase(d.caseId);
 return '<article class="panel daci-reader" id="detail"><div class="row space">'+pill(d.id+' · v'+d.version)+'<a class="textlink" href="daci.html">Toute la bibliothèque ↗</a></div><h2>'+esc(d.title)+'</h2><p>'+esc(d.summary)+'</p><div class="tiny">'+esc(d.provenance.kind)+' · '+esc(d.provenance.reviewStatus)+' · '+esc(d.provenance.jurisdiction)+'</div><div class="notice"><strong>Statut :</strong> '+esc(d.status)+'. Le document enrichi et les liens fonctionnent ; RA, RV, IA générative et média 3D sont seulement prévus.</div><div class="row" role="group" aria-label="Options de consultation"><button type="button" class="secondary" id="toggle-annotations" aria-expanded="true">Masquer les annotations</button><button type="button" class="secondary" id="print-document">Imprimer</button><button type="button" class="secondary" id="export-semantic">Exporter les métadonnées JSON-LD</button></div><nav class="daci-toc" aria-label="Sommaire du document"><strong>Sommaire</strong>'+d.sections.map(s=>'<a href="#'+esc(d.id+'-'+s.anchor)+'">'+esc(s.title)+'</a>').join('')+'</nav><div id="daci-sections">'+d.sections.map((s,i)=>'<section class="daci-section" id="'+esc(d.id+'-'+s.anchor)+'"><span class="eyebrow">PARTIE '+(i+1)+'</span><h3>'+esc(s.title)+'</h3><p>'+esc(s.text)+'</p><aside class="learning-example"><b>Exemple de situation fictive</b><p>'+esc(s.example)+'</p><b>Question de vérification</b><p>'+esc(s.question)+'</p></aside><div class="daci-annotation"><div><strong>◈ Augmenté — point d’enrichissement</strong><p>'+esc(s.augmentation)+'</p></div><div><strong>⇄ Connecté — relation documentaire</strong><p>'+esc(s.connexion)+'</p></div></div></section>').join('')+'</div><div class="daci-future"><h3>Médias et IA prévus, non activés</h3><div class="related">'+d.mediaSlots.map(slot=>'<span class="pill neutral">'+esc(slot.type)+' · '+esc(slot.status)+' — '+esc(slot.description)+'</span>').join('')+'</div></div><div class="related"><a href="reseau.html?module='+esc(d.moduleId)+'">⇄ Voir les relations DACI</a><a href="atelier.html?module='+esc(d.moduleId)+'">✎ Approfondir le cours</a><a href="'+resourceHref('module',m.id)+'">▦ Parcours : '+esc(m.title)+'</a><a href="'+resourceHref('case',c.id)+'">◉ Mise en situation : '+esc(c.title)+'</a></div><div class="notice"><strong>Intelligent, aujourd’hui :</strong> recommandations déterministes par identifiant de module et relations documentaires explicitement déclarées. Aucun modèle IA n’est interrogé. Une IA générative future devra utiliser des sources autorisées, citer ses passages et permettre la vérification humaine.</div></article>';
}
function daci(){
 return title('Document augmenté · connecté · intelligent','Bibliothèque DACI','Des documents pédagogiques annotés, reliés aux parcours et aux mises en situation, prêts à accueillir plus tard des contenus 3D, RA, RV et des services IA encadrés.')+'<div class="daci-principles"><div><b>◈ Augmenté</b><p>'+esc(DACI_CAPABILITIES.augmented)+'</p></div><div><b>⇄ Connecté</b><p>'+esc(DACI_CAPABILITIES.connected)+'</p></div><div><b>✧ Intelligent</b><p>'+esc(DACI_CAPABILITIES.intelligent)+'</p></div></div><div class="notice">Démonstrateur documentaire : les annotations, les liens internes, l’impression et l’export JSON-LD sont actifs. Les QR codes, la RA, la RV, les modèles 3D et les assistants IA sont des intégrations futures, et ne sont pas simulés comme déjà disponibles.</div><div class="related"><a href="reseau.html">⇄ Explorer le réseau des connaissances</a><a href="atelier.html">✎ Atelier et outils réutilisables</a></div><div id="doc-detail"></div><div class="section-head"><h2>Documents pédagogiques</h2><span class="tiny">'+DOCUMENTS.length+' documents reliés</span></div><div class="learning-grid">'+DOCUMENTS.map(docCard).join('')+'</div>';
}
document.querySelector('#app').innerHTML=shell(page==='parcours'?parcours():page==='cases'?cases():daci());
if(page==='parcours'){
 const detail=document.querySelector('#module-detail');
 const id=params.get('module');
 const m=getModule(id);
 if(m)detail.innerHTML=moduleDetail(m);
 const input=document.querySelector('#module-search');
 input.addEventListener('input',()=>{
   const q=input.value.trim().toLocaleLowerCase('fr');
   const filtered=MODULES.filter(m=>(m.title+' '+m.summary+' '+m.objectives.join(' ')+' '+m.lessons.map(l=>l.title).join(' ')).toLocaleLowerCase('fr').includes(q));
   document.querySelector('#module-results').innerHTML=filtered.map(moduleCard).join('')||'<p>Aucun parcours correspondant à cette recherche.</p>';
   document.querySelector('#module-count').textContent=filtered.length+' parcours';
 });
}
if(page==='cases'){
 const select=document.querySelector('#case-filter');
 select.addEventListener('change',()=>{
   const filtered=CASES.filter(c=>select.value==='all'||c.moduleId===select.value);
   document.querySelector('#case-results').innerHTML=filtered.map(caseCard).join('')||'<p>Aucun cas pour ce module.</p>';
   document.querySelector('#case-count').textContent=filtered.length+' cas';
 });
 const c=getCase(params.get('case'));
 if(c){
   document.querySelector('#case-detail').innerHTML=caseDetail(c);
   const buttons=[...document.querySelectorAll('[data-answer]')];
   const feedback=document.querySelector('#case-feedback');
   const clear=()=>{feedback.classList.add('hidden');feedback.textContent='';buttons.forEach(b=>{b.disabled=false;b.classList.remove('selected')})};
   document.querySelector('#case-retry').addEventListener('click',clear);
   buttons.forEach(b=>b.addEventListener('click',()=>{
     const o=c.options[Number(b.dataset.answer)];
     buttons.forEach(btn=>{btn.disabled=true;btn.classList.toggle('selected',btn===b)});
     feedback.classList.remove('hidden');
     feedback.textContent=(o.preferred?'Piste privilégiée dans ce cas : ':'Cette option mérite discussion : ')+o.feedback+' Réfléchissez ensuite : '+c.reflection;
   }));
 }
}
if(page==='daci'){
 const d=getDocument(params.get('doc'));
 if(d){
  document.querySelector('#doc-detail').innerHTML=docDetail(d);
  const toggle=document.querySelector('#toggle-annotations');
  toggle.addEventListener('click',()=>{
   const hide=toggle.getAttribute('aria-expanded')==='true';
   document.querySelectorAll('.daci-annotation').forEach(node=>node.hidden=hide);
   toggle.setAttribute('aria-expanded',String(!hide));
   toggle.textContent=hide?'Afficher les annotations':'Masquer les annotations';
  });
  document.querySelector('#print-document').addEventListener('click',()=>window.print());
  document.querySelector('#export-semantic').addEventListener('click',()=>{
   const blob=new Blob([JSON.stringify(semanticRecord(d),null,2)],{type:'application/ld+json'});
   const url=URL.createObjectURL(blob);
   const a=document.createElement('a');a.href=url;a.download='rhxr-'+d.id+'-metadata.jsonld';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
 }
}
