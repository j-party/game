import Random = require('random-js');

export class Randomizer {
  engine: Random;
  constructor() {
    this.engine = new Random(Random.engines.mt19937().autoSeed());
  }
  generate(min: number, max: number): number {
    return this.engine.integer(min, max);
   }
}
