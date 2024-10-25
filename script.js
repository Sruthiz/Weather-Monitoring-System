const apiKey = '9676d96c03a858e3d6af074adfd68056';  // Replace with your OpenWeatherMap API key

//const apiKey = 'your-api-key';  // Replace with your OpenWeatherMap API key

// Variables to store user-defined thresholds
let tempThreshold = null;
let conditionThreshold = null;

// Set thresholds when the user submits them
document.getElementById('set-threshold-btn').addEventListener('click', function() {
    tempThreshold = parseFloat(document.getElementById('temp-threshold').value);
    conditionThreshold = document.getElementById('condition-threshold').value.trim().toLowerCase();

    if (isNaN(tempThreshold) || !conditionThreshold) {
        alert('Please enter valid thresholds.');
        return;
    }
    alert(`Thresholds set: Temperature > ${tempThreshold}°C, Weather Condition = ${conditionThreshold}`);
});

// Function to fetch weather data for the given city
document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-name').value;
    if (city.trim() !== '') {
        getWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Fetch the weather data from the OpenWeatherMap API
async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        console.log('Weather Data:', data);  // Debug: Log the fetched data

        if (data.cod !== "200") {
            alert('City not found!');
            return;
        }

        const dailyData = processDailyData(data);
        displayWeather(dailyData);

        // Check thresholds for alerts
        checkThresholds(dailyData);

       // updateCharts(dailyData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch data. Please try again later.');
    }
}

// Process the data to calculate daily summaries
function processDailyData(data) {
    const dailyData = [];
    let currentDay = null;
    let dailyTemps = [];
    let weatherConditions = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000); // Convert from UNIX timestamp
        const day = date.toISOString().split('T')[0]; // Get the 'YYYY-MM-DD' part

        if (!currentDay || currentDay !== day) {
            if (dailyTemps.length > 0) {
                dailyData.push({
                    date: currentDay,
                    avgTemp: (dailyTemps.reduce((acc, temp) => acc + temp, 0) / dailyTemps.length).toFixed(2),
                    minTemp: Math.min(...dailyTemps).toFixed(2),
                    maxTemp: Math.max(...dailyTemps).toFixed(2),
                    dominantCondition: getDominantCondition(weatherConditions),
                });
            }
            currentDay = day;
            dailyTemps = [];
            weatherConditions = {};
        }

        dailyTemps.push(item.main.temp);

        const condition = item.weather[0].description;
        weatherConditions[condition] = (weatherConditions[condition] || 0) + 1;
    });

    return dailyData;

}

// Determine the dominant weather condition
function getDominantCondition(weatherConditions) {
    let dominantCondition = '';
    let maxCount = 0;

    for (const [condition, count] of Object.entries(weatherConditions)) {
        if (count > maxCount) {
            maxCount = count;
            dominantCondition = condition;
        }
    }
    return dominantCondition;
}

// Function to display the daily weather summary
function displayWeather(dailyData) {
    const forecastContainer = document.getElementById('weather-forecast');
    forecastContainer.innerHTML = ''; // Clear any previous forecasts

    dailyData.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('city-forecast');

        dayElement.innerHTML = `
            <h2>${day.date}</h2>
            <p><strong>Average Temp:</strong> ${day.avgTemp} °C</p>
            <p><strong>Min Temp:</strong> ${day.minTemp} °C</p>
            <p><strong>Max Temp:</strong> ${day.maxTemp} °C</p>
            <p><strong>Dominant Condition:</strong> ${day.dominantCondition}</p>
        `;

        forecastContainer.appendChild(dayElement);
    });
}

// Function to check if the thresholds are breached
function checkThresholds(dailyData) {
    dailyData.forEach(day => {
        const avgTemp = parseFloat(day.avgTemp);
        const dominantCondition = day.dominantCondition.toLowerCase();

        console.log(`Checking thresholds for ${day.date}...`);  // Debug: Log the thresholds being checked

        if (tempThreshold && avgTemp > tempThreshold) {
            console.log(`Alert! Temperature exceeded ${tempThreshold}°C on ${day.date}. Current Avg Temp: ${avgTemp}°C`);
            alert(`Alert! Temperature exceeded ${tempThreshold}°C on ${day.date}.`);
        }

        if (conditionThreshold && dominantCondition.includes(conditionThreshold)) {
            console.log(`Alert! Weather condition matched threshold (${conditionThreshold}) on ${day.date}.`);
            alert(`Alert! Weather condition matched threshold (${conditionThreshold}) on ${day.date}.`);
        }
    });
}
