import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Clue, Category } from './clue';
import { DatabaseRow, DatabaseParser } from './database-parser.service';

@Injectable()
export class ClueService {
  private categoriesFile = 'categories.txt';
  private cluesFile = 'clues.txt';
  private clues: Category[] = [];
  constructor(
    private http: Http,
    private dbParser: DatabaseParser
  ) {}
  // Loads the clues into the browser.
  // Returns an Observable of progress increments (totals to 100).
  loadClues(): Observable<number> {
    // Progress sizes. Totals to 100.
    let doneWith = {
      loading: 60,
      parsing: 40
    };

    let categoryRawData: string;
    let clueRawData: string;

    let loadDataFiles: Observable<number> = Observable.create((observer: Observer<number>) => {
      Promise.all([
        this.http.get(this.categoriesFile).toPromise(),
        this.http.get(this.cluesFile).toPromise()
      ]).then(response => {
        return response.map(r => r.text());
      }).then(data => {
        [categoryRawData, clueRawData] = data;
        observer.next(doneWith.loading);
        observer.complete();
      });
    });

    let parseData: Observable<number> = Observable.create((observer: Observer<number>) => {
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
      }
      Promise.all([
        parser(categoryRawData),
        parser(clueRawData)
      ]).then((data: DatabaseRow[][]) => {
        let [categoryParsedData, clueParsedData] = data;

        let indexedData = {};
        categoryParsedData.forEach(category => {
          let categoryId = Number(category.id);
          let newCategory: Category = {
            id: categoryId,
            name: category.name,
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
            clue: clue.clue,
            answer: clue.answer
          };
          indexedData[categoryId].isFinal = Number(clue.level) === 999;
          indexedData[categoryId].clues[level] = newClue;
        });

        this.clues = Object.keys(indexedData).map(key => {
          return indexedData[key];
        });

        observer.next(doneWith.parsing);
        observer.complete();
      });
    });

    return Observable.concat(loadDataFiles, parseData);
  }
  getClues() {
    return Promise.resolve(this.clues);
  }
}
