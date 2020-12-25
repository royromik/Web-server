const form = document.querySelector('#searchForm');
const address = document.querySelector('#textInput');
const weatherInfo = document.querySelector('.weather-info');
const locationInfo = document.querySelector('.location-info');

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    locationInfo.classList.remove('red');
    locationInfo.textContent = 'Loading ..'
    weatherInfo.textContent='';
    fetch(`/weather?address=${address.value}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            locationInfo.classList.add('red')
            locationInfo.textContent = `${data.error}`
            
        } else{
            locationInfo.classList.remove('red');
            locationInfo.textContent = `${data.location}`
            weatherInfo.textContent = `${data.forecast}`
        }
    })
})
})