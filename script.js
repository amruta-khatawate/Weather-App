let cityInput = document.getElementById('city-input'),
searchBtn = document.getElementById('searchBtn'),
api_key = 'e520c3bc89f9ac64050f2437a75fb22f';

function getCityCoordinates(){
      let cityName = cityInput.value.trim();
      cityInput.value = '';
      if(!cityName) return;
      let GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0/direct?q={cityName},{state code},{country code}&limit={limit}&appid=${api_key}';
      fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
            console.log(data);
      }).catch(() => {
            alert('Failed to fetch coordinates of $(cityName)');
      });
}

searchBtn.addEventListener('click', getCityCoordinates);