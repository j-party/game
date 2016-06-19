import { Component, OnInit } from '@angular/core';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';

import { ClueService } from './clue.service';
import { InputService } from './input.service';
import { GameState } from './game-state.service';

@Component({
  moduleId: module.id,
  selector: 'title-screen',
  directives: [MD_PROGRESS_BAR_DIRECTIVES],
  templateUrl: 'title-screen.component.html'
})
export class TitleScreenComponent implements OnInit {
  private loading: boolean = true;
  private loadingPercentage: number = 0;
  constructor(
    private clueService: ClueService,
    private inputService: InputService,
    private game: GameState
  ) {}
  ngOnInit() {
    let turnOffLoading = () => this.loading = false;

    let waitForInput = () => {
      return this.inputService.waitForAny().then(() => {
        this.game.goTo('Dashboard');
      });
    };

    this.clueService.loadClues().subscribe(
      percentage => this.loadingPercentage += percentage,
      error => console.log('ERROR!', error),
      () => {
        turnOffLoading();
        waitForInput();
      }
    );
  }
}
