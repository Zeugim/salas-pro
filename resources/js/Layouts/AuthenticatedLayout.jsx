import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);


    return (
        <div className="auth-fondo">
            <nav className="auth-head">
                <div className="auth-topbar">
                    <div className="auth0">
                        <div className="auth1">
                            {/* <div className="auth2">
                                <Link href="/">
                                    <ApplicationLogo className="auth3" />
                                </Link>
                            </div> */}

                            <div className="auth4">
                                <NavLink href={route('welcome')} active={route().current('welcome')}>
                                    Inicio
                                </NavLink>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Salas
                                </NavLink>
                                <NavLink href={route('profile.edit')} active={route().current('profile.edit')}>
                                    Perfil
                                </NavLink>
                            </div>
                        </div>

                        <div className="auth5">
                            <div className="auth6">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="auth7">
                                            <button
                                                type="button"
                                                className="auth-button"
                                            >
                                                {user.name}

                                                <svg
                                                    className="auth-flecha"
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

                        {/* <div className="auth8">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="auth9"
                            >
                                <svg className="auth-menu" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'auth-inline-flex' : 'auth-hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'auth-inline-flex' : 'auth-hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div> */}
                    </div>
                </div>

                {/* <div className={(showingNavigationDropdown ? 'auth-block' : 'auth-hidden')}>
                    <div className="auth-salas">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Salas
                        </ResponsiveNavLink>
                    </div>

                    <div className="auth-name">
                        <div className="auth-name2">
                            <div className="auth-name3">{user.name}</div>
                            <div className="auth-email">{user.email}</div>
                        </div>

                        <div className="auth-profile">
                            <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Cerrar sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div> */}
            </nav>

            {header && (
                <header className="auth-header">
                    <div className="auth-header2">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
