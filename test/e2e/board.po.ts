export class BoardScreen {
  private waitFor = protractor.ExpectedConditions;

  chooseFirst() {
    $$('tbody td').first().$('a').click();
  }
}
