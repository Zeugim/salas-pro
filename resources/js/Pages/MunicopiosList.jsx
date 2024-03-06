import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MunicipiosList = ({ provincia }) => {
    const [municipios, setMunicipios] = useState([]);

    useEffect(() => {
        const fetchMunicipios = async () => {
            try {
                const response = await axios.get(`https://www.el-tiempo.net/api/json/v2/provincias/${provincia}/municipios`);
                setMunicipios(response.data);
            } catch (error) {
                console.error('Error fetching municipios data:', error);
            }
        };

        fetchMunicipios();

        return () => { };
    }, [provincia]);

    return (
        <div>
            <h2>Lista de Municipios</h2>
            <ul>
                {municipios.map((municipio) => (
                    <li key={municipio.CODIGOINE}>{municipio.NOMBRE}</li>
                ))}
            </ul>
        </div>
    );
};

export default MunicipiosList;
