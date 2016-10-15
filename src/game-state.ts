import { inject } from 'aurelia-framework';
import { appData } from './app-data';
import { Category, Clue } from './clue';
import { GameConfig } from './game-config';
import { Player } from './player';

export class GameRound {
  baseValue: number = 100;
  incrementalValue: number = 100;
  name: string = appData.name;
  number: number = 0;
}

@inject(GameConfig)
export class GameState {
  public categories: Category[];
  public currentClue: Clue | null = null;
  public currentPlayer: Player;
  public players: Player[];
  public round: GameRound;

  constructor(
    public config: GameConfig
  ) {}

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
    this.currentClue = null;
    this.categories = categories;
    this.round = new GameRound();
    this.calculateValues();
  }
}
