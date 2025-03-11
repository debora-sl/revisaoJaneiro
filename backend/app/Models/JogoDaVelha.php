<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JogoDaVelha extends Model
{
    use HasFactory;
    protected $table = 'jogoDaVelha';
    use SoftDeletes;

    public static function checarVitoria($idJogo)
    {
        // Combinações de vitória possíveis (linhas, colunas e diagonais)
        $combinacoes = [
            [1, 2, 3],  // linhas
            [4, 5, 6],  // linhas
            [7, 8, 9],  // linhas
            [1, 4, 7],  // colunas
            [2, 5, 8],  // colunas
            [3, 6, 9],  // colunas
            [1, 5, 9],  // diagonais
            [3, 5, 7]   // diagonais
        ];

        // Buscar todas as posições e jogadores de uma única vez
        $posicoes = JogoDaVelha::where('idJogo', $idJogo)->get(['posicao', 'jogador']);

        // Organizar as posições por jogador em um array
        $posicoesPorJogador = [
            'x' => [],
            'o' => []
        ];

        foreach ($posicoes as $posicao) {
            if ($posicao->jogador === 'x') {
                $posicoesPorJogador['x'][] = $posicao->posicao;
            } elseif ($posicao->jogador === 'o') {
                $posicoesPorJogador['o'][] = $posicao->posicao;
            }
        }

        // Função para verificar se há vitória para um jogador
        $verificarVitoria = function ($jogador) use ($combinacoes, $posicoesPorJogador) {
            foreach ($combinacoes as $combinacao) {
                // Verificar se as 3 posições da combinação estão todas no array de posições do jogador
                if (count(array_intersect($combinacao, $posicoesPorJogador[$jogador])) === 3) {
                    return true;  // Vitória encontrada
                }
            }
            return false;  // Não encontrou vitória
        };

        // Verificar vitória para o jogador 'x'
        $jogadorXVenceu = $verificarVitoria('x');

        // Verificar vitória para o jogador 'o'
        $jogadorOVenceu = $verificarVitoria('o');

        // Verificar se todas as posições foram preenchidas (jogo deu velha)
        $posicoesPreenchidas = count($posicoes);
        $totalPosicoes = 9; // Número total de casas no tabuleiro (1 a 9)
        $deuVelha = ($posicoesPreenchidas == $totalPosicoes && !$jogadorXVenceu && !$jogadorOVenceu);

        // Retorna o resultado
        if ($jogadorXVenceu) {
            return 'Jogador X venceu!';
        } elseif ($jogadorOVenceu) {
            return 'Jogador O venceu!';
        } elseif ($deuVelha) {
            return 'Deu velha!';
        } else {
            return 'O jogo ainda está em andamento.';
        }
    }
}
