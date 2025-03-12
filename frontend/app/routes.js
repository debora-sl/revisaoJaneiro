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
            .state('jogoDaVelha', {
                // passando variaveis na url /:var1/:var2
                url: '/jogoDaVelha/:var1/:var2',
                templateUrl: 'app/views/paginas/jogoDaVelha.html',
                controller: 'JogoDaVelhaController'
            })
        $urlRouterProvider.otherwise('/');
    });