//Creating Colorful Stars  when the mouse is moving in the first section {}

let firstSection = document.querySelector(".mouse-effect") ; 
let firstSectionTitle = firstSection.firstElementChild ; 
let starIcon = "fa-solid fa-star"; 
let starColors = ["#F472B6", "#FFDD57", "#6C757D","#F5F5F5", "#1A1A40", "#FF8C42", "#00C9A7", "#A259FF", "#FF6B6B", "#3E8EDE"]; 

function ChangeStarSyle(star, fsSize, randomColor, x, y){
    star.style.fontSize = `${fsSize}px` ; 
    star.style.color = `${starColors[randomColor]}` ; 
    star.style.left = `${x + 10}px`;
    star.style.top = `${y + 10}px`;
}
firstSection.addEventListener("mousemove", (e)=>{    
    let star = document.createElement("i") ; 
    star.className = `${starIcon}`;

    let  X = e.offsetX  ; 
    let Y = e.offsetY ;

    let randomFs  = Math.floor(Math.random() * 30) +  10; 
    let randomColor = Math.floor(Math.random() * 10) ; 
     
    ChangeStarSyle(star, randomFs, randomColor, X, Y) ; 
    firstSection.appendChild(star) ; 

    setTimeout(() => {
        
        firstSection.removeChild(star) ; 
    }, 1000);
})



// End Mouse Effect Section




//STart the Type Effect Section

let secSectionTitle = document.querySelector("section.type-effect h2") ; 
let jobs = ["Web Developer", "Freelancer", "Instructor", "Software Engineer"] ; 
let jobIndex = 0 ; 
let charIndex = 0 ; 

updateTitle() ; 
function updateTitle(){
    if (jobIndex === jobs.length) jobIndex = 0 ; 
 secSectionTitle.innerHTML =
  `Iam a ${jobs[jobIndex].slice(0,++charIndex)}`; 

    if (charIndex === jobs[jobIndex].length){
        jobIndex++; 
        charIndex = 0 ; 
    }

    setTimeout(updateTitle, 300) ;
}



// for (let i = 0;  i < jobs.length; i++){

// }




 