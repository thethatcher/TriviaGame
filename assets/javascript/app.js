var interval;
var seconds = 10;
var $question = $("#question");
var $answers = [$('#a1'),$('#a2'),$('#a3'),$('#a4')];
var $timer = $('#timer');
var $result = $('#result');
var right = 0;
var wrong = 0;
var missed = 0;
var questionCounter = 0;
var questionArray = [new question("How many MLS championships has RSL won?","1","0","2","3"), 
	new question("What year did RSL win the MLS Cup?","2009","2010","2012","2013"),
	new question("Who has scored the most goals for RSL all-time?","Alvaro Saborio","Jason Kries","Yura Movsisian","Nick Rimando"),
	new question("What is the nick name of the stadium RSL plays in?","The RioT","New Delta Center","The Castle","Wall of the Wasatch"),
	new question("Who is RSL's current head coach?","Mike Petke","Jason Kries","Kyle Beckerman","Jeff Cassar"),
	new question("What was the first stadium RSL called home?","Rice Eccles Stadium","Rio Tinto Stadium","Lavell Edwards Stadium","Gillette Stadium"),
	new question("Which position does Nick Rimando play?","Keeper","Striker","Centerback","Midfielder"),
	new question("What color is not an RSL color?","Cerulean","Claret","Cobalt","Gold")]

function question(q,a1,a2,a3,a4){//a1 MUST be the correct answer!
	this.question = q;
	this.answers = [a1,a2,a3,a4];
	this.correct = a1;
	shuffleArray(this.answers);
	function shuffleArray(array){
		var j, x, i;
	    for (i = array.length; i; i--) {
	        j = Math.floor(Math.random() * i);
	        x = array[i - 1];
	        array[i - 1] = array[j];
	        array[j] = x;
    	}
	}
}

$("button").click(function(){
	$('.content').css("visibility","visible");
	$('button').css('display','none');
	nextQuestion();
});

$('.answer').click(function(){
	if ($(this).text() === questionArray[questionCounter].correct) {
		console.log("correct answer chosen");
		$result.text("Correct!")
		right++;
	}
	else{
		console.log("incorrect answer chosen");
		$result.text("Wrong! The correct answer is " + questionArray[questionCounter].correct);
		wrong++;
	}
	betweenQuestion();
});

function nextQuestion(){
	console.log('nextQuestion called');
	interval = setInterval(timer,1000);
	$question.text(questionArray[questionCounter].question);
	for (var i = 0; i < $answers.length ; i++) {
		$answers[i].text(questionArray[questionCounter].answers[i])
	}
	seconds = 10;
	$('#timerMsg').css("visibility","visible");
	$timer.text(seconds);
	$result.text("Answer the question!");
}

function timer(){
	console.log('timer called');
	seconds--;
	$timer.text(seconds);
	if (seconds <= 0) {
		$result.text("Times Up! The correct answer is " + questionArray[questionCounter].correct);
		missed++;
		betweenQuestion();
	}
}	

function betweenQuestion(){
	console.log('betweenQuestion called');
	clearInterval(interval);
	$('#timerMsg').css("visibility","hidden");
	questionCounter++;
	if(questionCounter < questionArray.length){
		setTimeout(nextQuestion,3000);
	}
	else{
		setTimeout(score,3000);
	}
}

function score(){
	$question.text("Game completed!");
	for (var i = 0; i < $answers.length; i++) {
		$answers[i].removeClass('answer');
		$answers[i].addClass('scoreCard');
	}
		$answers[0].css('visibility','hidden');
		$answers[1].text('Correct answers: ' + right);
		$answers[2].text('Incorrect answers: ' + wrong);
		$answers[3].text('Missed answers: ' + missed);
	$result.text('Please play again!');
}