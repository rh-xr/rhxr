import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const bundle = JSON.parse(read('../experiences/daci-v13/v13-bundle.json'));

test('V13 corpus is demonstrative and non-decisional', () => {
  assert.equal(bundle.version, 'V13');
  assert.equal(bundle.fictional_only, true);
  assert.equal(bundle.not_for_hr_decisions, true);
  assert.equal(bundle.stories.length, 3);
  assert.equal(Object.keys(bundle.answers).length, 54);
});

test('all paths, choices and feedback are internally coherent', () => {
  for (const story of bundle.stories) {
    const byId = new Map(story.nodes.map(node => [node.id, node]));
    assert.equal(byId.size, story.nodes.length);
    assert.ok(byId.has(story.start));
    for (const node of story.nodes) {
      for (const choice of node.choices ?? []) {
        const key = [story.slug, node.id, choice.id].join(':');
        const answer = bundle.answers[key];
        assert.ok(answer, 'Missing answer: ' + key);
        assert.equal(answer.node_id, node.id);
        assert.equal(answer.status, 'completed_step');
        assert.ok(byId.has(answer.next_node_id), 'Invalid next node: ' + key);
        assert.equal(answer.fictional_only, true);
        assert.equal(answer.no_automated_hr_evaluation, true);
        assert.match(answer.citation, /^urn:rhxr:daci:/);
        assert.ok(answer.feedback.trim());
      }
    }
  }
});

test('XR anchors link to their corresponding documented steps', () => {
  assert.equal(bundle.xr_anchors.length, 3);
  let total = 0;
  for (const group of bundle.xr_anchors) {
    const story = bundle.stories.find(s => s.slug === group.slug);
    assert.ok(story);
    const ids = new Set(story.nodes.filter(n => n.kind === 'decision').map(n => n.id));
    const seen = new Set();
    for (const anchor of group.anchors) {
      assert.ok(ids.has(anchor.node_id));
      assert.ok(!seen.has(anchor.node_id));
      seen.add(anchor.node_id);
      assert.match(anchor.citation, /^urn:rhxr:daci:/);
      assert.equal(anchor.model_url, null);
      total++;
    }
  }
  assert.equal(total, 20);
});

test('standalone site and portal expose the V13 entry', () => {
  const html = read('../experiences/daci-v13/index.html');
  const js = read('../experiences/daci-v13/v13-app.js');
  const portal = read('../assets/js/app.mjs');
  for (const path of ['v13.css', 'v13-app.js']) assert.ok(html.includes('./' + path));
  assert.ok(js.includes("fetch('./v13-bundle.json'"));
  assert.ok(html.includes('Entrer en VR'));
  assert.ok(portal.includes('experiences/daci-v13/index.html'));
});
