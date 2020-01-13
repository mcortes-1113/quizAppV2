function startTimer(){secondsTotal=15*qbank.length,$("#timer").text(secondsTotal),interval=setInterval(function(){secondsElapsed++,secondsRemain=secondsTotal-secondsElapsed,rendertime()},1e3)}function rendertime(){$("#timer").text(secondsRemain),0>=secondsRemain&&stopTimer()}function stopTimer(){clearInterval(interval)}function saveScore(){highScores=localStorage.getItem("highScores"),highScores=highScores?JSON.parse(highScores):[],initials=$("#initials").val();var e={score:newScore,user:initials};highScores.push(e),localStorage.setItem("highScores",JSON.stringify(highScores)),renderScores()}function renderScores(){for($("#highScoresTable tr").remove(),$("#highScoresTable").append($("<tr><th> User </th><th> Score </th></tr>")),highScores=localStorage.getItem("highScores"),highScores=highScores?JSON.parse(highScores):[],i=0;i<highScores.length;i++){var e=highScores[i];$("#highScoresTable").append($("<tr><td>"+e.user+"</td><td>"+e.score+"</td></tr>"))}}function firstQ(){for(currentQindex=qbank[0],currentQ=currentQindex.title,currentCh=currentQindex.choices,currentA=currentQindex.answer,$("#question").text(currentQ),i=0;i<currentCh.length;i++)option=currentQindex.choices[i],$("#choices").append($("<li><button class=choice-button onClick=evalFirstAnswer(event)>"+option+"</button></li>"))}function secondQ(){for($("#question").text(""),$("#choices").text(""),$("#resultCont").text(""),currentQindex=qbank[1],currentQ=currentQindex.title,currentCh=currentQindex.choices,currentA=currentQindex.answer,$("#question").text(currentQ),i=0;i<currentCh.length;i++)option=currentQindex.choices[i],$("#choices").append($("<li><button class=choice-button onClick=evalSecondAnswer(event)>"+option+"</button></li>"))}function thirdQ(){for($("#question").text(""),$("#choices").text(""),$("#resultCont").text(""),currentQindex=qbank[2],currentQ=currentQindex.title,currentCh=currentQindex.choices,currentA=currentQindex.answer,$("#question").text(currentQ),i=0;i<currentCh.length;i++)option=currentQindex.choices[i],$("#choices").append($("<li><button class=choice-button onClick=evalThirdAnswer(event)>"+option+"</button></li>"))}function lastQ(){for($("#question").text(""),$("#choices").text(""),$("#resultCont").text(""),currentQindex=qbank[3],currentQ=currentQindex.title,currentCh=currentQindex.choices,currentA=currentQindex.answer,$("#question").text(currentQ),i=0;i<currentCh.length;i++)option=currentQindex.choices[i],$("#choices").append($("<li><button class=choice-button onClick=evalLastAnswer(event)>"+option+"</button></li>"))}function evalFirstAnswer(e){userAnswer=e.target.textContent,userAnswer===currentA?secondQ():(secondsElapsed+=5,rendertime(),$("#resultCont").text("wrong"))}function evalSecondAnswer(e){userAnswer=e.target.textContent,userAnswer===currentA?thirdQ():($("#resultCont").text("wrong"),secondsElapsed+=5,rendertime())}function evalThirdAnswer(e){userAnswer=e.target.textContent,userAnswer===currentA?lastQ():($("#resultCont").text("wrong"),secondsElapsed+=5,rendertime())}function evalLastAnswer(e){userAnswer=e.target.textContent,userAnswer===currentA?endTest():($("#resultCont").text("wrong"),secondsElapsed+=5,rendertime())}function endTest(){$("#question").text(""),$("#choices").text(""),$("#resultCont").text("End of Test"),newScore=secondsRemain,$("#finalScore").text(newScore),stopTimer()}var secondsTotal,secondsElapsed=0,secondsRemain,interval,currentQindex,currentQ,currentCh,currentA,option,userAnswer,newScore,initials,highScores=[],qbank=[{title:"question placeholder1",choices:["a","b","c","d"],answer:"a"},{title:"question placeholder2",choices:["a","b","c","d"],answer:"b"},{title:"question placeholder3",choices:["a","b","c","d"],answer:"c"},{title:"question placeholder4",choices:["a","b","c","d"],answer:"d"}];$("#startBtn").on("click",function(){event.preventDefault(),startTimer(),firstQ()}),renderScores(),$("#saveBtn").on("click",function(){event.preventDefault(),saveScore()});