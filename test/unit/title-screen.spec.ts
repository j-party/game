import { TitleScreen } from '../../src/title-screen';

fdescribe('TitleScreen', () => {

  let titleScreen;
  let bindingEngine, clueService, inputService, router;

  beforeEach(() => {
    titleScreen = new TitleScreen(bindingEngine, clueService, inputService, router);
  });

  it('should start with "loading" as true', () => {
    expect(titleScreen.loading).toBe(true);
  });

  describe('created()', () => {
    //
  });

});
