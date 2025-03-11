<?php

namespace App\Http\Controllers;

use App\Models\JogoDaVelha;
use Illuminate\Http\Request;

class JogoDaVelhaController extends Controller
{
    // função inserir
    public function inserir(Request $request)
    {
        // checando se a jogada é do mesmo jogador no jogo
        $ultimaJogada = JogoDaVelha::where('jogador', $request->jogador)->where('idJogo', $request->idJogo)->count();
        if ($ultimaJogada > 0)
            return response('Ops: ', 422);

        $jogoDaVelha = new JogoDaVelha();
        $jogoDaVelha->jogador = $request->jogador;
        $jogoDaVelha->posicao = $request->posicao;
        $jogoDaVelha->idJogo = $request->idJogo;

        $jogoDaVelha->save();
    }

    // função carregar as posições

}
