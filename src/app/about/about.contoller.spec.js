describe('AboutCtrl ', function () {

  var controller;

  beforeEach(module('app.about'));
  beforeEach(module('ui.router'));

  beforeEach(inject(function ($controller) {
    controller = $controller('AboutCtrl', {});
  }));

  it('should set the correct welcome message', function () {
    expect(controller.message).toBe('Welcome to the Solstice Coding Challenge! Go ahead and click the contacts on the left.');
  });

});
