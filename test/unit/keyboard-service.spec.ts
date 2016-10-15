import { KeyboardService } from '../../src/keyboard-service';
import { Input, InputType } from '../../src/input';
import * as mousetrap from 'mousetrap';

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

  describe('waitForKey()', () => {

    beforeEach(() => {
      spyOn(mousetrap, 'bind').and.callThrough();
      spyOn(mousetrap, 'unbind').and.callThrough();
    });

    it('should NOT resolve for other key sequences', done => {
      let callback = jasmine.createSpy('keyboardService callback');
      keyboardService.waitForKey('a').then(callback);
      mousetrap.trigger('b');
      window.setTimeout(() => {
        expect(callback).not.toHaveBeenCalled();
        done();
      }, 200);
    });

    it('should resolve with the specified key sequence', done => {
      let callback = jasmine.createSpy('keyboardService callback');
      keyboardService.waitForKey('a').then(callback).then(done);
      mousetrap.trigger('a');
      window.setTimeout(() => {
        expect(callback).toHaveBeenCalled();
        let input: Input = callback.calls.mostRecent().args[1];
        expect(input.type).toBe(InputType.Keyboard);
        expect(input.sequence).toBe('a');
      }, 200);
    });

    it('should then unbind the key sequence', () => {
      keyboardService.waitForKey('a');
      mousetrap.trigger('a');
      expect(mousetrap.unbind).toHaveBeenCalled();
    });

    it('should return false from the callback', () => {
      keyboardService.waitForKey('a');
      let callback = mousetrap.bind.calls.mostRecent().args[1];
      expect(callback(null, 'a')).toBe(false);
    });

  });

});
