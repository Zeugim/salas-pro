import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const Topbar = ({ auth, route }) => {
    return (
        <div className="barrafija">
            <div className="topbar-left">
                <a href="">
                    <h2>Salas de Concierto</h2>
                </a>
            </div>
            <div>
                <form method="get" action="" id="formularioBusquedaTopbar">
                    <div className="search-bar">
                        <input type="text" id="busqueda" name="busqueda" placeholder="¿Qué quieres buscar?" className="buscartext" />
                        <button type="submit" className="enviar-btn" id="enviarBtn">Buscar</button>
                    </div>
                </form>
            </div>
            <div>
                <a href="audio" target='_blank'>
                    <button type="button" className="btn_audio">Reproductor</button>
                </a>
            </div>
            <div className="panel0">
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="panel"
                    >
                        Panel
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="panel"
                        >
                            Acceso
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Topbar;