angular.module('jamesonart').controller('storeCtrl', function($scope, primaryService) {

  $scope.getListings = function(){
    primaryService.getListings().then(function(response){
      var results = response.data.results;

      results.map(function(item){
        primaryService.getListingImages(item.listing_id).then(function(response){
          var imagesFull = response.data.results;
          var images = [];
          imagesFull.map(function(imageObj){
            images.push({
              height: imageObj["full_height"],
              width: imageObj["full_width"],
              url: imageObj["url_fullxfull"]
            })
            item.images = images;
          })

          $scope.listings = results;
        })
      })
    });
  }
  // https://www.etsy.com/developers/documentation/reference/listingimage
  // how to get images for each listing
  $scope.getListings();


});
