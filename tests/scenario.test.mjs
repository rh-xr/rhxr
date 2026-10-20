import test from 'node:test';import assert from 'node:assert/strict';
import {scenario,validateScenario,startSession,answer,summary} from '../assets/js/scenario.mjs';
test('scenario structure is valid',()=>assert.deepEqual(validateScenario(scenario),[]));
test('three phases exist',()=>assert.deepEqual(scenario.exchanges.map(x=>x.phase),['ouverture','clarification','solution']));
test('happy path yields 6/6',()=>{let s=startSession();for(const c of ['a1a','a2a','a3a'])s=answer(s,c);assert.equal(s.done,true);assert.equal(summary(s).score,6);assert.equal(summary(s).percent,100)});
test('worst path yields 0/6',()=>{let s=startSession();for(const c of ['a1b','a2b','a3c'])s=answer(s,c);assert.equal(summary(s).score,0)});
test('wrong choice is rejected',()=>assert.throws(()=>answer(startSession(),'other'),/non autorisé/));
test('completed session cannot answer again',()=>{let s=startSession();for(const c of ['a1a','a2a','a3a'])s=answer(s,c);assert.throws(()=>answer(s,'a3a'),/terminée/)});
test('all options have actionable feedback',()=>{for(const e of scenario.exchanges)for(const c of e.choices)assert.ok(c.feedback.length>=20)});
