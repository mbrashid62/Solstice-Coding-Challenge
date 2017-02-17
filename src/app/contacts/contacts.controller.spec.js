describe('ContactCtrl ', function () {

  var controller;

  beforeEach(module('app.contacts'));
  beforeEach(module('ui.router'));

  beforeEach(inject(function ($controller) {
    controller = $controller('ContactsCtrl', {});
  }));

  // it('should load the contacts', function () {
  //   expect(controller.contactItems.length).toBeGreaterThan(0);
  // });

});
