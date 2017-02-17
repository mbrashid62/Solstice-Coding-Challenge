
angular.module('sidenav.services.SideNav', [])
  .factory('SideNav', function($http) {

    var fetchedContacts = [];

    return {
      fetchContactsFromEP: function() {
        return new Promise (function(resolve, reject) {
          $http.get('https://s3.amazonaws.com/technical-challenge/Contacts_v2.json').
          success(function(data, status, headers, config) {
            fetchedContacts = data;
            resolve(data);
          }).
          error(function(data, status, headers, config) {
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
  });
