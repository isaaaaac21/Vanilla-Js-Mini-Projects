export function initCalendar(){
    
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
}