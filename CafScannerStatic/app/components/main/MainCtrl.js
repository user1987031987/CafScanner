angular.module('common').controller('MainCtrl', ['$scope', function($scope) {
    $scope.loadMask = false;
    $scope.setLoadMask = function(value) {
        $scope.loadMask = value;
    };
    $scope.setLoadMask(true);
}]);
