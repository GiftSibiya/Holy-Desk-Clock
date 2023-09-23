/*<<<<<<<<<< Desk CLock >>>>>>>>> */

let hrs = document.getElementById('hrs');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let day = document.getElementById('day');
let dayNum = document.getElementById('dayNum')
let month = document.getElementById('month');
let year = document.getElementById('year');

setInterval(() => { time()}, 1000)

function time(){
    let currentTime = new Date();
    hrs.innerHTML = (currentTime.getHours() < 10? "0" : "") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes() < 10? "0" : "") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds() <10? "0" : "") + currentTime.getSeconds();
    dayNum.innerHTML = currentTime.getDate();
    
    let monthName = currentTime.toLocaleString('default', {month: 'long'});
    let dayName = currentTime.toLocaleString('default', {weekday: 'long'});
    
    day.innerHTML = dayName;
    month.innerHTML = monthName;
    year.innerHTML = currentTime.getFullYear();
}

/*<<<<<<<<< Weather App >>>>>>>>>> */ 

/* Variables */
const apiKey = "7a3f5c184fc035469d89699c6faa90a8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const icon = document.querySelector('.icon');
const weatherCon = document.querySelector('.iconAlt');
const extra = document.querySelector('.extra');
const cityName = document.getElementById('name');
const temp = document.getElementById('temp');
const HumidReading = document.getElementById('humidityReading');
const windReading = document.getElementById('windReading');

/* */

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    //Check Api //
    console.log(data);
    
    cityName.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp)+"°C";
    HumidReading.innerHTML = data.main.humidity + "%";
    windReading.innerHTML = Math.round(data.wind.speed) + "km/h";
    weatherCon.innerHTML = data.weather[0].description;

    if(data.weather[0].main == 'Clouds'){
        icon.innerHTML = '<i class="bx bx-cloud">';
    }else if(data.weather[0].main == 'Clear'){
        icon.innerHTML = '<i class="bx bx-sun">';
    }else if(data.weather[0].main == 'Snow'){
        icon.innerHTML = '<i class="bx bx-cloud-snow">';
    }else if(data.weather[0].main == 'Drizzlle'){
        icon.innerHTML = '<i class="bx bx-cloud-drizzle">';
    }else if(data.weather[0].main == 'Mist'){
        icon.innerHTML = '<i class="bx bx-sun">';
    }else if(data.weather[0].main == 'Rain'){
        icon.innerHTML = '<i class="bx bx-droplet">';
    }
    weatherCon.style = "display: inline-block"
    extra.style = "display: flex"

    if(data.message !== null){
        console.log("THere it is, undefining itself")
    };
}

searchBtn.addEventListener ("click", ()=>{
    try{
        checkWeather(searchBox.value);
    }catch(error){
        console.error("Input error has occured, please check the input my guy", error);
    }
}) 

// In the event of a misspelled city name it will throw undefined on the city name. 
//This is crying for some exeption handling