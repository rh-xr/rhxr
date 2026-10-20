import test from 'node:test';
import assert from 'node:assert/strict';
import {FACILITATOR_GUIDES,guideFor,validateGuides} from '../assets/js/facilitator-guides.mjs';
import {BRANCHING_SCENARIOS} from '../assets/js/branching-scenarios.mjs';
import {KNOWLEDGE_GRAPH,neighbors,validateGraph} from '../assets/js/knowledge-graph.mjs';

test('each branching learning scenario has its own usable instructor guide',()=>{
 assert.equal(FACILITATOR_GUIDES.length,BRANCHING_SCENARIOS.length);
 assert.deepEqual(validateGuides(BRANCHING_SCENARIOS),[]);
 for(const scenario of BRANCHING_SCENARIOS){
  const g=guideFor(scenario.id);
  assert.ok(g,'Missing guide '+scenario.id);
  assert.ok(g.opening.length>80);
  assert.ok(g.roles.length>=3);
  assert.ok(g.sequence.length>=4);
  assert.ok(g.observables.length>=3);
  assert.ok(g.extension.length>40);
 }
 assert.equal(guideFor('unknown'),null);
});
test('dialogue scenarios are connected to their module and source document in DACI',()=>{
 assert.deepEqual(validateGraph(),[]);
 for(const s of BRANCHING_SCENARIOS){
  const ids=new Set(neighbors(s.id).map(n=>n.id));
  assert.ok(ids.has(s.moduleId),'Missing module link '+s.id);
  assert.ok(ids.has(s.daci),'Missing source document link '+s.id);
  assert.ok(KNOWLEDGE_GRAPH.nodes.some(n=>n.id===s.id && n.type==='dialogue'));
 }
});
test('no instructor guide contains fictitious assessment rankings',()=>{
 for(const g of FACILITATOR_GUIDES){
   const text=[g.opening,...g.roles,...g.sequence,...g.observables].join(' ').toLowerCase();
   assert.ok(!text.includes('classement nominatif des apprenants'));
 }
});
