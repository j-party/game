import { TitleScreen } from '../../src/title-screen';

describe('TitleScreen', () => {

  let titleScreen;
  let bindingEngine, clueService, inputService, router;

  beforeEach(() => {
    clueService = {};
    bindingEngine = jasmine.createSpyObj('propertyObserver', ['propertyObserver']);
    inputService = jasmine.createSpyObj('inputService', ['waitForAny']);
    router = jasmine.createSpyObj('router', ['navigateToRoute']);
    titleScreen = new TitleScreen(bindingEngine, clueService, inputService, router);
  });

  it('should start with "loading" as true', () => {
    expect(titleScreen.loading).toBe(true);
  });

  describe('created()', () => {

    beforeEach(() => {
      bindingEngine.propertyObserver.and.returnValue({
        subscribe: function() {}
      });
    });

    it('should subscribe to changes on clueService.hasLoaded', () => {
      titleScreen.created();
      expect(bindingEngine.propertyObserver).toHaveBeenCalledWith(clueService, 'hasLoaded');
    });

    describe('when clueService.hasLoaded changes', () => {

      let callback, dispose;

      beforeEach(() => {
        dispose = jasmine.createSpy('dispose');
        bindingEngine.propertyObserver.and.returnValue({
          subscribe: cb => {
            callback = cb;
            return { dispose: dispose };
          }
        });
        inputService.waitForAny.and.returnValue({
          then: cb => { cb(); }
        });
        titleScreen.created();
        callback();
      });

      it('should set "loading" to false', () => {
        expect(titleScreen.loading).toBe(false);
      });

      it('should wait for input', () => {
        expect(inputService.waitForAny).toHaveBeenCalled();
      });

      it('should navigation to the Dashboard when input is received', () => {
        expect(router.navigateToRoute).toHaveBeenCalledWith('dashboard');
      });

      it('should turn off the subscription', () => {
        expect(dispose).toHaveBeenCalled();
      });

    });

  });

});
