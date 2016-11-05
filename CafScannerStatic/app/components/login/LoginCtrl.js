angular.module('common').controller('LoginCtrl', ['$scope', function($scope) {
    $scope.setLoadMask(false);
    //To hide the tools in header.
    $scope.$emit('HideTools', {});
}]);
