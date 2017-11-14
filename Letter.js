var Letter = function(char) {
	this.char = char;
	this.blank = '_';
}

Letter.prototype.display = function(isGuessed) {
	return isGuessed ? 
		this.char + ' ' : 
		this.blank + ' ';
}

module.exports = Letter;