//Feature 1 week 4
let now = new Date();
let h6 = document.querySelector("#current-day-time");
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
let minutes = now.getMinutes();
h6.innerHTML = `${day} ${hours}:${minutes}`;

//Feature 2 week 4
function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
let searchResult = document.querySelector("#form");
searchResult.addEventListener("submit", enterCity);

//°C -> °F
/*function celsiusToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".nowtemp");
  let celsisusTemp = temperature.innerHTML;
  temperature.innerHTML = Math.round(((celsisusTemp - 32) * 5) / 9);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusToFahrenheit);

//°F->°C
function fahrenheitToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".nowtemp");
  let celsisusTemp = temperature.innerHTML;
  temperature.innerHTML = Math.round((celsisusTemp * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitToCelsius);*/

//adding live weather data for current location
function showWeather(response) {
  console.log(response);
  document.querySelector("h1").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector(".nowtemp").innerHTML = `${temperature}`;
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#feels-like").innerHTML = MathRound(
    response.data.main.feels_like
  );
  document.querySelector("#sunrise").innerHTML = get.getHours(
    response.data.sys.sunrise
  );
  document.querySelector("#sunset").innerHTML = get.Hours(
    response.data.sys.sunset
  );
  document.querySelector("#visibility").innerHTML = response.data.visibility;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

//search for other city
function searchCity(city) {
  let apiKey = "2fc3673059e97de0a74f532b2106b932";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#form-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", submitSearch);

//retrieve location to display weather forecast
function showPosition(position) {
  console.log(position);
  let apiKey = "2fc3673059e97de0a74f532b2106b932";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentPosition(event) {
  event.preventDefault();
  let current = document.querySelector("#button-current-location").value;
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocation = document.querySelector("#button-current-location");
currentLocation.addEventListener("click", getCurrentPosition);

searchCity("Amsterdam");
