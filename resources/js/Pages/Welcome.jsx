import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Collapse } from 'react-bootstrap';

export default function Welcome({ user, laravelVersion, phpVersion, salas, salasFavoritas }) {

    const [open, setOpen] = useState(false);
    const [buttonText, setButtonText] = useState('Instrucciones');

    const toggleCollapse = () => {
        setOpen(!open);
        if (open) {
            setButtonText('Instrucciones');
        } else {
            setButtonText('Ocultar');
        }
    };

    const FavoritoSvg = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24px" height="24px">
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
    )
    const NoFavoritoSvg = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey" width="24px" height="24px">
            <path
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
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

            <div className='d-flex justify-content-center align-items-center mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 mt-4'>
                        <Collapse in={open}>
                            <div>
                                <p className='text-center'>Aquí podrás buscar salas de concierto ubicadas en distintas provincias de España.</p>
                                <p className='text-center'>Uso del formulario:</p>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <ul className='col-md-8'>
                                        <li>Puedes filtrar la búsqueda por sala, provincia, municipio, género y aforo.</li>
                                        <br />
                                        <li>Al seleccionar una sala, el resto de opciones se bloquearán, ya que la sala es el destino final y contiene todos los datos, pulsando sobre el nombre de la sala se abrirá una nueva ventana con la página personal de sala.</li>
                                        <br />
                                        <li>El selector de municipio aparece bloqueado de inicio, se desploqueará después de selccionar una provincia.</li>
                                        <br />
                                        <li>Todos los selectores están relacionados entre sí, si por ejemplo seleccionas un género o un aforo, el resto de selectores mostrarán únicamente los datos que contengas el género o aforo seleccionado.</li>
                                        <br />
                                        <li>Se pueden combinar todos los selectores (salvo el de sala) para realizar una búsqueda más detallada.</li>
                                        <br />
                                        <li>El potón "Restablecer" borrará las opciones seleccionadas en el formulario y los datos mostrados.</li>
                                        <br />
                                        <li>Pulsando el botón "Buscar" con el formlario vacío, se mostrarán todas las salas disponibles.</li>
                                    </ul>
                                </div>
                                <br />
                                <p className='text-center'>Además, creando un nuevo usuario o accediendo con uno ya existente, podrás guardar tus salas favoritas.</p>
                                <p className='text-center'>Tras realizar el acceso, en la tabla de la salas mostradas aparecerrá una nueva columnas con corazones.</p>
                                <p className='text-center'>Si el corazón está gris, quiere decir que aún no has guardado esa sala.</p>
                                <p className='text-center'>Si el corazón aparece en rojo significa que la sala está guardada en tu lista de salas favoritas.</p>
                                <p className='text-center mb-4'>
                                    Las salas guardadas como favoritas también se mostrarán en tu perfil personal, desde allí podrás eliminarlas.</p>
                            </div>
                        </Collapse>
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-outline-dark float-end' style={{ border: '2px solid #2c3e50', borderRadius: '5px', fontWeight: 'bold' }} onClick={toggleCollapse} aria-controls="example-collapse-text" aria-expanded={open}>
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container mt-4 pt-4 pb-4" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)' }}>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <h1 className="pb-2">Salas de concierto</h1>
                        {/* <div className="d-none d-md-block my-4">
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
                        </div> */}
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
                                    .filter((aforo, index, self) => self.indexOf(aforo) === index)
                                    .sort((a, b) => {
                                        const numA = parseInt(a) || 0;
                                        const numB = parseInt(b) || 0;
                                        return numA - numB;
                                    })

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