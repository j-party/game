import { inject } from 'aurelia-framework';
import { Clue } from './clue';
import { GameState } from './game-state';

@inject(GameState)
export class ClueDetailComponent {
  clue: Clue;
  constructor(
    private gameState: GameState,
  ) {
    if (this.gameState.currentClue) {
      this.clue = this.gameState.currentClue;
    }
  }
  attached() {
    if (this.clue.isRevealed) {
      // TODO wait for buzzer
    } else {
      window.setTimeout(() => {
        this.clue.isRevealed = true;
      }, 3000);
    }
  }
}
