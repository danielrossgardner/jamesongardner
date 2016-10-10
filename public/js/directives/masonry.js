angular.module('jamesonart')
  .directive('masonryDirective', function () {
    return {
       restrict: 'EA',
       scope: true,
       controller: function ($scope) {
         angular.element(document).ready(function () {
           var $grid = $('.grid');

             $grid.masonry({
                 itemSelector: '.grid-item',
                 columnWidth: '.grid-sizer',
                 percentPosition: true,
                 gutter: 5
               })

           $grid.imagesLoaded(function() {
             // $('.grid').masonry('reloadItems');
             $('.grid').masonry('layout');
           });

         });
       }
    }
});
