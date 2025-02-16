angular.module('meuApp')
    .controller('ForcaController', function ($scope, $http, $state) {
        console.log('ForcaController funcionou!');

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

        // função que armazena as letras inseridas pelo usuário
        $scope.armazenaLetras = function () {
            console.log('botão clicado');
            console.log($scope.letras);


            // checando se na palavra secreta contem a letra inserida pelo uruário
            if ($scope.configuracaoJogo.palavraSecreta.includes($scope.letras)) {
                $scope.configuracaoJogo.letrasCertas.push($scope.letras);

                $scope.letras = '';

                console.log('tem a letra');
                $scope.configuracaoJogo.palavraResolvida = '';

                for ($i = 0; $i < $scope.configuracaoJogo.palavraSecreta.length; $i++) {
                    if ($scope.configuracaoJogo.letrasCertas.includes($scope.configuracaoJogo.palavraSecreta[$i])) {
                        $scope.configuracaoJogo.palavraResolvida += $scope.configuracaoJogo.palavraSecreta[$i];
                    }
                    else {
                        $scope.configuracaoJogo.palavraResolvida += '';

                    }
                    console.log($scope.configuracaoJogo.palavraSecreta[$i]);
                }
            }
            else {
                if (!$scope.configuracaoJogo.letrasErradas.includes($scope.letras)) {
                    $scope.configuracaoJogo.letrasErradas.push($scope.letras);
                    $scope.configuracaoJogo.quantidadeErros++;
                    $scope.letras = '';

                    if ($scope.configuracaoJogo.quantidadeErros >= 7) {
                        Swal.fire({
                            title: 'Ops!',
                            text: 'Você perdeu',
                            icon: 'error',
                            confirmButtonText: 'Reiniciar Jogo'
                        })


                    }
                }

            }

        }
    })