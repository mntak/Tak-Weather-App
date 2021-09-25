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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let h3 = document.querySelector("h3");
h3.innerHTML = `Last updated ${hour}: ${minute}<br/> ${day}, ${month} ${date}, ${year}`;

//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function displayForecast(response) {
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tues"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 

<div class="col-2">
  <div class="weather-forecast-date">${day}</div>
  <img
    src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
    alt=""
    width="42"
  />
  <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">88°</span>
    <span class="weather-forecast-temperature-min">58°</span>
  </div>
</div>

`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0bb228d4ba422107531b795fe6ca39d9";
  let units = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(displayForecast);
}

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
  currentFeels.innerHTML = `${feelsLike}°`;

  let wind = response.data.wind.speed;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${wind}mph Wind`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}% Humidity`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let temperatureElement = document.querySelector("#temperature");

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

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
