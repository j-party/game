import { ClueDetailComponent } from '../../src/clue-detail';
import { Clue } from '../../src/clue';

describe('Clue Detail component', () => {

  let clueService: any;
  let clueDetail: ClueDetailComponent;

  beforeEach(() => {
    clueService = jasmine.createSpyObj('ClueService', ['getClue']);
  });

  describe('activate()', () => {

    let id = 42;
    let fakeClue = new Clue();

    beforeEach(() => {
      clueService.getClue.and.returnValue(fakeClue);
      clueDetail = new ClueDetailComponent(clueService);
      clueDetail.activate({ id: 42 });
    });

    it('should lookup the clue from the passed ID', () => {
      expect(clueService.getClue).toHaveBeenCalledWith(id);
    });

    it('should save the clue', () => {
      expect(clueDetail.clue).toBe(fakeClue);
    });

  });

  describe('goBack()', () => {

    beforeEach(() => {
      spyOn(window.history, 'back');
      new ClueDetailComponent(clueService).goBack();
    });

    it('should go back in the browser history', () => {
      expect(window.history.back).toHaveBeenCalled();
    });

  });

});
