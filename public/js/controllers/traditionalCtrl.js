angular.module('jamesonart').controller('traditionalCtrl',function($scope,primaryService){

  $scope.page = 'DIMENSIONAL'

  $scope.pageLink = $scope.page.toLowerCase()

  $scope.getArt = function(type){
    primaryService.getArt(type).then(function(response){
      $scope.images = response;
    })
  }

  $scope.getArt('traditional');

});
