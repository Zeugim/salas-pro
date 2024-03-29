<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sala;

class AdminRoomController extends Controller
{
    public function index()
    {
        $salas = Sala::all();
        return inertia('AdminPanel/AdminPanel', ['salas' => $salas]);
    }

    public function create()
    {
        return Inertia::render('AdminPanel/CreateRoomForm');
    }

    public function store(Request $request)
    {
        $datos=$request->input();
        $sala=new Sala($datos);
        $sala->save();
        $salas = Sala::all();
        return inertia('AdminPanel/AdminPanel', ['salas' => $salas]);
    }

    public function edit(Sala $sala)
    {
        return Inertia::render('AdminPanel/EditRoomForm', compact('sala'));
    }

    public function update(Request $request, Sala $sala)
    {
        $sala -> update ($request->input());
        $salas = Sala::all();
        return inertia('AdminPanel/AdminPanel', ['salas' => $salas]);
    }

    public function destroy(Sala $sala)
    {
        $sala -> delete ();
        $salas = Sala::all();
        return inertia('AdminPanel/AdminPanel', ['salas' => $salas]);
    }
}
