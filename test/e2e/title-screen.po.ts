export class TitleScreen {
  private waitFor = protractor.ExpectedConditions;

  load() {
    browser.loadAndWaitForAureliaPage(browser.baseUrl);
    browser.wait(this.waitFor.visibilityOf($('.press-any')), 30000);
  }

  pressAnyKey() {
    $('body').sendKeys('a');
  }
}
