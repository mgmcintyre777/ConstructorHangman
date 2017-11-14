var Letter = require('./Letter');

var Word = function(wordString) {
	this.wordString = wordString;
	this.letters = wordString
		.split("")
		.map(char => new Letter(char));
}

Word.prototype.display = function(guessedChars) {
	return this.letters
		.map(letter => {
			return letter.display(guessedChars.includes(letter.char));
		}).join('');
}

Word.prototype.isWordGuessed = function(guessedChars) {
	return this.letters.every(letter => 		
		guessedChars.includes(letter.char)	
	);
}

Word.prototype.containsChar = function(char) {
	return this.letters.some(letter =>
		letter.char === char
	);
}

module.exports = Word;