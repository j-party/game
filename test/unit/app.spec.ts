import { App } from '../../src/app';

describe('App component', () => {

  let clueService: any;
  let router: any;
  let routerConfig: any;
  let app: App;

  beforeEach(() => {
    clueService = jasmine.createSpyObj('ClueService', ['loadClues']);
    clueService.loadClues.and.returnValue(Promise.resolve());
    router = { fake: true };
    routerConfig = { map: jasmine.createSpy('RouterConfiguration.map()') };
  });

  it('should set a title', () => {
    expect(new App(clueService).title).toEqual(jasmine.any(String));
  });

  describe('when the router is configured', () => {

    beforeEach(() => {
      app = new App(clueService);
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

    beforeEach(() => {
      new App(clueService).created();
    });

    it('should load the clues from ClueService', () => {
      expect(clueService.loadClues).toHaveBeenCalled();
    });

  });

});
