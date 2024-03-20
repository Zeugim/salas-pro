import React, { useState, useEffect } from 'react';

const Show = ({ sala, salasFavoritas, user, favorito }) => {

    console.log(user)
    console.log(favorito)

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

    const [favoritos, setFavoritos] = useState({});
    useEffect(() => {
        const favoritosIniciales = {};
        if (salasFavoritas) {
            salasFavoritas.forEach(sala => {
                favoritosIniciales[sala.id] = true;
            });
            setFavoritos(favoritosIniciales);
        }
    }, [salasFavoritas]);

    const handleFavoritoChange = (event, salaId) => {
        console.log("sala Id" + salaId);
        const esFavoritoActual = favorito.length > 0;

        const esFavoritoNuevo = !esFavoritoActual;

        const id = user.id;
        const ruta = esFavoritoNuevo ? `/addfavoritos/${id}/${salaId}` : `/delfavoritos/${id}/${salaId}`;

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
        <div className="container mt-4 pt-4" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)' }}>
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
                                            <button onClick={(e) => handleFavoritoChange(e, sala.id, favorito)}>
                                                {favorito.length > 0 ? <FavoritoSvg /> : <NoFavoritoSvg />}
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
    );
};

export default Show;