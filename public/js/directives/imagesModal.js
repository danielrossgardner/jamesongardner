angular.module('jamesonart')
  .directive('imagesModal', function () {
    return {
       restrict: 'EA',
       scope: true,
       controller: function ($scope,$uibModal) {

         // MODAL IMAGE STUFF //

        $scope.showModal = function(id,images) {

          $scope.opts = {
          backdrop: true,
          backdropClick: true,
          dialogFade: false,
          keyboard: true,
          templateUrl : './views/templates/imagesModal.html',
          controller : 'imagesModalCtrl', //see below
          resolve: {} // empty storage
            };


          $scope.opts.resolve.item = function() {
              return angular.copy(
                                  { id: id,
                                    images: images}
                            ); // pass name to resolve storage
          }

            var modalInstance = $uibModal.open($scope.opts);

            modalInstance.result.then(function(){
              //on ok button press
            },function(){
              //on cancel button press
              console.log("Modal Closed");
            });
        };


       }
    }
});

angular.module('jamesonart').controller('imagesModalCtrl', function ($uibModalInstance, $scope, item) {
  $scope.id = item.id;
  $scope.images = item.images

  var pickSelectedImage = function(value) {
    return value.id === $scope.id;
  }

  $scope.image = $scope.images.filter(pickSelectedImage)[0]


});
