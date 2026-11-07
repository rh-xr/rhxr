/** Chemins pédagogiques : fiches, sources, prompts et missions fictives V14.1. */
import {guides,sources,prompts} from './content.mjs';
export const journeys=[
  {
    "id": "integration",
    "label": "Intégrer un collaborateur",
    "topic": "personnel",
    "intro": "Organiser un accueil clair, progressif et respectueux des informations personnelles.",
    "goal": "Construire un parcours d’accueil et répondre aux questions des premières semaines.",
    "guideIds": [
      "parcours-integration",
      "donnees-rh"
    ],
    "sourceIds": [
      "cndp-traitements",
      "oit-manuel-rh"
    ],
    "promptId": "p4",
    "missionId": "onboarding"
  },
  {
    "id": "recrutement-responsable",
    "label": "Recruter avec équité",
    "topic": "recrutement",
    "intro": "Relier critères professionnels, entretien structuré et analyse des risques d’une aide IA.",
    "goal": "Préparer une démarche cohérente sans classement automatisé des candidats.",
    "guideIds": [
      "recruter-sans-biais",
      "recrutement-questions",
      "audit-risques-ia-rh"
    ],
    "sourceIds": [
      "cnil-recrutement",
      "oit-recrutement",
      "eu-ai-act"
    ],
    "promptId": "p19",
    "missionId": "recrutement"
  },
  {
    "id": "confidentialite",
    "label": "Protéger les données RH",
    "topic": "personnel",
    "intro": "Comprendre les finalités, les habilitations et les limites de l’IA avec les données RH.",
    "goal": "Identifier les gestes essentiels de confidentialité et les points de vigilance.",
    "guideIds": [
      "donnees-rh",
      "choisir-cadre-juridique"
    ],
    "sourceIds": [
      "cndp-lois",
      "cnil-personnel",
      "eu-rgpd"
    ],
    "promptId": "p6",
    "missionId": "confidentialite"
  },
  {
    "id": "dialogue",
    "label": "Gérer une tension professionnelle",
    "topic": "management",
    "intro": "S’appuyer sur l’écoute, les faits et une méthode de résolution documentée.",
    "goal": "Préparer un échange délicat et comparer les conséquences de plusieurs réponses.",
    "guideIds": [
      "feedback",
      "conflits"
    ],
    "sourceIds": [
      "oit-manuel-rh"
    ],
    "promptId": "p12",
    "missionId": "conflit"
  },
  {
    "id": "competences",
    "label": "Accompagner les compétences",
    "topic": "formation",
    "intro": "Relier besoins du travail, objectifs pédagogiques et actions de développement.",
    "goal": "Construire un plan réaliste puis exercer une conversation de suivi.",
    "guideIds": [
      "cartographie-competences",
      "plan-formation",
      "developpement-competences"
    ],
    "sourceIds": [
      "oit-formation",
      "ilo-skills",
      "fr-formation"
    ],
    "promptId": "p20",
    "missionId": "entretien"
  },
  {
    "id": "hybride",
    "label": "Renforcer la coopération hybride",
    "topic": "qvct",
    "intro": "Réduire les malentendus, partager l’information et tester des améliorations collectives.",
    "goal": "Favoriser une coopération inclusive sans surveillance individuelle.",
    "guideIds": [
      "qvct-diagnostic",
      "qvct-experimenter",
      "feedback"
    ],
    "sourceIds": [
      "anact-qvct-etapes",
      "anact-qvct"
    ],
    "promptId": "p22",
    "missionId": "hybride"
  }
];
export const missionLabels={
  "onboarding": "Accueil de Salma",
  "recrutement": "Recrutement responsable",
  "confidentialite": "Confidentialité des dossiers RH",
  "conflit": "Médiation Amina / Youssef",
  "entretien": "Entretien avec Alex",
  "hybride": "Coopération hybride"
};
export const getJourney=id=>journeys.find(j=>j.id===id);
export const getJourneyByGuide=id=>journeys.find(j=>j.guideIds.includes(id));
export const getJourneyByPrompt=id=>journeys.find(j=>j.promptId===id);
export const getJourneyGuides=j=>j.guideIds.map(id=>guides.find(x=>x.id===id)).filter(Boolean);
export const getJourneySources=j=>j.sourceIds.map(id=>sources.find(x=>x.id===id)).filter(Boolean);
export const getJourneyPrompt=j=>prompts.find(x=>x.id===j.promptId);
export const missionHref=id=>'experiences/rhxr-v14-1/index.html?mission='+encodeURIComponent(id);
export function getPromptContext(id){
 const prompt=prompts.find(x=>x.id===id);
 if(!prompt)return {guides:[],sources:[],journey:null};
 const journey=getJourneyByPrompt(id);
 if(journey)return {guides:getJourneyGuides(journey).slice(0,2),sources:getJourneySources(journey).slice(0,2),journey};
 return {guides:guides.filter(x=>x.topic===prompt.topic).slice(0,2),sources:sources.filter(x=>x.topic===prompt.topic).slice(0,2),journey:null};
}
