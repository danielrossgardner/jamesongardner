angular.module('jamesonart')
  .directive('movePrimaryLogo', function () {
    return {
       restrict: 'EA',
       scope: true,
       controller: function ($scope, $element, $attrs, $rootScope) {
         $scope.rootScope = $rootScope
       },
       link: function (scope, el, attrs) {
         scope.rootScope.$on('$stateChangeStart', function(e, to) {
           if (to.name === 'home') {
             angular.element(document).ready(function () {
               if (window.screen.availWidth > 768) $(el).animate({left: '200px', top: '25px'},3500)
             });
           }
           else {
             angular.element(document).ready(function () {
               $(el).animate({left: '0px', top: '0px'}, 1500)
             });
           }

         });

       }
    }
});
