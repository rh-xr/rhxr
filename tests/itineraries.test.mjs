import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {ITINERARIES,getItinerary,validateItineraries} from '../assets/js/itineraries.mjs';
import {MODULES} from '../assets/js/learning-data.mjs';
import {CASES} from '../assets/js/case-data.mjs';
import {DOCUMENTS} from '../assets/js/daci-data.mjs';

test('five pathways target distinct declared audiences',()=>{
 assert.equal(ITINERARIES.length,5);
 assert.equal(new Set(ITINERARIES.map(x=>x.audience)).size,5);
});
test('all suggested steps point to existing content and actionable productions',()=>{
 assert.deepEqual(validateItineraries(MODULES.map(x=>x.id),CASES.map(x=>x.id),DOCUMENTS.map(x=>x.id)),[]);
 for(const p of ITINERARIES){
  assert.equal(p.steps.length,3);
  assert.ok(p.steps.every(s=>s.evidence.length>20));
  assert.ok(p.goal.length>30);
  assert.ok(p.futureXR.length>30);
 }
});
test('pathway IDs resolve consistently, unknown IDs return null',()=>{
 for(const p of ITINERARIES)assert.equal(getItinerary(p.id),p);
 assert.equal(getItinerary('unknown'),null);
});
test('the corresponding static route exists',()=>{
 assert.ok(existsSync('itineraires.html'));
 assert.ok(existsSync('assets/js/content-lab.mjs'));
});
