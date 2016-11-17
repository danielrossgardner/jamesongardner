angular.module('jamesonart').controller('traditionalCtrl',function($scope,primaryService,$timeout){

  $scope.page = 'DIMENSIONAL'

  $scope.pageLink = $scope.page.toLowerCase()

  $scope.getArt = function(type){
    primaryService.getArt(type).then(function(response){
      $scope.images = response;
      $timeout(function() {
        $scope.invisible = "invisible"
      },3000);
    })
  }

  $scope.getArt('traditional');

});
