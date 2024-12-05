// API URL для Павлодара с параметрами
const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.2833&longitude=76.9667&hourly=temperature_2m,apparent_temperature,wind_speed_10m&timezone=auto';

// Получение данных о погоде
async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        console.error('Ошибка получения данных:', error);
        document.getElementById('weather').innerHTML = `<p class="error">Не удалось загрузить данные о погоде.</p>`;
    }
}

// Обновление интерфейса
function updateWeather(data) {
    const weatherDiv = document.getElementById('weather');

    // Извлечение данных текущего часа
    const currentHour = new Date().getHours();
    const temperature = data.hourly.temperature_2m[currentHour];
    const apparentTemperature = data.hourly.apparent_temperature[currentHour];
    const windSpeed = data.hourly.wind_speed_10m[currentHour];

    const weatherHTML = `
        <h2>Сейчас в Павлодаре</h2>
        <p>Температура: ${temperature}°C</p>
        <p>Ощущается как: ${apparentTemperature}°C</p>
        <p>Скорость ветра: ${windSpeed} м/с</p>
    `;

    weatherDiv.innerHTML = weatherHTML;
}

// Запуск функции при загрузке страницы
fetchWeather();
