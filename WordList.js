var WordList = function() {
	
	this.wordlist = [
		"Chicken", 
		"Mongoose", 
		"Jellyfish", 
		"Squirrel", 
		"Porcupine", 
		"Alligator", 
		"Pelican", 
		"Beaver",
		"Man-At-War",
	];

	
	this.getRndWord = function() {
		return this.wordlist[Math.floor(this.wordlist.length * Math.random())]
			.toUpperCase();
	}
}

module.exports = WordList;