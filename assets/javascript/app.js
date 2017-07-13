var interval;
var seconds = 10;
var $question = $("#question");
var $answers = [$('#a1'),$('#a2'),$('#a3'),$('#a4')];
var $timer = $('#timer');
var $result = $('#result');
var selectedAnswer;
var questionCounter = 0;
var questionArray = [new question("How many MLS championships has RSL won?","1","0","2","3"), 
	new question("What year did RSL win the MLS Cup?","2009","2010","2012","2013"),
	new question("Who has scored the most goals for RSL all-time?","Alvaro Saborio","Jason Kries","Yura Movsisian","Nick Rimando"),
	new question("What is the nick name of the stadium RSL plays in?","The RioT","New Delta Center","The Castle","Baseball Sucks"),
	new question("Who is RSL's current head coach?","Mike Petke","Jason Kries","Kyle Beckerman","Jeff Cassar")]

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
	}
	else{
		console.log("incorrect answer chosen");
		$result.text("Wrong! The correct answer is " + questionArray[questionCounter].correct);
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
		alert('game over! Thanks for playing!')
	}
}