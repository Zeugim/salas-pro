import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="edit-title">Perfil</h2>}
        >
            <Head title="Profile" />

            <div className="mt-5">
                <div className="edit0">
                    <div className="edit1">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="edit2"
                        />
                    </div>

                    <div className="edit1">
                        <UpdatePasswordForm className="edit2" />
                    </div>

                    <div className="edit1">
                        <DeleteUserForm className="edit2" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
