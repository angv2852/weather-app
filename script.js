let now = new Date();

let p = document.querySelector("p");
let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
p.innerHTML = `${day}, ${hours}:${minutes}`;

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

function cityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("h2");
  let cityName = document.querySelector("h1");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feels");
  tempElement.innerHTML = `${temperature}°F ${response.data.weather[0].description}`;
  cityName.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let resultsUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial";
  console.log(position);
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

axios.get(apiUrl).then(cityTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

navigator.geolocation.getCurrentPosition(showPosition);

let btn = document.querySelector("#current-btn");
btn.addEventListener("click", getCurrentPosition);
