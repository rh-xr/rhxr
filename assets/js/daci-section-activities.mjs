/** RH·XR — Section-level DACI pedagogical connections.
 * Editorially curated, no personalization, tracking, scoring or generative inference.
 */
import {DOCUMENTS} from './daci-data.mjs';
import {MODULES} from './learning-data.mjs';
import {CASES} from './case-data.mjs';
import {BRANCHING_SCENARIOS} from './branching-scenarios.mjs';
import {quizFor,templateFor} from './pedagogy-plus.mjs';

export const SECTION_ACTIVITIES = [
  {
    "documentId": "D01",
    "anchor": "avant",
    "kind": "case",
    "id": "C01",
    "task": "Élaborer une liste d’accueil de secours qui reste utile sans accès informatique.",
    "why": "Une préparation claire évite de laisser un nouvel arrivant sans repères.",
    "reflection": "Quelles informations et personnes ressources sont indispensables le premier jour ?"
  },
  {
    "documentId": "D01",
    "anchor": "premier",
    "kind": "case",
    "id": "C02",
    "task": "Dessiner une carte des interlocuteurs et des moments de rencontre de la première semaine.",
    "why": "La découverte de l’équipe a besoin d’un accompagnement humain, notamment à distance.",
    "reflection": "Comment équilibrer autonomie et possibilités de dialogue ?"
  },
  {
    "documentId": "D01",
    "anchor": "suivi",
    "kind": "quiz",
    "id": "M1",
    "task": "Comparer trois décisions d’intégration et justifier un point de suivi non intrusif.",
    "why": "L’autoévaluation invite à distinguer soutien et surveillance.",
    "reflection": "Quelle question ouverte aiderait à améliorer le parcours ?"
  },
  {
    "documentId": "D02",
    "anchor": "observations",
    "kind": "case",
    "id": "C04",
    "task": "Réécrire un feedback sur une version obsolète en distinguant faits et interprétations.",
    "why": "Un retour fondé sur des faits permet d’aborder les causes sans juger la personnalité.",
    "reflection": "Quelle formulation vérifiable préférez-vous et pourquoi ?"
  },
  {
    "documentId": "D02",
    "anchor": "dialogue",
    "kind": "dialogue",
    "id": "S11",
    "task": "Conduire une conversation ramifiée autour d’un désaccord de répartition des urgences.",
    "why": "La réaction fictive évolue selon le choix initial et ouvre un débriefing explicatif.",
    "reflection": "À quel moment avez-vous reformulé un besoin plutôt que présumé une cause ?"
  },
  {
    "documentId": "D02",
    "anchor": "suivi",
    "kind": "template",
    "id": "M2",
    "task": "Rédiger un bref accord : actions, rôles responsables et date de revue.",
    "why": "Le transfert dans une fiche réutilisable rend les engagements vérifiables.",
    "reflection": "Quel élément permettrait de vérifier le suivi sans surveiller la personne ?"
  },
  {
    "documentId": "D03",
    "anchor": "identifier",
    "kind": "case",
    "id": "C06",
    "task": "Identifier faits, hypothèses et mesure préventive dans un presque-accident fictif.",
    "why": "Le cas apprend à distinguer prévention, sécurité et attribution de faute.",
    "reflection": "Quels éléments manquent avant de conclure ?"
  },
  {
    "documentId": "D03",
    "anchor": "agir",
    "kind": "dialogue",
    "id": "S12",
    "task": "Réagir au signalement selon un circuit d’alerte et un contexte de sécurité fictifs.",
    "why": "Le dialogue compare une réaction précipitée à une démarche préventive structurée.",
    "reflection": "Quelle action exige la validation d’un responsable habilité ?"
  },
  {
    "documentId": "D03",
    "anchor": "ameliorer",
    "kind": "template",
    "id": "M4",
    "task": "Construire une fiche factuelle de prévention et organiser sa relecture locale.",
    "why": "La fiche facilite une action durable sans simuler de procédure de sécurité universelle.",
    "reflection": "Comment vérifier l’efficacité réelle d’une mesure ?"
  },
  {
    "documentId": "D04",
    "anchor": "cadre",
    "kind": "case",
    "id": "C09",
    "task": "Clarifier une incompréhension dans un échange écrit et proposer une règle partagée.",
    "why": "Le cas fait apparaître le rôle des canaux et des interprétations.",
    "reflection": "Quelle convention d’équipe pourrait prévenir ce malentendu ?"
  },
  {
    "documentId": "D04",
    "anchor": "reunion",
    "kind": "dialogue",
    "id": "S13",
    "task": "Animer un dialogue autour de la participation à une réunion hybride.",
    "why": "Une simulation ramifiée aide à formuler des règles d’inclusion concrètes.",
    "reflection": "Quelle contribution écrite ou différée faut-il permettre ?"
  },
  {
    "documentId": "D04",
    "anchor": "traces",
    "kind": "template",
    "id": "M6",
    "task": "Rédiger un relevé de décisions utile sans historiser toutes les conversations.",
    "why": "Une trace concise soutient la collaboration sans collecte excessive.",
    "reflection": "Comment retrouver la décision lors d’un prochain projet ?"
  },
  {
    "documentId": "D05",
    "anchor": "forces",
    "kind": "template",
    "id": "M5",
    "task": "Décrire une réalisation fictive attestant une compétence observable.",
    "why": "La fiche aide à justifier une compétence par des faits plutôt que des qualificatifs.",
    "reflection": "Quelle preuve serait utile sans compromettre la confidentialité ?"
  },
  {
    "documentId": "D05",
    "anchor": "objectif",
    "kind": "case",
    "id": "C07",
    "task": "Transformer une intention générale en objectif de progression observable.",
    "why": "Le mini-cas incite à formuler un objectif réaliste et daté.",
    "reflection": "Quel soutien rendra l’objectif atteignable ?"
  },
  {
    "documentId": "D05",
    "anchor": "bilan",
    "kind": "quiz",
    "id": "M5",
    "task": "Vérifier la différence entre bilan d’apprentissage et classement professionnel.",
    "why": "L’autoévaluation donne des explications sans conclure sur le potentiel d’une personne.",
    "reflection": "Comment formuler un retour centré sur la progression ?"
  },
  {
    "documentId": "D06",
    "anchor": "finalite",
    "kind": "case",
    "id": "C12",
    "task": "Cadrer un projet d’assistant documentaire sur des données fictives.",
    "why": "Le cas oblige à définir la finalité avant toute connexion d’informations.",
    "reflection": "Quelle valeur pédagogique subsiste sans dossiers RH réels ?"
  },
  {
    "documentId": "D06",
    "anchor": "donnees",
    "kind": "dialogue",
    "id": "S14",
    "task": "Recadrer une demande de classement nominatif issue de scores formatifs.",
    "why": "Le dialogue montre pourquoi l’usage de résultats pédagogiques doit rester proportionné.",
    "reflection": "Quels indicateurs agrégés aideraient à améliorer les activités ?"
  },
  {
    "documentId": "D06",
    "anchor": "controle",
    "kind": "quiz",
    "id": "M8",
    "task": "Contrôler les limites d’une évaluation et la nécessité du jugement humain.",
    "why": "Le quiz consolide les précautions relatives aux usages de l’IA et des données.",
    "reflection": "Quelle source ou vérification manque avant d’accepter une conclusion ?"
  }
];
const FINDERS={
 case:(item)=>CASES.find(c=>c.id===item.id),
 dialogue:(item)=>BRANCHING_SCENARIOS.find(s=>s.id===item.id),
 quiz:(item)=>MODULES.find(m=>m.id===item.id)&&quizFor(item.id).length>0?{moduleId:item.id}:null,
 template:(item)=>templateFor(item.id)?{moduleId:item.id}:null
};
export function getSectionActivity(documentId,anchor){
 return SECTION_ACTIVITIES.find(s=>s.documentId===documentId&&s.anchor===anchor)||null;
}
export function sectionReturnToken(documentId,anchor){
 if(!DOCUMENTS.some(d=>d.id===documentId&&d.sections.some(s=>s.anchor===anchor)))return null;
 return documentId+':'+anchor;
}
/** Reject arbitrary / external URLs; only reconstruct a known document and anchor. */
export function returnHref(token){
 if(typeof token!=='string'||token.length>100)return null;
 const match=/^(D\d{2}):([a-z0-9-]+)$/.exec(token);
 if(!match||!sectionReturnToken(match[1],match[2]))return null;
 return 'daci.html?doc='+encodeURIComponent(match[1])+'#'+encodeURIComponent(match[1]+'-'+match[2]);
}
export function activityHref(activity,{returnTo=true}={}){
 if(!activity||!FINDERS[activity.kind]?.(activity))return null;
 const token=returnTo?sectionReturnToken(activity.documentId,activity.anchor):null;
 let path;
 switch(activity.kind){
  case 'case':path='cas-pratiques.html?case='+encodeURIComponent(activity.id);break;
  case 'dialogue':path='dialogues.html?scenario='+encodeURIComponent(activity.id);break;
  case 'quiz':path='atelier.html?module='+encodeURIComponent(activity.id);break;
  case 'template':path='atelier.html?module='+encodeURIComponent(activity.id);break;
  default:return null;
 }
 if(token)path+='&returnTo='+encodeURIComponent(token);
 if(activity.kind==='quiz')path+='#quiz';
 if(activity.kind==='template')path+='#template';
 return path;
}
export function activityTypeLabel(kind){return ({case:'Étude de cas',dialogue:'Dialogue ramifié',quiz:'Autoévaluation',template:'Fiche d’application'})[kind]||'Activité';}
export function validateSectionActivities(items=SECTION_ACTIVITIES){
 const errors=[],keys=new Set();
 for(const item of items){
  const key=item.documentId+':'+item.anchor,doc=DOCUMENTS.find(d=>d.id===item.documentId);
  if(keys.has(key))errors.push('Duplicate section activity: '+key);
  keys.add(key);
  if(!doc?.sections.some(s=>s.anchor===item.anchor))errors.push('Unknown section: '+key);
  const res=FINDERS[item.kind]?.(item);
  if(!res)errors.push('Missing activity target: '+key);
  if(doc&&res&&res.moduleId!==doc.moduleId)errors.push('Activity crosses unrelated modules: '+key);
  if(!item.task||item.task.length<40||!item.reflection||item.reflection.length<20||!item.why)errors.push('Thin pedagogical link: '+key);
  if(!activityHref(item))errors.push('Invalid activity URI: '+key);
 }
 for(const d of DOCUMENTS)for(const s of d.sections){
  if(!keys.has(d.id+':'+s.anchor))errors.push('No activity for '+d.id+':'+s.anchor);
 }
 return errors;
}
