angular.module('app.about', [
  'ui.router',
  'about.controllers.AboutCtrl'
])

.config(function config($stateProvider) {
  $stateProvider.state('about', {
    url: '/',
    templateUrl: 'about/about.view.html'
  });
});
