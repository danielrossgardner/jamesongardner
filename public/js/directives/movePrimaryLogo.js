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
           if (to.name === 'home' && window.screen.availWidth > 768) {
             angular.element(document).ready(function () {
               $(el).css({'display': 'none'})
             });
           }
           else {
             angular.element(document).ready(function () {
               $(el).css({'display': 'inherit'})
             });
           }

         });

       }
    }
});
