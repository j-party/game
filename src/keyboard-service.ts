import { Input, InputType } from './input';
import * as mousetrap from 'mousetrap';

export class KeyboardService {
  // Resolves if any key is pressed.
  waitForAny(): Promise<Input> {
    return new Promise((resolve, reject) => {
      document.onkeypress = (event) => {
        resolve(new Input(InputType.Keyboard));
      };
    });
  }

  // Resolves if a certain key is pressed.
  waitForKey(keySequence: string): Promise<Input> {
    return new Promise((resolve, reject) => {
      mousetrap.bind(keySequence, (event, sequence) => {
        resolve(new Input(InputType.Keyboard, sequence));
        mousetrap.unbind(keySequence);
        return false; // prevent the default behavior
      });
    });
  }
}
