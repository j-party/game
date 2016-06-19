import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { CLUES } from './mock-clues';

@Injectable()
export class ClueService {
  private cluesSqliteFile = 'clues.db';
  constructor(
    private http: Http
  ) {}
  // Loads the clues into the browser.
  // Returns an Observable of progress values (totals to 100).
  loadClues(): Observable<number> {
    let progressBreakdown = {
      loadData: 20,
      storeData: 80
    };

    let loadSqliteFile = () => this.http.get(this.cluesSqliteFile).toPromise();

    return Observable.create((observer: Observer<number>) => {
      loadSqliteFile().then(() => {
        observer.next(progressBreakdown.loadData);
      }).then(() => observer.complete());
    });
  }
  getClues() {
    return Promise.resolve(CLUES);
  }
  getClue(id: number) {
    return this.getClues().then(clues => clues.filter(clue => clue.id === id)[0]);
  }
}
