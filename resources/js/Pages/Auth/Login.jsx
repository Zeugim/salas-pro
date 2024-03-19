import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <h1>Inicio de sesión</h1>

            {status && <div className="log1 mb-2">{status}</div>}
            <div className="custom-max-width p-5 my-5 mx-auto">
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email:" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="log2 d-block mt-1 p-1"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Ej: tu@email.com"
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
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Escribe tu contraseña"
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <label className="d-flex align-items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="remember-check mx-2">Recordar cuenta</span>
                        </label>
                    </div>

                    <div className="d-flex justify-content-center mt-2">

                        <PrimaryButton disabled={processing}>
                            Iniciar sesión
                        </PrimaryButton>


                    </div>
                    <div className="d-flex justify-content-center mt-2">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="forget-pass"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <Link
                            href={route('register')}
                            className="btn btn-outline-dark"
                        >
                            Registrarse
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
