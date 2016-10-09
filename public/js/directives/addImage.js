angular.module('jamesonart').directive('addImage',function(primaryService, $interval){

  var controller = function ($scope) {
      $scope.imageType = 'traditional';

      $scope.addImage = function(){
          primaryService.addImage({
            type: $scope.imageType,
            title: $scope.imageTitle,
            description: $scope.description,
            imageUrl: $scope.imageUrl
          });
          $scope.imageType = null;
          $scope.imageTitle = null;
          $scope.description = null;
          $scope.imageUrl = null;
          $scope.addImageForm.$setPristine();
        }




      }



  return {
    restrict: 'E',
    templateUrl: '../views/templates/addImage.html',
    controller: controller
  }
});
