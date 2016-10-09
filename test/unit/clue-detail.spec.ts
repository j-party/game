import { ClueDetailComponent } from '../../src/clue-detail';
import { Clue } from '../../src/clue';

describe('Clue Detail component', () => {

  let clueDetail: ClueDetailComponent;
  let gameState: any;

  beforeEach(() => {
    gameState = {};
  });

  describe('constructor', () => {

    it('should set the clue if currentClue exists', () => {
      gameState.currentClue = new Clue();
      clueDetail = new ClueDetailComponent(gameState);
      expect(clueDetail.clue).toBe(gameState.currentClue);
    });

    it('should NOT set a clue if currentClue does not exist', () => {
      clueDetail = new ClueDetailComponent(gameState);
      expect(clueDetail.clue).toBeUndefined();
    });

  });

  describe('attached()', () => {

    beforeEach(() => {
      gameState.currentClue = new Clue();
      clueDetail = new ClueDetailComponent(gameState);
    });

    describe('when the clue has been revealed', () => {
      // TODO
    });

    describe('when the clue has NOT been revealed', () => {

      beforeEach(() => {
        spyOn(window, 'setTimeout').and.callFake(func => { func(); });
        clueDetail.attached();
      });

      it('should wait 3 seconds', () => {
        expect(window.setTimeout).toHaveBeenCalledWith(
          jasmine.any(Function),
          3000
        );
      });

      it('should then mark the clue as revealed', () => {
        expect(clueDetail.clue.isRevealed).toBe(true);
      });

    });

  });
});
