// Get the user's location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
  
    // API configuration
    let apiKey = 'a77f7d69a21366b2c09796f87db6aa0c'; // Replace with your actual API key
    let units = 'metric';
    let lang = 'en';
  
    // Fetch weather data from API
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&lang=${lang}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        let city = data.name;
        let country = data.sys.country;
        let weatherDescription = data.weather[0].description;
        let temperature = data.main.temp;
        let humidity = data.main.humidity;
        let windSpeed = data.wind.speed;
        let sunriseTimestamp = data.sys.sunrise;
        let sunsetTimestamp = data.sys.sunset;
  
        // Convert timestamp to readable format
        let sunriseDate = new Date(sunriseTimestamp * 1000);
        let sunsetDate = new Date(sunsetTimestamp * 1000);
        let sunriseTime = sunriseDate.toLocaleTimeString();
        let sunsetTime = sunsetDate.toLocaleTimeString();
  
        // Update the web page with weather data
        document.getElementById('location').textContent = `${city}, ${country}`;
        document.getElementById('weather').textContent = weatherDescription;
        document.getElementById('temperature').textContent = `${temperature}°C`;
        document.getElementById('humidity').textContent = humidity;
        document.getElementById('wind-speed').textContent = windSpeed;
        document.getElementById('sunrise').textContent = sunriseTime;
        document.getElementById('sunset').textContent = sunsetTime;
  
        // Set the weather icon based on the weather condition
        let weatherIcon = document.getElementById('weather-icon');
        setWeatherIcon(data.weather[0].main, weatherIcon);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Could not retrieve weather data. Please try again later.');
      });
  }
  
  // Function to set the weather icon based on the condition
  function setWeatherIcon(condition, iconElement) {
    const icons = {
      Clear: 'fas fa-sun', // Sunny weather
      Clouds: 'fas fa-cloud', // Cloudy weather
      Rain: 'fas fa-cloud-showers-heavy', // Rainy weather
      Drizzle: 'fas fa-cloud-rain', // Drizzle
      Thunderstorm: 'fas fa-bolt', // Thunderstorm
      Snow: 'fas fa-snowflake', // Snowy weather
      Mist: 'fas fa-smog', // Misty weather
      Fog: 'fas fa-smog', // Foggy weather
      Haze: 'fas fa-smog', // Hazy weather
    };
  
    // Set the icon class based on the weather condition
    iconElement.className = icons[condition] || 'fas fa-question-circle'; // Default icon if condition not found
  }