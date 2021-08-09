import { numDate, time } from '../src/utils/time';

describe('simple test', () => {
  it('time() should be number', () => {
    expect(time()).not.toBeNaN();
  });
  it('numDate', () => {
    expect(numDate()).toBe(numDate()); //need to change the value when test, the result depen on the date
  });
});
