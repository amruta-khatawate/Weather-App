let cityInput = document.getElementById('city-input'),
searchBtn = document.getElementById('searchBtn'),
locationBtn = document.getElementById('locationBtn'),
api_key = 'e520c3bc89f9ac64050f2437a75fb22f',
currentWeatherCard = document.querySelectorAll('.weather-left .cards')[0],
fiveDaysForecastCard = document.querySelector('.day-forecast'),
aqiCard = document.querySelectorAll('.highlights .cards')[0],
sunriseCard = document.querySelectorAll('.highlights .cards')[1],
humidityVal = document.getElementById('humidityVal'),
pressureVal = document.getElementById('pressureVal'),
visibilityVal = document.getElementById('visibilityVal'),
windspeedVal = document.getElementById('windspeedVal'),
feelslikeVal = document.getElementById('feelslikeVal'),
hourlyForecastCard = document.querySelector('.bottom-cards'),
aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

function getWeatherDetails(name, lat, lon, country, state){
      let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
      WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
      AIR_POLLUTION_API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,

      days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
      ],
      months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
      ];

      fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data => {
            let {co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
            aqiCard.innerHTML = `
                  <div class="card-header">
                        <p>Air Quality Index</p>
                        <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi - 1]}</p>
                  </div>
                  <div class="air-indices">
                        <i class="fa-solid fa-wind"></i>
                        <div class="items">
                            <p>PM2.5</p>
                            <h2>${pm2_5}</h2>
                        </div>
                        <div class="items">
                            <p>PM10</p>
                            <h2>${pm10}</h2>
                        </div>
                        <div class="items">
                            <p>SO2</p>
                            <h2>${so2}</h2>
                        </div>
                        <div class="items">
                            <p>CO</p>
                            <h2>${co}</h2>
                        </div>
                        <div class="items">
                            <p>NO</p>
                            <h2>${no}</h2>
                        </div>
                        <div class="items">
                            <p>NO2</p>
                            <h2>${no2}</h2>
                        </div>
                        <div class="items">
                            <p>NH3</p>
                            <h2>${nh3}</h2>
                        </div>
                        <div class="items">
                            <p>O3</p>
                            <h2>${o3}</h2>
                        </div>
                  </div>
            `;
      }).catch(() => {
            alert("Failed to fetch Air Wuality index");
      })

      fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
            let date = new Date();
            currentWeatherCard.innerHTML = `
                  <div class="current-weather">
                    <div class="weather-details">
                        <p>Now</p>
                        <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                        <p>${data.weather[0].description}</p>
                    </div>
                    <div class="weather-icon">
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="70px" height="70px" alt="img">
                    </div>
                </div>
                <hr>
                <div class="weather-footer">
                    <p><i class="fa-light fa-calendar-days"></i> ${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]}, ${date.getFullYear()}</p>
                    <p><i class="fa-light fa-location-dot"></i> ${name}, ${country}</p>
                </div>
            `;
            
            let {sunrise, sunset} = data.sys,
            {timezone, visibility} = data,
            {humidity, pressure, feels_like} = data.main,
            {speed} = data.wind,
            sRiseTime = moment.utc(sunrise, 'x').add(timezone, 'seconds').format('hh:mm A'),
            sSetTime = moment.utc(sunset, 'x').add(timezone, 'seconds').format('hh:mm A');
            sunriseCard.innerHTML = `
                  <div class="card-header">
                        <p>Sunrise & Sunset</p>
                  </div>
                  <div class="sunrise-sunset">
                        <div class="item">
                            <div class="icon">
                                <img src="images/sunrise.jpeg" alt="" height="70" width="70" style="mix-blend-mode: difference;">
                            </div>
                            <div class="sunrise">
                                <p>Sunrise</p>
                                <h2>${sRiseTime}</h2>
                            </div>
                        </div>
                        <div class="item">
                            <div class="icon">
                                <img src="images/sunset.jpeg" alt="" height="70" width="70" style="object-fit: cover;">
                            </div>
                            <div class="sunset">
                                <p>Sunset</p>
                                <h2>${sSetTime}</h2>
                            </div>
                        </div>
                  </div>
            `;
            
            humidityVal.innerHTML = `${humidity}%`;
            pressureVal.innerHTML = `${pressure}hPa`;
            visibilityVal.innerHTML = `${visibility / 1000}km`;
            windspeedVal.innerHTML = `${speed}m/s`;
            feelslikeVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;
      }).catch(() => {
            alert('Failed to fetch current weather');
      });

      fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
            let hourlyForecast = data.list;
            hourlyForecastCard.innerHTML = '';
            for (i = 0; i <= 7; i++) {
                  let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
                  let hr = hrForecastDate.getHours();
                  let a = 'PM';
                  if(hr < 12) a = 'AM';
                  if(hr == 0) hr = 12;
                  if(hr > 12) hr = hr - 12;
                  hourlyForecastCard.innerHTML += `
                  <div class="cards">
                        <div class="items">
                              <p>${hr} ${a}</p>
                              <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" alt="">
                              <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
                        </div>
                  </div>
                  `;
            }
            let uniqueForecastDays = [];
            let fiveDaysForecast = data.list.filter(forecast => {
                  let forecastDate = new Date(forecast.dt_txt).getDate();
                  if(!uniqueForecastDays.includes(forecastDate)){
                        return uniqueForecastDays.push(forecastDate);
                  }
            });
            fiveDaysForecastCard.innerHTML = '';
            for(i = 1; i < fiveDaysForecast.length; i++){
                  let date = new Date(fiveDaysForecast[i].dt_txt);
                  fiveDaysForecastCard.innerHTML += `
                        <div class="forecast-item">
                              <div class="icon-weather">
                                    <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" width="40px" height="40px" alt="">
                                    <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                              </div>
                              <p>${date.getDate()} ${months[date.getMonth()]}</p>
                              <p>${days[date.getDay()]}</p>
                        </div>
                  `;
            }
      }).catch(() => {
            alert('Failed to fetch weather forecast');
      });
}


function getCityCoordinates(){
      let cityName = cityInput.value.trim();
      cityInput.value = '';
      if(!cityName) return;
      let GEOCODING_API_URL =`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
      fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
            let {name, lat, lon, country, state} = data[0];
            getWeatherDetails(name, lat, lon, country, state);
      }).catch(() => {
            alert('Failed to fetch coordinates of ${cityName}');
      });
}

function getUserCoordinates(){
      navigator.geolocation.getCurrentPosition(position => {
            let{latitude, longitude} = position.coords;
            let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

            fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
            //      console.log(data);
            let {name, country, state} = data[0];
            getWeatherDetails(name, latitude, longitude, country, state);
            }).catch(() => {
                  alert('Failed to fetch user coordinates');
            });
      }, error => {
            if(error.code === error.PERMISSION_DENIED){
                  alert('Geolocation permission denied. Please reset location permission to grant acess again');
            }
      });
}
searchBtn.addEventListener('click', getCityCoordinates);
locationBtn.addEventListener('click', getUserCoordinates);
cityInput.addEventListener('keyup', e => e.key === 'Enter' && getCityCoordinates());
