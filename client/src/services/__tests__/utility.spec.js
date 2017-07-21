import { isEmpty, getValue } from '../utility';

describe('(Services) utility', () => {
  describe('isEmpty', () => {
    it('Should return true for an empty object', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('Should return false for an object that has properties', () => {
      expect(isEmpty({ test: 'val' })).toBe(false);
    });
  });

  describe('getValue', () => {
    it('Should correctly return the property when found', () => {
      expect(getValue('key', { key: 'value' }, 'default')).toEqual('value');
      expect(getValue('key.nested', { key: { nested: [ 1, 2, 3 ] } }, [])).toEqual([ 1, 2, 3 ]);
      expect(getValue('key.nested.third', { key: { nested: { third: 'final' } } }, 'default')).toEqual('final');
    });

    it('Should correctly return the default value when property is not found', () => {
      expect(getValue('random', { key: 'value' }, 'default')).toEqual('default');
      expect(getValue('nested.key', { key: { nested: 'value' } }, 'default')).toEqual('default');
      expect(getValue('not.found', {})).toEqual(null);
      expect(getValue('key')).toEqual(null);
    });
  });
});
