import assert from 'node:assert/strict';
import { test } from 'node:test';
import { terms, transition, view } from '../evals/fixtures/unslop-korean/flow.ts';

test('design evaluation fixture: next only opens review and back restores choice', () => {
  assert.equal(transition('choice', 'next'), 'review');
  assert.equal(transition('review', 'back'), 'choice');
  assert.equal(transition('choice', 'submit'), 'choice');
});

test('design evaluation fixture: submit remains pending until acknowledgement', () => {
  assert.equal(transition('review', 'submit'), 'pending');
  assert.equal(transition('pending', 'next'), 'pending');
  assert.equal(transition('pending', 'submit'), 'pending');
  assert.equal(transition('pending', 'acknowledge'), 'complete');
  assert.equal(transition('review', 'acknowledge'), 'review');
  assert.notEqual(view('pending').heading, view('complete').heading);
});

test('design evaluation fixture: recurring price is constant across states', () => {
  assert.deepEqual(terms, { amount: 9900, currency: 'KRW', renewal: 'monthly' });
  const prices = ['choice', 'review', 'pending', 'complete'].map(state =>
    view(state as Parameters<typeof view>[0]).price);
  assert.equal(new Set(prices).size, 1);
});
