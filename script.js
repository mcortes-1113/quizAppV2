// $(document).ready(function(){

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
    title: "question placeholder1",
    choices: ["a", "b","c","d"],
    answer: "a"},

    {
    title: "question placeholder2",
    choices: ["a", "b","c","d"],
    answer: "b"},

    {
    title: "question placeholder3",
    choices: ["a", "b","c","d"],
    answer: "c"},
    
    {
    title: "question placeholder4",
    choices: ["a", "b","c","d"],
    answer: "d"}
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
    startTimer();
    firstQ();
});

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
    renderScores();
}






function renderScores() {
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
            $("#resultCont").text("wrong");
            }
        };

        function evalSecondAnswer(event) {

            userAnswer = event.target.textContent;
            if (userAnswer === currentA) {
                thirdQ();      
            }
                else {
                $("#resultCont").text("wrong");
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
                    $("#resultCont").text("wrong");
                    secondsElapsed = secondsElapsed +5;
                    rendertime();
                    }
                };

                function evalLastAnswer(event) {

                    userAnswer = event.target.textContent;
                    if (userAnswer === currentA) {
                        endTest();      
                    }
                        else {
                        $("#resultCont").text("wrong");
                        secondsElapsed = secondsElapsed +5;
                        rendertime();
                        }
                    };


//function to end test

    function endTest() {
        $("#question").text("");
        $("#choices").text("")   ;
        $("#resultCont").text("End of Test");
        newScore = secondsRemain;
        $("#finalScore").text(newScore);
        stopTimer();
    }

    //on click event to add activities to itinerary object
// $("#actbtn").on("click", function(event) {
//     event.preventDefault();
//     getUserActivities(event);
    // actArr = localStorage.getItem("activities");
    // actArr = actArr ? JSON.parse(actArr) : [];
    


    // $("#newbtn").on("click", function(event) {
    //     event.preventDefault();
    //     getTripID(event);
    //     getDatesArray(event);
    //     tripsArr = localStorage.getItem("trips");
    //     tripsArr = tripsArr ? JSON.parse(tripsArr) : [];
    //     var trip = {
    //                 tripID : tID,
    //                 tripDates : tDates
    //                 }
    //     tripsArr.push(trip);
    //     localStorage.setItem("trips", JSON.stringify(tripsArr));
    // })
