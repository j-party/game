import { inject } from 'aurelia-framework';
import { Input, InputType } from './input';
import { GameState } from './game-state';
import { KeyboardService } from './keyboard-service';

@inject(GameState, KeyboardService)
export class InputService {
  constructor(
    private gameState: GameState,
    private keyboardService: KeyboardService
  ) {}

  // Resolves if any key is pressed, the mouse is clicked, or the screen is tapped.
  waitForAny(): Promise<Input> {
    return Promise.race([
      this.keyboardService.waitForAny()
    ]);
  }

  // Resolves if a player presses their buzzer.
  waitForBuzzer(): Promise<Input> {
    let inputMappings = this.gameState.config.inputMappings;
    let keys: string[] = [];
    keys = keys.concat(inputMappings.player1);
    keys = keys.concat(inputMappings.player2);
    keys = keys.concat(inputMappings.player3);
    return Promise.race(keys.map(key => {
      return this.keyboardService.waitForKey(key)
    }));
  }
}
