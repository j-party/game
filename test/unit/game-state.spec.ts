import { GameRound, GameState } from '../../src/game-state';
import { appData } from '../../src/app-data';
import { Category, Clue } from '../../src/clue';
import { Player } from '../../src/player';

describe('GameRound', () => {

  let round: GameRound;

  beforeEach(() => {
    round = new GameRound();
  });

  it('should init as round 0', () => {
    expect(round.number).toBe(0);
  });

  it('should init with app name', () => {
    expect(round.name).toBe(appData.name);
  });

  it('should init with a base amount of $100', () => {
    expect(round.baseValue).toBe(100);
  });

  it('should init with an incremental amount of $100', () => {
    expect(round.incrementalValue).toBe(100);
  });

});

describe('GameState', () => {

  let state: GameState;

  beforeEach(() => {
    state = new GameState();
  });

  describe('reset()', () => {

    let players: Player[];
    let categories: Category[];

    beforeEach(() => {
      let clue1 = new Clue();
      let clue2 = new Clue();
      let clue3 = new Clue();
      let clue4 = new Clue();
      let category1 = new Category();
      let category2 = new Category();
      category1.clues = [clue1, clue2];
      category2.clues = [clue3, clue4];
      categories = [category1, category2];
      players = [
        new Player('Dave'),
        new Player('Iago')
      ];
      state.reset(players, categories);
    });

    it('should set the players from the argument', () => {
      expect(state.players).toBe(players);
    });

    it('should set the categories from the argument', () => {
      expect(state.categories).toEqual(categories);
    });

    it('should set the current player as the first player', () => {
      expect(state.currentPlayer).toBe(players[0]);
    });

    it('should create a new GameRound', () => {
      expect(state.round).toBeDefined();
    });

    it('should calculate the clue values', () => {
      expect(state.categories[0].clues[0].value).toBe(100);
      expect(state.categories[0].clues[1].value).toBe(200);
      expect(state.categories[1].clues[0].value).toBe(100);
      expect(state.categories[1].clues[1].value).toBe(200);
    });

  });

});
