<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SalaController;
use App\Http\Controllers\AdminAuth\AdminAuthLoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/admin', function () {
    return view('admin_panel');
});

Route::get('/salas', [SalaController::class, 'index']);

Route::get('/salas/{id}', [SalaController::class, 'show'])->name('sala.show');


Route::get('/', function () {
    $salas = App\Models\Sala::all();
    return Inertia::render('Welcome', ['salas' => $salas]);
})->name('welcome');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Rutas para la autenticación del usuario administrador
Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::get('/login', [AdminAuthLoginController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AdminAuthLoginController::class, 'login'])->name('login.submit');
    Route::post('/logout', [AdminAuthLoginController::class, 'logout'])->name('logout');
    Route::middleware('auth:admin')->group(function () {
        // Rutas del panel de administración
        Route::get('/dashboard', [AdminAuthLoginController::class, 'dashboard'])->name('dashboard');
        // Otras rutas del panel de administración
    });
});

// Rutas para la gestión de salas por el administrador
Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/rooms', [App\Http\Controllers\AdminRoomController::class, 'index'])->name('admin.rooms.index');
    Route::get('/admin/rooms/create', [App\Http\Controllers\AdminRoomController::class, 'create'])->name('admin.rooms.create');
    Route::post('/admin/rooms', [App\Http\Controllers\AdminRoomController::class, 'store'])->name('admin.rooms.store');
    Route::get('/admin/rooms/{room}/edit', [App\Http\Controllers\AdminRoomController::class, 'edit'])->name('admin.rooms.edit');
    Route::put('/admin/rooms/{room}', [App\Http\Controllers\AdminRoomController::class, 'update'])->name('admin.rooms.update');
    Route::delete('/admin/rooms/{room}', [App\Http\Controllers\AdminRoomController::class, 'destroy'])->name('admin.rooms.destroy');
});



require __DIR__.'/auth.php';
