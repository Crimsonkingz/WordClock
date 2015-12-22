'use strict';

var units = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var teens = ["eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
var tens = ["ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

var thousands = ["thousand", "million", "billion", "trillion", "f**kton"];

var wordNumbers = [];


var groupedNumbers = [];


//	23,786,065 --> [23,786,065]
//	length = 3
//	i =  0, 1, 2
//

// var deleteZeroes = new RegExp("s/0*(\d+)/$1/");


var toWords = function(numberString) {
	
	

	
	wordNumbers = [];
	var groupedNumbers = [];	
	var suffixes = [];
	var finalWord = '';

	groupedNumbers = splitByThousands(numberString);	
	for (var i  = 0; i < groupedNumbers.length; i++) {

		var numDigits = groupedNumbers[i].toString().length;

		// If only units then use units array only
		if (numDigits === 1) {
			wordNumbers.push(units[groupedNumbers[i]]);
		}
		// If a tens then send to the tens handling function
		else if (numDigits === 2) {
			wordNumbers.push(changeTens(groupedNumbers[i]));
		}
		// If a hundreds then send to the hundreds handling function
		else if (numDigits === 3) {
			wordNumbers.push(changeHundreds(groupedNumbers[i]));
		}	
	}

	
	// Add appropriate thousand based suffixes to an array
	for (var j = wordNumbers.length-1; j > 0; j--) {
		suffixes.push(thousands[j-1]);
	}

	// If the last set of digits is zero (e.g. 18 000 --> [18, 0]) then pop off the "zero"
	// Otherwise it outputs "eighteen thousand and zero"
	if (wordNumbers.length > 1 && wordNumbers[wordNumbers.length-1] === "zero") {
		wordNumbers.pop();
	}

	// Stick the final string together from the numbers and suffixes
	for (var k = 0; k < wordNumbers.length; k++) {
		if (suffixes[k]) {
			finalWord += wordNumbers[k] + " " + suffixes[k];
		}
		else {
			finalWord += " " + wordNumbers[k];
		}
	}

	return finalWord;
}

// Splits a number into powers of 10^3 which leaves digits at 999 or less at each array index
// essentially base 1000 to fit with our 10^3 based suffixes 
// e.g. 9786 = 786 * (10^3)^0 + 9 * (10^3)^1 ---> [9,786]
var splitByThousands = function(numToSplit) {
	var splitNumbers = [];
	var tempSplit;

	var x = parseInt(numToSplit, 10);
	for (var i = numToSplit.length-1; i >= 0; i--) {
		if(i % 3 === 0) {

			tempSplit = Math.floor(x/Math.pow(10,i));			
			splitNumbers.push(tempSplit);

			// Get rid of the part added to the array by diving by 10^i and only taking the remainder
			var divider = Math.pow(10, (Math.floor(Math.log10(tempSplit))));			
			x = x % Math.pow(10,i);
		}
	}
	return splitNumbers;
};




// Changes any two digit number into words
// More complicated due to the teens (just like life)
var changeTens = function(tensNum) {
	var firstDig = Math.floor(tensNum/10);
	var secondDig = tensNum % 10;

	var tensString = '';

	if (secondDig === 0) {
		tensString = tens[firstDig - 1];
	}
	else if (firstDig === 1 && secondDig > 0) {
		tensString = teens[secondDig - 1];
	}
	else if (firstDig >= 2 && secondDig === 0) {
		tensString = tens[firstDig - 1];	
	}
	else {
		tensString = tens[firstDig-1] + "-" +units[secondDig];
	}

	return tensString;
};

// Changes any 3 digit number into hundreds and tens and units
// relies on the changeTens function
var changeHundreds = function(hundredsNum) {
	var firstDig = Math.floor(hundredsNum / 100);
	var tensNum = hundredsNum % 100;

	var hundredsString = units[firstDig] + " " + "hundred";

	
	if (tensNum > 0 && tensNum < 10) 
		hundredsString += " " + "and" + " " + units[tensNum];

	else if (tensNum >= 10) {
		hundredsString += " " + "and" + " " + changeTens(hundredsNum % 100);		
	}
	return hundredsString;

};

