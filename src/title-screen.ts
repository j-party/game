import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import { ClueService } from './clue-service';
import { InputService } from './input-service';

@inject(ClueService, InputService, Router)
export class TitleScreen {
  private loading: boolean = true;
  constructor(
    private clueService: ClueService,
    private inputService: InputService,
    private router: Router
  ) {}
  created() {
    let turnOffLoading = () => this.loading = false;

    let waitForInput = () => {
      return this.inputService.waitForAny().then(() => {
        this.router.navigateToRoute('dashboard');
      });
    };

    this.clueService.loadClues().then(() => {
      turnOffLoading();
      waitForInput();
    }).catch(err => { console.log('ERROR!', err) });
  }
}
