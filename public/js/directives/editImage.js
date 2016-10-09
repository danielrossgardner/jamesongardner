angular.module('jamesonart').directive('editImage',function(primaryService, $interval){

  var controller = function ($scope) {
      $scope.deleteBoxVisibility = false;
      $scope.deleteConfirmVisibility = false;

      $scope.getAllImages = function() {
        primaryService.getArt().then(function(response){
          $scope.images = response;
        })
      }

      $scope.getAllImages();

      $scope.change = function () {
        $scope.deleteBoxVisibility = !$scope.deleteBoxVisibility
      }

      $scope.toggleDeleteConfirm = function(){
        $scope.deleteConfirmVisibility = !$scope.deleteConfirmVisibility
      }

      $scope.deleteImage = function(id){
        $scope.images = $scope.images.filter(function(value){return value.id !== id})
        primaryService.deleteImage(id).then(function(response){
        });
      }

      $scope.editTitle = function(id,title){
        primaryService.editTitle(id,title).then(function(response){
          console.log(response);
        });

        $scope.newTitle = null;
        $scope.getAllImages();
      }

      $scope.editType = function(id,type){
        primaryService.editType(id,type).then(function(response){
          console.log(response);
        });

        $scope.newType = null;
        $scope.getAllImages();
      }

      $scope.editDescription = function(id,description){
        primaryService.editDescription(id,description).then(function(response){
          console.log(response);
        });

        $scope.newType = null;
        $scope.getAllImages();
      }

    }



  return {
    restrict: 'E',
    templateUrl: '../views/templates/editImage.html',
    controller: controller
  }
});
