import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {BRANCHING_SCENARIOS,getBranchingScenario,validateBranching,startBranching,chooseBranch,pathSummary} from '../assets/js/branching-scenarios.mjs';
import {MODULES} from '../assets/js/learning-data.mjs';
import {DOCUMENTS} from '../assets/js/daci-data.mjs';

test('five substantial branching conversations, correctly linked to learning resources',()=>{
 assert.equal(BRANCHING_SCENARIOS.length,5);
 assert.deepEqual(validateBranching(),[]);
 const modules=new Set(MODULES.map(x=>x.id)),docs=new Set(DOCUMENTS.map(x=>x.id));
 assert.equal(new Set(BRANCHING_SCENARIOS.map(x=>x.id)).size,5);
 for(const s of BRANCHING_SCENARIOS){
  assert.ok(modules.has(s.moduleId));
  assert.ok(docs.has(s.daci));
  assert.equal(s.nodes.length,5);
  assert.ok(s.debrief.reflection.length>=3);
  assert.ok(s.nodes.every(n=>n.choices.every(c=>c.feedback.length>=40)));
 }
});
test('every path yields three consequential decisions and a fully formed debrief',()=>{
 let paths=0;
 for(const s of BRANCHING_SCENARIOS){
  for(const first of s.nodes[0].choices){
   const a=chooseBranch(s,startBranching(s),first.id);
   const followup=s.nodes.find(n=>n.id===a.nodeId);
   assert.equal(followup.stage,2);
   for(const second of followup.choices){
    const b=chooseBranch(s,a,second.id);
    const last=s.nodes.find(n=>n.id===b.nodeId);
    assert.equal(last.stage,3);
    for(const third of last.choices){
     const end=chooseBranch(s,b,third.id);
     assert.equal(end.done,true);
     assert.equal(end.nodeId,null);
     assert.equal(end.history.length,3);
     const result=pathSummary(s,end);
     assert.equal(result.steps,3);
     assert.equal(result.decisions.length,3);
     assert.ok(result.questions.length>=3);
     assert.ok(result.decisions.every(d=>d.criterion && d.feedback));
     paths++;
    }
   }
  }
 }
 assert.equal(paths,135);
});
test('invalid scenario states and options are explicitly rejected',()=>{
 for(const s of BRANCHING_SCENARIOS){
  assert.ok(getBranchingScenario(s.id));
  assert.throws(()=>chooseBranch(s,startBranching(s),'invalid'),/non autorisé/);
  assert.throws(()=>chooseBranch(s,{scenarioId:'other',done:false},'start'),/incompatible/);
  assert.throws(()=>startBranching(null),/invalide/);
 }
 assert.equal(getBranchingScenario('unknown'),null);
});
test('branching lab page and source module are deployed',()=>{
 assert.ok(existsSync('dialogues.html'));
 assert.ok(existsSync('assets/js/dialogues-app.mjs'));
});
