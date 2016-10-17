angular.module('jamesonart').controller('contactCtrl', function($scope, primaryService) {
  $scope.name;
  $scope.email;
  $scope.message;

  $scope.logMessage = function() {
    if ($scope.name == null &&
      $scope.email == null &&
      $scope.message == null) return;

    messageData = {
      name: $scope.name,
      email: $scope.email,
      message: $scope.message
    }

    primaryService.logMessage(messageData)
      .then(function(response){
        if (response === 'Created') {
          $scope.name = null;
          $scope.email = null;
          $scope.message = null;
        }
      })
  }

})
