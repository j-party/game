import { Board } from '../../src/board';
import { Category, Clue } from '../../src/clue';

describe('Board Screen', () => {

  let clueService: any;
  let router: any;
  let board: Board;

  beforeEach(() => {
    clueService = jasmine.createSpyObj('clueService', ['choose']);
    router = jasmine.createSpyObj('router', ['navigateToRoute']);
    board = new Board(clueService, router);
  });

  it('should start with no categories', () => {
    expect(board.categories).toEqual([]);
  });

  describe('created()', () => {

    let category = new Category();

    beforeEach(done => {
      clueService.choose.and.returnValue(Promise.resolve([category]));
      board.created().then(done);
    });

    it('should choose 6 categories from ClueService', () => {
      expect(clueService.choose).toHaveBeenCalledWith(6);
    });

    it('should save the categories', () => {
      expect(board.categories.length).toBe(1);
      expect(board.categories[0]).toBe(category);
    });

  });

  describe('gotoDetail()', () => {

    let clue: Clue;

    beforeEach(() => {
      clue = new Clue();
      clue.id = 42;
      board.gotoDetail(clue);
    })

    it('should navigate to the "clueDetail" route for the given clue ID', () => {
      expect(router.navigateToRoute).toHaveBeenCalledWith(
        'clueDetail',
        { id: clue.id }
      );
    });

  });

});
