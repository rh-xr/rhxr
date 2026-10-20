/** Situation fictive, moteur pédagogique déterministe : aucune donnée personnelle conservée. */
export const scenario=Object.freeze({
 id:'S02',version:'0.1.0',title:{fr:'Gérer un désaccord professionnel',en:'Handle a workplace disagreement',ar:'إدارة خلاف مهني'},
 duration:'10–15 min',competencies:['Écoute active','Clarification des faits','Recherche de solutions'],
 phases:['ouverture','clarification','solution'],
 exchanges:[
  {id:'a1',phase:'ouverture',avatar:'Je trouve injuste la répartition des tâches dans notre équipe et cela commence à affecter ma motivation.',choices:[
   {id:'a1a',text:'Je comprends que cette situation vous pèse. Pouvez-vous me décrire ce qui vous semble déséquilibré ?',feedback:'Vous accueillez le ressenti et demandez des éléments précis.',skill:'Écoute active',points:2,next:'a2'},
   {id:'a1b',text:'Tout le monde a beaucoup de travail. Il faut simplement faire avec.',feedback:'Cette réponse ferme la discussion et ne clarifie pas le problème.',skill:'Écoute active',points:0,next:'a2'},
   {id:'a1c',text:'Si vous avez un problème, voyez cela directement avec vos collègues.',feedback:'Vous orientez trop vite vers une solution sans comprendre le désaccord.',skill:'Écoute active',points:1,next:'a2'}]},
  {id:'a2',phase:'clarification',avatar:'Depuis trois semaines, je reprends régulièrement les urgences de deux autres collègues, sans que cela ait été discuté avec moi.',choices:[
   {id:'a2a',text:'Pouvez-vous me donner deux exemples et préciser les conséquences sur vos missions ?',feedback:'Vous recueillez des faits observables avant de conclure.',skill:'Clarification des faits',points:2,next:'a3'},
   {id:'a2b',text:'Je suis certain que vos collègues ont de bonnes raisons.',feedback:'Vous supposez une explication sans avoir vérifié les faits.',skill:'Clarification des faits',points:0,next:'a3'},
   {id:'a2c',text:'D’accord, le problème vient donc uniquement de vos collègues.',feedback:'Vous tirez une conclusion hâtive sans examiner les informations.',skill:'Clarification des faits',points:1,next:'a3'}]},
  {id:'a3',phase:'solution',avatar:'Je voudrais surtout que nous mettions à plat qui fait quoi, et que les urgences soient réparties plus clairement.',choices:[
   {id:'a3a',text:'Organisons une revue des priorités avec l’équipe, convenons de règles de répartition, puis faisons un point la semaine prochaine.',feedback:'Vous proposez une action collective, concrète et un suivi.',skill:'Recherche de solutions',points:2,next:null},
   {id:'a3b',text:'Dès demain, je confierai toutes les urgences à quelqu’un d’autre.',feedback:'Une décision unilatérale peut déplacer le problème sans le résoudre.',skill:'Recherche de solutions',points:1,next:null},
   {id:'a3c',text:'Nous verrons si la situation s’améliore naturellement.',feedback:'Vous ne définissez aucun engagement concret ni date de suivi.',skill:'Recherche de solutions',points:0,next:null}]}
 ]});
export function validateScenario(s){
 const errors=[];
 if(!s||!Array.isArray(s.exchanges)||!s.exchanges.length)return ['Scénario vide'];
 const ids=new Set(s.exchanges.map(e=>e.id));
 for(const e of s.exchanges){
  if(!s.phases.includes(e.phase))errors.push('Phase inconnue : '+e.id);
  if(!e.avatar||!Array.isArray(e.choices)||e.choices.length<2)errors.push('Échange incomplet : '+e.id);
  for(const c of e.choices||[]){
   if(c.next&&!ids.has(c.next))errors.push('Destination inconnue : '+c.next);
   if(!Number.isInteger(c.points)||c.points<0||c.points>2)errors.push('Score invalide : '+c.id);
   if(!c.feedback||c.feedback.length<20)errors.push('Retour pédagogique insuffisant : '+c.id);
  }
 }
 return errors;
}
export function startSession(s=scenario){return {scenarioId:s.id,version:s.version,current:s.exchanges[0].id,answers:[],done:false};}
export function answer(session,choiceId,s=scenario){
 if(session.done)throw new Error('Session terminée');
 const node=s.exchanges.find(e=>e.id===session.current);
 if(!node)throw new Error('État de session inconnu');
 const choice=node.choices.find(c=>c.id===choiceId);
 if(!choice)throw new Error('Choix non autorisé');
 return {...session,current:choice.next,done:choice.next===null,answers:[...session.answers,{exchangeId:node.id,phase:node.phase,choiceId,points:choice.points,skill:choice.skill,feedback:choice.feedback,text:choice.text}]};
}
export function summary(session,s=scenario){
 const max=s.exchanges.length*2,score=session.answers.reduce((a,b)=>a+b.points,0);
 return {score,max,percent:Math.round(score*100/max),feedback:session.answers.map(a=>({phase:a.phase,skill:a.skill,points:a.points,feedback:a.feedback}))};
}
