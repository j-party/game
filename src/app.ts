import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  title = 'J!Party';
  router: Router;

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
}
