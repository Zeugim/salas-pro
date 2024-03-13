<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sala;
use App\Models\User;

class AdminController extends Controller
{
    // Método para crear una nueva sala
    public function crearSala(Request $request)
    {
        $request->validate([
            'sala' => 'required|string|max:255',
            'provincia' => 'required|string|max:255',
            'municipio' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            'telefono' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'web' => 'nullable|string|max:255',
            'genero' => 'required|string|max:255',
            'aforo' => 'required|integer',
        ]);

        Sala::create($request->all());

        return redirect()->back()->with('success', 'Sala creada exitosamente.');
    }

    // Método para editar una sala existente
    public function editarSala(Request $request, $id)
    {
        $request->validate([
            'sala' => 'required|string|max:255',
            'provincia' => 'required|string|max:255',
            'municipio' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            'telefono' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'web' => 'nullable|string|max:255',
            'genero' => 'required|string|max:255',
            'aforo' => 'required|integer',
        ]);

        Sala::findOrFail($id)->update($request->all());

        return redirect()->back()->with('success', 'Sala actualizada exitosamente.');
    }

    // Método para eliminar una sala existente
    public function eliminarSala($id)
    {
        Sala::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Sala eliminada exitosamente.');
    }

    // Método para listar todas las salas
    public function listarSalas()
    {
        $salas = Sala::all();

        return view('salas.index', compact('salas'));
    }

    // Método para crear un nuevo usuario
    public function crearUsuario(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8|max:255',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return redirect()->back()->with('success', 'Usuario creado exitosamente.');
    }

    // Método para editar un usuario existente
    public function editarUsuario(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id . '|max:255',
        ]);

        User::findOrFail($id)->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return redirect()->back()->with('success', 'Usuario actualizado exitosamente.');
    }

    // Método para eliminar un usuario existente
    public function eliminarUsuario($id)
    {
        User::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Usuario eliminado exitosamente.');
    }

    // Método para listar todos los usuarios
    public function listarUsuarios()
    {
        $usuarios = User::all();

        return view('usuarios.index', compact('usuarios'));
    }

    // Método para mostrar el panel de administración
    public function showAdminPanel()
    {
        return view('admin_panel');
    }
}