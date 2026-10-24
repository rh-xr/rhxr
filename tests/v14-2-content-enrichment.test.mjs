import {spawnSync} from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {EXTRA_CASES,EXTRA_DESCRIPTORS,CASE_FILES,extendDaciBundle} from '../assets/js/content-cases-v14-2.mjs';
import {MISSIONS,createLearningSession} from '../assets/js/learning-v14-1.mjs';
import {buildLearningRecap,recapFilename} from '../assets/js/learning-recap-v14-2.mjs';
const source=path=>readFileSync(new URL(path,import.meta.url),'utf8');
const original=JSON.parse(source('../experiences/daci-v13/v13-bundle.json'));

test('V14.2 enrichment adds three real playable fictional cases without altering V13 source',()=>{
  const before=JSON.stringify(original),enriched=extendDaciBundle(original);
  assert.equal(JSON.stringify(original),before);
  assert.equal(original.stories.length,3);
  assert.equal(Object.keys(original.answers).length,54);
  assert.equal(enriched.stories.length,6);
  assert.equal(Object.keys(enriched.answers).length,90);
  assert.equal(enriched.enhancement_version,'V14.2');
  assert.equal(enriched.fictional_only,true);
  assert.equal(enriched.not_for_hr_decisions,true);
  assert.equal(enriched.extended_fictional_only,true);
  assert.equal(EXTRA_DESCRIPTORS.length,3);
  assert.deepEqual(EXTRA_DESCRIPTORS.map(s=>s.id),['recrutement','confidentialite','hybride']);
  for(const [key,answer] of Object.entries(original.answers))
    assert.deepEqual(enriched.answers[key],answer,'Original V13 answer must be preserved: '+key);
});

