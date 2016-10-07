import { BindingEngine, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import { appData } from './app-data';
import { ClueService } from './clue-service';
import { InputService } from './input-service';

@inject(BindingEngine, ClueService, InputService, Router)
export class TitleScreen {
  private app = appData;
  private loading: boolean = true;

  constructor(
    private bindingEngine: BindingEngine,
    private clueService: ClueService,
    private inputService: InputService,
    private router: Router
  ) {}

  created() {
    let turnOffLoading = () => this.loading = false;

    let waitForInput = () => {
      return this.inputService.waitForAny().then(() => {
        this.router.navigateToRoute('board');
      });
    };

    let subscription = this.bindingEngine.propertyObserver(this.clueService, 'hasLoaded')
      .subscribe((newValue, oldValue) => {
        turnOffLoading();
        waitForInput();
        subscription.dispose();
      });
  }
}
