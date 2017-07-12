var interval;
var seconds = 10;
var $question = $("#question");
var $answers = [$('#a1'),$('#a2'),$('#a3'),$('#a4')];
var $timer = $('#timer');
var $result = $('#result');
var selectedAnswer;
var questionCounter = 0;
var questionArray = ["What year did RSL win the MLS cup?","Who is the all-time leading goal-scorer for RSL?"];
var answerKey = [2,4];
var answerArray = ["2008","2009","2012","2013","Yura Movsisian", "Kyle Beckerman", "Nick Rimando", "Alvaro Saborio"]

interval = setInterval(countdown,1000);
$question.text("You will see the question here, pick one of the answers below.");
for (var i = 0; i < $answers.length ; i++) {
	$answers[i].text("answer " + (i+1));	
}

function countdown(){
	seconds--;
	$timer.text(seconds);
	if(seconds <=0){
		timeUp();
	}
}

function timeUp(){
	clearInterval(interval);
	seconds = 10;
	$result.text("Time's Up!");
	
	if (checkAnswer()) {
		$result.text("Correct!");
	}
	else{
		$result.text($result.text() + " The correct answer is: " + answerArray[answerKey[questionCounter]-1]);
	}
	nextQuestion();
}

function checkAnswer(){
	console.log("checking if " + selectedAnswer + " is correct");
	console.log(selectedAnswer);
	if(parseInt(answerKey[questionCounter]) === selectedAnswer){
		return true;
	}
	else{return false;}
}

$('input:radio[name="answer"]').change(function(){
	selectedAnswer = parseInt(this.value);
	console.log("radio button " + selectedAnswer + " selected.");
});

function nextQuestion(){
	$question.text(questionArray[questionCounter]);
	for (var i = 0; i < 4; i++) {
		$answers[i].text(answerArray[questionCounter*4 +i]);
	}
	questionCounter++;
}