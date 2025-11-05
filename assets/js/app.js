//Array  Of words
const easyWords = [
  "able",
  "ago",
  "add",
  "bay",
  "bill",
  "bat",
  "cat",
  "chat",
  "catch",
  "deal",
  "disk",
  "ear",
  "fall",
  "food",
  "gun",
  "hold",
  "ice",
  "inch",
  "king",
  "level",
  "mark",
  "need",
  "now",
  "pen",
  "range",
  "salt",
  "test",
  "very",
  "world",
  "zero",
];
const normalWords = [
  "advantage",
  "accident",
  "bedroom",
  "bookstore",
  "breakfast",
  "company",
  "continue",
  "disappoint",
  "exchange",
  "forever",
  "guidebook",
  "headline",
  "internet",
  "keyboard",
  "lesson",
  "literature",
  "midnight",
  "medicine",
  "network",
  "national",
  "notebook",
  "operation",
  "paragraph",
  "perform",
  "product",
  "quality",
  "remember",
  "server",
  "school",
  "underline",
];
const harddWords = [
  "congratulations",
  "composition",
  "disappointment",
  "entertainment",
  "explanation",
  "granddaughter",
  "headteacher",
  "housework",
  "introduction",
  "neighbourhood",
  "photographer",
  "professional",
  "questionnaire",
  "qualification",
  "reservation",
  "roundabout",
  "snowboarding",
  "unnecessary",
  "successful",
  "roundabout",
  "reasonably",
  "pronunciation",
  "preparation",
  "organisation",
  "membership",
  "government",
  "experiment",
  "environment",
  "disadvantag",
  "conversation",
];
// setting Levels
let satrtTime = 6;
const lvls = {
  Easy: 5,
  Normal: 4,
  Hard: 3,
};
//global varibable
var start;

//slectors
let control = document.querySelector(".control");
let selectLevel = document.querySelector(".select-level");
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".lvl span");
let score = document.querySelector(".score");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-word");
let input = document.querySelector(".form-control");
let finishMessage = document.querySelector(".finish-message");
let finish = document.querySelector(".finish");
let restartButton = document.querySelector(".restart");
let cancelButton = document.querySelector(".cancel");
let percent = document.querySelector(".finish .percent span");
let esayHighScore = document.querySelector("#esayhighscore");
let normalHighScore = document.querySelector("#normalhighscore");
let hardHighScore = document.querySelector("#hardhighscore");
let easyTotal = document.querySelector("#easyTotal");
let noramlTotal = document.querySelector("#noramlTotal");
let hardTotal = document.querySelector("#hardTotal");
let closeBtn = document.querySelector(".close");

//Default Level
let defaultLevelName = selectLevel.value; //Change Level From Here
let defaultLevelSeconds = satrtTime;
let defaultlistWordes = normalWords.map((value) => {
  return value;
});
easyTotal.innerHTML = easyWords.length;
noramlTotal.innerHTML = normalWords.length;
hardTotal.innerHTML = harddWords.length;
// On Change  The Level
selectLevel.onchange = () => {
  switchLevel();
};

//setting Level Name + Score +seconds
lvlNameSpan.innerHTML = defaultLevelName;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = normalWords.length;
// Switch The level funcation
function switchLevel() {
  switch (selectLevel.value) {
    case "Easy":
      defaultlistWordes = easyWords.map((value) => {
        return value;
      });
      scoreTotal.innerHTML = defaultlistWordes.length;
      defaultLevelName = selectLevel.value;
      lvlNameSpan.innerHTML = defaultLevelName;

      break;

    case "Normal":
      defaultlistWordes = normalWords.map((value) => {
        return value;
      });
      scoreTotal.innerHTML = defaultlistWordes.length;
      defaultLevelName = selectLevel.value;
      lvlNameSpan.innerHTML = defaultLevelName;
      break;

    case "Hard":
      defaultlistWordes = harddWords.map((value) => {
        return value;
      });
      scoreTotal.innerHTML = defaultlistWordes.length;
      defaultLevelName = selectLevel.value;
      lvlNameSpan.innerHTML = defaultLevelName;
      break;
  }
  return defaultlistWordes;
}
//Disable paste Event
input.onpaste = function () {
  return false;
};

