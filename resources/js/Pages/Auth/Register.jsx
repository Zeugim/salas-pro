import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <h1>Crear cuenta</h1>
            <div className='custom-max-width p-5 my-5 mx-auto'>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Nombre:" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="log2 d-block mt-1 p-1"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email:" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="log2 d-block mt-1 p-1"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Contraseña:" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="log2 d-block mt-1 p-1"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña:" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="log2 d-block mt-1 p-1"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="d-flex justify-content-center mt-4">
                        <PrimaryButton className="log-btn" disabled={processing}>
                            Registrarse
                        </PrimaryButton>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <Link
                            href={route('login')}
                            className="forget-pass"
                        >
                            ¿Ya estás registrado?
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
