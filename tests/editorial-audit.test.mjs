import test from 'node:test';
import assert from 'node:assert/strict';
import {contentAudit} from '../scripts/content-audit.mjs';
test('every editorial link resolves and the full content model passes its gate',()=>{
 const data=contentAudit();
 assert.deepEqual(data.errors,[]);
 assert.equal(data.success,true);
 assert.equal(data.counts.modules,8);
 assert.equal(data.counts.detailedCourses,8);
 assert.equal(data.counts.quizQuestions,24);
 assert.equal(data.counts.daciSections,18);
 assert.equal(data.counts.itineraries,5);
 assert.equal(data.counts.graphNodes,66);
});
test('editorial audit does not conceal unverified human review',()=>{
 const data=contentAudit();
 assert.ok(data.warnings.length>=6);
 for(const d of data.warnings)assert.ok(d.includes('validation métier RH')));
});
