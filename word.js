var wordlist = ["Chicken", "Mongoose", "Jellyfish", "Squirrel", "Porcupine", "Alligator", "Pelican", "Beaver"];

var Word = function(word) {
	this.letters = word
		.split("")
		.map(char => new Letter(char, '*'));
}

Word.prototype.display = function(guessedLetters) {
	return this.letters
		.map(letter => {
			guessedLetters.indexOf(letter) > -1 ?
			letter.display(true):
			letter.display(false);
			})
		.join();
}

var Letter = function(char, blank) {
	this.char = char;
	this.blank = blank;
}

Letter.prototype.display = function(isGuessed) {
	return isGuessed ?
		this.char:
		this.blank;
}

var word = new Word(wordlist[Math.floor(wordlist.length * Math.random())]);
console.log(word.display(['a', 'e', 'i', 'o', 'u']));
