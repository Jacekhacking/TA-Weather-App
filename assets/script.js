let WeatherApiKey = "38920dc3d2d7b05ac11436473723d742";
let cityInput = document.getElementById("city-input");
let submitButton = document.getElementById("submit-button");
let historyEl = document.getElementById("history");
let weatherDescription = document.getElementById("weather");
let cityHtml = document.getElementById("city");
let currentTemp = document.getElementById("current-temp");
let currentForecast = document.getElementById("current-forecast");
let currentWeatherIcon = document.getElementById("forecast-image");
let currentWind = document.getElementById("current-wind");
let currentHumidity = document.getElementById("current-humidity");
let userCityInput;
let lookupHistory = [];
let dateString;

const getWeather = async () => {
  userCityInput = cityInput.value;

  //   single day forecast get request
  let todaysForecast = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&appid=${WeatherApiKey}&units=imperial`
  )
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson ? await response.json() : null;

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      return data;
    })
    .catch((error) => {
      cityHtml.textContent = `Error: ${error} TRY AGAIN!`;
      console.error("there was an error!");
    });
  //    week long forecast request
  let weeklyForecast = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${userCityInput}&appid=${WeatherApiKey}&units=imperial`
  )
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson ? await response.json() : null;

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      return data;
    })
    .catch((error) => {
      Element.parentElement.innerHTML = `Error: ${error}`;
      console.error("there was an error!");
    });

  // Setting main weather text content
  currentWeatherIcon.src = `http://openweathermap.org/img/w/${todaysForecast.weather[0].icon}.png`;
  currentForecast.textContent = `Forecast: ${todaysForecast.weather[0].description}`;
  currentTemp.textContent = `Temp: ${todaysForecast.main.temp}°F`;
  cityHtml.textContent = userCityInput.toUpperCase();
  currentWind.textContent = `Wind: ${todaysForecast.wind.speed} MPH`;
  currentHumidity.textContent = `Humidity: ${todaysForecast.main.humidity}%`;

  //session storage
  sessionStorage.setItem(cityHtml.textContent, cityHtml.textContent);

  lookupHistory.push(cityHtml.textContent);

  // console.log(lookupHistory);

  historyEl.children[0].textContent = sessionStorage.getItem(
    lookupHistory[lookupHistory.length - 1]
  );
  historyEl.children[1].textContent = sessionStorage.getItem(
    lookupHistory[lookupHistory.length - 2]
  );
  historyEl.children[2].textContent = sessionStorage.getItem(
    lookupHistory[lookupHistory.length - 3]
  );

  // For loop to create and add the weekly forecast html elements
  for (let i = 0; i < 25; i++) {
    let para = document.createElement("p");
    let para1 = document.createElement("p");
    let para2 = document.createElement("p");
    let para3 = document.createElement("p");
    let para4 = document.createElement("p");

    document.getElementById(`weekly-${i}`).appendChild(para);
    document.getElementById(`weekly-${i}`).appendChild(para1);
    document.getElementById(`weekly-${i}`).appendChild(para2);
    document.getElementById(`weekly-${i}`).appendChild(para3);
    document.getElementById(`weekly-${i}`).appendChild(para4);

    dateString = weeklyForecast.list[i].dt_txt;
    document.getElementById(`weekly-${i}`).children[0].textContent = dateString;

    document.getElementById(
      `weekly-${i}`
    ).children[1].textContent = `Temp: ${weeklyForecast.list[i].main.temp}°F`;

    document.getElementById(
      `weekly-${i}`
    ).children[2].textContent = ` Forecast: ${weeklyForecast.list[i].weather[0].main}`;

    document.getElementById(
      `weekly-${i}`
    ).children[3].textContent = ` Wind: ${weeklyForecast.list[i].wind.speed} MPH`;

    document.getElementById(
      `weekly-${i}`
    ).children[4].textContent = `Humidity: ${weeklyForecast.list[i].main.humidity}%`;
  }

  console.log(sessionStorage.getItem(lookupHistory[0]));
};

// Event Listeners
submitButton.addEventListener("click", (e) => {
  e.preventDefault;
  getWeather();
  cityInput.value = "";
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault;
    getWeather();
    cityInput.value = "";
    return;
  }
});
