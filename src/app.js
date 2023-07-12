function displayTemperature(response) {
console.log(response.data);
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(response.data.temperature.current);
let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.city;
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.condition.description;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.temperature.humidity;
let windElement = document.querySelector("#wind");
windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "343956b42t678f23abfoa30906bf4370";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=343956b42t678f23abfoa30906bf4370&units=metric`;

axios.get(apiUrl).then(displayTemperature);

