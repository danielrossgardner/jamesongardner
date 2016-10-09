angular.module('jamesonart').controller('loginCtrl', function ($uibModal, $log, primaryService, $state) {
  var $ctrl = this;

  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size) {
    primaryService.isLoggedIn().then(function(response){
      if (response) {
        $state.go('admin');
      }
      else {
        var modalInstance = $uibModal.open({
          animation: $ctrl.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'loginModal.html',
          controller: 'ModalInstanceCtrl',
          controllerAs: '$ctrl',
          size: size
        });
      }
    });
  };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('jamesonart').controller('ModalInstanceCtrl', function ($uibModalInstance, $state, primaryService) {
  var $ctrl = this;

  $ctrl.loginLocal = function(username, password) {
    primaryService.loginLocal({
      username: username,
      password: password
    })
    .then(function(res) {
      if (res) {
        $ctrl.user = res.username;
        $uibModalInstance.close()
        $state.go('admin');
        }
      else   $ctrl.user = 'NOT LOGGED IN';
    })
  }

  $ctrl.logout = primaryService.logout;

  $ctrl.ok = function () {
    $uibModalInstance.close();
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

angular.module('jamesonart').component('modalComponent', {
  templateUrl: 'loginModal.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
});
