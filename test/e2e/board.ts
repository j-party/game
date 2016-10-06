import { TitleScreen } from './title-screen.po';

describe('Board screen', () => {
  let titleScreen: TitleScreen;

  beforeEach(() => {
    browser.loadAndWaitForAureliaPage(browser.baseUrl);
    titleScreen = new TitleScreen();
    titleScreen.waitUntilLoaded();
    titleScreen.pressAnyKey();
    browser.waitForRouterComplete();
  });

  it('should display the round name at the top', () => {
    expect(element(by.tagName('h3')).isDisplayed()).toBe(true);
    expect(element(by.tagName('h3')).getText()).toBe('J!Party');
  });

  it('should display 6 categories with 5 clues each', () => {
    expect(element(by.tagName('table')).isDisplayed()).toBe(true);
    expect(element.all(by.css('tbody tr')).count()).toBe(5);
    expect(element.all(by.css('tbody td')).count()).toBe(5*6);
  });

  it('should ask the current player to choose a category', () => {
    expect(element(by.css('.please-choose')).isDisplayed()).toBe(true);
    expect(element(by.css('.please-choose')).getText()).toMatch('^You');
  });

  it('should list the players', () => {
    expect(element(by.css('.players')).isDisplayed()).toBe(true);
    expect(element.all(by.css('.players li')).count()).toBe(3);
  });

});
