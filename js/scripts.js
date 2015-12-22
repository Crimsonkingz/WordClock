'use strict';

var container = document.getElementById("container");

var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var d = new Date();
var hour = d.getHours();
var minute = d.getMinutes();
var ampm = "";

var clockArray = [
["IT","1#","IS","5#"],
["FIVE", "QUARTER"],
["TEN","TWENTY","2#"],
["HALF","2#","FORTY"],
["FIFTY","1#","FIVE","1#"],
["PAST","1#","TO","4#"],
["ONE","TWO","THREE"],
["FOUR","FIVE","SIX"],
["SEVEN","EIGHT","1#"],
["NINE","TEN","4#"],
["ELEVEN","5#"],
["TWELVE","1#","AM","PM"]
];

var populateArrayRandoms = function() {
	for (var i = 0; i < clockArray.length; i++) {		
		for (var j =0; j <clockArray[i].length; j++) {

			var currentItem = clockArray[i][j];
			// Find the # parts that need replacing with a certain number of random letters
			if(currentItem.indexOf('#') !== -1){
				var numRandoms = currentItem.substr(0, currentItem.length-1);
				clockArray[i][j] = randomString(numRandoms);
			}
		}
	}
};

var randomString = function(stringLength) {

	var stringRandoms = '';
	for (var i = 0; i < stringLength; i++) {
		var randomNum = Math.floor(charset.length * Math.random());
		stringRandoms += charset.substr(randomNum, 1);
	}

	return stringRandoms;
};


var init = function(){
	populateArrayRandoms();
	fillClock();
	updateClock();
	

}; 

var updateTime = function() {
	d = new Date();
	hour = d.getHours();
	ampm = "am";

	if (hour > 12 && hour < 24) {
		hour = hour % 12;
		ampm = "pm";
	}
	else if (hour === 24) {
		hour = 12;
		ampm = "am";
	}
	else if (hour === 12) {
		ampm = "pm";
	}
	minute = d.getMinutes();

	
	
};

var updateClock = function() {
	updateTime();	

	var amSpan = document.getElementsByClassName("am")[0];
	var pmSpan = document.getElementsByClassName("pm")[0];

	if (ampm === "am") {
		pmSpan.classList.remove("timeText");
		amSpan.classList.add("timeText");
	}
	else if (ampm === "pm") {
		amSpan.classList.remove("timeText");
		pmSpan.classList.add("timeText");
	}

	var itSpan = document.querySelector(".it");
	var isSpan = document.querySelector(".is");
	itSpan.classList.add("timeText");
	isSpan.classList.add("timeText");

	var timePast = document.querySelector(".past");
	var timeTo = document.querySelector(".to");


	var roundedMinute = 10*Math.round(minute/10);	

	


	if (roundedMinute <= 30) {
		timeTo.classList.remove("timeText");
		timePast.classList.add("timeText");
	}
	else if (roundedMinute > 30) {
		timePast.classList.remove("timeText");
		timeTo.classList.add("timeText");

		hour += 1
		roundedMinute = 60 - roundedMinute;


	}
	
	var hourWord = toWords(hour.toString());
	hourWord = hourWord.replace(/\s+/g, '');

	var minuteWord = toWords(roundedMinute.toString());
	minuteWord = minuteWord.replace(/\s+/g, '');

	clockUpdate(minuteWord, "minutes");	
	clockUpdate(hourWord, "hours");
	
	
};

var fillClock = function() {
	var numRows = document.querySelectorAll(".row").length;

	for (var i=0; i < numRows; i++) {
		var thisRow = document.getElementById("row" + i);
		for (var j = 0; j < clockArray[i].length; j++) {
			thisRow.innerHTML += "<span class='" + clockArray[i][j].toLowerCase() + "'>" + clockArray[i][j] + "</span>";

		}
	}
};

var clockUpdate = function(number, variety) {
	var span;

	var allVariety = document.getElementsByClassName("." + variety);
	for (var i = 0; i < allVariety.length; i++) {
		allVariety.classList.remove("timeText");
	}

	if (number === "thirty") {
		span = document.querySelector(".half");
	}
	else if (number === "fifteen" || (number === "forty-five")) {
		span = document.querySelector(".quarter");
	}
	else {
		span = document.querySelector("." + variety + " " + "." + number);
	}
	span.classList.add("timeText");

}
init();