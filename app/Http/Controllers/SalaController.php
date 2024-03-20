<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalaController extends Controller
{
    public function index()
    {
        $salas = Sala::all();
        $user = auth()->user();
        $salasFavoritas=[];
        if($user)
            $salasFavoritas = $user->salas()->get();
        return (Inertia::render("Welcome", compact("salas", "user", "salasFavoritas")));
    }

    public function show($id)
    {
        $sala = Sala::findOrFail($id);
        $user = auth()->user();
        $favorito = $user->salas()->where("user_id", $user->id)
        ->where("sala_id", $sala->id)->get();

        return Inertia::render('Sala', ['sala' => $sala, 'user' => $user, 'favorito' => $favorito]);
    }

    public function provincias()
    {
        $provincias = Sala::distinct('provincia')->pluck('provincia');
        return response()->json($provincias);
    }
}

