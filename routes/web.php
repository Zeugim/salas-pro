<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SalaController;
use App\Http\Controllers\AdminAuth\AdminAuthLoginController;
use App\Http\Controllers\AdminRoomController;


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

Route::get('/salas', [SalaController::class, 'index']);

Route::get('/addfavoritos/{user}/{sala}', [\App\Http\Controllers\FavoritosController::class, 'add_favorito']);
Route::get('/delfavoritos/{user}/{sala}', [\App\Http\Controllers\FavoritosController::class, 'del_favorito']);

Route::get('/salas/{id}', [SalaController::class, 'show'])->name('sala.show');

Route::get('/', function () {
    $salas = App\Models\Sala::all();
    $user = auth()->user();
    $salasFavoritas=[];
    if($user) {
        $salasFavoritas = $user->salas()->get();
        info("Salas favoritas de $user->id" . $salasFavoritas);
    }
    return Inertia::render('Welcome', compact("salas","user", "salasFavoritas"));
})->name('welcome');

Route::get('/dashboard', function () {
    $user = auth()->user();
    if ($user) {
        $salas = $user->salas()->get();
        info("valor de salas $salas");
    }

    return Inertia::render('Dashboard',compact('user','salas'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/provincias', [SalaController::class, 'provincias'])->name('provincias.index');
Route::get('/municipios-por-provincia', [SalaController::class, 'municipiosPorProvincia']);


Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::get('/login', [AdminAuthLoginController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AdminAuthLoginController::class, 'login'])->name('login.submit');
    Route::post('/logout', [AdminAuthLoginController::class, 'logout'])->name('logout');
    Route::middleware('auth:admin')->group(function () {
        Route::get('/dashboard', [AdminAuthLoginController::class, 'dashboard'])->name('dashboard');
    });
});

Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/salas', [App\Http\Controllers\AdminRoomController::class, 'index'])->name('admin.salas.index');
    Route::get('/admin/salas/create', [App\Http\Controllers\AdminRoomController::class, 'create'])->name('admin.salas.create');
    Route::post('/admin/salas', [App\Http\Controllers\AdminRoomController::class, 'store'])->name('admin.salas.store');
    Route::get('/admin/salas/{sala}/edit', [App\Http\Controllers\AdminRoomController::class, 'edit'])->name('admin.salas.edit');
    Route::put('/admin/salas/{sala}', [App\Http\Controllers\AdminRoomController::class, 'update'])->name('admin.salas.update');
    Route::delete('/admin/salas/{sala}', [App\Http\Controllers\AdminRoomController::class, 'destroy'])->name('admin.salas.destroy');
});

require __DIR__.'/auth.php';
