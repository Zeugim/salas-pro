<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Sala;

class FavoritosController extends Controller
{
    //

    public function add_favorito(Request $request,  User $user,Sala $sala){
        info("Usuario ".$user->id);
        info("Sala ".$sala);
        $user->salas()->attach($sala->id);
        return response()->json("OK add!!! $user->id to $sala->id");
    }
    public function del_favorito(Request $request,  User $user,Sala $sala){
        $user->salas()->detach($sala->id);
        return response()->json("OK del!!! $user->id to $sala->id");
    }
}