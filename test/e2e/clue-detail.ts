import { TitleScreen } from './title-screen.po';
import { BoardScreen } from './board.po';

describe('Clue Detail screen', () => {
  let titleScreen: TitleScreen;
  let boardScreen: BoardScreen;

  beforeEach(() => {
    browser.loadAndWaitForAureliaPage(browser.baseUrl);

    titleScreen = new TitleScreen();
    titleScreen.waitUntilLoaded();
    titleScreen.pressAnyKey();
    browser.waitForRouterComplete();

    boardScreen = new BoardScreen();
    boardScreen.chooseFirst();
    browser.waitForRouterComplete();
  });

  it('should display the category name', () => {
    expect($('.title').isDisplayed()).toBe(true);
  });

  it('should display the clue value', () => {
    expect($('main').getText()).toMatch(/^\$\d+/);
  });

  it('should then display the clue', done => {
    setTimeout(() => {
      expect($('main').getText()).not.toMatch(/^\$\d+/);
      done();
    }, 3200);
  });

});
