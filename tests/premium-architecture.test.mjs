import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('premium architecture remains separate from WebXR locomotion and user data',()=>{
  const code=readFileSync(new URL('../assets/js/premium-architecture.mjs',import.meta.url),'utf8');
  assert.match(code,/createPremiumArchitecture/);
  assert.doesNotMatch(code,/navigator\.xr|requestSession|sessionStorage|localStorage|fetch\(/);
  assert.match(code,/setDetailEnabled/);
});
