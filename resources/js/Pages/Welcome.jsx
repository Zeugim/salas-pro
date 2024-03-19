import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ user, laravelVersion, phpVersion, salas, salasFavoritas }) {

    const FavoritoSvg = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="24px" height="24px">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
    )
    const NoFavoritoSvg = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24px" height="24px">
            <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
    )
    const UserSvg = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey" width="24px" height="24px">
            <path
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
        </svg>
    )

    const [favoritos, setFavoritos] = useState({});
    useEffect(() => {
        const favoritosIniciales = {};
        salasFavoritas.forEach(sala => {
            favoritosIniciales[sala.id] = true;
        });
        setFavoritos(favoritosIniciales);
    }, [salas]);

    const [salasData, setSalasData] = useState(salas || []);
    const [salaSeleccionada, setSalaSeleccionada] = useState('');
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState('');
    const [generoSeleccionado, setGeneroSeleccionado] = useState('');
    const [aforoSeleccionado, setAforoSeleccionado] = useState('');
    const [provinciaBloqueada, setProvinciaBloqueada] = useState(false);
    const [municipioBloqueado, setMunicipioBloqueado] = useState(false);
    const [generoBloqueado, setGeneroBloqueado] = useState(false);
    const [aforoBloqueado, setAforoBloqueado] = useState(false);
    const [mostrarTabla, setMostrarTabla] = useState(false);

    const handleFavoritoChange = (event, salaId) => {
        event.stopPropagation();
        console.log("sala Id" + salaId)
        const esFavoritoActual = favoritos[salaId];

        const esFavoritoNuevo = !esFavoritoActual;
        const nuevosFavoritos = { ...favoritos, [salaId]: esFavoritoNuevo };
        setFavoritos(nuevosFavoritos);

        const isChecked = event.target.checked;

        const id = user.id;
        let ruta = esFavoritoNuevo ? "/addfavoritos" : "/delfavoritos";
        ruta += `/${id}/${salaId}`;
        fetch(ruta, {
            method: "GET",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleSalaClick = (id) => {
        window.open(`/salas/${id}`, '_blank');
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const resultados = salas.filter(sala => {
            if (salaSeleccionada && sala.id !== parseInt(salaSeleccionada)) {
                return false;
            }

            if (provinciaSeleccionada && sala.provincia !== provinciaSeleccionada) {
                return false;
            }

            if (municipioSeleccionado && sala.municipio !== municipioSeleccionado) {
                return false;
            }

            if (generoSeleccionado && sala.genero !== generoSeleccionado) {
                return false;
            }

            if (aforoSeleccionado && sala.aforo !== aforoSeleccionado) {
                return false;
            }

            return true;
        });

        setSalasData(resultados);
        setMostrarTabla(resultados.length > 0);
    };

    const handleSalaSelection = (event) => {
        const salaSeleccionada = event.target.value;
        setSalaSeleccionada(salaSeleccionada);
    };

    const handleProvinciaSelection = (event) => {
        const provinciaSeleccionada = event.target.value;
        setProvinciaSeleccionada(provinciaSeleccionada);
        setMunicipioBloqueado(false);
    };

    const handleMunicipioSelection = (event) => {
        const municipioSeleccionado = event.target.value;
        setMunicipioSeleccionado(municipioSeleccionado);
        setProvinciaBloqueada(true);
    };

    const handleGeneroSelection = (event) => {
        const generoSeleccionado = event.target.value;
        setGeneroSeleccionado(generoSeleccionado);
    };

    const handleAforoSelection = (event) => {
        const aforoSeleccionado = event.target.value;
        setAforoSeleccionado(aforoSeleccionado);
    };

    const resetForm = () => {
        setSalaSeleccionada('');
        setProvinciaSeleccionada('');
        setMunicipioSeleccionado('');
        setGeneroSeleccionado('');
        setAforoSeleccionado('');
        setProvinciaBloqueada(false);
        setMunicipioBloqueado(false);
        setGeneroBloqueado(false);
        setAforoBloqueado(false);
    };

    return (
        <>
            <Head title="Welcome" />



            <button></button>



            <nav className="navbar navbar-light bg-white fixed-top shadow-sm px-5">
                <div className="container-fluid">
                    <div className="d-none d-md-block">
                        <a href="" className="navbar-brand">Salas de Concierto</a>
                    </div>
                    <div className="d-lg-none d-lg-block">
                        <a href="" className="navbar-brand">Salas de Concierto</a>
                    </div>
                    <div className="navbar-brandpx-5">
                        {user ? (
                            <Link href={route('dashboard')} className="user-top text-decoration-none">
                                <UserSvg /> {user.name}
                            </Link>
                        ) : (
                            <Link href={route('login')} className="text-decoration-none">
                                <UserSvg />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <div className="container mt-5 pt-5 pb-4" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)' }}>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <h1 className="pb-2">Salas de concierto</h1>
                        <div className="d-none d-md-block my-4">
                            <form method="get" action="" className="d-flex">
                                <input type="text" id="busqueda" name="busqueda" placeholder="¿Qué quieres buscar?" className="form-control buscartext" />
                                <button type="submit" className="enviar-btn">Buscar</button>
                            </form>
                        </div>
                        <div className="d-lg-none my-4">
                            <div className="d-flex justify-content-center align-items-center">
                                <form method="get" action="" className="search-bar">
                                    <input type="text" id="busqueda" name="busqueda" placeholder="¿Qué quieres buscar?" className="form-control buscartext" />
                                    <button type="submit" className="btn enviar-btn">Buscar</button>
                                </form>
                            </div>
                        </div>
                        <form
                            id="formularioBusqueda"
                            onSubmit={handleSubmit}
                        >
                            <label htmlFor="sala">
                                Sala:
                            </label>
                            <select
                                id="sala"
                                name="sala"
                                onChange={handleSalaSelection}
                                value={salaSeleccionada}
                            >
                                <option value="">
                                    Seleccionar Sala
                                </option>
                                {salas
                                    .filter(sala => {
                                        if (provinciaSeleccionada && municipioSeleccionado) {
                                            return sala.provincia === provinciaSeleccionada && sala.municipio === municipioSeleccionado;
                                        } else if (provinciaSeleccionada && !municipioSeleccionado) {
                                            return sala.provincia === provinciaSeleccionada;
                                        } else {
                                            return true;
                                        }
                                    })
                                    .filter(sala => {
                                        if (generoSeleccionado && aforoSeleccionado) {
                                            return sala.genero === generoSeleccionado && sala.aforo === aforoSeleccionado;
                                        } else if (generoSeleccionado && !aforoSeleccionado) {
                                            return sala.genero === generoSeleccionado;
                                        } else if (!generoSeleccionado && aforoSeleccionado) {
                                            return sala.aforo === aforoSeleccionado;
                                        } else {
                                            return true;
                                        }
                                    })
                                    .sort((a, b) => a.sala.localeCompare(b.sala))
                                    .map((sala, index) => (
                                        <option key={index} value={sala.id}>
                                            {sala.sala}
                                        </option>
                                    ))
                                }
                            </select>
                            <label htmlFor="provincia">
                                Provincia:
                            </label>
                            <select
                                id="provincia"
                                name="provincia"
                                onChange={handleProvinciaSelection}
                                value={provinciaSeleccionada}
                                disabled={!!salaSeleccionada || !!municipioSeleccionado}
                                className={`form-select ${salaSeleccionada || !!municipioSeleccionado ? "disabled" : "select-style"}`}
                            >
                                <option value="">
                                    Seleccionar Provincia
                                </option>
                                {[...new Set(
                                    salas
                                        .filter(sala => {
                                            if (generoSeleccionado && aforoSeleccionado) {
                                                return sala.genero === generoSeleccionado && sala.aforo === aforoSeleccionado;
                                            } else if (generoSeleccionado && !aforoSeleccionado) {
                                                return sala.genero === generoSeleccionado;
                                            } else if (!generoSeleccionado && aforoSeleccionado) {
                                                return sala.aforo === aforoSeleccionado;
                                            } else {
                                                return true;
                                            }
                                        })
                                        .map(sala => sala.provincia)
                                )]
                                    .sort((a, b) => a.localeCompare(b))
                                    .map((provincia, index) => (
                                        <option key={index} value={provincia}>
                                            {provincia}
                                        </option>
                                    ))}
                            </select>
                            <label htmlFor="municipio">
                                Municipio:
                            </label>
                            <select
                                id="municipio"
                                name="municipio"
                                onChange={handleMunicipioSelection}
                                value={municipioSeleccionado}
                                disabled={!provinciaSeleccionada || !!salaSeleccionada}
                                className={`form-select ${!provinciaSeleccionada || !!salaSeleccionada ? "disabled" : "select-style"}`}
                            >
                                <option value="">
                                    Seleccionar Municipio
                                </option>
                                {[...new Set(
                                    salas
                                        .filter(sala => {
                                            if (generoSeleccionado && aforoSeleccionado) {
                                                return sala.provincia === provinciaSeleccionada && sala.genero === generoSeleccionado && sala.aforo === aforoSeleccionado;
                                            } else if (generoSeleccionado && !aforoSeleccionado) {
                                                return sala.provincia === provinciaSeleccionada && sala.genero === generoSeleccionado;
                                            } else if (!generoSeleccionado && aforoSeleccionado) {
                                                return sala.provincia === provinciaSeleccionada && sala.aforo === aforoSeleccionado;
                                            } else {
                                                return sala.provincia === provinciaSeleccionada;
                                            }
                                        })
                                        .map(sala => sala.municipio)
                                )]
                                    .sort((a, b) => a.localeCompare(b))
                                    .map((municipio, index) => (
                                        <option key={index} value={municipio}>
                                            {municipio}
                                        </option>
                                    ))}
                            </select>
                            <label htmlFor="genero">
                                Género:
                            </label>
                            <select
                                id="genero"
                                name="genero"
                                onChange={handleGeneroSelection}
                                value={generoSeleccionado}
                                disabled={!!salaSeleccionada}
                                className={`form-select ${salaSeleccionada ? "disabled" : "select-style"}`}
                            >
                                <option value="">
                                    Seleccionar Género
                                </option>
                                {[...new Set(
                                    salas
                                        .filter(sala => {
                                            if (provinciaSeleccionada && municipioSeleccionado && aforoSeleccionado) {
                                                return sala.provincia === provinciaSeleccionada && sala.municipio === municipioSeleccionado && sala.aforo === aforoSeleccionado;
                                            } else if (provinciaSeleccionada && municipioSeleccionado && !aforoSeleccionado) {
                                                return sala.provincia === provinciaSeleccionada && sala.municipio === municipioSeleccionado;
                                            } else if (provinciaSeleccionada && !municipioSeleccionado && aforoSeleccionado) {
                                                return sala.provincia === provinciaSeleccionada && sala.aforo === aforoSeleccionado;
                                            } else if (!provinciaSeleccionada && municipioSeleccionado && aforoSeleccionado) {
                                                return sala.municipio === municipioSeleccionado && sala.aforo === aforoSeleccionado;
                                            } else if (provinciaSeleccionada && !municipioSeleccionado && !aforoSeleccionado) {
                                                return sala.provincia === provinciaSeleccionada;
                                            } else if (!provinciaSeleccionada && municipioSeleccionado && !aforoSeleccionado) {
                                                return sala.municipio === municipioSeleccionado;
                                            } else if (!provinciaSeleccionada && !municipioSeleccionado && aforoSeleccionado) {
                                                return sala.aforo === aforoSeleccionado;
                                            } else {
                                                return true;
                                            }
                                        })
                                        .map(sala => sala.genero)
                                )]
                                    .sort((a, b) => a.localeCompare(b))
                                    .map((genero, index) => (
                                        <option key={index} value={genero}>
                                            {genero}
                                        </option>
                                    ))}
                            </select>

                            <label htmlFor="genero">
                                Aforo:
                            </label>
                            <select
                                id="aforo"
                                name="aforo"
                                onChange={handleAforoSelection}
                                value={aforoSeleccionado}
                                disabled={!!salaSeleccionada}
                                className={`form-select ${salaSeleccionada ? "disabled" : "select-style"}`}
                            >
                                <option value="">
                                    Seleccionar Aforo
                                </option>
                                {[...new Set(
                                    salas
                                        .filter(sala => {
                                            if (provinciaSeleccionada && municipioSeleccionado && generoSeleccionado) {
                                                return sala.provincia === provinciaSeleccionada && sala.municipio === municipioSeleccionado && sala.genero === generoSeleccionado;
                                            } else if (provinciaSeleccionada && municipioSeleccionado && !generoSeleccionado) {
                                                return sala.provincia === provinciaSeleccionada && sala.municipio === municipioSeleccionado;
                                            } else if (provinciaSeleccionada && !municipioSeleccionado && generoSeleccionado) {
                                                return sala.provincia === provinciaSeleccionada && sala.genero === generoSeleccionado;
                                            } else if (!provinciaSeleccionada && municipioSeleccionado && generoSeleccionado) {
                                                return sala.municipio === municipioSeleccionado && sala.genero === generoSeleccionado;
                                            } else if (provinciaSeleccionada && !municipioSeleccionado && !generoSeleccionado) {
                                                return sala.provincia === provinciaSeleccionada;
                                            } else if (!provinciaSeleccionada && municipioSeleccionado && !generoSeleccionado) {
                                                return sala.municipio === municipioSeleccionado;
                                            } else if (!provinciaSeleccionada && !municipioSeleccionado && generoSeleccionado) {
                                                return sala.genero === generoSeleccionado;
                                            } else {
                                                return true;
                                            }
                                        })
                                        .map(sala => sala.aforo)
                                )]
                                    .filter(aforo => aforo !== null)
                                    .map(aforo => parseInt(aforo))
                                    .filter((aforo, index, self) => self.indexOf(aforo) === index)
                                    .sort((a, b) => a - b)
                                    .map((aforo, index) => (
                                        <option key={index} value={aforo}>
                                            {aforo}
                                        </option>
                                    ))}
                            </select>
                            <div className="mt-3">
                                <button type="button" onClick={() => window.location.reload()} className="btn btn-outline-dark float-end" style={{ border: '2px solid #2c3e50', borderRadius: '5px', fontWeight: 'bold' }}>
                                    Restablecer
                                </button>
                                <button type="submit" className="btn btn-primary" style={{ width: '30%', border: '2px solid #2c3e50', borderRadius: '5px', fontWeight: 'bold', backgroundColor: '#2c3e50', color: '#f3f4f6' }}>
                                    Buscar
                                </button>
                            </div>
                        </form>

                        {mostrarTabla && (
                            <div>
                                <h2 className="mt-4 mb-4">Resultados de la búsqueda:</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sala</th>
                                            <th>Provincia</th>
                                            <th className="d-none d-lg-table-cell">Municipio</th>
                                            <th className="d-none d-lg-table-cell">Géneros</th>
                                            <th className="d-none d-lg-table-cell">Aforo</th>
                                            {user && (<th>Favorito</th>)}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {salasData
                                            .sort((a, b) => a.sala.localeCompare(b.sala))
                                            .map((sala, index) => (
                                                <tr key={index}>
                                                    <td onClick={() => handleSalaClick(sala.id)} style={{ cursor: 'pointer' }} className="hover-effect">{sala.sala}</td>
                                                    <td>{sala.provincia}</td>
                                                    <td className="d-none d-lg-table-cell">{sala.municipio}</td>
                                                    <td className="d-none d-lg-table-cell">{sala.genero}</td>
                                                    <td className="d-none d-lg-table-cell">{sala.aforo}</td>
                                                    {user && (
                                                        <td>
                                                            <button onClick={(e) => handleFavoritoChange(e, sala.id)}>
                                                                {favoritos[sala.id] ? <FavoritoSvg /> : <NoFavoritoSvg />}
                                                            </button>

                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                    </div>
                </div>
            </div >
        </>
    );
}