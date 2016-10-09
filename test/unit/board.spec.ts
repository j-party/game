import { Board } from '../../src/board';
import { Category, Clue } from '../../src/clue';
import { GameRound } from '../../src/game-state';
import { Player } from '../../src/player';

describe('Board Screen', () => {

  let gameState: any;
  let router: any;
  let board: Board;

  beforeEach(() => {
    gameState = {
      categories: [new Category()],
      currentPlayer: new Player('Aaron'),
      players: [new Player('Barb')],
      round: new GameRound()
    };
    router = jasmine.createSpyObj('router', ['navigateToRoute']);
    board = new Board(gameState, router);
  });

  describe('created()', () => {

    let category = new Category();

    beforeEach(() => {
      board.created();
    });

    it('should store the categories', () => {
      expect(board.categories).toBe(gameState.categories);
    });

    it('should store the currentPlayer', () => {
      expect(board.currentPlayer).toBe(gameState.currentPlayer);
    });

    it('should store the players', () => {
      expect(board.players).toBe(gameState.players);
    });

    it('should store the round', () => {
      expect(board.round).toBe(gameState.round);
    });

  });

  describe('gotoClue()', () => {

    let clue: Clue;

    beforeEach(() => {
      clue = new Clue();
      clue.id = 42;
      board.gotoClue(clue);
    });

    it('should set the currentClue', () => {
      expect(board.gameState.currentClue).toBe(clue);
    });

    it('should navigate to the "clueDetail" route for the given clue ID', () => {
      expect(router.navigateToRoute).toHaveBeenCalledWith(
        'clueDetail',
        { id: clue.id }
      );
    });

  });

});
