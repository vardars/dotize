import assert from 'node:assert/strict';
import dotize from 'dotize';

describe('Dotize ESM tests', () => {
  it('should convert an object to dot notation using ESM import', () => {
    const obj = { a: { b: 1 }, c: 2 };
    const expected = { 'a.b': 1, c: 2 };
    assert.deepStrictEqual(dotize.convert(obj), expected, 'ESM convert failed');
  });

  it('should convert a dotted object back to original structure using ESM import', () => {
    const dotted = { 'a.b': 1, c: 2 };
    const expected = { a: { b: 1 }, c: 2 };
    assert.deepStrictEqual(dotize.backward(dotted), expected, 'ESM backward failed');
  });

  it('should handle empty objects correctly in convert', () => {
    const obj = {};
    const expected = {};
    assert.deepStrictEqual(dotize.convert(obj), expected, 'ESM convert empty object failed');
  });

  it('should handle empty objects correctly in backward', () => {
    const dotted = {};
    const expected = {};
    assert.deepStrictEqual(dotize.backward(dotted), expected, 'ESM backward empty object failed');
  });

  it('should handle complex nested objects in convert', () => {
    const obj = { a: { b: { c: { d: 1 } } }, e: { f: 2 } };
    const expected = { 'a.b.c.d': 1, 'e.f': 2 };
    assert.deepStrictEqual(dotize.convert(obj), expected, 'ESM convert complex object failed');
  });

  it('should handle complex nested objects in backward', () => {
    const dotted = { 'a.b.c.d': 1, 'e.f': 2 };
    const expected = { a: { b: { c: { d: 1 } } }, e: { f: 2 } };
    assert.deepStrictEqual(dotize.backward(dotted), expected, 'ESM backward complex object failed');
  });
});