// Prevent copy, cut, and selection on word displays
theWord.addEventListener("copy", (e) => e.preventDefault());
theWord.addEventListener("cut", (e) => e.preventDefault());
theWord.addEventListener("contextmenu", (e) => e.preventDefault());

upcomingWords.addEventListener("copy", (e) => e.preventDefault());
upcomingWords.addEventListener("cut", (e) => e.preventDefault());
upcomingWords.addEventListener("contextmenu", (e) => e.preventDefault());

// Also prevent drag selection
theWord.addEventListener("mousedown", (e) => e.preventDefault());
upcomingWords.addEventListener("mousedown", (e) => e.preventDefault());
startButton.onclick = function () {
  scoreGot.innerHTML = 0;
  input.value = "";
  defaultLevelSeconds = satrtTime;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  setInterval(function () {
    input.focus();
  }, 100);
  // Generat Word Function
  getWord();
  //Empty Input Value
  input.value = "";
  displyContaent();
};
function getWord() {
  //Get Word From  Array
  let randomWord =
    defaultlistWordes[Math.floor(Math.random() * defaultlistWordes.length)];
  //Get Word Index
  let wordIndex = defaultlistWordes.indexOf(randomWord);
  // Remove Word From Array
  defaultlistWordes.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  //Empty Upcoming Words
  upcomingWords.innerHTML = "";
  for (let i = 0; i < defaultlistWordes.length; i++) {
    //Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(defaultlistWordes[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  //Call Satrt play Function
  startPlay();
}

function startPlay() {
  percent.innerHTML = 0;
  start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      //Stop Timer
      clearInterval(start);
      //Change To The Defulet Time level
      defaultLevelSeconds = lvls[defaultLevelName];
      timeLeftSpan.innerHTML = defaultLevelSeconds;
      //Compare Words
      if (
        theWord.innerHTML.toLocaleLowerCase() ===
        input.value.toLocaleLowerCase()
      ) {
        //Empty Input Filed
        input.value = "";
        //Increase Score
        scoreGot.innerHTML++;
        if (defaultlistWordes.length > 0) {
          //Coll Generate word function
          getWord();
        } else {
          restartButton.innerHTML = "Play Agne";
          switchLevel();
          // if(finishMessage.hasChildNodes==false){
          //     let span =document.createElement("span");
          //     let spanText=document.createTextNode("Well Don");
          //     span.className= 'good';
          //     span.appendChild(spanText);
          //     finishMessage.appendChild(span);
          //     showPercent();
          // }else{
          //     finishMessage.firstChild.remove();
          //     let span =document.createElement("span");
          //     let spanText=document.createTextNode("Well Don");
          //     span.className= 'good';
          //     span.appendChild(spanText);
          //     finishMessage.appendChild(span);
          //     showPercent();
          // }
          displyNone();
          showPercent();
          storedHighScore();
        }
      } else {
        restartButton.innerHTML = "Replay";
        switchLevel();
        // if (finishMessage.hasChildNodes()==false){
        //     let span= document.createElement("span");
        //     let spanText=document.createTextNode("Game Over");
        //     span.className='bad';
        //     span.appendChild(spanText);
        //     finishMessage.appendChild(span);
        //     // calculatPercent();
        //     showPercent();
        // }else{

        //     finishMessage.firstChild.remove()
        //     let span= document.createElement("span");
        //     let spanText=document.createTextNode("Game Over");
        //     span.className='bad';
        //     span.appendChild(spanText);
        //     finishMessage.appendChild(span);
        //     // calculatPercent();
        //     showPercent();

        // }
        // addmessage("bad","Gameover");
        storedHighScore();
        displyNone();
        showPercent();
      }
    }
  }, 1000);
  return start;
}

// Restart The Game
restartButton.onclick = function () {
  percent.innerHTML = 0;
  scoreGot.innerHTML = 0;
  input.value = "";
  defaultLevelSeconds = satrtTime;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  displyContaent();
  getWord();
};
// function calculatPercent(){

