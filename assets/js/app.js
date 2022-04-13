//Array  Of words 
const words=[
    "hamza",
    "omer",
    "blala"
]

// setting Levels
const lvls={
    "Easy":5,
    "Normal":3,
    "Hard":2
}

//Default Level
let defaultLevelName= "Normal";//Change Level From Here تمرين تغير عبر سيليكت بوكس
let defaultLevelSeconds =lvls[defaultLevelName];


//Catch Selectors
let startButton =document.querySelector(".start");
let lvlNameSpan =document.querySelector(".message .lvl");
let secondsSpan =document.querySelector(".message .seconds");
let theWord =document.querySelector(".the-word");
let upcomingWords =document.querySelector(".upcoming-word");
let input =document.querySelector(".input");
let timeLeftSpan =document.querySelector(".time span");
let scoreGot =document.querySelector(".score .got");
let scoreTotal =document.querySelector(".score .total");
let finishMessage =document.querySelector(".finish");

//setting Level Name + Score +seconds
lvlNameSpan.innerHTML=defaultLevelName;
secondsSpan.innerHTML=defaultLevelSeconds;
timeLeftSpan.innerHTML=defaultLevelSeconds;
scoreTotal.innerHTML= words.length;

//Disable paste Event 
input.onpaste= function () {
    return false
}

//start Game
startButton.onclick= function(){
    this.remove();
    input.focus();
    // Generat Word Function 
    getWord();
}

//Get Random Word
function getWord(){
    //Get Word From  Array
    let randomWord =words[Math.floor(Math.random()* words.length)];
    // Get Word Index
    let wordIndex =words.indexOf(randomWord);
    // Remove Word From Array 
    words.splice(wordIndex,1);
    //Show The Random Word 
    theWord.innerHTML=randomWord;
    // Empty Upcoming Words
    upcomingWords.innerHTML='';
    //Generate  Words
    for (let i =0; i< words.length;i++){
        //Create Div Element
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);

    }

    //Call Start play Function
    startPlay();
}

//Start play Function
function startPlay(){
    timeLeftSpan.innerHTML=defaultLevelSeconds;
    let start = setInterval(()=>{
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML ==="0"){
            //Stop Timer
            clearInterval(start);
            //Compare Words
            if(theWord.innerHTML.toLowerCase()===input.value.toLowerCase()){
                //Empty Input Field
                input.value ='';
                // Increase Score
                scoreGot.innerHTML++; 
                if (words.length>0){
                    // Call Generate word function
                    getWord();
                }else{
                    let span =document.createElement("span");
                    let spanText=document.createTextNode("Well Don")
                    span.className= 'good';
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    //Rremove upcomingWords
                    upcomingWords.remove();

                }
            }else{
                let span= document.createElement("span");
                let spanText=document.createTextNode("Game Over");
                span.className='bad';
                span.appendChild(spanText);
                finishMessage.appendChild(span);
            }

        } 
    },1000)
}

















 


