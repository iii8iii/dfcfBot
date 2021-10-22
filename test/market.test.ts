import { marketCode } from '../src/utils/market';
// 000|001|002|003|300|301 sz
// 600|601|603|605|688 sh
describe('marketCode', () => {
  it('sz should be 0', () => {
    expect(marketCode('000123')).toBe('0.000123');
    expect(marketCode('001123')).toBe('0.001123');
    expect(marketCode('002123')).toBe('0.002123');
    expect(marketCode('003123')).toBe('0.003123');
    expect(marketCode('300123')).toBe('0.300123');
    expect(marketCode('301123')).toBe('0.301123');
  });
  it('sh should be 1', () => {
    expect(marketCode('600123')).toBe('1.600123');
    expect(marketCode('601123')).toBe('1.601123');
    expect(marketCode('603123')).toBe('1.603123');
    expect(marketCode('605123')).toBe('1.605123');
  });
  it('others should be ""', () => {
    expect(marketCode('123456')).toBe('');
  });
});
