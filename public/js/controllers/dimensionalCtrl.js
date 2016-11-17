angular.module('jamesonart').controller('dimensionalCtrl',function($scope,primaryService,$timeout){

  $scope.page = 'TRADITIONAL'

  $scope.pageLink = $scope.page.toLowerCase()

  $scope.getArt = function(type){
    primaryService.getArt(type).then(function(response){
      $scope.images = response;
      $timeout(function() {
        $scope.invisible = "invisible"
      },3000);
    })
  }

  $scope.getArt('dimensional');
});
