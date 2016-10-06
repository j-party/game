import { Category } from './clue';
import { Player } from './player';

export class GameRound {
  number: number;
  name: string;
  constructor() {
    this.number = 0;
    this.name = 'J!Party';
  }
}

export class GameState {
  public categories: Category[];
  public currentPlayer: Player;
  public players: Player[];
  public round: GameRound;
  reset(players: Player[], categories: Category[]) {
    this.players = players;
    this.currentPlayer = this.players[0];
    this.categories = categories;
    this.round = new GameRound();
  }
}
