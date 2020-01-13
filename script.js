// $(document).ready(function(){
// 
// var questions = require('questionbank.js')

//timer variables
var secondsTotal;
var secondsElapsed = 0;
var secondsRemain;
var interval;
//question bank variables
var currentQindex;
var currentQ;
var currentCh;
var currentA;
var option;
var userAnswer;
//score variables
var newScore;
var initials;
/*display variables

var qCount;*/

var highScores = [];

var qbank = [
    {
    title: "In JavaScript: What element is used to store multiple values in a single variable?",
    choices: ["Functions", "Variables","Strings","Arrays"],
    answer: "Arrays"},

    {
    title: "In Javascript: What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
    choices: ["Loop", "Clone","Repeater","Debugger"],
    answer: "Loop"},

    {
    title: "What is considered to be the most popular programming language in the world?",
    choices: ["Swift", "JavaScript","HTML","Ruby"],
    answer: "JavaScript"},
    
    {
    title: "In CSS: What is the value called that defines colors such as the following: #FFFF00?",
    choices: ["RGB Value", "Decimal Value","Hex Value","Color Value"],
    answer: "Hex Value"}
];

//create function to start timer
function startTimer() {
    secondsTotal = qbank.length * 15;
    $("#timer").text(secondsTotal);
    interval = setInterval(function() {
        secondsElapsed++;
        secondsRemain = secondsTotal-secondsElapsed;
        rendertime();
    }, 1000);
}
//create function to render time
function rendertime(){
    $("#timer").text(secondsRemain);
    if (secondsRemain<=0) {
        stopTimer()
    }
}

//create function to stop timer
function stopTimer() {
    clearInterval(interval);
};

//add functions to start button

$("#startBtn").on("click", function() {
    event.preventDefault()
    $("#startBtn").attr("disabled", true);
    startTimer();
    firstQ();
});

function reset() {
    $("#resultCont").text("");
    $("#finalScore").text("");
    $("#initials").val("")
    $("#timer").text("");
    secondsElapsed = 0;
    secondsTotal = 0;
}

function saveScore() {
    highScores = localStorage.getItem("highScores");
    highScores = highScores ? JSON.parse(highScores) : [];
        initials = $("#initials").val();
        var addScore = {
                score : newScore,
                user :  initials
                }
    highScores.push(addScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    reset();
    renderScores();
    $("#startBtn").attr("disabled", false);
}






function renderScores() {
    $("#scoreDiv").hide();
    $("#highScoresTable tr").remove();
    $("#highScoresTable").append($("<tr><th> User </th><th> Score </th></tr>"));
    highScores = localStorage.getItem("highScores");
    highScores = highScores ? JSON.parse(highScores) : [];
    for (i=0;i<highScores.length;i++) {
        var score = highScores[i];
        $("#highScoresTable").append($("<tr><td>" + score.user + "</td><td>" + score.score + "</td></tr>"));
    }
}

renderScores();

$("#saveBtn").on("click", function() {
    event.preventDefault();
    saveScore();
    });

//----------------------------------------------------

//create function to select first question and populate elements

    function firstQ() {            
        currentQindex = qbank[0]
        currentQ = currentQindex.title;
        currentCh = currentQindex.choices;
        currentA = currentQindex.answer;

        $("#resultCont").text("");
        $("#question").text(currentQ);
        
        for (i=0;i<currentCh.length;i++) {
            option = currentQindex.choices[i];
            $("#choices").append($("<li><button class=choice-button onClick=evalFirstAnswer(event)>" + option + "</button></li>"));
        }
    };

        function secondQ() {    
            $("#question").text("");
            $("#choices").text("");
            $("#resultCont").text("");
            currentQindex = qbank[1]
            currentQ = currentQindex.title;
            currentCh = currentQindex.choices;
            currentA = currentQindex.answer;
        
            $("#question").text(currentQ);
            
            for (i=0;i<currentCh.length;i++) {
                option = currentQindex.choices[i];
                $("#choices").append($("<li><button class=choice-button onClick=evalSecondAnswer(event)>" + option + "</button></li>"));
            }
        };

            function thirdQ() {    
                $("#question").text("");
                $("#choices").text("") ;
                $("#resultCont").text("");       
                currentQindex = qbank[2]
                currentQ = currentQindex.title;
                currentCh = currentQindex.choices;
                currentA = currentQindex.answer;
            
                $("#question").text(currentQ);
                
                for (i=0;i<currentCh.length;i++) {
                    option = currentQindex.choices[i];
                    $("#choices").append($("<li><button class=choice-button onClick=evalThirdAnswer(event)>" + option + "</button></li>"));
                }
                };

                function lastQ() {  
                    $("#question").text("");
                    $("#choices").text("")   ;
                    $("#resultCont").text("");       
                    currentQindex = qbank[3]
                    currentQ = currentQindex.title;
                    currentCh = currentQindex.choices;
                    currentA = currentQindex.answer;
                
                    $("#question").text(currentQ);
                    
                    for (i=0;i<currentCh.length;i++) {
                        option = currentQindex.choices[i];
                        $("#choices").append($("<li><button class=choice-button onClick=evalLastAnswer(event)>" + option + "</button></li>"));
                    }
                };

//create function to evaluate answer

    function evalFirstAnswer(event) {
        // console.log("inside eval")
        userAnswer = event.target.textContent;
        if (userAnswer === currentA) {
            secondQ();      
        }
            else {
            secondsElapsed = secondsElapsed +5;
            rendertime();
            $("#resultCont").text("Incorrect Answer. Try again.");
            }
        };

        function evalSecondAnswer(event) {

            userAnswer = event.target.textContent;
            if (userAnswer === currentA) {
                thirdQ();      
            }
                else {
                $("#resultCont").text("Incorrect Answer. Try again.");
                secondsElapsed = secondsElapsed +5;
                rendertime();
                }
            };

            function evalThirdAnswer(event) {

                userAnswer = event.target.textContent;
                if (userAnswer === currentA) {
                    lastQ();      
                }
                    else {
                    $("#resultCont").text("Incorrect Answer. Try again.");
                    secondsElapsed = secondsElapsed +5;
                    rendertime();
                    }
                };

                function evalLastAnswer(event) {

                    userAnswer = event.target.textContent;
                    if (userAnswer === currentA) {
                        endTest(); 
                        $("#scoreDiv").show();     
                    }
                        else {
                        $("#resultCont").text("Incorrect Answer. Try again.");
                        secondsElapsed = secondsElapsed +5;
                        rendertime();
                        }
                    };


//function to end test

    function endTest() {
        $("#question").text("");
        $("#choices").text("")   ;
        $("#resultCont").text("This is the End of the Quiz");
        newScore = secondsRemain;
        $("#finalScore").text(newScore);
        stopTimer();
    }