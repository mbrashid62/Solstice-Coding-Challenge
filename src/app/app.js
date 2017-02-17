angular.module('Solstice-Coding-Challenge', [
  /**
   * Dependencies must be injected in specific order:
   * 1) AngularJS dependencies
   * 2) Compiled HTML templates
   * 3) Common Services, Directives, Filters and Utilities
   * 4) Main App Layout
   * 5) Other App components (e.g. Toolbar, About, etc)
   */

  // AngularJS dependencies
  'ngAnimate',
  'ngAria',
  'ngMaterial',
  'ui.router',
  'ngResource',

  // Include compiled HTML templates
  'templates',

  // Common/shared code
  'app.shared',

  // Layout
  'app.layout',

  // Components
  'app.toolbar',
  'app.sidenav',
  'app.contacts',
  'app.about'
])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('purple', {
      'default': '200'
    });
})

.run(['$state', function ($state) {
  $state.go('about');
}]);
