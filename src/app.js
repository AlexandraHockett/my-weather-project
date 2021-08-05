let now = new Date();
let p = document.querySelector("#updatesText");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  minutes = "0" + hours;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
p.innerHTML = `Updated on ${day}/${month} ${date}, ${hours}:${minutes}`;

let apiKey = "06fbd7d55cead2045835eef5076a763f";

function currentTemperature(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("h2");
  temperature.innerHTML = currentTemperature;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feels = document.querySelector("#feelsLike");
  feels.innerHTML = `${feelsLike} º`;

  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#picsDescription");
  description.innerHTML = weatherDescription;

  let currentMax = Math.round(response.data.main.temp_max);
  let todaysMax = document.querySelector("#currentMax");
  todaysMax.innerHTML = currentMax;

  let currentMin = Math.round(response.data.main.temp_min);
  let todaysMin = document.querySelector("#currentMin");
  todaysMin.innerHTML = currentMin;

  let humidity = document.querySelector("#currentHumidity");
  humidity.innerHTML = response.data.main.humidity;

  function showCelsius(event) {
    event.preventDefault();
    let celsius = document.querySelector("h2");
    celsius.innerHTML = currentTemperature;
  }
  let celsiusTemp = document.querySelector("#celsius");
  celsiusTemp.addEventListener("click", showCelsius);

  function showFahrenheit(event) {
    event.preventDefault();
    let fahrenheit = document.querySelector("h2");
    fahrenheit.innerHTML = Math.round((currentTemperature * 9) / 5 + 32);
  }

  let fahrenheitTemp = document.querySelector("#fahrenheit");
  fahrenheitTemp.addEventListener("click", showFahrenheit);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enterCity");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(currentTemperature);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchCity);

function showLocation(event) {
  event.preventDefault();

  function currentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(currentTemperature);
  }
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", showLocation);
