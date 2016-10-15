import { InputService } from '../../src/input-service';
import { GameConfig } from '../../src/game-config';
import { Input, InputType } from '../../src/input';

describe('InputService', () => {

  let inputService: InputService;
  let config = new GameConfig();
  let gameState: any = {
    config: config
  };
  let keyboardService: any;

  beforeEach(() => {
    keyboardService = jasmine.createSpyObj('keyboardService', ['waitForAny', 'waitForKey']);
    inputService = new InputService(gameState, keyboardService);
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

  describe('waitForBuzzer()', () => {

    let playerBuzzer: Input, inputResult: Input;
    let runTestOn: Function;

    beforeEach(() => {
      runTestOn = (key: string) => {
        playerBuzzer = new Input(InputType.Keyboard, key);
        keyboardService.waitForKey.and.returnValue(Promise.resolve(playerBuzzer));
        return inputService.waitForBuzzer().then(result => {
          expect(result).toBe(playerBuzzer);
        });
      };
    });

    it('should resolve correctly when Player 1 presses the buzzer first', done => {
      runTestOn(config.inputMappings.player1[0]).then(done);
    });

    it('should resolve correctly when Player 2 presses the buzzer first', done => {
      runTestOn(config.inputMappings.player2[0]).then(done);
    });

    it('should resolve correctly when Player 3 presses the buzzer first', done => {
      runTestOn(config.inputMappings.player3[0]).then(done);
    });

  });

});
