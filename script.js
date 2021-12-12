let now = new Date();

let p = document.querySelector("p");
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
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
p.innerHTML = `Last updated ${day}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="forecast-day">
                <strong>${formatDay(forecastDay.dt)}</strong> </div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="60">
            <span class="forecast-temp-max">
                <strong>${Math.round(
                  forecastDay.temp.max
                )}°</strong></span><span class="forecast-temp-min">/ ${Math.round(
          forecastDay.temp.min
        )}°</span>
                
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-name-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
}
let apiKey = "3e4837b1fe633f474ee7c985588f6e07";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Las Vegas&appid=3e4837b1fe633f474ee7c985588f6e07&units=imperial";

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function cityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("h2");
  let cityName = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feels");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  tempElement.innerHTML = `${temperature}`;
  cityName.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3e4837b1fe633f474ee7c985588f6e07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(cityTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-name-input");
  let apiKey = "3e4837b1fe633f474ee7c985588f6e07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(cityTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitLink.classList.add("active");
}

axios.get(apiUrl).then(cityTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let btn = document.querySelector("#current-btn");
btn.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let fahrenheitTemperature = null;
