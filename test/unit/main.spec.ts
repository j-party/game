import { configure } from '../../src/main';

describe('Main configuration', () => {

  let aurelia: any;
  let developmentLogging: any;
  let feature: any;
  let plugin: any;
  let setRoot: any;
  let standardConfiguration: any;
  let start: any;

  beforeEach(done => {
    developmentLogging = jasmine.createSpy('developmentLogging');
    feature = jasmine.createSpy('feature');
    plugin = jasmine.createSpy('plugin');
    setRoot = jasmine.createSpy('setRoot');
    standardConfiguration = jasmine.createSpy('standardConfiguration').and.returnValue({
      feature: feature
    });
    start = jasmine.createSpy('start').and.returnValue(Promise.resolve());
    aurelia = {
      setRoot: setRoot,
      start: start,
      use: {
        developmentLogging: developmentLogging,
        plugin: plugin,
        standardConfiguration: standardConfiguration
      }
    }
    configure(aurelia).then(done);
  });

  it('should use the standard configuration', () => {
    expect(standardConfiguration).toHaveBeenCalled();
  });

  it('should use the "resources" feature', () => {
    expect(feature).toHaveBeenCalled();
  });

  it('should start Aurelia', () => {
    expect(start).toHaveBeenCalled();
  });

  it('should instantiate the root component', () => {
    expect(setRoot).toHaveBeenCalled();
  });

});
