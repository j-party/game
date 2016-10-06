import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import { Category, Clue } from './clue';
import { GameRound, GameState } from './game-state';
import { Player } from './player';

@inject(GameState, Router)
export class Board {
  categories: Category[];
  currentPlayer: Player;
  players: Player[];
  round: GameRound;
  constructor(
    private gameState: GameState,
    private router: Router
  ) {}
  created() {
    this.categories = this.gameState.categories;
    this.currentPlayer = this.gameState.currentPlayer;
    this.players = this.gameState.players;
    this.round = this.gameState.round;
  }
  gotoDetail(clue: Clue) {
    this.router.navigateToRoute('clueDetail', { id: clue.id });
  }
}
