import {BRANCHING_SCENARIOS,getBranchingScenario,startBranching,chooseBranch,pathSummary} from './branching-scenarios.mjs';
import {getModule} from './learning-data.mjs';
import {getDocument} from './daci-data.mjs';
import {returnHref} from './daci-section-activities.mjs';
import {guideFor} from './facilitator-guides.mjs';

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const requested=new URLSearchParams(location.search).get('scenario');
let scenario=getBranchingScenario(requested) || BRANCHING_SCENARIOS[0];
let state=startBranching(scenario),waiting=false;
const nav=[['index.html','⌂','Accueil'],['parcours.html','▦','Parcours'],['itineraires.html','◇','Itinéraires'],['cas-pratiques.html','◉','Mini-cas'],['dialogues.html','◎','Dialogues guidés'],['atelier.html','✎','Atelier'],['daci.html','▤','DACI'],['reseau.html','⇄','Réseau DACI'],['simulation.html','◈','Simulation VR']];
const pill=s=>'<span class="pill neutral">'+esc(s)+'</span>';
const shell=html=>'<div class="shell"><aside class="side"><div><a class="brand" href="index.html">RH<span>·</span>XR <small>LAB</small></a><div class="brand-sub">Formations RH et simulation de dialogue</div></div><div><div class="navlabel">PARCOURS</div><nav class="nav" aria-label="Navigation principale">'+nav.map(([href,ic,label])=>'<a href="'+href+'" class="'+(href==='dialogues.html'?'active':'')+'"><span aria-hidden="true">'+ic+'</span>'+esc(label)+'</a>').join('')+'</nav></div><div class="side-foot">Situations fictives · aucun score personnel · aucun enregistrement des réponses.</div></aside><main class="main"><header class="top"><span>RH·XR / <strong>Laboratoire de dialogues</strong></span>'+pill('Simulation pédagogique textuelle')+'</header>'+html+'<footer class="footer">Les scénarios sont des supports d’entraînement, pas des instruments d’évaluation RH. La déclinaison VR avec avatars 3D sera envisagée lorsque les modèles seront disponibles.</footer></main></div>';
function download(name,text,type){
 const blob=new Blob([text],{type});const url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1200);
}
const app=document.querySelector('#app');
app.innerHTML=shell('<div class="eyebrow">Soft Skills Lab · simulations ramifiées</div><h1 class="title">Dialogues professionnels guidés</h1><p class="lead">Cinq conversations RH en trois phases. Vos décisions font évoluer la réaction de l’interlocuteur fictif. Le débriefing explique les effets des réponses sans vous attribuer de profil ou de note.</p><div class="notice">Simulation textuelle active dès maintenant. L’avatar 3D, la conversation IA et la transposition RV sont des améliorations futures. Vos choix restent dans la mémoire de cette page et disparaissent lorsque vous la quittez.</div><div class="control-bar"><label for="dialogue-select">Choisir une situation</label><select class="input" id="dialogue-select">'+BRANCHING_SCENARIOS.map(s=>'<option value="'+esc(s.id)+'">'+esc(s.id+' · '+s.title)+'</option>').join('')+'</select></div><div class="two dialogue-layout"><section class="panel"><div class="row space">'+pill('Situation professionnelle fictive')+'<span id="dialogue-phase" class="tiny">Phase 1 / 3</span></div><h2 id="dialogue-title"></h2><p id="dialogue-objective"></p><div class="progress" aria-hidden="true"><div id="dialogue-progress" style="width:33%"></div></div><div id="dialogue-stage" aria-live="polite"></div><div id="dialogue-feedback" class="feedback hidden" role="status" aria-live="polite"></div><div class="btnrow"><button type="button" class="primary hidden" id="dialogue-next">Poursuivre →</button><button type="button" class="secondary" id="dialogue-restart">Recommencer</button></div></section><aside class="panel"><h2>Objectifs et ressources</h2><p id="dialogue-learning"></p><h3>Trace formative de la session</h3><ol id="dialogue-history" class="learning-history"><li>Vos décisions et retours pédagogiques apparaîtront ici.</li></ol><div id="dialogue-links" class="related"></div><div id="facilitator-zone"></div></aside></div>');
const returnTarget=returnHref(new URLSearchParams(location.search).get('returnTo'));
if(returnTarget){
 const link=document.createElement('div');
 link.className='notice daci-return';
 const a=document.createElement('a');
 a.href=returnTarget;
 a.textContent='↩ Revenir à la section DACI après cette simulation';
 link.append(a);
 document.querySelector('#dialogue-select').closest('.control-bar').before(link);
}
const select=document.querySelector('#dialogue-select');select.value=scenario.id;
const title=document.querySelector('#dialogue-title'),objective=document.querySelector('#dialogue-objective'),stage=document.querySelector('#dialogue-stage');
const feedback=document.querySelector('#dialogue-feedback'),next=document.querySelector('#dialogue-next'),historyList=document.querySelector('#dialogue-history');
function markdown(){
 const summary=pathSummary(scenario,state);
 let lines=['# '+summary.title,'','Simulation RH·XR fictive — débriefing non nominatif','','## Objectif pédagogique',scenario.objective,''];
 for(const item of summary.decisions){lines.push('### Phase '+item.phase,'','**Choix** : '+item.choice,'','**Critère discuté** : '+item.criterion,'','**Explication** : '+item.feedback,'');}
 lines.push('## Questions de réflexion','',...summary.questions.map((q,i)=>(i+1)+'. '+q),'','**Production attendue :** '+summary.evidence,'','Document pédagogique de démonstration ; aucune décision RH ne peut découler de cet exercice.');
 return lines.join('\n');
}
function facilitatorMarkup(g){
 if(!g)return '';
 const section=(label,items)=>'<h4>'+esc(label)+'</h4><ul>'+items.map(i=>'<li>'+esc(i)+'</li>').join('')+'</ul>';
 return '<details class="facilitator-guide"><summary>Guide de facilitation pour formateurs</summary><p class="tiny">'+esc(g.audience)+' · '+esc(g.duration)+'</p><p>'+esc(g.opening)+'</p>'+
 section('Répartition des rôles',g.roles)+section('Déroulement de séance',g.sequence)+
 section('Erreurs à discuter',g.pitfalls)+section('Critères à observer',g.observables)+
 '<div class="notice"><b>Prolongement futur :</b> '+esc(g.extension)+'</div><button type="button" class="secondary" id="export-facilitator">Exporter ce guide (.md)</button></details>';
}
function facilitatorMarkdown(g){
 return ['# RH·XR · Guide formateur — '+scenario.title,'','Public : '+g.audience,'Durée : '+g.duration,'',g.opening,'',...[
  ['Rôles',g.roles],['Déroulement',g.sequence],['Points de vigilance',g.pitfalls],['Observables formatifs',g.observables]
 ].flatMap(([h,items])=>['## '+h,'',...items.map(i=>'- '+i),'']),
 '## Extension future','',g.extension,'','Document de travail fictif : ne pas enregistrer de données RH réelles ni utiliser cet exercice pour des décisions individuelles.'].join('\n');
}
function render(){
 title.textContent=scenario.title;
 objective.textContent=scenario.objective;
 document.querySelector('#dialogue-phase').textContent=state.done?'Débriefing':('Phase '+(state.history.length+1)+' / 3');
 document.querySelector('#dialogue-progress').style.width=state.done?'100%':(100*(state.history.length+1)/3)+'%';
 document.querySelector('#dialogue-learning').textContent=scenario.objective;
 const guide=guideFor(scenario.id);
 document.querySelector('#facilitator-zone').innerHTML=facilitatorMarkup(guide);
 const exportGuide=document.querySelector('#export-facilitator');
 if(exportGuide)exportGuide.addEventListener('click',()=>download('RHXR-'+scenario.id+'-guide-formateur.md',facilitatorMarkdown(guide),'text/markdown;charset=utf-8'));
 document.querySelector('#dialogue-links').innerHTML='<a href="parcours.html?module='+encodeURIComponent(scenario.moduleId)+'">▦ Parcours associé</a>'+(getDocument(scenario.daci)?'<a href="daci.html?doc='+encodeURIComponent(scenario.daci)+'">▤ Document DACI '+esc(scenario.daci)+'</a>':'')+'<a href="atelier.html?module='+encodeURIComponent(scenario.moduleId)+'">✎ Cours et fiche</a>';
 feedback.classList.add('hidden');next.classList.add('hidden');waiting=false;
 historyList.innerHTML=state.history.length?state.history.map((x,i)=>'<li><b>Décision '+(i+1)+'</b><p>'+esc(x.criterion)+' — '+esc(x.feedback)+'</p></li>').join(''):'<li>Vos décisions et retours pédagogiques apparaîtront ici.</li>';
 if(state.done){
  const recap=pathSummary(scenario,state);
  stage.innerHTML='<div class="eyebrow">Parcours terminé</div><h3>Débriefing de votre dialogue</h3><p>Vous avez parcouru trois phases. Les choix ci-dessous sont des occasions de réflexion, sans note ni conclusion sur vos compétences professionnelles.</p>'+recap.decisions.map((d,i)=>'<div class="result"><b>Phase '+(i+1)+' · '+esc(d.criterion)+'</b><p>'+esc(d.choice)+'</p><p>'+esc(d.feedback)+'</p></div>').join('')+'<h3>Questions à discuter avec un formateur</h3><ul>'+recap.questions.map(q=>'<li>'+esc(q)+'</li>').join('')+'</ul><div class="notice"><b>Production attendue :</b> '+esc(recap.evidence)+'</div><div class="btnrow"><button type="button" class="primary" id="export-brief">Exporter mon débriefing (.md)</button></div>';
  document.querySelector('#export-brief').addEventListener('click',()=>download('RHXR-'+scenario.id+'-debriefing.md',markdown(),'text/markdown;charset=utf-8'));
  return;
 }
 const node=scenario.nodes.find(x=>x.id===state.nodeId);
 if(!node){stage.textContent='Ce scénario est temporairement indisponible.';return;}
 stage.innerHTML='<div class="quote"><strong>'+esc(node.speaker.toLocaleUpperCase('fr'))+'</strong>« '+esc(node.text)+' »</div><h3>'+esc(node.prompt)+'</h3>'+node.choices.map((c,i)=>'<button type="button" class="choice" data-choice="'+esc(c.id)+'"><b>Option '+(i+1)+'</b> · '+esc(c.text)+'</button>').join('');
 stage.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{
  if(waiting)return;
  waiting=true;
  const choice=node.choices.find(c=>c.id===b.dataset.choice);
  state=chooseBranch(scenario,state,choice.id);
  stage.querySelectorAll('[data-choice]').forEach(btn=>{btn.disabled=true;btn.classList.toggle('selected',btn===b)});
  feedback.textContent=choice.feedback;
  feedback.classList.remove('hidden');
  next.textContent=state.done?'Voir le débriefing →':'Phase suivante →';
  next.classList.remove('hidden');
 }));
}
select.addEventListener('change',()=>{
 scenario=getBranchingScenario(select.value);
 state=startBranching(scenario);
 history.replaceState(null,'','dialogues.html?scenario='+encodeURIComponent(scenario.id));
 render();
});
next.addEventListener('click',render);
document.querySelector('#dialogue-restart').addEventListener('click',()=>{state=startBranching(scenario);render()});
render();
