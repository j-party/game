import { Component, OnInit } from '@angular/core';
import { InputService } from './input.service';
import { GameState } from './game-state.service';

@Component({
  moduleId: module.id,
  selector: 'title-screen',
  templateUrl: 'title-screen.component.html'
})
export class TitleScreenComponent implements OnInit {
  constructor(
    private inputService: InputService,
    private game: GameState
  ) {}
  ngOnInit() {
    this.inputService.waitForAny().then(() => {
      this.game.goTo('Dashboard');
    });
  }
}
