

    import React, { useState, useEffect } from 'react';

    function Weather() {
    const [weatherData, setWeatherData] = useState({
        Asturias: null,
        Barcelona: null,
        Madrid: null,
        Valencia: null
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
        const apiKey = '74c5de22dc4d6da5044ff0b16536cef6'; 
        setError(null);

        const cities = ['Asturias', 'Valencia','Castellon', 'Barcelona', 'Madrid'];
        const requests = cities.map(city =>
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},es&appid=${apiKey}&units=metric`)
        );

        try {
            const responses = await Promise.all(requests);
            const data = await Promise.all(responses.map(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la temperatura');
            }
            return response.json();
            }));

            const newWeatherData = cities.reduce((acc, city, index) => {
            if (data[index].main && data[index].main.temp !== undefined) {
                acc[city] = data[index].main.temp;
            } else {
                acc[city] = 'Datos no disponibles';
            }
            return acc;
            }, {});

            setWeatherData(newWeatherData);
        } catch (err) {
            setError(err.message);
        }
        };

        getWeather();
    }, []);

    return (
        <div>
        <h2>Temperaturas en Ciudades de España</h2>
        {Object.keys(weatherData).map(city => (
            <p key={city}>
            {city} : {weatherData[city]}°C
            </p>
        ))}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
    }

    export default Weather;
