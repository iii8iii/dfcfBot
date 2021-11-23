import { cleanCodes } from '../src/utils/cleanCodes';
const codes = [
  {
    c: '300123',
    n: 'st股票',
  },
  {
    c: '300123',
    n: '*st股票',
  },
  {
    c: '300123',
    n: 'n股票',
  },
  {
    c: '668123',
    n: '股票名称',
  },
  {
    c: '300123',
    n: '股票名称',
  },
];
describe('marketCode', () => {
  it('st|n', async () => {
    expect(await cleanCodes(codes)).toStrictEqual([
      {
        c: '300123',
        n: '股票名称',
      },
    ]);
  });
  it('[]', async () => {
    expect(await cleanCodes([])).toStrictEqual([]);
  });
});
