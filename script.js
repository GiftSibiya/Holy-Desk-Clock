let hrs = document.getElementById('hrs');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let day = document.getElementById('day');
let month = document.getElementById('month');
let year = document.getElementById('year');

setInterval(() => { time()}, 1000)

function time(){
    let currentTime = new Date();
    hrs.innerHTML = (currentTime.getHours() < 10? "0" : "") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes() < 10? "0" : "") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds() <10? "0" : "") + currentTime.getSeconds();
    
    
    let monthName = currentTime.toLocaleString('default', {month: 'long'});
    let dayName = currentTime.toLocaleString('default', {weekday: 'long'});
    
    day.innerHTML = dayName;
    month.innerHTML = monthName;
    year.innerHTML = currentTime.getFullYear();
}