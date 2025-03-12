angular.module('meuApp')
    .controller('JogoDaVelhaController', function ($scope, $stateParams) {
        console.log('JogoDaVelhaController funcionou!');
        // pegando a sessão e o jogador
        $scope.idJogo = $stateParams.var1;
        $scope.jogador = $stateParams.var2;

        $scope.matriz = {
            pos1: 'O',
            pos2: '',
            pos3: 'O',
            pos4: '',
            pos5: 'X',
            pos6: '',
            pos7: 'O',
            pos8: '',
            pos9: 'O',
        }
    })