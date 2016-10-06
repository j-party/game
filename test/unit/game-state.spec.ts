import { GameRound, GameState } from '../../src/game-state';
import { Category } from '../../src/clue';
import { Player } from '../../src/player';

describe('GameRound', () => {

  let round: GameRound;

  beforeEach(() => {
    round = new GameRound();
  });

  it('should init as round 0', () => {
    expect(round.number).toBe(0);
  });

  it('should init with name of "J!Party"', () => {
    expect(round.name).toBe('J!Party');
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
      players = [
        new Player('Dave'),
        new Player('Iago')
      ];
      categories = [
        new Category(),
        new Category()
      ];
      state.reset(players, categories);
    });

    it('should set the players from the argument', () => {
      expect(state.players).toBe(players);
    });

    it('should set the categories from the argument', () => {
      expect(state.categories).toBe(categories);
    });

    it('should set the current player as the first player', () => {
      expect(state.currentPlayer).toBe(players[0]);
    });

    it('should create a new GameRound', () => {
      expect(state.round).toBeDefined();
    });

  });

});
