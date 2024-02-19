const apiKey = "e1456a16d05e4dc4db883fecccad891a";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const video = document.querySelector(".invalid video");

let d = new Date();
let time = d.getHours();
async function checkWeather(cityName) {
  const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".invalid").style.display = "block";
    document.querySelector(".fetched-detail").style.display = "none";
    video.autoplay = true;
    video.load();
  } else {
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".unit").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind-speed").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".weather").innerHTML = data.weather[0].main;

    if (time >= 6 && time < 18) {
      if (data.weather[0].main == "Clouds" || data.weather[0].main == "Haze") {
        weatherIcon.src = "./cloudy.svg";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "./clear.svg";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "./rainy.svg";
      } else if (data.weather[0].main == "Thunder") {
        weatherIcon.src = "./thunder.svg";
      }
    } else if (time >= 18 || time < 6) {
      if (data.weather[0].main == "Clouds" || data.weather[0].main == "Haze") {
        weatherIcon.src = "./nightcloudysvg.svg";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "./nightclear.svg";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "./nightrain.svg";
      } else if (data.weather[0].main == "Thunder") {
        weatherIcon.src = "./thunder.svg";
      }
    }

    document.querySelector(".fetched-detail").style.display = "block";
    document.querySelector(".invalid").style.display = "none";
    video.autoplay = false;
    video.load();
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
