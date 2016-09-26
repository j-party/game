import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import { Category, Clue } from './clue';
import { ClueService } from './clue-service';

@inject(ClueService, Router)
export class Dashboard {
  categories: Category[] = [];
  constructor(
    private clueService: ClueService,
    private router: Router
  ) {}
  created(): Promise<void> {
    return this.clueService.choose(6).then(categories => { this.categories = categories; });
  }
  gotoDetail(clue: Clue) {
    this.router.navigateToRoute('clueDetail', { id: clue.id });
  }
}
