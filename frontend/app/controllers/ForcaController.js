angular.module('meuApp')
    .controller('ForcaController', function ($scope, $http, $state) {
        console.log('ForcaController funcionou!');

        // configurações do jpogo
        $scope.configuracaoJogo = {
            passoJogo: 1,
            palavra: '',
            palavraSecreta: '',
            palavraResolvida: '',
            letrasErradas: [],
            letrasCertas: [],
            quantidadeErros: 0,
            mensagem: ''
        }

        // pegando o botão salvar a palavra
        $scope.salvarPalavra = function () {
            $scope.configuracaoJogo.palavraSecreta = $scope.configuracaoJogo.palavra;
            $scope.configuracaoJogo.palavraResolvida = '';
            for ($i = 0; $i < $scope.configuracaoJogo.palavraSecreta.length; $i++) {
                $scope.configuracaoJogo.palavraResolvida = $scope.configuracaoJogo.palavraResolvida + '_';
            }
            $scope.configuracaoJogo.passoJogo = 2;
        }

        // função que recomeça/ reseta o jogo
        $scope.recomecarJogo = function () {
            $scope.configuracaoJogo = {
                passoJogo: 1,
                palavra: '',
                palavraSecreta: '',
                palavraResolvida: '',
                letrasErradas: [],
                letrasCertas: [],
                quantidadeErros: 0,
                mensagem: ''
            }
        }

        // função que armazena as letras inseridas pelo usuário
        $scope.armazenaLetras = function () {
            // checando se na palavra secreta contem a letra inserida pelo uruário
            if ($scope.configuracaoJogo.palavraSecreta.includes($scope.letras)) {
                $scope.configuracaoJogo.letrasCertas.push($scope.letras);

                $scope.letras = '';

                $scope.configuracaoJogo.palavraResolvida = '';

                // checando se as letras inseridas pelo usuário tem na palavra secreta
                for ($i = 0; $i < $scope.configuracaoJogo.palavraSecreta.length; $i++) {
                    if ($scope.configuracaoJogo.letrasCertas.includes($scope.configuracaoJogo.palavraSecreta[$i])) {
                        $scope.configuracaoJogo.palavraResolvida += $scope.configuracaoJogo.palavraSecreta[$i];

                        if ($scope.configuracaoJogo.palavraResolvida == $scope.configuracaoJogo.palavraSecreta) {
                            Swal.fire({
                                title: `Parabéns, você ganhou! A palavra é: "${$scope.configuracaoJogo.palavraSecreta}"`,
                                text: "Deseja recomeçar o Jogo?",
                                icon: "success",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Sim, jogar novamente!",
                                cancelButtonText: "Não, ir para home!"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    $scope.$apply($scope.recomecarJogo());
                                } else {
                                    $state.go('home');
                                }
                            });
                        }
                    }
                    else {
                        $scope.configuracaoJogo.palavraResolvida += '_';
                    }
                    console.log($scope.configuracaoJogo.palavraSecreta[$i]);
                }
            }
            else if (!$scope.configuracaoJogo.letrasErradas.includes($scope.letras)) {
                $scope.configuracaoJogo.letrasErradas.push($scope.letras);
                $scope.configuracaoJogo.quantidadeErros++;
                $scope.letras = '';

                if ($scope.configuracaoJogo.quantidadeErros >= 7) {
                    Swal.fire({
                        title: `Opss, você perdeu! A palavra era: "${$scope.configuracaoJogo.palavraSecreta}"`,
                        text: "Deseja recomeçar o Jogo?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Sim, recomeçar!",
                        cancelButtonText: "Não, ir para home!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $scope.$apply($scope.recomecarJogo());
                        } else {
                            $state.go('home');
                        }
                    });
                }
            }
        }
    })