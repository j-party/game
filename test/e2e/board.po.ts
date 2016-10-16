import { TitleScreen } from './title-screen.po';

export class BoardScreen {
  private waitFor = protractor.ExpectedConditions;

  chooseFirst() {
    $$('tbody td').first().$('a').click();
  }

  load() {
    let titleScreen = new TitleScreen();
    titleScreen.load();
    titleScreen.pressAnyKey();
    browser.waitForRouterComplete();
  }
}
