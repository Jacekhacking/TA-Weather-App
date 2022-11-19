let WeatherApiKey = "38920dc3d2d7b05ac11436473723d742";
let cityInput = document.getElementById("city-input");
let submitButton = document.getElementById("submit-button");
let cityTemp = document.getElementById("temp");
let weatherDescription = document.getElementById("weather");
let city;
let state;

const getWeather = async () => {
  city = cityInput.value;

  let todaysForecast = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WeatherApiKey}&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => data);

  let weeklyForecast = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WeatherApiKey}&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => data);

  // console.log(todaysForecast);
  // console.log(todaysForecast.main);

  console.log(weeklyForecast.list[0].main.temp);
  console.log(weeklyForecast.list[0]);

  cityTemp.textContent = `${weeklyForecast.list[0].main.temp}°F`;
  // weatherDescription.textContent = weatherData.weather[0].description;
};

// Event Listeners
submitButton.addEventListener("click", (e) => {
  e.preventDefault;
  getWeather();
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault;
    console.log("enter pressed");
    getWeather();
    return;
  }
});
