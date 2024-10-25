window.onload = function () {
    // Sample data - Replace these with actual data from your API or other sources
    const dailyWeatherData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Example days
        temperatures: [22, 24, 20, 25, 28, 26, 27],  // Example temperatures (in Celsius)
        conditions: ['Clear', 'Cloudy', 'Rain', 'Sunny', 'Sunny', 'Cloudy', 'Clear']
    };

    const historicalData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Example months
        temperatures: [15, 18, 20, 25, 30, 35, 40]  // Example historical data
    };

    const alerts = {
        labels: ['Alert 1', 'Alert 2', 'Alert 3'],
        count: [5, 3, 8]  // Example number of times alerts triggered
    };

    // Daily Weather Summary Chart
    const dailyWeatherCtx = document.getElementById('dailyWeatherChart').getContext('2d');
    const dailyWeatherChart = new Chart(dailyWeatherCtx, {
        type: 'bar',
        data: {
            labels: dailyWeatherData.labels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: dailyWeatherData.temperatures,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Condition',
                    data: dailyWeatherData.conditions.map(cond => cond.charAt(0).toUpperCase() + cond.slice(1)), // Capitalize condition
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });

    // Historical Trends Chart
    const historicalTrendsCtx = document.getElementById('historicalTrendsChart').getContext('2d');
    const historicalTrendsChart = new Chart(historicalTrendsCtx, {
        type: 'line',
        data: {
            labels: historicalData.labels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: historicalData.temperatures,
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    tension: 0.1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });

    // Alerts Chart
    const alertsCtx = document.getElementById('alertsChart').getContext('2d');
    const alertsChart = new Chart(alertsCtx, {
        type: 'pie',
        data: {
            labels: alerts.labels,
            datasets: [
                {
                    label: 'Triggered Alerts',
                    data: alerts.count,
                    backgroundColor: ['#FF5733', '#FFC300', '#28A745'],
                    hoverOffset: 4
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
};
