angular.module('jamesonart').controller('dimensionalCtrl',function($scope,primaryService){


  $scope.getArt = function(type){
    primaryService.getArt(type).then(function(response){
      $scope.images = response;
    })
  }

  $scope.getArt('dimensional');
});
