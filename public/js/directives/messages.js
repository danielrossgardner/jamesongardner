angular.module('jamesonart').directive('messagesEdit',function(primaryService, $interval){

  var controller = function ($scope) {
        $scope.getMessages = function() {
          primaryService.getMessages().then(function(response){
            $scope.messages = response;
          });
        };

        $scope.getMessages();

        $scope.removeMessage = function(id) {
          primaryService.removeMessage(id).then(function(response){
            console.log('Message Removed:',response);
          });
          $scope.messages = $scope.messages.filter(function(value){return value.id !== id})
        };

    }



  return {
    restrict: 'E',
    templateUrl: '../views/templates/messages.html',
    controller: controller
  }
});
