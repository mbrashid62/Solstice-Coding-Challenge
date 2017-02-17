describe('test contacts page', function () {

  beforeEach(function() {
    browser.get('#/contacts');
  });

  it('should ensure the page title is correct', function () {
   expect(browser.getTitle()).toEqual('Solstice Coding Challenge!');
  });
});
