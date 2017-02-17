angular.module('toolbar.controllers.ToolbarCtrl', [])
  .controller('ToolbarCtrl', function($state, $scope, $mdSidenav, $window) {
    $scope.openSideNav = function () {
      $mdSidenav('left').open();
    };

    $scope.goHome = function () {
      $window.location.href = '/#/';
    }
  });
