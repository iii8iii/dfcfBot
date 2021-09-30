import { get5minZfStocks } from '../src/index';
describe('et5min', () => {
  it('show data', async () => {
    const data = await get5minZfStocks();
    // console.log(data);
    expect(data).not.toBeNull();
  });
});
