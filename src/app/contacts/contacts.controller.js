angular.module('contacts.controllers.ContactsCtrl', [])
  .controller('ContactsCtrl', function(SideNav, $window, $scope, $rootScope) {

    var ctrl = this;
    ctrl.currentContactData = {};

    $rootScope.$on('$locationChangeSuccess', function() { // when user clicks a contact from the side nav while already viewing a contact, this function executes
      ctrl.getContactData();
    });

    $scope.$watch('$routeUpdate', function() { // when user navigates from home
      ctrl.getContactData();
    });

    var getNameFromURL = function() { // todo: hacky code, fix this later
      var splitURL = $window.location.hash.split('name=');
      if(splitURL.length === 0) { return; }
      var re = /%20/gi; // woo regex
      return splitURL[1].replace(re, ' ');
    };

    ctrl.getContactData = function () {
      var name = getNameFromURL();
      ctrl.currentContactData = SideNav.fetchContactByName(name); // hit up the SideNav Service - this is where contact data is being stored so we don't have make redundant fetches
    };
  });
