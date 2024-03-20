<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class WeatherController extends Controller
{
    public function getWeather($provinciaCode, $municipioCode)
    {
        $client = new Client();
        try {
            $response = $client->request('GET', "https://www.el-tiempo.net/api/json/v2/provincias/$provinciaCode/municipios/$municipioCode");
            return response()->json(json_decode($response->getBody()->getContents()));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching weather data'], 500);
        }
    }
}