angular.module('common', []);
var app = angular.module('cafscanner', ['common', 'ui.grid', 'ngMessages', 'material.svgAssetsCache', 'ngMaterial', 'ui.router']);
app.config(function($stateProvider, $urlRouterProvider, $mdIconProvider) {
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
    $mdIconProvider
        .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
        .defaultIconSet('img/icons/sets/core-icons.svg', 24);

});
