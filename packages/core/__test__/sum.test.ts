import { describe, expect, it } from 'vitest';
import { sum } from '../src/sum'

describe('describe', () => {
  it('case1', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
