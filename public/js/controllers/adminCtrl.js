angular.module('jamesonart').controller('adminCtrl', function($scope, $state, primaryService) {

  $scope.addImagesVisibility = false;
  $scope.editImagesVisibility = false;

  $scope.showAddImages = function(){
    $scope.addImagesVisibility = !$scope.addImagesVisibility
    $scope.editImagesVisibility = false
  }

  $scope.showEditImages = function(){
    $scope.addImagesVisibility = false
    $scope.editImagesVisibility = !$scope.editImagesVisibility
  }

  $scope.logout = primaryService.logout;

});
