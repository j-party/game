import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

import { Clue, Category } from './clue';
import { DatabaseRow, DatabaseParser } from './database-parser';
import { Randomizer } from './randomizer';

@inject(DatabaseParser, HttpClient, Randomizer)
export class ClueService {
  private categoriesFile = 'categories.txt';
  private cluesFile = 'clues.txt';
  private clues: Category[] = [];
  private hasLoaded = false;
  constructor(
    private dbParser: DatabaseParser,
    private http: HttpClient,
    private randomizer: Randomizer
  ) {}
  // Chooses X number of categories with clues.
  choose(num: Number): Promise<Category[]> {
    // TODO This should not have possible duplicates.
    let categories: Category[] = [];
    for (let i = 0; i < num; i++) {
      let index = this.randomizer.generate(0, this.clues.length);
      categories.push(this.clues[index]);
    }
    return Promise.resolve(categories);
  }
  getClue(id: number): Clue {
    return this.clues[0].clues[0];
  }
  // Returns all clues in the database.
  getClues() {
    return Promise.resolve(this.clues);
  }
  // Loads the clues into the browser.
  loadClues(): Promise<void> {

    let categoryRawData: string;
    let clueRawData: string;

    let loadDataFiles = (): Promise<void> => {
      return Promise.all([
        this.http.fetch(this.categoriesFile).then(response => response.text()),
        this.http.fetch(this.cluesFile).then(response => response.text())
      ]).then(data => {
        [categoryRawData, clueRawData] = data;
      });
    };

    let parseData = (): Promise<void> => {
      let parser = (data: string) => {
        let parsedData: DatabaseRow[] = [];
        return new Promise(resolve => {
          this.dbParser.parseList(data, (row: DatabaseRow) => {
            if (row.total) {
              // do nothing special
            } else if (row.done) {
              resolve(parsedData);
            } else {
              parsedData.push(row);
            }
          });
        });
      };
      return Promise.all([
        parser(categoryRawData),
        parser(clueRawData)
      ]).then((data: [DatabaseRow[], DatabaseRow[]]) => {
        let [categoryParsedData, clueParsedData] = data;

        interface IIndexedData {
          [key: number]: Category;
        }
        let indexedData: IIndexedData = {};
        categoryParsedData.forEach(category => {
          let categoryId = Number(category.id);
          let newCategory: Category = {
            id: categoryId,
            name: String(category.name),
            isFinal: false,
            clues: []
          }
          indexedData[categoryId] = newCategory;
        });
        clueParsedData.forEach(clue => {
          let categoryId = Number(clue.categoryId);
          let level = Number(clue.level) === 999 ? 0 : Number(clue.level);
          let newClue: Clue = {
            id: Number(clue.id),
            clue: String(clue.clue),
            answer: String(clue.answer),
            value: 0,
            isRevealed: false
          };
          indexedData[categoryId].isFinal = Number(clue.level) === 999;
          indexedData[categoryId].clues[level] = newClue;
        });

        this.clues = Object.keys(indexedData).map(key => {
          return indexedData[Number(key)];
        });
      });
    };

    return loadDataFiles().then(parseData).then(() => { this.hasLoaded = true; });
  }
}
