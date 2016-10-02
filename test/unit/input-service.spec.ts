import { InputService } from '../../src/input-service';
import { Input, InputType } from '../../src/input';

describe('InputService', () => {

  let inputService: InputService;
  let keyboardService: any;

  beforeEach(() => {
    keyboardService = jasmine.createSpyObj('keyboardService', ['waitForAny']);
    inputService = new InputService(keyboardService);
  });

  describe('waitForAny()', () => {

    let input: Input, inputResult: Input;

    beforeEach(done => {
      input = new Input(InputType.Keyboard);
      keyboardService.waitForAny.and.returnValue(Promise.resolve(input));
      inputService.waitForAny().then(result => { inputResult = result; }).then(done);
    });

    it('should resolve with the input event', () => {
      expect(inputResult).toBe(input);
    });

  });

});
