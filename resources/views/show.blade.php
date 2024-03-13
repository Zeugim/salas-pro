@if ($weatherData)
    <h2>Información meteorológica</h2>
    <p>Temperatura: {{ $weatherData['temperatura_actual'] }}</p>
    <p>Estado del cielo: {{ $weatherData['estado_cielo'] }}</p>
    <!-- Agrega más campos según los datos que recibas de la API -->
@else
    <p>No se pudo obtener la información meteorológica en este momento.</p>
@endif
