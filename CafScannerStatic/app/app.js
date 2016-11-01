angular.module('common', []);
var app = angular.module('cafscanner', ['common', 'ui.grid', 'ngMessages', 'ngMaterial', 'ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            views: {
                '@': {
                    controller: 'LoginCtrl',
                    templateUrl: 'app/components/login/login.html'
                }
            }
        });
});
