import { TitleScreen } from './title-screen.po';

describe('Title Screen', () => {
  let titleScreen: TitleScreen;

  beforeEach(() => {
    titleScreen = new TitleScreen();
    browser.loadAndWaitForAureliaPage(browser.baseUrl);
    titleScreen.waitUntilLoaded();
  });

  describe('when a key is pressed', () => {
    beforeEach(() => {
      titleScreen.pressAnyKey();
      browser.waitForRouterComplete();
    });

    it('should go to the board screen', () => {
      expect(browser.getCurrentUrl()).toMatch('#/dashboard');
    });
  });

});
