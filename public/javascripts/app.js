console.log('all ok');

const form = document.querySelector('#searchForm');
const address = document.querySelector('#textInput');

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const weatherInfo = document.querySelector('.weather-info');
    weatherInfo.innerHTML='';
    fetch(`http://localhost:3002/weather?address=${address.value}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            weatherInfo.classList.add('red')
            weatherInfo.innerHTML = `${data.error}`
            
        } else{
            weatherInfo.classList.remove('red');
            weatherInfo.innerHTML = `${data.forecast} ${data.location}`
        }
    })
})
})