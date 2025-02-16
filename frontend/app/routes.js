angular.module('meuApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/home.html',
                controller: 'HomeController'
            })
            .state('forca', {
                url: '/forca',
                templateUrl: 'app/views/paginas/forca.html',
                controller: 'ForcaController'
            })
        $urlRouterProvider.otherwise('/');
    });