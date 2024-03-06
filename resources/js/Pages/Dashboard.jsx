import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="dash0">Salas guardadas</h2>}
        >
            <Head title="Dashboard" />

            <div className="dash1">
                <div className="dash2">
                    <div className="dash3">
                        <div className="dash4">¡Hola {auth.user.name}!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}