import { Input, InputType } from './input';

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
