import { inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

import { appData } from './app-data';
import { ClueService } from './clue-service';
import { GameState } from './game-state';
import { Player } from './player';

@inject(ClueService, GameState)
export class App {
  title = appData.name;
  router: Router;

  constructor(
    private clueService: ClueService,
    private gameState: GameState
  ) {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = this.title;
    config.map([
      { route: '',          moduleId: 'title-screen' },
      { route: 'board',     moduleId: 'board',       name: 'board' },
      { route: 'clue/:id',  moduleId: 'clue-detail', name: 'clueDetail' },
    ]);
    this.router = router;
  }

  created() {
    console.log('Loading clues...');
    return this.clueService.loadClues().then(() => {
      console.log('clues loaded');
      return this.clueService.choose(6);
    }).then(categories => {
      let players = [
        new Player('You'),
        new Player('Computer 1'),
        new Player('Computer 2'),
      ];
      this.gameState.reset(players, categories);
    }).catch(err => { console.log('ERROR!', err) });
  }
}
