/** Minimal DOM smoke harness for all public pages. It verifies initialization, not visual layout. */
import assert from 'node:assert/strict';
import {guides,sources} from '../assets/js/content.mjs';
const pages=['home','ressources','bibliotheque','fiche','ia','formation','politique'];
const fake=(id)=>({id,innerHTML:'',textContent:'',value:id==='filterTopic'||id==='promptTopic'||id==='filterArea'||id==='filterKind'?'all':'',disabled:false,addEventListener(){},querySelectorAll(){return []},classList:{add(){},remove(){},toggle(){}},setAttribute(){}});
for(const page of pages){
 const elements=new Map();globalThis.document={body:{dataset:{page}},querySelector(sel){if(!elements.has(sel))elements.set(sel,fake(sel));return elements.get(sel)}};
 globalThis.location={search:page==='fiche'?'?id=recruter-sans-biais':''};
 await import(`../assets/js/portal.mjs?test=${page}`);
 const html=elements.get('#app').innerHTML;
 assert.ok(html.length>2500,`${page} has content`);assert.match(html,/RH·XR/);
 if(page==='home')assert.match(html,/Pratiquer avec l'IA/);
 if(page==='fiche')assert.match(html,/Structurer un recrutement équitable/);
 if(page==='ia')assert.match(html,/Générer le brouillon/);
 if(page==='ressources')assert.equal(elements.get('#count').textContent,`${guides.length} fiches affichées`);
 if(page==='bibliotheque')assert.equal(elements.get('#count').textContent,`${sources.length} ressources affichées`);
 console.log(`OK ${page}: ${html.length} characters`);
}
