use App\Http\Controllers\AdminAuth\AdminAuthLoginController;
use Inertia\Inertia;

Route:: group(['prefix' => 'admin', 'as' => 'admin.'], function () {
    Route:: middleware('auth:admin') -> group(function () {
        Route:: get('/dashboard', [AdminAuthLoginController:: class, 'dashboard']) -> name('dashboard');
        // Otras rutas del panel de administración
    });
});

// En tu componente de React
import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from './Layout'; // Importa tu layout personalizado

const AdminPanel = () => {
    const handleLogout = () => {
        Inertia.post('/admin/logout');
    };

    return (
        <Layout> {/* Utiliza tu layout personalizado */}
            <div>
                <h4>Panel de Administración</h4>
                <ul>
                    <li><InertiaLink href="/admin/rooms/create">Crear Sala</InertiaLink></li>
                    <li><InertiaLink href="/admin/users/create">Crear Usuario</InertiaLink></li>
                    {/* Agrega enlaces adicionales según sea necesario */}
                </ul>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </Layout>
    );
};

export default AdminPanel;