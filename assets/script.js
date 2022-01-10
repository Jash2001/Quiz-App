var current_question = 0;
var score = 0;
var lastAnsweredQuestion = -1;
var highscoreList = [];

const startbtn = document.getElementById("start");
const choices = document.getElementsByClassName("choices");
document.getElementById("questions").style.display = "none";
document.getElementById("details").style.display = "none";


const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

const totalScore = questions.length;
startbtn.addEventListener("click", startQuiz);

function startQuiz() {
  current_question = 0;
  questionDisplayer();
  setQuizTimer();
}

var maxTime = 60;
var handler;
var dec = 1;
function setQuizTimer() {
  var timeDisplay = document.getElementsByClassName("time")[0];
  timeDisplay.style.display = "block";
  timeDisplay.innerHTML = "Time: " + maxTime;
  handler = setInterval(() => {
    if (maxTime <= 0) {
      clearInterval(handler);
      timeDisplay.innerHTML = "Time: ";
      getDetails();
    } else {
      maxTime -= dec;
      timeDisplay.innerHTML = "Time: " + maxTime;
    }
  }, 1000);
  if (!handler) {
    getDetails();
  }
}

function questionDisplayer() {
  if (maxTime > 0) {
    document.getElementsByClassName("container")[0].style.display = "none";
    document.getElementById("questions").style.display = "block";
    changeQuestion();
  }
}

function changeQuestion() {
  const questionDisplay = document.getElementById("questions");
  document.getElementById("answer").innerHTML = "";
  var quizdiv = questions[current_question]["questionText"];
  document.getElementById("questions").style.display = "block";
  document.getElementsByClassName("question-block")[0].innerHTML =
    "<h2>" + quizdiv + "</h2>";
  const choicedata = document.getElementsByClassName("choices");
  for (i = 0; i < 4; i++) {
    choicedata[i].innerHTML = questions[current_question]["options"][i];
  }
}

function ansCheck(option) {
  if (
    option == questions[current_question]["answer"][0].toString() &&
    current_question != lastAnsweredQuestion
  ) {
    score++;
    lastAnsweredQuestion = current_question;
    document.getElementById("answer").innerHTML = "Correct Answer";
  } else if (current_question != lastAnsweredQuestion) {
    lastAnsweredQuestion = current_question;
    document.getElementById("answer").innerHTML = "Wrong Answer";
    maxTime -= 10;
  }
  current_question += 1;
  if (current_question >= questions.length || maxTime <= 0) {
    maxTime = 0;
    setTimeout(getDetails, 1000);
  } else {
    setTimeout(changeQuestion, 1000);
  }
}

function getDetails() {
  document.getElementById("questions").style.display = "none";
  document.getElementById("details").style.display = "block";
  document.getElementById("details").innerHTML =
    "<h2> All Done! </h2> <p> Your Final Score is " +
    score +
    ".</p> <p> Enter initials: <input type='text' id='username'/> <button class='btn' id='submit-name' onclick='submitScore()'> Submit </button> </p>";
}

function submitScore() {
  const userScore = document.getElementById("username").value;
  const curUserDetails = {
    initial: userScore,
    score: score,
  };
  highscoreList.push(curUserDetails);
  score = 0;
  current_question = 0;
  lastAnsweredQuestion = -1;
  maxTime = 60;
  scoreList();
}

function scoreList() {
  document.getElementsByClassName("container")[0].style.display = "none";
  document.getElementById("details").innerHTML = "";
  let data = "<h2> Highscores </h2>";
  for (i = 0; i < highscoreList.length; i++) {
    data +=
      "<p class='scores'>" +
      (i + 1) +
      ". " +
      highscoreList[i]["initial"] +
      " - " +
      highscoreList[i]["score"] +
      "</p>";
  }
  data += "<button id='home' class='btn' onclick='goHome()'> Go Back </button>";
  data +=
    "<button id='clear' class='btn' onclick='clearScore()'> Clear Highscores </button>";
  document.getElementById("details").innerHTML = data;
  document.getElementById("details").style.display = "block";
}

function clearScore() {
  highscoreList = [];
  scoreList();
}

function goHome() {
  document.getElementById("details").style.display = "none";
  document.getElementsByClassName("container")[0].style.display = "block";
}
