import { Injectable } from '@angular/core';
import { Input, InputType } from './input';
import { KeyboardService } from './keyboard.service';

@Injectable()
export class InputService {
  constructor(
    private keyboardService: KeyboardService
  ) {}
  // Resolves if any key is pressed, the mouse is clicked, or the screen is tapped.
  waitForAny(): Promise<Input> {
    return Promise.race([
      this.keyboardService.waitForAny()
    ]).then((input) => {
      // needed for TypeScript compiler to figure out the type
      return input;
    });
  }
}
