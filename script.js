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
const apiKey = "";
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

//Calendar Section //
const currentDate = document.querySelector(".currentDate");
const days = document.querySelector('.days');
let icons = document.querySelectorAll('.icons span');

let date = new Date();
currentYear = date.getFullYear();
currentMonth = date.getMonth();
monthName = date.toLocaleString('default', { month: 'long' });

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let liTag = '';

    const today = new Date(); // Get today's date

    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        // Check if the date being rendered matches today's date
        if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && i === today.getDate()) {
            liTag += `<li class="highlighted">${i}</li>`;
        } else {
            liTag += `<li>${i}</li>`;
        }
    }

    // Calculate the first day of the next month
    let firstDayOfNextMonth = (firstDayOfMonth + lastDateOfMonth) % 7;

    for (let i = 0; i < 6 - firstDayOfNextMonth; i++) {
        liTag += `<li class="inactive">${i + 1}</li>`;
    }

    currentDate.innerHTML = `${months[currentMonth]} ${currentYear}`;
    days.innerHTML = liTag;
}

renderCalendar();

icons.forEach(icon => {
    icon.addEventListener("click", () => {
        currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;
        renderCalendar();
    })
})

//This is crying for some exeption handling