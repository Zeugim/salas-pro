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

            {status && <div className="log1">{status}</div>}
            <div className='log0'>
                <form onSubmit={submit}>
                    {/* <Link
                        href={route('/app')}
                        className="panel"
                    >
                        Inicio
                    </Link> */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" clasName />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="log2"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Ej: tu@email.com"
                        />

                        <InputError message={errors.email} className="log23" />
                    </div>

                    <div className="log3">
                        <InputLabel htmlFor="password" value="Contraseña" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="log2"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Escribe tu contraseña"
                        />

                        <InputError message={errors.password} className="log34" />
                    </div>

                    <div className="log4">
                        <label className="log5">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="log6">Recordar cuenta</span>
                        </label>
                    </div>

                    <div className="log7">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="log8"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}

                        <PrimaryButton className="log-btn" disabled={processing}>
                            Iniciar sesión
                        </PrimaryButton>
                    </div>
                    <div className="register-btn">
                        <Link
                            href={route('register')}
                            className="register-btn"
                        >
                            Registrarse
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
