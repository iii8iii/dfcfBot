import { clearKc } from '../src/utils/clearKc';

describe('clearKC', () => {
  it('with kc', () => {
    expect(clearKc([{ c: '688688' }, { c: '600688' }])).toStrictEqual([
      { c: '600688' },
    ]);
  });
  it('no kc', () => {
    expect(clearKc([{ c: '600688' }])).toStrictEqual([{ c: '600688' }]);
  });
});
