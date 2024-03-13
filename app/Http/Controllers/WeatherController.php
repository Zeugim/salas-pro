<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class WeatherController extends Controller
{
    public function getWeather($provinciaId, $municipioId)
    {
        //Creo un cliente para hacer la solicitud al api
        $client = new Client();
        try {
            //REalizo la solicitud y recojo el resultado
            $response = $client->request('GET', "https://www.el-tiempo.net/api/json/v2/provincias/$provinciaId/municipios/$municipioId");
            //Si todo ha ido bien le devuelvo al front el contenido json del api
            return response()->json(json_decode($response->getBody()->getContents()));
        } catch (\Exception $e) {
            //Si error, también digo algo
            return response()->json(['error' => 'Error fetching weather data'], 500);
        }
    }
}