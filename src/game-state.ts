import { appData } from './app-data';
import { Category } from './clue';
import { Player } from './player';

export class GameRound {
  baseValue: number = 100;
  incrementalValue: number = 100;
  name: string = appData.name;
  number: number = 0;
}

export class GameState {
  public categories: Category[];
  public currentPlayer: Player;
  public players: Player[];
  public round: GameRound;

  private calculateValues() {
    this.categories = this.categories.map(category => {
      category.clues = category.clues.map((clue, i) => {
        clue.value = this.round.baseValue + this.round.incrementalValue * i;
        return clue;
      });
      return category;
    });
  }

  reset(players: Player[], categories: Category[]) {
    this.players = players;
    this.currentPlayer = this.players[0];
    this.categories = categories;
    this.round = new GameRound();
    this.calculateValues();
  }
}
