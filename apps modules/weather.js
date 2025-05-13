export function initWeather(){
const weatherApiKey = "521604f5ae32cef2c54c2aff1569e3f8" ; 

//Search-bar
let searchInput = document.querySelector("section.weather .container form input[type='text']"); 
let weathSearchClick = document.querySelector("section.weather .container form i.search-click")


//Main Containers
let weathContainer = document.querySelector("section.weather .container") ; 
let weathMainInfo = document.querySelector("section.weather .container .info");  
let notFoundDiv = document.querySelector("section.weather .container .not-found"); 


// //I need to fetch these datas with the returned response
let cityName = document.querySelector("section.weather .container  .location-info .location .city-name"); 
let weatherToday = document.querySelector("section.weather .container  .location-info .date-info .today"); 


let weatherStateImg = document.querySelector("section.weather .container .main-weath-info img");
let weatherState = document.querySelector("section.weather .container .main-weath-info .temp-info .weath-state");

let temperature = document.querySelector("section.weather .container .main-weath-info .temp-info .temp-num")
let humidityValue = document.querySelector("section.weather .container .sub-weath-info .humidity-info .hum-value");
let windValue = document.querySelector("section.weather .container .sub-weath-info .wind-info .wind-value");



let city = '';

function setWeatherIcon(id, img){

    const imgIcon = {
        '2' : "./images/weather-sec/weather/thunderstorm.svg",
        '3' :  "./images/weather-sec/weather/drizzle.svg", 
        '5': './images/weather-sec/weather/rain.svg',        
        '6': './images/weather-sec/weather/snow.svg',        
        '7': './images/weather-sec/weather/atm.svg',         
        '800': './images/weather-sec/weather/clear.svg',      
        '8': './images/weather-sec/weather/clouds.svg'  
    }

    const firstDigit = Math.floor(id / 100) ; 
    img.setAttribute("src", imgIcon[id] || imgIcon[firstDigit] ||'./images/weather-sec/weather/clear.svg' );

}
function displayInfo(display){
    if (display){
        weathMainInfo.classList.remove("not-opened") ; 
        notFoundDiv.classList.add("not-opened") ; 
    }
    else {
        notFoundDiv.classList.remove("not-opened") ; 
        weathMainInfo.classList.add("not-opened") ; 
    }
}
function changeToNotFoundImg(){
    let notFoundImg =  document.querySelector("section.weather .container .not-found img");
    notFoundImg.setAttribute("src", "images/weather-sec/message/not-found.png");
}

function matchData(weather){
    displayInfo(true) ; 

    cityName.textContent = weather.name + ", " + weather.sys.country; 
    weatherToday.textContent = new Date().toLocaleDateString("en", {
        weekday: "short",
        day: "numeric",
        month: "short"
    });
    humidityValue.textContent = `${weather.main.humidity}%`; 
    windValue.textContent = `${weather.wind.speed}M/s`; 
    temperature.textContent = `${parseInt(weather.main.temp)}°C`
    weatherState.textContent = weather.weather[0].main; 
    setWeatherIcon(weather.weather[0].id, weatherStateImg) ; 
}
function handleForcastData(forcastData){
    let forcastDays = forcastData.list.filter(item => item.dt_txt.includes("00:00:00")); 

    let days = document.querySelectorAll("section.weather .container .info .days-info .day") ; 

    days.forEach((day, index) => {
        if(index < forcastDays.length){
        day.firstElementChild.textContent = new Date(forcastDays[index].dt_txt).toLocaleDateString("en", {
            month: "short", 
            day : "numeric"
        }) ;
        setWeatherIcon(forcastDays[index].weather[0].id, day.children[1]) ; 
        day.lastElementChild.textContent = `${parseInt(forcastDays[index].main.temp)}°C`;
    }
    });


}


async function HandleWeather(){
    try{
    let [weathResponse, forCastResponse]  = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`), 
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=metric`) ]); 

    if(!weathResponse.ok  || !forCastResponse.ok )
    {
        throw new Error("Error Has Happened") ; 
    }
    let [weatherData, forCastData] = await Promise.all([weathResponse.json(), forCastResponse.json()]); 

    handleForcastData(forCastData) ; 
    matchData(weatherData) ;  
    changeToNotFoundImg()  ;

}catch(error){
        console.log(error) ; 
         changeToNotFoundImg()  ;

  displayInfo(false) ;
}
}

function initWeatherApp(){

weathSearchClick.addEventListener("click", ()=>{
    if (searchInput.value.trim() !== ""){
        city = searchInput.value.trim() ; 

        HandleWeather() ; 
    }
})
searchInput.addEventListener("keydown", (e)=>{
    if (e.key === "Enter"){
        e.preventDefault() ; 
        weathSearchClick.click() ; 
    }
})
}

initWeatherApp() ; 

}