import { Randomizer } from '../../src/randomizer';

describe('Randomizer', () => {

  let randomizer;

  beforeEach(() => {
    randomizer = new Randomizer();
  });

  it('should create a randomizer engine', () => {
    expect(randomizer.engine).toBeDefined();
  });

  describe('generate()', () => {

    it('should generate a number within the given range', () => {
      for (let i = 0; i < 10; i++) {
        let result = randomizer.generate(1, 10);
        expect(result >= 1).toBe(true);
        expect(result <= 10).toBe(true);
      }
    });

    it('should generate an integer', () => {
      for (let i = 0; i < 10; i++) {
        let result = randomizer.generate(1, 10);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    it('should use an inclusive range', () => {
      expect(randomizer.generate(1, 1)).toBe(1);
    });

  });

});
