let cityInput = document.getElementById('city-input'),
searchBtn = document.getElementById('searchBtn'),
api_key = 'e520c3bc89f9ac64050f2437a75fb22f';

function getWeatherDetails(name, lat, lon, country, state){
      let FORECAST_API_URL = `api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${api_key}`
}


function getCityCoordinates(){
      let cityName = cityInput.value.trim();
      cityInput.value = '';
      if(!cityName) return;
      let GEOCODING_API_URL =`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
      fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
            let {name, lat, lon, country, state} = date[0];
            getWeatherDetails(name, lat, lon, country, state);
      }).catch(() => {
            alert('Failed to fetch coordinates of ${cityName}');
      });
}

searchBtn.addEventListener('click', getCityCoordinates);