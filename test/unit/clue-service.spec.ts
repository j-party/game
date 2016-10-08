import { ClueService } from '../../src/clue-service';
import { Category, Clue } from '../../src/clue';
import { DatabaseParser } from '../../src/database-parser';
import { Randomizer } from '../../src/randomizer';

describe('Clue Service', () => {

  let clueService: ClueService;
  let dbParser = new DatabaseParser();
  let http = jasmine.createSpyObj('http', ['fetch']);
  let randomizer = new Randomizer();

  beforeEach(() => {
    clueService = new ClueService(dbParser, http, randomizer);
  });

  it('should start with no clues data', () => {
    expect(clueService.clues).toEqual([]);
  });

  it('should start with "hasLoaded" as false', () => {
    expect(clueService.hasLoaded).toBe(false);
  });

  describe('choose()', () => {

    beforeEach(() => {
      clueService.clues = [];
      for (let i = 0; i < 100; i++) {
        let category = new Category();
        category.id = i;
        clueService.clues.push(category);
      }
    });

    it('should return a promise with X clue categories', done => {
      let num = 3;
      clueService.choose(num).then(categories => {
        expect(categories.length).toBe(num);
      }).then(done);
    });

    it('should randomize the returned categories', done => {
      // Something like 1 in 9,034,502,400 chance this passes.
      Promise.all([
        clueService.choose(5),
        clueService.choose(5)
      ]).then(categories => {
        expect(JSON.stringify(categories[0])).not.toBe(JSON.stringify(categories[1]));
      }).then(done);
    });

  });

  describe('getClue()', () => {

    let fakeClue;

    beforeEach(() => {
      fakeClue = new Clue();
      let category = new Category();
      category.clues = [fakeClue];
      clueService.clues = [category];
    });

    it('should return the first clue in the collection', () => {
      expect(clueService.getClue()).toBe(fakeClue);
    });

  });

  describe('getClues()', () => {

    let fakeCategory;

    beforeEach(() => {
      fakeCategory = new Category();
      clueService.clues = [fakeCategory];
    });

    it('should resolve to the categories', done => {
      clueService.getClues().then(categories => {
        expect(categories[0]).toBe(fakeCategory);
      }).then(done);
    });

  });

  describe('loadClues()', () => {

    let categoryId = 14;
    let categoryName = 'ANIMAL SUPERLATIVES';
    let clueId = 56;
    let clueLevel = 0;
    let clueText = 'To bend down on the small porch of the same name';
    let clueAnswer = 'stoop';
    let fakeCategoriesData = `1
id|name
${categoryId}|${categoryName}
`;
    let fakeCluesData = `1
id|categoryId|level|clue|answer
${clueId}|${categoryId}|${clueLevel}|${clueText}|${clueAnswer}
`;

    beforeEach(done => {
      http.fetch.and.callFake(filename => {
        return Promise.resolve({
          text: () => {
            return filename === 'clues.txt' ? fakeCluesData : fakeCategoriesData;
          }
        });
      });
      clueService.loadClues().then(done);
    });

    it('should load the data from the data files', () => {
      expect(http.fetch).toHaveBeenCalledWith('categories.txt');
      expect(http.fetch).toHaveBeenCalledWith('clues.txt');
    });

    it('should save the parsed data', () => {
      expect(clueService.clues.length).toBe(1);

      let category = clueService.clues[0];
      expect(category.id).toBe(categoryId);
      expect(category.name).toBe(categoryName);
      expect(category.isFinal).toBe(false);
      expect(category.clues.length).toBe(1);

      let clue = category.clues[0];
      expect(clue.id).toBe(clueId);
      expect(clue.clue).toBe(clueText);
      expect(clue.answer).toBe(clueAnswer);
    });

    it('should set "hasLoaded" to true', () => {
      expect(clueService.hasLoaded).toBe(true);
    });

  });

});
