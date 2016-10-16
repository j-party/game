import { TitleScreen } from './title-screen.po';

describe('Title screen', () => {
  let titleScreen: TitleScreen;

  beforeEach(() => {
    titleScreen = new TitleScreen();
    titleScreen.load();
  });

  describe('when a key is pressed', () => {
    beforeEach(() => {
      titleScreen.pressAnyKey();
      browser.waitForRouterComplete();
    });

    it('should go to the board screen', () => {
      expect(browser.getCurrentUrl()).toMatch('#/board');
    });
  });

});
