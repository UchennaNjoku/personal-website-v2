import { cn } from '../utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional class names', () => {
    expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2');
  });

  it('merges tailwind classes correctly', () => {
    // tailwind-merge should override p-2 with p-4
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('handles array input', () => {
      expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  it('handles object input', () => {
      expect(cn({ 'class1': true, 'class2': false })).toBe('class1');
  });
});
