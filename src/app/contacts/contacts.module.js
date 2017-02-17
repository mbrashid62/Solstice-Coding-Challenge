angular.module('app.contacts', [
  'ui.router',
  'contacts.controllers.ContactsCtrl',
  'contacts.services.Contacts'
])

.config(function config($stateProvider) {
  $stateProvider.state('contacts', {
    url: '/contacts',
    templateUrl: 'contacts/contacts.view.html'
  });
});
