import { inject } from 'aurelia-framework';
import { Clue } from './clue';
import { ClueService } from './clue-service';

@inject(ClueService)
export class ClueDetailComponent {
  clue: Clue;
  constructor(
    private clueService: ClueService,
  ) {}
  activate(params) {
    let id = Number(params.id);
    this.clue = this.clueService.getClue(id);
  }
  goBack() {
    window.history.back();
  }
}
