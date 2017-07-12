var interval;
var seconds = 10;

interval = setInterval(countdown,1000);

function countdown(){
	seconds--;
	$('#timer').text(seconds);
	if(seconds <=0){
		timeUp();
	}
}

function timeUp(){
	clearInterval(interval);
	seconds = 10;
}