//     return getpercent;
// }
function showPercent() {
  let getpercent = Math.floor(
    (scoreGot.innerHTML / defaultlistWordes.length) * 100
  );
  let counter = 0;
  setInterval(() => {
    if (counter === getpercent) {
      clearInterval();
    } else {
      counter++;
      percent.innerHTML = counter;
    }
  }, 30);
  if (getpercent < 10) {
    addmessage("bad", "Poor Typing");
  } else if (getpercent <= 25) {
    addmessage("bad", "Not Bad Typing");
  } else if (getpercent >= 25 && getpercent < 50) {
    addmessage("bad", "Good Typing");
  } else if (getpercent >= 50 && getpercent < 75) {
    addmessage("bad", "Very Good Typing");
  } else if (getpercent >= 75 && getpercent < 100) {
    addmessage("bad", "Amazing Typing");
  } else {
    addmessage("good", "Excellent Typing");
  }
}
function displyNone() {
  control.classList.add("d-none");
  score.classList.add("d-none");
  theWord.classList.add("d-none");
  input.classList.add("d-none");
  upcomingWords.classList.add("d-none");
  finish.classList.remove("d-none");
}
function displyContaent() {
  control.classList.remove("d-none");
  score.classList.remove("d-none");
  theWord.classList.remove("d-none");
  input.classList.remove("d-none");
  upcomingWords.classList.remove("d-none");
  finish.classList.add("d-none");
}
function addmessage(clss, text) {
  if (finishMessage.hasChildNodes() == false) {
    let span = document.createElement("span");
    let spanText = document.createTextNode(text);
    span.className = clss;
    span.appendChild(spanText);
    finishMessage.appendChild(span);
  } else {
    finishMessage.firstChild.remove();
    let span = document.createElement("span");
    let spanText = document.createTextNode(text);
    span.className = clss;
    span.appendChild(spanText);
    finishMessage.appendChild(span);
  }
}
// close Button
closeBtn.onclick = function () {
  //becuse the Time not stop and make prablem
  clearInterval(start);
  if (selectLevel.value == "Easy") {
    defaultlistWordes = easyWords.map((value) => {
      return value;
    });
  } else if (selectLevel.value == "Normal") {
    defaultlistWordes = normalWords.map((value) => {
      return value;
    });
  } else {
    defaultlistWordes = harddWords.map((value) => {
      return value;
    });
  }
};
//Local Storag
function storedHighScore() {
  switch (selectLevel.value) {
    case "Easy":
      if (window.localStorage.getItem("Easy") == null) {
        window.localStorage.Easy = scoreGot.innerHTML;
        esayHighScore.innerHTML = window.localStorage.Easy;
      } else {
        console.log("in else");

        if (Number(window.localStorage.Easy) < Number(scoreGot.innerHTML)) {
          console.log("in condation");
          window.localStorage.Easy = scoreGot.innerHTML;
          esayHighScore.innerHTML = window.localStorage.Easy;
        }
      }
      break;
    case "Normal":
      if (window.localStorage.getItem("Normal") == null) {
        window.localStorage.Normal = scoreGot.innerHTML;
        normalHighScore.innerHTML = window.localStorage.Normal;
      } else {
        if (Number(window.localStorage.Normal) < Number(scoreGot.innerHTML)) {
          window.localStorage.Normal = scoreGot.innerHTML;
          normalHighScore.innerHTML = window.localStorage.Normal;
        }
      }
      break;
    case "Hard":
      if (window.localStorage.getItem("Hard") == null) {
        window.localStorage.Hard = scoreGot.innerHTML;
        hardHighScore.innerHTML = window.localStorage.Hard;
      } else {
        if (Number(window.localStorage.Hard) < Number(scoreGot.innerHTML)) {
          window.localStorage.Hard = scoreGot.innerHTML;
          hardHighScore.innerHTML = window.localStorage.Hard;
        }
      }
      break;
  }
}
window.onload = function () {
  if (window.localStorage.getItem("Easy") != null) {
    esayHighScore.innerHTML = window.localStorage.Easy;
  }
  if (window.localStorage.getItem("Normal") != null) {
    normalHighScore.innerHTML = window.localStorage.Normal;
  }
  if (window.localStorage.getItem("Hard") != null) {
    hardHighScore.innerHTML = window.localStorage.Hard;
  }
};
