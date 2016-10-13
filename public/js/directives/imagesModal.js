angular.module('jamesonart')
  .directive('imagesModal', function () {
    return {
       restrict: 'EA',
       scope: true,
       controller: function ($scope,$uibModal) {

         // MODAL IMAGE STUFF //

        $scope.showModal = function(id,images) {
          if (window.screen.availWidth < 768) return;

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
              // console.log("Modal Closed");
            });
        };


       }
    }
});

angular.module('jamesonart').controller('imagesModalCtrl', function ($uibModalInstance, $scope, item) {
  angular.element(document).ready(function () {

    $scope.id = item.id;
    $scope.images = item.images

    var pickSelectedImage = function(value) {
      return value.id === $scope.id;
    };

    var selectImage = function() {
      $scope.image = $scope.images.filter(pickSelectedImage)[0];
      getImageScale();
    };



    var imageAdjustX = function(origX,origY,scaleY) {
        return (scaleY * origX) / origY;
    };

    var imageAdjustY = function(origX,origY,scaleX) {
        return (scaleX * origY) / origX;
    };

    var getImageScale = function() {
      var image,origDimension;

      image = new Image();
      image.src = $scope.image.imageurl
      origDimension = {
          width: image.naturalWidth,
          height: image.naturalHeight
      };

      var boxDimension = {
        width: //770,//
        $('.slideshow-image').width(),
        height: //window.innerHeight * .75//
        $('.slideshow-image').height()
      }

      var tempWidth = imageAdjustX(origDimension.width,origDimension.height,boxDimension.height)

      if (origDimension.width < origDimension.height) {
        $scope.scaleDimension = {
          width: tempWidth,
          height: boxDimension.height
        }
      }
      else {
        $scope.scaleDimension = {
          width: tempWidth < boxDimension.width ? tempWidth : boxDimension.width,
          height: imageAdjustY(origDimension.width,origDimension.height,boxDimension.width)
        }
      }

      // console.log(origDimension,$scope.scaleDimension,boxDimension);


      $scope.infoX = (boxDimension.width - $scope.scaleDimension.width) >= 0 ? (boxDimension.width - $scope.scaleDimension.width) / 2 : 0
      $scope.infoY = (boxDimension.height - $scope.scaleDimension.height) >= 0 ? (boxDimension.height - $scope.scaleDimension.height) / 2 : 0
    };


    $scope.navigateRight = function(id) {
      var index = $scope.images.findIndex(function(value){
        return value.id === id
      });
      index = index + 1 > $scope.images.length - 1 ? 0 : index + 1;
      $scope.id = $scope.images[index].id;
      $scope.image = $scope.images.filter(pickSelectedImage)[0];

      getImageScale();

    };

    $scope.navigateLeft = function(id) {
      var index = $scope.images.findIndex(function(value){
        return value.id === id
      });
      index = index - 1 < 0 ? $scope.images.length - 1 : index - 1;
      $scope.id = $scope.images[index].id;
      $scope.image = $scope.images.filter(pickSelectedImage)[0];

      getImageScale();

    };

    selectImage();

    $( window ).resize(function() {
      getImageScale();
    });

  });

});
