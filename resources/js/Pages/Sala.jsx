import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';

const Show = ({ sala, salasFavoritas, user }) => {



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


    const [favorito, setFavorito] = useState(false);
    useEffect(() => {
        if (salasFavoritas) {
            setFavorito(salasFavoritas.some(salaFavorita => salaFavorita.id === sala.id));
        }
    }, [salasFavoritas, sala.id]);

    const handleFavoritoChange = (event, salaId) => {
        const id = user.id;
        const esFavoritoActual = favorito;
        const ruta = esFavoritoActual ? `/delfavoritos/${id}/${salaId}` : `/addfavoritos/${id}/${salaId}`;

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
                setFavorito(!esFavoritoActual); // Actualizar el estado local
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const [weatherData, setWeatherData] = useState(null);

    /* useEffect(() => {
        const fetchData = async () => {
            const data = fetch('/api/weather/28/28079')
                .then(response => response.json())
                .then(data => setWeatherData(data))
                .catch(error => console.error('Error fetching weather data:', error));
        }

        fetchData();
    }, []); */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/weather/${sala.provincia_code}/${sala.municipio_code}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener los datos del clima');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, [sala.provincia_code, sala.municipio_code]);

    return (
        <div>

            <nav className="navbar navbar-light bg-white fixed-top shadow-sm px-5">
                <div className="container-fluid">
                    <div className="d-none d-md-block">
                        <a href={route('welcome')} className="navbar-brand">Salas de Concierto</a>
                    </div>
                    <div className="d-lg-none d-lg-block">
                        <a href={route('welcome')} className="navbar-brand">Salas de Concierto</a>
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

            <div className="container pt-4" style={{ marginTop: '75px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)' }}>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <h1>{sala.sala}</h1>
                        <div className="mt-4">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><strong>Provincia</strong></td>
                                        <td>{sala.provincia}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Municipio</strong></td>
                                        <td>{sala.municipio}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Dirección</strong></td>
                                        <td>{sala.direccion}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Teléfono</strong></td>
                                        <td>{sala.telefono}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>E-mail</strong></td>
                                        <td>{sala.email}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Web</strong></td>
                                        <td>{sala.web}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Género(s)</strong></td>
                                        <td>{sala.genero}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Aforo</strong></td>
                                        <td>{sala.aforo}</td>
                                    </tr>
                                    {user && (
                                        <tr>
                                            <td><strong>Favorito</strong></td>
                                            <td>
                                                <button onClick={(e) => handleFavoritoChange(e, sala.id)}>
                                                    {favorito ? <FavoritoSvg /> : <NoFavoritoSvg />}
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                    <tr>

                                        <td colSpan="2">
                                            <div>
                                                {weatherData ? (
                                                    <div>
                                                        <h2>Información meteorológica</h2>
                                                        <p>Fecha: {weatherData.fecha}</p>
                                                        <p>Temperatura: {weatherData.temperatura_actual} º</p>
                                                        <p>Viento: {weatherData.viento} km/h</p>
                                                        <p>Precipitación: {weatherData.precipitacion} l/m<sup>2</sup></p>
                                                        <p>Estado del cielo: {weatherData.estado_cielo_descripcion}</p>
                                                        <p>Humedad: {weatherData.humedad} %</p>
                                                        {/* Agrega más campos según los datos que recibas de la API */}
                                                    </div>
                                                ) : (
                                                    <p>Cargando datos meteorológicos...</p>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;