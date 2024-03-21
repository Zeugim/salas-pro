<?php

namespace App\Http\Controllers\AdminAuth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class AdminAuthLoginController extends Controller
{
    public function showLoginForm()
    {
        return view('admin.auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('admin')->attempt($credentials)) {
            return redirect()->intended('/admin/dashboard');
        }

        return redirect()->back()->withInput($request->only('email'));
    }

    public function logout(Request $request)
{
    Auth::guard('admin')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
}

    public function dashboard()
    {
        $salas = \App\Models\Sala::all();
        return Inertia::render('AdminPanel/AdminPanel', ['salas' => $salas]);
    }
}