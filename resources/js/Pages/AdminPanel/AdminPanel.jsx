import React from 'react';
import { Link, usePage, Inertia } from '@inertiajs/inertia-react';



const AdminPanel = () => {
    //const { props: { auth } } = usePage();

    const { auth } = usePage().props;
    const usuario = auth.user;
    const handleLogout = () => {
        Inertia.post('/admin/logout');
    };
    return (
        <div className="container">
            <h4>Panel de Administración</h4>
            <ul>
                <li><Link href="/admin/rooms/create">Crear Sala</Link></li>
                <li><Link href="/admin/users/create">Crear Usuario</Link></li>
                {/* Agrega enlaces adicionales según sea necesario */}
            </ul>
            {usuario && (
                <button onClick={handleLogout}>Cerrar Sesión</button>
            )}
        </div>
    );
};

export default AdminPanel;