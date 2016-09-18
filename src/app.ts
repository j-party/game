import { inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { ClueService } from './clue-service';

@inject(ClueService)
export class App {
  title = 'J!Party';
  router: Router;

  constructor(
    private clueService: ClueService
  ) {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = this.title;
    config.map([
      { route: '',          moduleId: 'title-screen' },
      { route: 'dashboard', moduleId: 'dashboard',   name: 'dashboard' },
      { route: 'board',     moduleId: 'clues',       name: 'board' },
      { route: 'clue/:id',  moduleId: 'clue-detail', name: 'clueDetail' },
    ]);
    this.router = router;
  }

  created() {
    console.log('Loading clues...');
    this.clueService.loadClues().then(() => {
      console.log('clues loaded');
    }).catch(err => { console.log('ERROR!', err) });
  }
}
