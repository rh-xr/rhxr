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


test('WebGL failure is non-blocking and never exposes an unusable VR button', () => {
  const js = read('../experiences/daci-v13/v13-app.js');
  const html = read('../experiences/daci-v13/index.html');
  assert.match(js, /if\(!app\.gl\|\|app\.glError\)\{b\.disabled=true;/);
  assert.match(js, /catch\(err\)\{app\.glError=true;app\.gl=null;/);
  assert.match(js, /Contexte WebGL perdu · parcours textuel actif/);
  assert.match(html, /href="\.\.\/\.\.\/index\.html"/);
});


test('V13 cockpit has VR scenario navigation and readable excerpt, with 2D quick access', () => {
  const js = read('../experiences/daci-v13/v13-app.js');
  const html = read('../experiences/daci-v13/index.html');
  assert.match(js, /function switchStory\(direction\)/);
  assert.match(js, /panel\('story-prev'/);
  assert.match(js, /panel\('story-next'/);
  assert.match(js, /pointed\?'#edb74b'/);
  assert.match(js, /r\?\.quote/);
  assert.match(js, /FERMER LE DOCUMENT/);
  assert.match(html, /href="#scenario"/);
});


test('desktop walkthrough is independently accessible without immersive WebXR', () => {
  const js = read('../experiences/daci-v13/v13-app.js');
  const html = read('../experiences/daci-v13/index.html');
  const css = read('../experiences/daci-v13/v13.css');
  assert.match(html, /id="desktop-tour"/);
  assert.match(html, /Entrer en VR \(casque\)/);
  assert.match(js, /function desktopCamera\(/);
  assert.match(js, /function desktopPick\(/);
  assert.match(js, /function updateDesktop\(/);
  assert.match(js, /activateHit\(desktopPick\(e.clientX,e.clientY\)\)/);
  assert.match(js, /desktopKeys\.add\(e.code\)/);
  assert.match(js, /'ArrowUp'/);
  assert.match(js, /app\.canvas\.focus/);
  assert.match(js, /'immersive-vr'/);
  assert.match(js, /desktop\.disabled=!app\.gl\|\|app\.glError/);
  assert.match(css, /#stage:fullscreen/);
});
