import { Dashboard } from '../../src/dashboard';
import { Category, Clue } from '../../src/clue';

describe('Dashboard', () => {

  let dashboard, clueService, router;

  beforeEach(() => {
    clueService = jasmine.createSpyObj('clueService', ['choose']);
    router = jasmine.createSpyObj('router', ['navigateToRoute']);
    dashboard = new Dashboard(clueService, router);
  });

  it('should start with no categories', () => {
    expect(dashboard.categories).toEqual([]);
  });

  describe('created()', () => {

    let category = new Category();

    beforeEach(done => {
      clueService.choose.and.returnValue(Promise.resolve([category]));
      dashboard.created().then(done);
    });

    it('should choose 6 categories from ClueService', () => {
      expect(clueService.choose).toHaveBeenCalledWith(6);
    });

    it('should save the categories', () => {
      expect(dashboard.categories.length).toBe(1);
      expect(dashboard.categories[0]).toBe(category);
    });

  });

  describe('gotoDetail()', () => {

    let clue;

    beforeEach(() => {
      clue = new Clue();
      clue.id = 42;
      dashboard.gotoDetail(clue);
    })

    it('should navigate to the "clueDetail" route for the given clue ID', () => {
      expect(router.navigateToRoute).toHaveBeenCalledWith(
        'clueDetail',
        { id: clue.id }
      );
    });

  });

});
