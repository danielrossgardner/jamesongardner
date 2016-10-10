angular.module('jamesonart').controller('homeCtrl', function($scope, primaryService, $timeout) {
  $scope.traditionalVisibility = true;
  $scope.dimensionalVisibility = true;
  $scope.storeVisibility = true;
  $scope.blogVisibility = true;
  $scope.aboutVisibility = true;
  $scope.contactVisibility = true;

  var showTraditional = function() {
    $scope.traditionalVisibility = false;
  };

  var showDimensional = function() {
    $scope.dimensionalVisibility = false;
  };

  var showStore = function() {
    $scope.storeVisibility = false;
  };

  var showBlog = function() {
    $scope.blogVisibility = false;
  };

  var showAbout = function() {
    $scope.aboutVisibility = false;
  };

  var showContact = function() {
    $scope.contactVisibility = false;
  };


  $timeout(showTraditional, 2400);
  $timeout(showDimensional, 2000);
  $timeout(showStore, 1600);
  $timeout(showBlog, 1200);
  $timeout(showAbout, 800);
  $timeout(showContact, 400);

});
