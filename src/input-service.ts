import { inject } from 'aurelia-framework';
import { Input, InputType } from './input';
import { KeyboardService } from './keyboard-service';

@inject(KeyboardService)
export class InputService {
  constructor(
    private keyboardService: KeyboardService
  ) {}
  // Resolves if any key is pressed, the mouse is clicked, or the screen is tapped.
  waitForAny(): Promise<Input> {
    return Promise.race([
      this.keyboardService.waitForAny()
    ]);
  }
}
