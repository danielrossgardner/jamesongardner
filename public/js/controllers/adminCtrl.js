angular.module('jamesonart').controller('adminCtrl', function($scope, $state, primaryService) {

  $scope.addImagesVisibility = false;
  $scope.editImagesVisibility = false;
  $scope.editMessagesVisibility = false;

  $scope.showAddImages = function(){
    $scope.addImagesVisibility = !$scope.addImagesVisibility;
    $scope.editImagesVisibility = false;
    $scope.editMessagesVisibility = false;
  }

  $scope.showEditImages = function(){
    $scope.addImagesVisibility = false;
    $scope.editImagesVisibility = !$scope.editImagesVisibility;
    $scope.editMessagesVisibility = false;
  }

  $scope.showMessages = function(){
    $scope.addImagesVisibility = false;
    $scope.editImagesVisibility = false;
    $scope.editMessagesVisibility = !$scope.editMessagesVisibility;
  }

  $scope.logout = primaryService.logout;

});
