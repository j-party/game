import { Injectable } from '@angular/core';
import { Input, InputType } from './input';

@Injectable()
export class KeyboardService {
  // Resolves if any key is pressed.
  waitForAny(): Promise<Input> {
    return new Promise((resolve, reject) => {
      document.onkeypress = (event) => {
        resolve(new Input(InputType.Keyboard));
      };
    });
  }
}
