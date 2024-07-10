let cityInput = document.getElementById('city-input'),
searchBtn = document.getElementById('searchBtn'),
api_key = 'e520c3bc89f9ac64050f2437a75fb22f';

function getCityCoordinates(){
      let cityName = cityInput.value.trim();
      console.log(cityName);
}

searchBtn.addEventListener('click', getCityCoordinates);