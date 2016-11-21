angular.module('jamesonart')
  .directive('masonryDirective', function () {
    return {
       restrict: 'EA',
       scope: true,
       controller: function ($scope,$timeout) {
         angular.element(document).ready(function () {
           var $grid = $('.grid');

             $grid.masonry({
                 itemSelector: '.grid-item',
                 columnWidth: '.grid-sizer',
                 percentPosition: true,
                 gutter: 10
               })

               $grid.imagesLoaded().progress(function (instance,image) {
                 $timeout(function() {
                   $('.grid').masonry('reloadItems');
                   $('.grid').masonry('layout');
                 },3000)
              });


           $timeout(function() {
             $('.loader-holder').css('display', 'none');
           },3000)

         });

       }
    }
});
