angular.module('sidenav.controllers.SideNavCtrl', [])
  .controller('SideNavCtrl', function($mdSidenav, $state, $window, $scope, SideNav) {
    var ctrl = this;
    ctrl.selectMenuItem = selectContact;
    ctrl.closeSideNav = closeSideNav;
    $scope.contacts = [];
    ctrl.selected = $scope.contacts[0];
    // ctrl.contactItems = []; can be useful for tests later

    ctrl.fetchContactsFromEP = function() {
      SideNav.fetchContactsFromEP()
        .then(function(data) {
          // ctrl.contactItems = data; // can be useful for the sake of tests
          $scope.contacts = data;
          $scope.$apply();
        })
        .catch(function(error) {
          // todo: log error
        });
    };

    function selectContact(contactClicked) {
      ctrl.selected = contactClicked;
      closeSideNav(); // for small screens!
      $window.location.href = '/#/contacts' + '?' + 'name=' + contactClicked.name;
    }

    function closeSideNav() {
      $mdSidenav('left').close();
    }
  });
