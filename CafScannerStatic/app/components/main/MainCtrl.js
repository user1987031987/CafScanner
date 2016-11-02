angular.module('common').controller('MainCtrl', ['$scope', 'Constants', function($scope, Constants) {
    $scope.appName = Constants.appName;
    $scope.loadMask = false;
    $scope.setLoadMask = function(value) {
        $scope.loadMask = value;
    };
    $scope.setLoadMask(true);
}]);
