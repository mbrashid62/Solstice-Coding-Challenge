/**
 * Solstice-Coding-Challenge v1.0.0
 * Copyright (c) 2017 Bill Rashid
 * Licensed under 
 */
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

.config(["$mdThemingProvider", function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('purple', {
      'default': '200'
    });
}])

.run(['$state', function ($state) {
  $state.go('about');
}]);

angular.module('about.controllers.AboutCtrl', [])
  .controller('AboutCtrl', function() {
    var ctrl = this;
    ctrl.message = 'Welcome to the Solstice Coding Challenge! Go ahead and click the contacts on the left.';
  });

angular.module('app.about', [
  'ui.router',
  'about.controllers.AboutCtrl'
])

.config(["$stateProvider", function config($stateProvider) {
  $stateProvider.state('about', {
    url: '/',
    templateUrl: 'about/about.view.html'
  });
}]);

angular.module('contacts.controllers.ContactsCtrl', [])
  .controller('ContactsCtrl', ["SideNav", "$window", "$scope", "$rootScope", function(SideNav, $window, $scope, $rootScope) {

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
  }]);

angular.module('app.contacts', [
  'ui.router',
  'contacts.controllers.ContactsCtrl',
  'contacts.services.Contacts'
])

.config(["$stateProvider", function config($stateProvider) {
  $stateProvider.state('contacts', {
    url: '/contacts',
    templateUrl: 'contacts/contacts.view.html'
  });
}]);

angular.module('contacts.services.Contacts', [])
  .factory('Contacts', function() {

  });

angular.module('layout.controllers.LayoutCtrl', [])
  .controller('LayoutCtrl', function() {

  });

angular.module('app.layout', [
  'ui.router',
  'layout.controllers.LayoutCtrl'
])

.config(["$stateProvider", function config($stateProvider) {
  $stateProvider.state('layout', {
    url: '/layout',
    templateUrl: 'layout/layout.view.html'
  });
}]);

angular.module('app.shared', [
  'shared.directives.backButton',
  'shared.services.Utils'
]);

angular.module('sidenav.controllers.SideNavCtrl', [])
  .controller('SideNavCtrl', ["$mdSidenav", "$state", "$window", "$scope", "SideNav", function($mdSidenav, $state, $window, $scope, SideNav) {
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
  }]);

angular.module('app.sidenav', [
  'sidenav.controllers.SideNavCtrl',
  'sidenav.services.SideNav'
]);


angular.module('sidenav.services.SideNav', [])
  .factory('SideNav', ["$http", function($http) {

    var fetchedContacts = [];

    return {
      fetchContactsFromEP: function() {
        return new Promise (function(resolve, reject) {

          debugger;
          // $httpProvider.defaults.headers.get = { 'ORIGIN': 'http://www.localhost:3000/' };

          // var req  = {
          //   method: 'GET',
          //     url: 'https://s3.amazonaws.com/technical-challenge/Contacts_v2.json'
          // };
          //
          // $http(req)
          //     .then(function (response) {
          //       debugger;
          //       fetchedContacts = response.data;
          //       resolve(response.data);
          //     }, function (error) {
          //           debugger;
          //         reject(data); // todo: log error
          //     });

          $http.get('https://google.com/https://s3.amazonaws.com/technical-challenge/Contacts_v2.json').
          success(function(data, status, headers, config) {
              debugger;
            fetchedContacts = data;
            resolve(data);
          }).
          error(function(data, status, headers, config) {
              debugger;
            reject(data); // todo: log error
          });
        });
      },
      getFetchedContacts: function () {
        return fetchedContacts;
      },
      fetchContactByName: function(name) {
        for(var i = 0; i<fetchedContacts.length; i++) {
          if(fetchedContacts[i].name === name) {
            return fetchedContacts[i];
          }
        }
      }
    };
  }]);

angular.module('toolbar.controllers.ToolbarCtrl', [])
  .controller('ToolbarCtrl', ["$state", "$scope", "$mdSidenav", "$window", function($state, $scope, $mdSidenav, $window) {
    $scope.openSideNav = function () {
      $mdSidenav('left').open();
    };

    $scope.goHome = function () {
      $window.location.href = '/#/';
    }
  }]);

angular.module('app.toolbar', [
  'toolbar.controllers.ToolbarCtrl'
]);

angular.module('shared.directives.backButton', [])
  .directive('backButton', ['$window', function($window) {
    return {
      restrict: 'A',
      link: function (scope, elem) {
        elem.bind('click', function () {
          $window.history.back();
        });
      }
    };
  }]);

angular.module('shared.services.Utils', [])
  .factory('Utils', function Utils() {

    var service = {
      isNullOrUndefined: isNullOrUndefined,
      isUndefinedOrWhitespace: isUndefinedOrWhitespace,
      isNullOrWhitespace: isNullOrWhitespace,
      isNullOrUndefinedOrWhitespace: isNullorUndefinedOrWhitespace
    };
    return service;

    function isNullOrUndefined(object) {
      return object === null || angular.isUndefined(object) ? true : false;
    }

    function isUndefinedOrWhitespace(stringText) {
      return angular.isUndefined(stringText) || stringText.trim().length <= 0 ? true : false;
    }

    function isNullorUndefinedOrWhitespace(stringText) {
      if(stringText !== null) {
        return angular.isUndefined(stringText) || stringText.trim().length <= 0 ? true : false;
      } else {
        return true;
      }
    }

    function isNullOrWhitespace(stringText) {
      return stringText === null || stringText.trim().length <= 0 ? true : false;
    }
  });
