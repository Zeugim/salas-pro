import axios from 'axios';

const API_URL = 'https://www.el-tiempo.net/api/json/v2';

const WeatherService = {
    getWeatherByMunicipality: async (codprov, codigoine) => {
        try {
            const response = await axios.get(`${API_URL}/provincias/${codprov}/municipios/${codigoine}`);
            const weatherData = response.data;
            const temperatura = weatherData.temperatura_actual;
            const estadoCielo = weatherData.estado_cielo;
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default WeatherService;