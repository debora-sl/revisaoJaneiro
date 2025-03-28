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
            jogador = $scope.jogador;
            if (posicao == 1) {
                $scope.matriz.pos1 = jogador;
            } else if (posicao == 2) {
                $scope.matriz.pos2 = jogador;
            } else if (posicao == 3) {
                $scope.matriz.pos3 = jogador;
            } else if (posicao == 4) {
                $scope.matriz.pos4 = jogador;
            } else if (posicao == 5) {
                $scope.matriz.pos5 = jogador;
            } else if (posicao == 6) {
                $scope.matriz.pos6 = jogador;
            } else if (posicao == 7) {
                $scope.matriz.pos7 = jogador;
            } else if (posicao == 8) {
                $scope.matriz.pos8 = jogador;
            } else if (posicao == 9) {
                $scope.matriz.pos9 = jogador;
            }

            post = {};
            post.jogador = $scope.jogador;
            post.posicao = posicao;
            post.idJogo = $scope.idJogo;
            $http.post($url + $urlInserirPosicoes, post).then(function (response) {

                console.log('Funfou', response);
                if (response.status == 201) {
                    if (response.data.checarVitoria == 'Deu velha!') {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Deu velha!",
                            timer: 5000
                        });
                    }
                    else if (response.data.checarVitoria == 'Jogador O venceu!') {

                        if ($scope.jogador == 'O') {
                            Swal.fire({
                                icon: "success",
                                title: "Boaaaaa",
                                text: "Você venceu!!!!",
                                timer: 6000
                            });
                        } else if ($scope.jogador == 'X') {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Ruim demais!!! Perdeu",
                                timer: 6000
                            });
                        }

                    }
                    else if (response.data.checarVitoria == 'Jogador X venceu!') {

                        if ($scope.jogador == 'X') {
                            Swal.fire({
                                icon: "success",
                                title: "Boaaaaa",
                                text: "Você venceu!!!!",
                                timer: 6000
                            });
                        } else if ($scope.jogador == 'O') {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Ruim demais!!! Perdeu",
                                timer: 6000
                            });
                        }

                    }

                }

            }, function (error) {
                console.log('Bosta, não funfou', error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.data,
                    timer: 2000
                });
            })

        }

        // função chamadas
        intervalId = setInterval(carregaPosicoes, 7000);

        // chamando a função que carrega as posições
        carregaPosicoes();

    })