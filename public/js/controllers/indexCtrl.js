angular.module('jamesonart').controller('indexCtrl', function($scope, primaryService, $state, $timeout) {

  $scope.menuVisibility = false;

  $scope.loginLocal = function(username, password) {
    primaryService.loginLocal({
      username: username,
      password: password
    })
    .then(function(res) {
      if (res) {
        $scope.user = res.username;
        $state.go('admin');
        }
      else   $scope.user = 'NOT LOGGED IN';
    })
  }

  $scope.logout = primaryService.logout;



})
