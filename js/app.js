angular
.module('jekyll-ng-material-design', [
  'ngAnimate',
  'ngAria',
  'ngMaterial'
]).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange');
})
.controller('JekyllCtrl', ['$scope', function JekyllCtrl ($scope) {
}])
.controller('LeftSidebarCtrl', ['$scope', function LeftSidebarCtrl ($scope) {
}])
.controller('ToolbarCtrl', ['$scope', '$mdSidenav', '$window', function ToolbarCtrl ($scope, $mdSidenav, $window) {

  $scope.openSideMenu = function openSideMenu () {
    $mdSidenav('left').toggle();
  };

  $scope.navigate = function navigate (url) {
    $window.location.href = url;
  };
}]);