const startBoxEl = document.getElementById('startBox');

// timer countdown element 
const timerEl = document.getElementById('timer');
let timeLeft = questions.length * 15;

// quiz component 
const quizBox = document.getElementById('questions');
const displayQuestionEl = document.getElementById('displayQuestion');
let quizIndex = 0;

// shows score
let scoreBoxEl = document.getElementById('scoreBox');
// let playerScore;
// let hiScores = [];
let hiFive;
let preve_exe = false;
const initialInputEl = document.getElementById('initalInput');
const scoreInputEl = document.getElementById('scoreInput')

function startClock() {
    let timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timerEl.textContent = `TIMER: ${timeLeft}`;
            timeLeft--;
        } else {
            // show completion and score
            // option to play again
            gameEnd();

        };

    }, 1000);
};

// start the quiz 
function loadQuestion() {

    // get current question 
    let currentQuestion = questions[quizIndex];
    // check if all questions asked 
    if (!currentQuestion) {
        // if out of questions 
        gameEnd();
    } else {
        // clear start box and load next question
        startBoxEl.setAttribute("style", "display: none");
        quizBox.innerHTML = "";
        // render the question 
        let questionToAsk = `${currentQuestion.question}`;
        displayQuestionEl.removeAttribute("class");
        displayQuestionEl.textContent = questionToAsk;
        quizBox.append(displayQuestionEl);

        // render the choices 
        currentQuestion.choices.forEach(function (choice) {
            let choiceButton = document.createElement("button");
            choiceButton.setAttribute("class", "preSelect button");
            choiceButton.setAttribute("value", choice);
            choiceButton.textContent = choice;
            choiceButton.addEventListener("click", function () {
                let userResponse = this;

                // call function for feedback and next question
                userAnswer(userResponse);
            });
            // choiceButton.onClick = userAnswer;
            quizBox.append(choiceButton);
        });
    };
};

function userAnswer(userResponse) {

    if (userResponse.value != questions[quizIndex].answer) {
        // incorrect answer feedback 
        userResponse.setAttribute("class", "wrongAnswer button")
        userResponse.textContent = 'INCORRECT';
        timeLeft -= 15;
    } else {
        // correct answer feedback 
        userResponse.setAttribute("class", "correctAnswer button")
        userResponse.innerHTML = 'CORRECT';
    };
    // show feedback for 1 second then continue quiz
    setTimeout(function () {
        quizIndex++;
        loadQuestion();
    }, 1000);

};




// timer counts down and questions load
function startGame() {
    startClock();
    loadQuestion();
};

// play again button 
let rButton = () => {
    let reButton = document.createElement("button");

    reButton.textContent = `Click here to re-start`;
    reButton.className = "button";
    scoreBoxEl.append(reButton);
    reButton.onclick = replayGame;
};

// restart game 
replayGame = () => {
    timeLeft = questions.length * 15;

    window.location.reload();
};

// when out of time or all questions answered 
let gameEnd = () => {
    if (timeLeft < 0 ? timeLeft = 0 : timeLeft);
    // assign timeLeft to variable 
    // and zero if necessary so there are no negative scores
    playerScore = timeLeft;
    timeLeft = 0;
    // paint timer red for end of game 
    timerEl.setAttribute("class", "game-over");
    timerEl.textContent = ` GAME OVER `;
    // show score 
    if (!preve_exe) {
        preve_exe = true;
        quizBox.innerHTML = "";
        let score = document.createElement("h2");
        score.textContent = `Game Over!  Your score: ${playerScore}`
        scoreBoxEl.append(score);
        saveButton();
        rButton();
    };
};

saveButton = () => {
    console.log('saveButton timeLeft '+playerScore);
let sButton = document.createElement("button");
sButton.textContent = "Save your score?";
sButton.className = "button";
scoreBoxEl.append(sButton);
sButton.onclick = saveScore();
};

// saveScore = (hiScores, timeLeft) => {
//     // const highScores = [];
    
//     getHighScores();
//     console.log(timeLeft);
//     console.log(hiScores);
//     hiScores.push(timeLeft);
//     window.localStorage.setItem("hiScores", JSON.stringify(hiScores));
// }

function saveScore() {
    console.log(playerScore);
    // console.log(hiScores);
    // let hiScores = [];
    
    // console.log(hiScores);
    scoreInputEl.removeAttribute("class");
    let playerInitials = initialInputEl.value;
    if (playerInitials !== "") {
    
    let plyrScore = {
        initials: playerInitials,
        score: playerScore
    };
    new Promise 
    getHighScores();
    getScores.push(plyrScore);
    window.localStorage.setItem("hiScores", JSON.stringify(getScores));
}

};
getHighScores = () => {
    getScores = JSON.parse(
    window.localStorage.getItem("hiScores")) || [];

    
    getScores.sort();
    console.log(getScores);
    scoresToDisplay = () => {
        let i = 0;
        let highFive = [];
        while (i < 5) {
            i++;
            highFive.push(scoresToDisplay[-i]);
            hiFive = highFive;
            console.log('highFive = ' + highFive);
            console.log('hiFive = ' + hiFive);
        };
    };
    console.log(hiFive);
    console.log(getScores);
    // return(hiScores);
};

// showHighScores = () => {

// }

// saveScore = () => {
//     JSON.parse(local.window.setItem("highScores"));
// }

startBoxEl.onclick = startGame;
