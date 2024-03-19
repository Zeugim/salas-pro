import React, { useState, useEffect } from 'react';

const Show = ({ sala, salasFavoritas, user }) => {

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
        event.stopPropagation();
        console.log("sala Id" + salaId);
        const esFavoritoActual = favoritos[salaId];

        const esFavoritoNuevo = !esFavoritoActual;
        const nuevosFavoritos = { ...favoritos, [salaId]: esFavoritoNuevo };
        setFavoritos(nuevosFavoritos);

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

    useEffect(() => {
        const fetchData = async () => {
            const data = fetch('/api/weather/01/01001')
                .then(response => response.json())
                .then(data => setWeatherData(data))
                .catch(error => console.error('Error fetching weather data:', error));
        }

        fetchData();
    }, []);

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
                                <tr>
                                    <td><strong>Favorito</strong></td>
                                    <td>
                                        <button onClick={(e) => handleFavoritoChange(e, sala.id)}>
                                            {favoritos[sala.id] ? <FavoritoSvg /> : <NoFavoritoSvg />}
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <div>
                                            {weatherData ? (
                                                <div>
                                                    <h2>Información meteorológica</h2>
                                                    <p>Fecha: {weatherData.fecha}</p>
                                                    <p>Temperatura: {weatherData.temperatura_actual} º</p>
                                                    <p>Viento: {weatherData.viento} km/h</p>
                                                    <p>Precipitación: {weatherData.precipitacion}</p>
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