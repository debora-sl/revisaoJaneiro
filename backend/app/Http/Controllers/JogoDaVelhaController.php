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
        $ultimaJogada = JogoDaVelha::where('idJogo', $request->idJogo)->orderBy('id', 'desc')->limit(1)->first();
        if ($ultimaJogada != null && $ultimaJogada->jogador == $request->jogador)
            return response('Mesmo jogador: ', 422);

        // checando se a posição no jogo já foi ocupada
        $posicao = JogoDaVelha::where('posicao', $request->posicao)->where('idJogo', $request->idJogo)->count();
        if ($posicao > 0)
            return response('Posição ocupada: ', 422);

        $jogoDaVelha = new JogoDaVelha();
        $jogoDaVelha->jogador = $request->jogador;
        $jogoDaVelha->posicao = $request->posicao;
        $jogoDaVelha->idJogo = $request->idJogo;

        $jogoDaVelha->save();

        $checarVitoria = jogoDaVelha::checarVitoria($request->idJogo);

        return response(compact('jogoDaVelha', 'checarVitoria'), 201);
    }

    // função carregar as posições
    public function carregarPosicoes($idJogo)
    {
        $jogoDaVelha = JogoDaVelha::where('idJogo', $idJogo)->get();

        if ($jogoDaVelha == null)
            return response('Erro: ', 404);

        return response($jogoDaVelha, 200);
    }
}
