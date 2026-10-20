import {MODULES,getModule} from './learning-data.mjs';
import {DOSSIERS,QUESTIONS,TEMPLATES,GLOSSARY,REFERENCES,teachingPack,quizFor,templateFor,checkAnswer} from './pedagogy-plus.mjs';
import {KNOWLEDGE_GRAPH,learningPath,neighbors,graphAsJsonLd} from './knowledge-graph.mjs';
import {ITINERARIES,getItinerary} from './itineraries.mjs';
import {BRANCHING_SCENARIOS} from './branching-scenarios.mjs';

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const qs=new URLSearchParams(location.search);
const page=document.body.dataset.page;
const chosen=MODULES.some(m=>m.id===qs.get('module'))?qs.get('module'):'M1';
const pill=(s)=>'<span class="pill neutral">'+esc(s)+'</span>';
function shell(content){
 const nav=[['index.html','⌂','Accueil'],['parcours.html','▦','Parcours'],['itineraires.html','🧭','Itinéraires guidés'],['cas-pratiques.html','◉','Cas pratiques'],['dialogues.html','◎','Dialogues ramifiés'],['atelier.html','✎','Atelier & outils'],['daci.html','▤','Documents DACI'],['reseau.html','⇄','Réseau DACI'],['simulation.html','◎','Simulation VR']];
 return '<div class="shell"><aside class="side"><div><a class="brand" href="index.html">RH<span>·</span>XR <small>LAB</small></a><div class="brand-sub">Formation et documents enrichissables<br>VR, RA et IA à leur juste place</div></div><div><div class="navlabel">RESSOURCES</div><nav class="nav" aria-label="Navigation principale">'+nav.map(([url,ico,label])=>'<a href="'+url+'" class="'+((page==='atelier'&&url==='atelier.html')||(page==='reseau'&&url==='reseau.html')||(page==='itineraires'&&url==='itineraires.html')?'active':'')+'"><span aria-hidden="true">'+ico+'</span>'+esc(label)+'</a>').join('')+'</nav></div><div class="side-foot">Ressources de démonstration · Tout reste dans cette session de navigateur. Aucune saisie envoyée à un serveur RH.</div></aside><main class="main"><header class="top"><span>RH·XR / <strong>'+(page==='atelier'?'Atelier pédagogique':page==='itineraires'?'Itinéraires de formation':'Réseau des connaissances')+'</strong></span>'+pill('Contenu V1.1')+'</header>'+content+'<footer class="footer">RH·XR · Formation sans classement personnel. IA générative, suivi individuel, modèles 3D et RA non intégrés dans cet espace.</footer></main></div>';
}
const select=(id,value)=>'<label for="'+id+'"><strong>Choisir un domaine de formation</strong></label><select id="'+id+'" class="input">'+MODULES.map(m=>'<option value="'+esc(m.id)+'" '+(m.id===value?'selected':'')+'>'+esc(m.id+' · '+m.title)+'</option>').join('')+'</select>';
const refLinks=()=>'<section class="panel" style="margin-top:18px"><h2>Repères et lectures de référence</h2><p class="tiny">Ces sources officielles constituent un cadre documentaire général. Les fiches et les cas RH·XR sont des créations pédagogiques fictives et ne constituent pas des traductions officielles ni des conseils juridiques.</p><div class="related">'+REFERENCES.map(r=>'<a href="'+esc(r.url)+'" target="_blank" rel="noopener noreferrer">'+esc(r.name)+' ↗</a>').join('')+'</div></section>';
function atelierBase(){
 return '<div class="eyebrow">Approfondissement pédagogique</div><h1 class="title">Atelier RH : apprendre, s’entraîner, produire</h1><p class="lead">Pour chaque module : un cours structuré en trois chapitres, une activité d’application, une autoévaluation commentée, un modèle de document réutilisable et un glossaire. Aucun score nominatif ni historique n’est stocké.</p><div class="notice"><b>Mode d’emploi :</b> choisir un domaine, lire le dossier, faire le quiz, puis remplir la fiche. Utilisez uniquement des exemples fictifs ou autorisés dans les zones de texte.</div><div class="control-bar">'+select('domain',chosen)+'</div><div id="workshop-content"></div>'+refLinks();
}
function dossier(m){
 const d=teachingPack(m.id),q=quizFor(m.id),t=templateFor(m.id);
 return '<section class="panel teaching-panel"><div class="row space">'+pill(m.id+' · Cours approfondi')+'<a class="textlink" href="parcours.html?module='+esc(m.id)+'">Voir le parcours complet ↗</a></div><h2>'+esc(d.title)+'</h2><p>'+esc(d.introduction)+'</p><div class="chapter-stack">'+d.chapters.map((c,i)=>'<details '+(i===0?'open':'')+' class="chapter"><summary><span class="eyebrow">Chapitre '+(i+1)+'</span> '+esc(c.title)+'</summary><p>'+esc(c.text)+'</p><div class="quote"><strong>À RETENIR / EXEMPLE</strong>'+esc(c.example)+'</div></details>').join('')+'</div><h3>Activité de mise en pratique</h3><p>'+esc(d.workshop.instruction)+'</p><p><strong>Production attendue :</strong> '+esc(d.workshop.expected)+'</p><h3>Grille de relecture formative</h3><ul class="learning-checklist">'+d.workshop.criteria.map((x,i)=>'<li><label><input type="checkbox" class="learning-check" data-check="'+i+'"> '+esc(x)+'</label></li>').join('')+'</ul><p class="tiny">Cette check-list reste locale et se réinitialise en quittant la page.</p></section>'+
 '<section class="panel teaching-panel" id="quiz"><div class="row space">'+pill(q.length+' questions')+pill('Sans notation personnelle')+'</div><h2>Autoévaluation commentée</h2><p>Choisissez une réponse par question. L’explication pédagogique s’affiche immédiatement ; recommencez librement. Aucune donnée n’est envoyée ni enregistrée.</p><div class="quiz-list">'+q.map((item,i)=>'<fieldset class="quiz-item" data-question="'+esc(item.id)+'"><legend>'+esc((i+1)+'. '+item.prompt)+'</legend>'+item.answers.map((ans,k)=>'<label class="quiz-option"><input type="radio" name="'+esc(item.id)+'" value="'+k+'"> <span>'+esc(ans)+'</span></label>').join('')+'<div class="quiz-feedback" hidden role="status" aria-live="polite"></div></fieldset>').join('')+'</div><button class="secondary" id="restart-quiz" type="button">Recommencer les questions</button></section>'+
 '<section class="panel teaching-panel" id="template"><div class="row space">'+pill('Modèle de travail')+pill(t.id)+'</div><h2>'+esc(t.title)+'</h2><p>'+esc(t.usage)+'</p><label for="workspace"><strong>Fiche personnalisable (texte local)</strong></label><textarea id="workspace" class="input workbook" rows="13" spellcheck="true">'+esc(t.title+'\n\n'+t.sections.join('\n\n'))+'</textarea><div class="btnrow"><button type="button" class="primary" id="download-template">Exporter ma fiche (.txt)</button><button type="button" class="secondary" id="reset-template">Réinitialiser</button></div><p class="tiny">Aucun enregistrement automatique. Évitez les noms ou informations RH identifiantes dans cette démonstration.</p></section>'+
 '<section class="panel teaching-panel"><h2>Glossaire du domaine</h2><dl class="glossary-list">'+GLOSSARY.filter(g=>g.moduleId===m.id).map(g=>'<div><dt>'+esc(g.term)+'</dt><dd>'+esc(g.definition)+'</dd></div>').join('')+'</dl><div class="related"><a href="reseau.html?module='+esc(m.id)+'">⇄ Explorer les relations documentaires</a><a href="daci.html">▤ Voir les documents DACI</a></div></section>';
}
function attachAtelier(m){
 const root=document.querySelector('#workshop-content');
 root.innerHTML=dossier(m);
 root.querySelectorAll('.quiz-item').forEach(el=>{
   el.querySelectorAll('input[type=radio]').forEach(input=>input.addEventListener('change',()=>{
     const result=checkAnswer(el.dataset.question,Number(input.value));
     if(!result)return;
     const feedback=el.querySelector('.quiz-feedback');
     feedback.hidden=false;
     feedback.textContent=(result.correct?'Cette réponse est pertinente. ':'À examiner : ')+result.explanation+' Réponse de référence pour ce cas : '+result.answer;
     el.querySelectorAll('input').forEach(x=>x.disabled=true);
   }));
 });
 root.querySelector('#restart-quiz').addEventListener('click',()=>{
   root.querySelectorAll('.quiz-item').forEach(el=>{
     el.querySelectorAll('input').forEach(x=>{x.disabled=false;x.checked=false});
     const f=el.querySelector('.quiz-feedback');f.hidden=true;f.textContent='';
   });
 });
 const textarea=root.querySelector('#workspace');
 const initial=textarea.value;
 root.querySelector('#reset-template').addEventListener('click',()=>{textarea.value=initial});
 root.querySelector('#download-template').addEventListener('click',()=>{
   const text=textarea.value;
   const blob=new Blob([text],{type:'text/plain;charset=utf-8'});
   const url=URL.createObjectURL(blob);
   const a=document.createElement('a');a.href=url;a.download='RHXR-'+m.id+'-fiche.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1200);
 });
}
function networkBase(){
 return '<div class="eyebrow">Documents augmentés · connectés · intelligents</div><h1 class="title">Réseau des connaissances RH·XR</h1><p class="lead">Explorateur de relations éditoriales entre parcours, chapitres, situations professionnelles, dossiers et fiches de travail. Les relations sont déclarées et vérifiables : elles ne sont pas inférées par une IA.</p><div class="notice"><strong>DACI aujourd’hui :</strong> chaque lien conduit vers une ressource pédagogique existante. Les annotations et les documents JSON-LD sont opérationnels ; l’assistant IA, la RA et les supports 3D seront ajoutés après validation des contenus et des modèles.</div><div class="metrics"><div class="metric"><span>Ressources liées</span><b>'+KNOWLEDGE_GRAPH.nodes.length+'</b><span>Nœuds éditoriaux</span></div><div class="metric"><span>Relations</span><b>'+KNOWLEDGE_GRAPH.edges.length+'</b><span>Liens vérifiés</span></div><div class="metric"><span>Domaines RH</span><b>'+MODULES.length+'</b><span>Parcours thématiques</span></div><div class="metric"><span>Données personnelles</span><b>0</b><span>Navigation sans compte</span></div></div><div class="control-bar">'+select('graph-domain',chosen)+'<button class="secondary" type="button" id="export-graph">Exporter le graphe JSON-LD</button></div><div id="graph-panel"></div>'+refLinks();
}
const typeLabel={module:'Parcours',lesson:'Séquence',case:'Cas pratique',document:'Document DACI',dossier:'Cours approfondi',template:'Modèle',dialogue:'Dialogue ramifié'};
function graphFor(id){
 const nodes=learningPath(id);
 const m=getModule(id);
 const categories=['module','dossier','lesson','case','dialogue','document','template'];
 return '<section class="panel learning-detail"><h2>'+esc(m.title)+'</h2><p>'+esc(m.summary)+'</p><p class="tiny">'+nodes.length+' ressources liées dans ce domaine</p><div class="graph-groups">'+categories.map(type=>{
  const group=nodes.filter(n=>n.type===type);
  if(!group.length)return '';
  return '<section class="graph-group"><h3>'+esc(typeLabel[type])+' <span class="tiny">('+group.length+')</span></h3><div class="graph-links">'+group.map(n=>'<a href="'+esc(n.href)+'" class="graph-link"><span>'+esc(n.label)+'</span><small>'+esc(n.id)+'</small></a>').join('')+'</div></section>';
 }).join('')+'</div><div class="notice"><strong>Exemple de cheminement :</strong> le parcours vous mène à son dossier détaillé et à ses séquences ; les cas permettent d’appliquer les notions ; les documents DACI fournissent un support structuré ; les fiches facilitent le transfert.</div></section>';
}
function itinerariesBase(){
 const selected=getItinerary(qs.get('itineraire'))?.id || 'I1';
 return '<div class="eyebrow">Choix explicite, sans profilage</div><h1 class="title">Votre itinéraire de formation RH</h1><p class="lead">Choisissez l’objectif qui vous intéresse : le site affiche un enchaînement de parcours, de cas et de documents. Cette recommandation est éditoriale, visible et modifiable, sans analyse de votre profil.</p><div class="notice">Il s’agit de suggestions pédagogiques et non d’un parcours obligatoire ou d’une orientation RH automatisée. Vous pouvez changer de parcours sans laisser de trace.</div><div class="control-bar"><label for="itinerary-select"><strong>Mon besoin de formation</strong></label><select id="itinerary-select" class="input">'+ITINERARIES.map(p=>'<option value="'+esc(p.id)+'" '+(p.id===selected?'selected':'')+'>'+esc(p.audience+' — '+p.title)+'</option>').join('')+'</select><button type="button" class="secondary" id="print-itinerary">Imprimer le plan</button></div><div id="itinerary-panel"></div><div class="related"><a href="atelier.html">✎ Explorer tous les cours et les outils</a><a href="reseau.html">⇄ Explorer les relations DACI</a></div>';
}
function showItinerary(id){
 const p=getItinerary(id);
 if(!p)return '';
 return '<section class="panel teaching-panel"><div class="row space">'+pill(p.id+' · '+p.audience)+pill(p.time)+'</div><h2>'+esc(p.title)+'</h2><p>'+esc(p.summary)+'</p><h3>Votre objectif de sortie</h3><p>'+esc(p.goal)+'</p><div class="chapter-stack">'+p.steps.map((step,i)=>{
  const m=getModule(step.moduleId);
  return '<article class="chapter"><div class="row space">'+pill('Étape '+(i+1))+'<span class="tiny">'+esc(step.moduleId)+'</span></div><h3>'+esc(m.title)+'</h3><p>'+esc(step.action)+'</p><p><strong>Production attendue :</strong> '+esc(step.evidence)+'</p><div class="related"><a href="parcours.html?module='+esc(step.moduleId)+'">▦ Parcours</a><a href="atelier.html?module='+esc(step.moduleId)+'">✎ Cours et quiz</a><a href="cas-pratiques.html?case='+esc(step.caseId)+'">◉ Cas '+esc(step.caseId)+'</a>'+BRANCHING_SCENARIOS.filter(s=>s.moduleId===step.moduleId).map(s=>'<a href="dialogues.html?scenario='+esc(s.id)+'">◎ Dialogue '+esc(s.id)+'</a>').join('')+'<a href="daci.html?doc='+esc(step.documentId)+'">▤ Document '+esc(step.documentId)+'</a></div></article>';
 }).join('')+'</div><div class="notice"><strong>Extension multimodale à venir :</strong> '+esc(p.futureXR)+'</div><p class="tiny">Aucun résultat individuel enregistré. Le plan et ses liens sont librement consultables et imprimables.</p></section>';
}
document.querySelector('#app').innerHTML=shell(page==='atelier'?atelierBase():page==='itineraires'?itinerariesBase():networkBase());
if(page==='atelier'){
 const select=document.querySelector('#domain');
 const render=()=>{const m=getModule(select.value);if(m)attachAtelier(m)};
 select.addEventListener('change',()=>{
  history.replaceState(null,'','atelier.html?module='+encodeURIComponent(select.value));
  render();
 });
 render();
}
if(page==='reseau'){
 const select=document.querySelector('#graph-domain');
 const render=()=>{document.querySelector('#graph-panel').innerHTML=graphFor(select.value)};
 select.addEventListener('change',()=>{
  history.replaceState(null,'','reseau.html?module='+encodeURIComponent(select.value));
  render();
 });
 document.querySelector('#export-graph').addEventListener('click',()=>{
  const blob=new Blob([JSON.stringify(graphAsJsonLd(),null,2)],{type:'application/ld+json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='RHXR-reseau-DACI.jsonld';a.click();setTimeout(()=>URL.revokeObjectURL(url),1200);
 });
 render();
}

if(page==='itineraires'){
 const select=document.querySelector('#itinerary-select');
 const render=()=>{document.querySelector('#itinerary-panel').innerHTML=showItinerary(select.value)};
 select.addEventListener('change',()=>{
  history.replaceState(null,'','itineraires.html?itineraire='+encodeURIComponent(select.value));
  render();
 });
 document.querySelector('#print-itinerary').addEventListener('click',()=>window.print());
 render();
}
