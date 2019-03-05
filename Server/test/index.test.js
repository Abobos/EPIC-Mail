
import { expect } from 'chai';
import sayHello from '../../index';

// eslint-disable-next-line no-undef
describe('index test', () => {
  // eslint-disable-next-line no-undef
  describe('sayHello function', () => {
    // eslint-disable-next-line no-undef
    it('should say Hello guys!', () => {
      const str = sayHello();
      expect(str).to.equal('Hello guys!');
    });
  });
});
