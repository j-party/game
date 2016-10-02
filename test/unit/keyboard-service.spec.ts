import { KeyboardService } from '../../src/keyboard-service';
import { Input, InputType } from '../../src/input';

describe('KeyboardService', () => {

  let keyboardService: KeyboardService;

  beforeEach(() => {
    keyboardService = new KeyboardService();
  });

  describe('waitForAny()', () => {

    let inputResult: Input;

    beforeEach(done => {
      keyboardService.waitForAny().then(input => { inputResult = input; }).then(done);
      let event = new Event('keypress');
      document.dispatchEvent(event);
    });

    it('should resolve with a Keyboard object when a "keypress" event occurs', () => {
      expect(inputResult.type).toBe(InputType.Keyboard);
    });

  });

});
