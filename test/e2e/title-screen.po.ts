export class TitleScreen {
  private waitFor = protractor.ExpectedConditions;

  pressAnyKey() {
    $('body').sendKeys('a');
  }

  waitUntilLoaded() {
    browser.wait(this.waitFor.visibilityOf($('.press-any')), 30000);
  }
}
