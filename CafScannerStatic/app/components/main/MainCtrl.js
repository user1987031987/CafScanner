angular.module('common').controller('MainCtrl', ['$scope', 'Constants', function($scope, Constants) {
    $scope.appName = Constants.appName;
    $scope.loadMask = false;
    $scope.hideToolBarIcons = false;
    $scope.setLoadMask = function(value) {
        $scope.loadMask = value;
    };
    $scope.$on('HideTools', function() {
        $scope.hideToolBarIcons = true;
    });
}]);
