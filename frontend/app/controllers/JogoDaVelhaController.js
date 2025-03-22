angular.module('meuApp')
    .controller('JogoDaVelhaController', function ($scope, $stateParams, $http) {
        console.log('JogoDaVelhaController funcionou!');
        // pegando a sessão e o jogador
        $scope.idJogo = $stateParams.var1;
        $scope.jogador = $stateParams.var2;
        $url = 'http://localhost:8000/';
        $urlCarregarPosicoes = 'api/jogoDaVelha/carregarPosicoes/';
        $urlInserirPosicoes = 'api/jogoDaVelha/inserir';


        $scope.matriz = {
            pos1: '',
            pos2: '',
            pos3: '',
            pos4: '',
            pos5: '',
            pos6: '',
            pos7: '',
            pos8: '',
            pos9: '',
        }

        // alinhando as posições de acordo com o bd
        alinhaPosicoes = function (data) {
            for (i = 0; i < data.length; i++) {
                if (data[i].posicao == 1) {
                    $scope.matriz.pos1 = data[i].jogador;
                } else if (data[i].posicao == 2) {
                    $scope.matriz.pos2 = data[i].jogador;
                } else if (data[i].posicao == 3) {
                    $scope.matriz.pos3 = data[i].jogador;
                } else if (data[i].posicao == 4) {
                    $scope.matriz.pos4 = data[i].jogador;
                } else if (data[i].posicao == 5) {
                    $scope.matriz.pos5 = data[i].jogador;
                } else if (data[i].posicao == 6) {
                    $scope.matriz.pos6 = data[i].jogador;
                } else if (data[i].posicao == 7) {
                    $scope.matriz.pos7 = data[i].jogador;
                } else if (data[i].posicao == 8) {
                    $scope.matriz.pos8 = data[i].jogador;
                } else if (data[i].posicao == 9) {
                    $scope.matriz.pos9 = data[i].jogador;
                }
            }
        }

        // função que carrega as posições
        carregaPosicoes = function () {
            $http.get($url + $urlCarregarPosicoes + $scope.idJogo).then(function (response) {
                console.log('Funfou', response);
                if (response.status == 200) {
                    alinhaPosicoes(response.data);

                }

            }, function (error) {
                console.log(error);

            });
        }

        // função que inseri posições
        $scope.inserirPosicao = function (posicao) {
            post = {};
            post.jogador = $scope.jogador;
            post.posicao = posicao;
            post.idJogo = $scope.idJogo;
            $http.post($url + $urlInserirPosicoes, post).then(function (response) {

                console.log('Funfou', response);

            }, function (error) {
                console.log('Bosta, não funfou', error);

            })

        }

        // função chamadas
        intervalId = setInterval(carregaPosicoes, 5000);

    })