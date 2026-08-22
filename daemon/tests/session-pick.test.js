const test = require('node:test');
const assert = require('node:assert');
const { pickSession, threadHome } = require('../session-pick.js');

const LIVE = new Set(['pA', 'pB']);
const isLive = (id) => LIVE.has(id);

const threads = [
  { key: 'g1', ts: 100, proj: null },      // general
  { key: 'a1', ts: 200, proj: 'pA' },      // project A
  { key: 'b1', ts: 300, proj: 'pB' },      // project B (newest overall)
  { key: 'a2', ts: 250, proj: 'pA' },      // project A, newer
  { key: 'x1', ts: 400, proj: 'pGONE' },   // bound to a deleted project
];

test('a project run continues that project newest thread', () => {
  assert.equal(pickSession(threads, 'pA', isLive).key, 'a2');
  assert.equal(pickSession(threads, 'pB', isLive).key, 'b1');
});

test('a general run never adopts a project thread', () => {
  // x1 is newer than g1 but its project is gone, so it decays to general.
  assert.equal(pickSession(threads, null, isLive).key, 'x1');
  assert.equal(pickSession([threads[0], threads[1], threads[2]], null, isLive).key, 'g1');
});

test('a project run never adopts a general or foreign thread', () => {
  assert.equal(pickSession([{ key: 'g1', ts: 100, proj: null }], 'pA', isLive), null);
  assert.equal(pickSession([{ key: 'b1', ts: 300, proj: 'pB' }], 'pA', isLive), null);
});

test('an unknown requested project is treated as general work', () => {
  assert.equal(pickSession(threads, 'pGONE', isLive).key, 'x1');
});

test('empty / missing history is safe', () => {
  assert.equal(pickSession(undefined, 'pA', isLive), null);
  assert.equal(pickSession([], null, isLive), null);
  assert.equal(threadHome(null, isLive), null);
});
