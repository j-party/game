import { ClueDetailScreen } from './clue-detail.po';

describe('Clue Detail screen', () => {

  beforeEach(() => {
    let clueDetailScreen = new ClueDetailScreen();
    clueDetailScreen.load();
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
