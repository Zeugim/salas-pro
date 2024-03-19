import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const LogOut = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey" width="24px" height="24px">
            <path d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" />
        </svg>
    )

    return (
        <div className="auth-fondo">
            <nav className="auth-head">
                <div className="mx-auto px-5">
                    <div className="auth0 d-flex jusfity-content-space-between">
                        <div className="d-flex">
                            <div className="d-flex mx-5">
                                <NavLink href={route('welcome')} active={route().current('welcome')} className="d-inline-flex align-items-center p-2 text-decoration-none navlink">
                                    Inicio
                                </NavLink>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')} className="d-inline-flex align-items-center p-2 text-decoration-none navlink">
                                    Salas
                                </NavLink>
                                <NavLink href={route('profile.edit')} active={route().current('profile.edit')} className="d-inline-flex align-items-center p-2 text-decoration-none navlink">
                                    Perfil
                                </NavLink>
                                <NavLink href={route('logout')} method="post" as="text" className="d-inline-flex align-items-center p-2 text-danger d-lg-none">
                                    Cerrar
                                </NavLink>
                            </div>
                        </div>

                        <div className="d-flex align-items-center auth5">
                            <div className="ms-3 position-relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span>
                                            <button
                                                type="button"
                                                className="auth-dropdown d-inline-flex align-items-center px-3 py-1"
                                            >
                                                {user.name}

                                                <svg
                                                    className="auth-arrow mx-1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                        <Dropdown.Link href={route('dashboard')} active={route().current('dashboard')}>
                                            Salas
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Cerrar sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="auth-header d-flex align-items-center">
                    <div className="mx-auto py-3 px-2">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
