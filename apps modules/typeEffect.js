export function initTypeEffect(){
    
let secSectionTitle = document.querySelector("section.type-effect h2") ; 
let jobs = ["Web Developer", "Freelancer", "Instructor", "Software Engineer", "Full-stack developer"] ; 
let jobIndex = 0 ; 
let charIndex = 0 ; 

function jobTitleStartWithVowel(jobTitle){
    return ['a', 'e', 'i', 'o', 'u'].includes(jobTitle[0].toLowerCase()) ; 
}

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
updateTitle() ; 
}