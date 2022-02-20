
// Saving my API key.
// URL as well since it might be long.
// APIWEATHER
const API = {
    key: "cfd3d999dfa57517acb4e37d8a66ad00",
    url: "https://api.openweathermap.org/data/2.5/"
}

const SEARCHBOX = document.querySelector('.searching-box');  
SEARCHBOX.addEventListener('keypress', setQuery); // Waiting on user presses enter.

function setQuery(event){ //
    if(event.keyCode == 13) { // Once pressed enter ==> It takes what user typed.
        getResults(SEARCHBOX.value);
        console.log(SEARCHBOX.value); // Test to check is working
    };
}

function getResults (query){
    fetch(`${API.url}weather?q=${query}&units=imperial&appid=${API.key}`)
        .then(weather =>{
            return weather.json();
        }).then(displayResults); //Taking the result from the API
}

//Starting making changes.
function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current-temp .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let mood = document.querySelector('.current-temp .weather');
    mood.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${weather.main.temp_min}°F / ${weather.main.temp_max}°F`
}

//Function to get the date.
function dateBuilder(d){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}