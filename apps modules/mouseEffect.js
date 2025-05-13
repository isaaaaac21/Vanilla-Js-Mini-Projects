import {removeClassFromArr} from "./sharedMethods.js" ; 



export default function initMouseEffect(){
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
}