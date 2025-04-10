document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const weatherDisplay = document.getElementById('weather-display');

    const apiKey = '16e6def9da16d6f7f6735e908a33930d'; // Замените на ваш API ключ

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const city = cityInput.value;
        const weatherData = await fetchWeather(city);
        
        if (weatherData) {
            displayWeather(weatherData);
        } else {
            weatherDisplay.innerHTML = '<p>Город не найден.</p>';
        }
    });

    async function fetchWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
            return null;
        }
    }

    function displayWeather(weather) {
        const temperature = (weather.main.temp - 273.15).toFixed(1); // Конвертация из Кельвинов в Цельсий
        const description = weather.weather[0].description;
        
        weatherDisplay.innerHTML = 
            `<h2>Погода в ${weather.name}</h2>
            <p>Температура: ${temperature} °C</p>
            <p>Описание: ${description}</p>
            <p>Влажность: ${weather.main.humidity}%</p>`;
    }
});
