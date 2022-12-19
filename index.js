const apiKey = "YOUR_API_KEY";
const options = {
  method: "GET",
};

//getting weather according to city
const getWeather = async (city) => {
  let response = await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}&offset=1`,
    options
  );
  let data = await response.json();
  let key = data[0].Key;

  let response2 = await fetch(
    `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${apiKey}&details=true`,
    options
  );

  let data2 = await response2.json();

  let weather = data2.DailyForecasts[0];
  let sunrise = weather.Sun.Rise;
  let sunset = weather.Sun.Set;
  let tempMin = weather.Temperature.Minimum.Value;
  let tempMax = weather.Temperature.Maximum.Value;
  let windSpeed = weather.Day.Wind.Speed.Value;
  let windDirection = weather.Day.Wind.Direction.Degrees;
  let cloudCover = weather.Day.CloudCover;
  let rainProb = weather.Day.RainProbablity;
  let rain = weather.Day.Rain.Value;
  let airQuality = weather.AirAndPollen[0].Category;
  console.log(airQuality);

  if (rainProb === undefined) {
    rainProb = 0;
  }
  document.getElementById("minTemp").innerHTML =
    Math.round((tempMin - 32) * (5 / 9)) + " °C";
  document.getElementById("maxTemp").innerHTML =
    Math.round((tempMax - 32) * (5 / 9)) + " °C";
  document.getElementById("sunRise").innerHTML = sunrise
    .split("T")[1]
    .split("+")[0];
  document.getElementById("sunSet").innerHTML = sunset
    .split("T")[1]
    .split("+")[0];
  document.getElementById("windSpeed").innerHTML = windSpeed + " mi/hr";
  document.getElementById("windDir").innerHTML = windDirection + " °";
  document.getElementById("cloudCover").innerHTML = cloudCover + " %";
  document.getElementById("rainProb").innerHTML = rainProb + " %";
  document.getElementById("rain").innerHTML = rain + " in";
  document.getElementById("airQuality").innerHTML = airQuality;
//   console.log(data2);
};

//translating navabr
let ham = document.getElementById("ham");
ham.addEventListener("click", () => {
  document.getElementById("nav-items").classList.toggle("translate-y-44");
});

//getting value from input
let city = "";
let cityInput = document.getElementById("city");
cityInput.addEventListener("change", (e) => {
  city = e.target.value;
});

//on click search
let searchBt = document.getElementById("searchBt");
searchBt.addEventListener("click", () => {
  getWeather(city);
});

getWeather("Mumbai");
