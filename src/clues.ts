import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import { Clue, Category } from './clue';
import { ClueService } from './clue-service';

@inject(ClueService, Router)
export class Clues {
  clues: Category[];
  selectedClue: Clue;
  constructor(
    private clueService: ClueService,
    private router: Router
  ) {}
  getClues() {
    this.clueService.getClues().then(clues => this.clues = clues);
  }
  created() {
    this.getClues();
  }
  onSelect(clue: Clue) { this.selectedClue = clue; }
  gotoDetail() {
    this.router.navigateToRoute('clueDetail', { id: this.selectedClue.id });
  }
}