test('All new cases contain 4 staged decisions × 3 meaningful choices and authored notes',()=>{
  const corpus=extendDaciBundle(original);
  const unique=new Set();
  for(const c of EXTRA_CASES){
    assert.ok(c.setting.length>75);
    assert.equal(c.steps.length,4);
    assert.ok(c.skills.length>=3);
    assert.ok(CASE_FILES[c.slug].practice.length>35);
    assert.ok(CASE_FILES[c.slug].prepare.endsWith('?'));
    for(const step of c.steps){
      assert.equal(step.options.length,3);
      assert.ok(step.principle.length>=70);
      assert.ok(step.dialogue.length>=40);
      assert.ok(step.question.endsWith('?'));
      assert.ok(!unique.has(c.slug+step.id));
      unique.add(c.slug+step.id);
      assert.deepEqual(new Set(step.options.map(o=>o.quality)),
        new Set(['appropriate','risky','incomplete']));
      for(const choice of step.options){
        assert.ok(choice.label.length>32);
        assert.ok(choice.feedback.length>45);
        assert.ok(choice.character_reaction.length>35);
        const a=corpus.answers[c.slug+':'+step.id+':'+choice.id];
        assert.equal(a.fictional_only,true);
        assert.equal(a.no_automated_hr_evaluation,true);
        assert.match(a.source_title,/fictive/);
        assert.match(a.citation,/^urn:rhxr:daci:fiche-exercice-v14@1\.0\.0#/);
        assert.equal(a.quote,step.principle);
      }
    }
  }
});

test('Seven mission briefings, competencies and formative debriefs are connected',()=>{
  const learner=createLearningSession(original);
  assert.equal(learner.missions.length,7);
  assert.deepEqual(MISSIONS.map(x=>x.id),[
    'onboarding','entretien','conflit','s02','recrutement','confidentialite','hybride'
  ]);
  for(const {id} of MISSIONS){
    learner.setMission(id);
    let v=learner.view();
    assert.ok(v.setting.length>70,id+' missing contextual setting');
    assert.ok(v.caseFile.artefact.length>15);
    assert.ok(v.caseFile.vigilance.length>20);
    assert.ok(v.competencies.length>=3);
    assert.equal(v.showBrief,false);
    assert.equal(learner.toggleBrief(),true);
    assert.equal(learner.view().showBrief,true);
    assert.equal(learner.toggleBrief(),false);
    assert.equal(learner.view().showBrief,false);
    let decisions=0;
    while(!v.ending&&decisions<12){
      const selected=v.choices[0];
      assert.ok(learner.choose(selected.id));
      const pending=learner.view();
      assert.ok(pending.feedback);
      if(id!=='s02'){
        assert.ok(pending.citation.length>10);
        assert.ok(pending.sourceTitle.length>10);
      }
      assert.ok(learner.next());
      v=learner.view();decisions++;
    }
    assert.equal(v.ending,true,id+' does not end');
    assert.equal(v.steps,decisions);
    assert.ok(v.summary.length>40);
    assert.equal(v.debrief.takeaways.length,3);
    assert.ok(v.debrief.recommendedAction.length>30);
    assert.ok(v.debrief.warning.length>20);
    assert.equal(v.qualityProfile.appropriate+v.qualityProfile.incomplete+v.qualityProfile.risky,decisions);
  }
});

test('Quest mission paging and case dossier are integrated without changing VR room',()=>{
  const hub=source('../assets/js/spatial-learning-v14-1.mjs');
  const page=source('../experiences/rhxr-v14-1/index.html');
  const room=source('../assets/js/room.mjs');
  assert.ok(hub.includes('const pageSize=4'));
  assert.ok(hub.includes("id==='mission-page'"));
  assert.ok(hub.includes("id==='brief'"));
  assert.ok(hub.includes('s.caseFile'));
  assert.ok(hub.includes('session.toggleBrief()'));
  assert.ok(page.includes('id="brief-toggle"'));
  assert.ok(page.includes('id="case-setting"'));
  assert.ok(page.includes('id="case-skills"'));
  assert.ok(page.includes('id="debrief"'));
  assert.ok(page.includes("perform('brief')"));
  assert.ok(page.includes('Sept missions disponibles'));
  assert.ok(room.includes("const managerZ=advanced?-3.75:-4.50"));
  assert.ok(!hub.includes('playerRig.add(root)'));
});

test('Completion enables an anonymous printable DACI learning trace, never a staff appraisal',()=>{
  const h=createLearningSession(original);
  h.setMission('recrutement');
  assert.throws(()=>buildLearningRecap(h.view()),/uniquement à la fin/);
  let v=h.view();
  while(!v.ending){
    assert.equal(!!v.totalDecisions,true);
    assert.ok(h.choose(v.choices[0].id));
    assert.ok(h.next());
    v=h.view();
  }
  assert.equal(v.totalDecisions,4);
  const report=buildLearningRecap(v);
  assert.match(report,/# RH·XR — Fiche pédagogique de transfert/);
  assert.match(report,/Exercice à réaliser/);
  assert.match(report,/critères/i);
  assert.match(report,/urn:rhxr:daci:fiche-exercice-v14/);
  assert.match(report,/aucune décision RH individuelle|ne pas utiliser pour des décisions RH individuelles/i);
  assert.ok(report.includes(v.debrief.recommendedAction));
  assert.equal(recapFilename(v),'rhxr-daci-fiche-recrutement.md');
  assert.ok(!report.includes('https://'));
});
test('HTML provides a source-preserving case dossier and completion-only local export',()=>{
  const html=source('../experiences/rhxr-v14-1/index.html');
  assert.ok(html.includes("id=\"mission-progress\""));
  assert.ok(html.includes("id=\"recap-download\""));
  assert.ok(html.includes('buildLearningRecap(completed)'));
  assert.ok(html.includes('new Blob([buildLearningRecap(completed)]'));
  assert.ok(html.includes('if(!completed.ending)return'));
  assert.ok(html.includes("const requestedMission=new URLSearchParams(location.search).get('mission')"));
  assert.ok(html.includes('id=\"case-prepare\"'));
  assert.ok(html.includes('id=\"case-warning\"'));
});

test('the curriculum catalog offers all 7 deep links and a printable learner path',()=>{
  const page=source('../experiences/rhxr-v14-1/parcours.html');
  const main=source('../experiences/rhxr-v14-1/index.html');
  assert.match(page,/Sept situations RH/);
  assert.ok(page.includes('for(const mission of MISSIONS)'));
  assert.ok(page.includes('encodeURIComponent(mission.id)'));
  assert.ok(page.includes('@media print'));
  assert.ok(page.includes("CASE_FILES"));
  assert.ok(main.includes('href="./parcours.html"'));
  assert.ok(main.includes("get('mission')"));
  const moduleScript=page.match(/<script type="module">([\s\S]*?)<\/script>/);
  assert.ok(moduleScript);
  const result=spawnSync(process.execPath,['--input-type=module','--check'],{input:moduleScript[1],encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);
});
