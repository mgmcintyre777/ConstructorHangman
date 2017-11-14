var Word = require('./Word');

var HangMan = function(wordString, maxIncorrectGuesses) {
	this.word = new Word(wordString);
	this.guessesRemaining = maxIncorrectGuesses;
	this.guessedChars = [' ', '-'];
}

HangMan.prototype.displayWord = function() {
	return this.word.display(this.guessedChars);
}

HangMan.prototype.displayGuesses = function() {
	return this.guessedChars.slice(2).join();
}

HangMan.prototype.guess = function(char) {
	this.guessedChars.push(char);
	if(!this.word.containsChar(char)) 
		this.guessesRemaining--;  
}

HangMan.prototype.getGameState = function() {	
	return this.guessesRemaining > 0 ? 
	this.word.isWordGuessed(this.guessedChars) ? 
		"won" : 
		"playing" : 
		"lost";
}

module.exports = HangMan;