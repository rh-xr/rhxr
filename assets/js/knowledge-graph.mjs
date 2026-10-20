/** Transparent semantic relations for the RH·XR DACI knowledge explorer.
 * All relationships originate from versioned editorial content, no AI inference.
 */
import {MODULES} from './learning-data.mjs';
import {CASES} from './case-data.mjs';
import {DOCUMENTS} from './daci-data.mjs';
import {DOSSIERS,TEMPLATES} from './pedagogy-plus.mjs';

const node=(id,type,label,href,moduleId)=>({id,type,label,href,moduleId});
export function buildKnowledgeGraph() {
 const nodes=[],edges=[];
 for(const m of MODULES){
  nodes.push(node(m.id,'module',m.title,'parcours.html?module='+m.id,m.id));
  for(const l of m.lessons){
   nodes.push(node(l.id,'lesson',l.title,'parcours.html?module='+m.id,m.id));
   edges.push({from:m.id,to:l.id,relation:'hasPart',label:'Comprend une séquence'});
  }
 }
 for(const c of CASES){
  nodes.push(node(c.id,'case',c.title,'cas-pratiques.html?case='+c.id,c.moduleId));
  edges.push({from:c.moduleId,to:c.id,relation:'example',label:'Illustré par un cas'});
 }
 for(const d of DOCUMENTS){
  nodes.push(node(d.id,'document',d.title,'daci.html?doc='+d.id,d.moduleId));
  edges.push({from:d.moduleId,to:d.id,relation:'hasResource',label:'Possède un document'});
  edges.push({from:d.id,to:d.caseId,relation:'hasCase',label:'Lié à un cas'});
 }
 for(const dossier of DOSSIERS){
  const id='P-'+dossier.moduleId;
  nodes.push(node(id,'dossier',dossier.title,'parcours.html?module='+dossier.moduleId,dossier.moduleId));
  edges.push({from:dossier.moduleId,to:id,relation:'hasCourse',label:'Approfondi par un dossier'});
 }
 for(const template of TEMPLATES){
  nodes.push(node(template.id,'template',template.title,'atelier.html?module='+template.moduleId,template.moduleId));
  edges.push({from:template.moduleId,to:template.id,relation:'hasTemplate',label:'Accompagné d’une fiche'});
 }
 return {nodes,edges,version:'content-v1.1'};
}
export const KNOWLEDGE_GRAPH=buildKnowledgeGraph();
export function neighbors(id,graph=KNOWLEDGE_GRAPH){
 if(!graph.nodes.some(n=>n.id===id))return [];
 const ids=new Set(graph.edges.filter(e=>e.from===id||e.to===id).flatMap(e=>[e.from,e.to]));
 ids.delete(id);return graph.nodes.filter(n=>ids.has(n.id));
}
export function learningPath(moduleId,graph=KNOWLEDGE_GRAPH){
 return graph.nodes.filter(n=>n.moduleId===moduleId)
  .sort((a,b)=>({module:0,dossier:1,lesson:2,case:3,document:4,template:5}[a.type]??9)-({module:0,dossier:1,lesson:2,case:3,document:4,template:5}[b.type]??9));
}
export function graphAsJsonLd(graph=KNOWLEDGE_GRAPH){
 const context={'@vocab':'https://schema.org/',relatedTo:{'@id':'https://schema.org/relatedLink','@type':'@id'}};
 const rows=graph.nodes.map(n=>({'@id':'urn:rhxr:'+n.id,'@type':n.type==='document'?'LearningResource':'CreativeWork',name:n.label,identifier:n.id,educationalUse:'professional learning'}));
 const links=graph.edges.map(e=>({'@id':'urn:rhxr:'+e.from,relatedTo:{'@id':'urn:rhxr:'+e.to}}));
 return {'@context':context,'@graph':[...rows,...links]};
}
export function validateGraph(graph=KNOWLEDGE_GRAPH){
 const errors=[],ids=new Set();
 for(const n of graph.nodes){if(ids.has(n.id))errors.push('Duplicate node '+n.id);ids.add(n.id);if(!n.href||!n.type||!n.label)errors.push('Invalid node '+n.id);}
 for(const e of graph.edges)if(!ids.has(e.from)||!ids.has(e.to))errors.push('Broken edge '+e.from+' to '+e.to);
 return errors;
}
