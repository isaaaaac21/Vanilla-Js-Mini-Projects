//Global functions
function removeClassFromArr(arr, className){
    for(let i = 0 ; i < arr.length ; i++){
        arr[i].classList.remove(className) ; 
    }  
}


//Creating Colorful Stars  when the mouse is moving in the first section {}
let firstSection = document.querySelector(".mouse-effect") ; 
let firstSectionTitle = firstSection.firstElementChild ; 
let shapes = document.querySelectorAll("section.mouse-effect ul li i"); 


let starIcon = "fa-solid fa-star"; 
let starColors = ["#F472B6", "#FFDD57", "#6C757D","#F5F5F5", "#1A1A40", "#FF8C42", "#00C9A7", "#A259FF", "#FF6B6B", "#3E8EDE"]; 

shapes.forEach(shape => {
    shape.addEventListener("click", ()=>{
        removeClassFromArr(shapes, "active") ; 
        starIcon = shape.getAttribute("class") ;
        shape.classList.add("active") ;  
    })
})
function ChangeStarSyle(star, fsSize, randomColor, x, y){
    star.style.fontSize = `${fsSize}px` ; 
    star.style.color = `${starColors[randomColor]}` ; 
    star.style.left = `${x +10}px`;
    star.style.top = `${y+20 }px`;
}
firstSection.addEventListener("mousemove", (e)=>{    
    let star = document.createElement("i") ; 
    star.className = `${starIcon}`;
    star.classList.add("selected")  ;

    let rect = firstSection.getBoundingClientRect();

    // Calculate the mouse position relative to the section
    let X = e.clientX - rect.left;
    let Y = e.clientY - rect.top;

    let randomFs  = Math.floor(Math.random() * 30) +  10; 
    let randomColor = Math.floor(Math.random() * 10) ; 
     
    ChangeStarSyle(star, randomFs, randomColor, X, Y) ; 
    firstSection.appendChild(star) ; 

    setTimeout(() => {
        firstSection.removeChild(star) ; 
    }, 1000);
})

// End Mouse Effect Section

// =============================================================


//STart the Type Effect Section

let secSectionTitle = document.querySelector("section.type-effect h2") ; 
let jobs = ["Web Developer", "Freelancer", "Instructor", "Software Engineer"] ; 
let jobIndex = 0 ; 
let charIndex = 0 ; 

function jobTitleStartWithVowel(jobTitle){
    return ['a', 'e', 'i', 'o', 'u'].includes(jobTitle[0].toLowerCase()) ; 
}

updateTitle() ; 
function updateTitle(){
    if (jobIndex === jobs.length) jobIndex = 0 ; 

    let n ='' ; 
    if (jobTitleStartWithVowel(jobs[jobIndex])) n = 'n' ; 
    
    secSectionTitle.innerHTML =
  `Iam a${n} ${jobs[jobIndex].slice(0,++charIndex)}`; 

    if (charIndex === jobs[jobIndex].length){
        jobIndex++; 
        charIndex = 0 ; 
    }

    setTimeout(updateTitle, 300) ;
}


// End Type Effect Section

// =============================================================


// Start Calendar Section 

let monthName = document.querySelector("section.calendar .cal-box .month-head span") ; 
let dayName = document.querySelector("section.calendar .cal-box .cal-body .day-name") ; 
let dayNum = document.querySelector("section.calendar .cal-box .cal-body .day-num") ; 
let sYear = document.querySelector("section.calendar .cal-box .cal-body .year");

let prevDate = document.querySelector("section.calendar .cal-box .cal-body .date-before") ;
let nextDate = document.querySelector("section.calendar .cal-box .cal-body .date-after") ; 



const today = new Date() ; 

function animateElements(){
    dayNum.classList.remove("animate") ;
    dayName.classList.remove("appear") ; 
    void dayNum.offsetWidth;
 
    dayNum.classList.add("animate");
    dayName.classList.add("appear");
}
function updateDate(argDate){
    let dayDate = new Date(argDate) ; 
    sYear.textContent = dayDate.getFullYear() ; 
    monthName.textContent = dayDate.toLocaleDateString("en", {
        month : "long"
    }) ;
    dayName.textContent = dayDate.toLocaleDateString("en", {
        weekday : "long"
    }) ;
    dayNum.textContent = dayDate.getDate() ;
}
updateDate(today) ; 
prevDate.addEventListener("click", () =>{
    animateElements() ;
    //I've added the settimout to make the number change its value when dissapearing not before dissapearing

    setTimeout(() => {
     updateDate(today.setDate(today.getDate()-1))
    }, 300);});
nextDate.addEventListener("click", () =>{
    animateElements();
    //I've added the settimout to make the number change its value when dissapearing not before dissapearing
    setTimeout(() => {   
      updateDate(today.setDate(today.getDate()+1))
    }, 300);
});

// End calendar section








// // Start Weather app Section 
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



let city = 'Blida';

function handleImgBasedOnWeatherCondition(weatherObj){
    if (weatherObj.weather[0].id >= 200 && weatherObj.weather[0].id <= 232){
        weatherStateImg.setAttribute("src", "./images/weather-sec/weather/thunderstorm.svg") ; 
    }
    else if (weatherObj.weather[0].id >= 300 && weatherObj.weather[0].id <= 321){
        weatherStateImg.setAttribute("src", "./images/weather-sec/weather/drizzle.svg") ; 
    }
    else if (weatherObj.weather[0].id >= 500 && weatherObj.weather[0].id <= 531){
        weatherStateImg.setAttribute("src", "./images/weather-sec/weather/rain.svg") ; 
    }
    else if (weatherObj.weather[0].id >= 600 && weatherObj.weather[0].id <= 622){
        weatherStateImg.setAttribute("src", "./images/weather-sec/weather/snow.svg") ; 
    }
    else if (weatherObj.weather[0].id >= 701 && weatherObj.weather[0].id <= 781){
        weatherStateImg.setAttribute("src", "./images/weather-sec/weather/atm.svg") ; 
    }
    else if (weatherObj.weather[0].id === 800){
        weatherStateImg.setAttribute("src", "./images/weather-sec/weather/clear.svg") ; 
    }
    else if (weatherObj.weather[0].id >= 801 && weatherObj.weather[0].id <= 804){
        weatherStateImg.setAttribute("src", "./images/weather-sec/weather/clouds.svg") ; 
    }
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
        weekday: "long",
        day: "numeric",
        month: "short"
    });
    humidityValue.textContent = `${weather.main.humidity}%`; 
    windValue.textContent = `${weather.wind.speed}M/s`; 
    temperature.textContent = `${parseInt(weather.main.temp)}°C`
    weatherState.textContent = weather.weather[0].main; 
    handleImgBasedOnWeatherCondition(weather) ; 
}

async function HandleWeather(){
    try{
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`) ; 
    if(!response.ok)
    {
        throw new Error("Error Has Happened") ; 
    }
    let weatherData = await response.json() ; 
    matchData(weatherData) ;  
    changeToNotFoundImg()  ;

}catch(error){
         changeToNotFoundImg()  ;

  displayInfo(false) ;
}
}



weathSearchClick.addEventListener("click", ()=>{
    if (searchInput.value.trim() !== ""){
        city = searchInput.value.trim() ; 
        HandleWeather() ; 
    }
})











