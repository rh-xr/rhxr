#!/usr/bin/env node
/** Lightweight editorial gate, purely local and data-independent. */
import {MODULES,MODULE_IDS,validateCatalog} from '../assets/js/learning-data.mjs';
import {CASES,validateCases} from '../assets/js/case-data.mjs';
import {DOCUMENTS,validateDocuments} from '../assets/js/daci-data.mjs';
import {DOSSIERS,QUESTIONS,TEMPLATES,GLOSSARY,REFERENCES,auditPedagogy} from '../assets/js/pedagogy-plus.mjs';
import {ITINERARIES,validateItineraries} from '../assets/js/itineraries.mjs';
import {BRANCHING_SCENARIOS,validateBranching} from '../assets/js/branching-scenarios.mjs';
import {FACILITATOR_GUIDES,validateGuides} from '../assets/js/facilitator-guides.mjs';
import {KNOWLEDGE_GRAPH,validateGraph} from '../assets/js/knowledge-graph.mjs';

export function contentAudit(){
 const errors=[
  ...validateCatalog(),
  ...validateCases(CASES,MODULE_IDS),
  ...validateDocuments(DOCUMENTS,MODULE_IDS,CASES.map(x=>x.id)),
  ...auditPedagogy(),
  ...validateItineraries(MODULE_IDS,CASES.map(x=>x.id),DOCUMENTS.map(x=>x.id)),
  ...validateGraph(),
  ...validateBranching(),
  ...validateGuides(BRANCHING_SCENARIOS)
 ];
 const counts={
  modules:MODULES.length,
  sequences:MODULES.reduce((a,m)=>a+m.lessons.length,0),
  cases:CASES.length,
  daciDocuments:DOCUMENTS.length,
  daciSections:DOCUMENTS.reduce((a,d)=>a+d.sections.length,0),
  detailedCourses:DOSSIERS.length,
  quizQuestions:QUESTIONS.length,
  reusableTemplates:TEMPLATES.length,
  glossaryTerms:GLOSSARY.length,
  itineraries:ITINERARIES.length,
  graphNodes:KNOWLEDGE_GRAPH.nodes.length,
  graphEdges:KNOWLEDGE_GRAPH.edges.length,
  references:REFERENCES.length,
  branchingScenarios:BRANCHING_SCENARIOS.length,
  instructorGuides:FACILITATOR_GUIDES.length
 };
 const warnings=[];
 for(const doc of DOCUMENTS){
  if(doc.provenance?.reviewStatus.includes('prévoir'))
    warnings.push(doc.id+' : validation métier RH encore nécessaire');
  for(const slot of doc.mediaSlots||[])
    if(slot.status!=='planned')warnings.push(doc.id+' : média non certifié déclaré actif');
 }
 if(REFERENCES.length<3)warnings.push('Peu de références externes vérifiées');
 return {success:errors.length===0,errors,warnings,counts};
}
const isCli=process.argv[1]&&import.meta.url.endsWith('/'+process.argv[1].replace(/\\/g,'/').split('/').pop());
if(isCli){
 const data=contentAudit();
 if(process.argv.includes('--json'))console.log(JSON.stringify(data,null,2));
 else{
  console.log('RH·XR — Audit qualité pédagogique');
  console.table(data.counts);
  console.log(data.success?'Cohérence structurelle : OK':'Cohérence structurelle : ÉCHEC');
  if(data.errors.length)console.error(data.errors.join('\n'));
  if(data.warnings.length)console.log('Points nécessitant une revue humaine :\n'+data.warnings.join('\n'));
 }
 if(!data.success)process.exitCode=1;
}
