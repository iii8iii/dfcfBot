import { getTpStocks } from '../src/index';

describe('getTpStocks', () => {
  it('show data', async () => {
    const data = await getTpStocks();
    console.log(data);
    expect(data).not.toBeNull();
  });
});
