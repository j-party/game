import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { DatabaseRow, DatabaseParser } from './database-parser.service';
import { CLUES } from './mock-clues';

@Injectable()
export class ClueService {
  private categoriesFile = 'categories.txt';
  private cluesFile = 'clues.txt';
  constructor(
    private http: Http,
    private dbParser: DatabaseParser
  ) {}
  // Loads the clues into the browser.
  // Returns an Observable of progress increments (totals to 100).
  loadClues(): Observable<number> {
    // Progress sizes. Totals to 100.
    let doneWith = {
      loading: 20,
      parsing: 40,
      storing: 40
    };

    let categoryRawData: string;
    let categoryParsedData: DatabaseRow[];
    let clueRawData: string;
    let clueParsedData: DatabaseRow[];

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
        [categoryParsedData, clueParsedData] = data;
        observer.next(doneWith.parsing);
        observer.complete();
      });
    });

    let storeData: Observable<number> = Observable.create((observer: Observer<number>) => {
      observer.next(doneWith.storing);
      observer.complete();
    });

    return Observable.concat(loadDataFiles, parseData, storeData);
  }
  getClues() {
    return Promise.resolve(CLUES);
  }
  getClue(id: number) {
    return this.getClues().then(clues => clues.filter(clue => clue.id === id)[0]);
  }
}
