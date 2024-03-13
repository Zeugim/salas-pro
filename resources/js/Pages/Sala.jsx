import React, { useState, useEffect } from 'react';

const Show = ({ sala }) => {
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
        <div className="container">
            <h1>{sala.sala}</h1>
            <div className="salaPage">
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
                            <td><input type='radio' value='1' /> </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <div>
                                    {weatherData ? (
                                        <div>
                                            <h2>Información meteorológica</h2>
                                            <p>Temperatura: {weatherData.temperatura_actual}</p>
                                            <p>Estado del cielo: {weatherData.estado_cielo}</p>
                                            <p>Humedad: {weatherData.humedad}</p>
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
    );
};

export default Show;