const apiKey = "a84b2efa8dcc04d67c371d36a6f0519f"; // Replace with your actual API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
  const latitude = latitudeInput.value;
  const longitude = longitudeInput.value;

  if (latitude && longitude && isValidCoordinates(latitude, longitude)) {
    fetchWeather(latitude, longitude);
  } else {
    alert("Please enter valid latitude and longitude values.");
  }
});

function fetchWeather(latitude, longitude) {
  const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Ensure data is in the expected format
      if (data.main && data.weather && data.weather.length > 0) {
        locationElement.textContent = data.name || "Unknown Location";
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent =
          data.weather[0].description || "No description available";
      } else {
        throw new Error("Incomplete data received from API");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again later.");
    });
}

// Helper function to validate latitude and longitude values
function isValidCoordinates(lat, lon) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  return (
    !isNaN(latitude) &&
    !isNaN(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}
