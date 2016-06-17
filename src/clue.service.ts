import { Injectable } from '@angular/core';
import { CLUES } from './mock-clues';

@Injectable()
export class ClueService {
  getClues() {
    return Promise.resolve(CLUES);
  }
  getClue(id: number) {
    return this.getClues().then(clues => clues.filter(clue => clue.id === id)[0]);
  }
}
