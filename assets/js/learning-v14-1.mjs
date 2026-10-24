/** V14.1 — renderer-independent pedagogical state machine.
 * Fictional DACI bundle is the authoritative source. S02 is preserved without invented citations.
 */
import {scenario as s02} from './scenario.mjs';
import {EXTRA_DESCRIPTORS,CASE_FILES,extendDaciBundle} from './content-cases-v14-2.mjs';

export const MISSIONS=Object.freeze([
  {id:'onboarding',label:'01  Accueil de Salma',topic:'Intégration'},
  {id:'entretien',label:'02  Entretien avec Alex',topic:'Entretien'},
  {id:'conflit',label:'03  Médiation Amina/Youssef',topic:'Conflit'},
  {id:'s02',label:'04  Désaccord professionnel',topic:'S02'},
  ...EXTRA_DESCRIPTORS
]);
export const LEARNING_OBJECTIVES=Object.freeze({
  onboarding:'Clarifier les missions, identifier les référents et sécuriser une première semaine d’intégration.',
  entretien:'Instaurer un cadre d’échange, rechercher des faits, formuler des actions et préciser le suivi.',
  conflit:'Écouter équitablement, distinguer faits et interprétations, désamorcer et organiser un suivi.',
  s02:'Écoute active, clarification des faits et recherche d’une solution réalisable avec un suivi.',
  recrutement:'Appliquer des critères professionnels explicites, vérifier les outils d’IA et documenter un recrutement inclusif.',
  confidentialite:'Limiter les données et leurs destinataires, protéger les dossiers et réagir de façon appropriée à un incident.',
  hybride:'Organiser une information accessible, des réunions participatives, la clarification des tensions et le suivi commun.'
});
const clean=t=>typeof t==='string'?t:'';
export function createLearningSession(bundle){
  if(bundle?.version!=='V13'||bundle.fictional_only!==true||!Array.isArray(bundle.stories)||!bundle.answers)
    throw Error('Corpus fictif DACI V13 manquant ou invalide');
  const corpus=extendDaciBundle(bundle);
  const bySlug=new Map(corpus.stories.map(s=>[s.slug,s]));
  for(const m of MISSIONS.filter(m=>m.id!=='s02'))if(!bySlug.has(m.id))throw Error('Mission absente : '+m.id);
  let mission='onboarding',nodeId=bySlug.get(mission).start,step=0,pending=null,showDoc=false,showBrief=false,history=[];
  function currentNode(){
    return mission==='s02'?s02.exchanges[step]||null:bySlug.get(mission).nodes.find(n=>n.id===nodeId)||null;
  }
  const setMission=id=>{
    if(!MISSIONS.some(m=>m.id===id))throw Error('Mission inconnue : '+id);
    mission=id;nodeId=mission==='s02'?s02.exchanges[0].id:bySlug.get(mission).start;
    step=0;pending=null;showDoc=false;showBrief=false;history=[];
    return view();
  };
  function choose(id){
    if(pending||!currentNode())return false;
    const n=currentNode(),choice=(n.choices||[]).find(c=>c.id===id);
    if(!choice)return false;
    if(mission==='s02'){
      pending={id,response:{next_node_id:choice.next,quality:choice.points===2?'bonne pratique':choice.points===1?'à approfondir':'risque',
        character_reaction:'',feedback:clean(choice.feedback),pedagogical_note:'Analyse formative fondée sur les choix de la simulation S02.',
        source_title:'Repère pédagogique S02',citation:null,quote:null}};
    }else{
      const result=corpus.answers[mission+':'+n.id+':'+id];
      if(result?.status!=='completed_step'||result.node_id!==n.id)return false;
      pending={id,response:result};
    }
    showDoc=false;showBrief=false;return true;
  }
  function next(){
    if(!pending)return false;
    history.push({mission,node_id:currentNode()?.id,choice_id:pending.id,quality:pending.response.quality,
      feedback:pending.response.feedback,citation:pending.response.citation||null});
    if(mission==='s02')step++;else nodeId=pending.response.next_node_id;
    pending=null;showDoc=false;showBrief=false;return true;
  }
  function toggleDocument(){if(!pending||mission==='s02')return false;showBrief=false;showDoc=!showDoc;return showDoc;}
  function toggleBrief(){showDoc=false;showBrief=!showBrief;return showBrief;}
  function view(){
    const spec=MISSIONS.find(m=>m.id===mission),n=currentNode(),ending=mission==='s02'?step>=s02.exchanges.length:!n||n.kind==='ending';
    const r=pending?.response||null;
    const citations=history.filter(h=>h.citation).length;
    const caseFile=CASE_FILES[mission];
    const story=mission==='s02'?null:bySlug.get(mission);
    const competencies=mission==='s02'?s02.competencies:story.skills;
    const qualityProfile={
      appropriate:history.filter(h=>['appropriate','bonne pratique'].includes(h.quality)).length,
      incomplete:history.filter(h=>['incomplete','à approfondir','recovered'].includes(h.quality)).length,
      risky:history.filter(h=>['risky','risque'].includes(h.quality)).length
    };
    return {
      mission,title:spec.label,topic:spec.topic,objective:LEARNING_OBJECTIVES[mission],
      setting:mission==='s02'?'Vous êtes responsable d’une équipe fictive et devez répondre à un désaccord sur la répartition des urgences.':story.setting,
      competencies:[...competencies],caseFile:{...caseFile},
      showBrief,qualityProfile,phase:clean(n?.phase),actor:clean(n?.actor)||(mission==='s02'?'Collaborateur':'Formateur'),
      dialogue:mission==='s02'?clean(n?.avatar):clean(n?.dialogue),
      question:mission==='s02'?'Quelle réponse choisissez-vous ?':clean(n?.question),
      choices:pending||ending?[]:(n?.choices||[]).map((c,i)=>({id:c.id,label:clean(c.label||c.text),key:String.fromCharCode(65+i)})),
      pending:!!pending,ending,showDoc,steps:history.length,quality:r?.quality||'',
      reaction:clean(r?.character_reaction),feedback:clean(r?.feedback),note:clean(r?.pedagogical_note),
      citation:clean(r?.citation),sourceTitle:clean(r?.source_title),quote:clean(r?.quote),
      completed:citations,history:history.map(h=>({...h})),
      summary:ending?history.map((h,i)=>(i+1)+'. '+h.feedback).join('\\n'):'',
      debrief:ending?{
        takeaways:['Points solides : '+qualityProfile.appropriate,'À approfondir : '+qualityProfile.incomplete,
          'Décisions à réexaminer : '+qualityProfile.risky],
        recommendedAction:caseFile.practice,warning:caseFile.vigilance
      }:null
    };
  }
  return {view,setMission,choose,next,toggleDocument,toggleBrief,reset:()=>setMission(mission),missions:MISSIONS};
}
