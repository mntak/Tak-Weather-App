//Display Day and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
let h3 = document.querySelector("h3");
h3.innerHTML = `${day} ${hour}:${minute}`;

//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function currentCity(city) {
  let apiKey = "0bb228d4ba422107531b795fe6ca39d9";
  let units = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(showWeather);
}

function showWeather(response) {
  console.log(response);
  let currentCity = response.data.name;
  let resultCity = document.querySelector("#city");
  resultCity.innerHTML = currentCity;

  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}`;

  let currentLow = Math.round(response.data.main.temp_min);
  let lowTemp = document.querySelector("#current-low");
  lowTemp.innerHTML = `${currentLow}`;

  let currentHigh = Math.round(response.data.main.temp_max);
  let highTemp = document.querySelector("#current-high");
  highTemp.innerHTML = `${currentHigh}`;

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = `${description}`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let currentFeels = document.querySelector("#feels-like");
  currentFeels.innerHTML = `Feels like ${feelsLike}°`;

  let wind = response.data.wind.speed;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${wind}mph Wind`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}% Humidity`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/04d@2x.png`
  );
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  let units = "imperial";
  cityElement.innerHTML = `${cityInput.value}`;
  let apiKey = "0bb228d4ba422107531b795fe6ca39d9";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function showCurrent(response) {
  let h1 = document.querySelector("h1");
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  h1.innerHTML = response.data.name;
}

function retrievePosition(position) {
  console.log(position);
  let apiKey = "0bb228d4ba422107531b795fe6ca39d9";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function currentData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  let celciusTemperature = (84 - 32) * (5 / 9);
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let currentLocation = document.getElementById("current-location");
currentLocation.addEventListener("click", currentData);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
