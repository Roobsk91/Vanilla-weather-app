function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
   hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon","Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
console.log(response.data);
forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
forecastHTML = forecastHTML +
`<div class="col-2">
     <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt=""
        width="50" />
    <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}º</span>
        <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}º</span>
    </div>
</div>`;
    }
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "343956b42t678f23abfoa30906bf4370";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response) {
celsiusTemperature = response.data.temperature.current;
    let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.city;
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.condition.description;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.temperature.humidity;
let windElement = document.querySelector("#wind");
windElement.innerHTML = Math.round(response.data.wind.speed);
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(response.data.time * 1000);
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
iconElement.setAttribute("alt", response.data.condition.description);

getForecast(response.data.coordinates);
}

function search(city) {
let apiKey = "343956b42t678f23abfoa30906bf4370";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    }

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("London");