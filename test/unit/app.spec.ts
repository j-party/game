import { App } from '../../src/app';
import { appData } from '../../src/app-data';
import { Category } from '../../src/clue';

describe('App component', () => {

  let clueService: any;
  let gameState: any;
  let categories: Category[];
  let router: any;
  let routerConfig: any;
  let app: App;

  beforeEach(() => {
    categories = [new Category()];
    clueService = jasmine.createSpyObj('ClueService', ['choose', 'loadClues']);
    clueService.choose.and.returnValue(Promise.resolve(categories));
    clueService.loadClues.and.returnValue(Promise.resolve());
    gameState = jasmine.createSpyObj('GameState', ['reset']);
    router = { fake: true };
    routerConfig = { map: jasmine.createSpy('RouterConfiguration.map()') };
  });

  it('should set the title to the app name', () => {
    expect(new App(clueService, gameState).title).toEqual(appData.name);
  });

  describe('when the router is configured', () => {

    beforeEach(() => {
      app = new App(clueService, gameState);
      app.configureRouter(routerConfig, router);
    });

    it('should set the router title from the component title', () => {
      expect(routerConfig.title).toBe(app.title);
    });

    it('should map the routes', () => {
      expect(routerConfig.map).toHaveBeenCalled();
    });

    it('should save the router object', () => {
      expect(app.router).toBe(router);
    });

  });

  describe('when created', () => {

    beforeEach(done => {
      app = new App(clueService, gameState);
      app.created().then(done);
    });

    it('should load the clues from ClueService', () => {
      expect(clueService.loadClues).toHaveBeenCalled();
    });

    it('should choose 6 categories from ClueService', () => {
      expect(clueService.choose).toHaveBeenCalledWith(6);
    });

    it('should reset the game state with 3 players', () => {
      let playersArg = gameState.reset.calls.mostRecent().args[0];
      expect(playersArg.length).toBe(3);
    });

    it('should reset the game state with the selected categories', () => {
      let categoriesArg = gameState.reset.calls.mostRecent().args[1];
      expect(categoriesArg).toBe(categories);
    });

  });

});
