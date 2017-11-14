'use strict'

const HangMan = require('./HangMan');
const WordList = require('./WordList');
const art = require('./AsciiArt');
const chalk = require('chalk');
const inquirer = require('inquirer');
const clear = require('clear');
const log = console.log;
const wordList = new WordList();
const sb = {wins: 0, loses: 0};

const guessALetter = [{
	type: "input",
	name: "userGuess",
	message: "Guess a Letter:",			
	filter: input => input.toUpperCase(),
	validate: input => {
		return input.length == 1 && /[A-Z]/.test(input) ?
		!hangMan.guessedChars.includes(input) ?
			true :
			`Already guessed ${input}, try again` :
			`${input} is not a letter, try again`;
	}
}];

const playAgain =	[{
	type: "confirm",
	name: "userAnswer",
	message: "Would you like to play again?"
}];

var hangMan;
startNewGame();

function startNewGame(){	
	hangMan = new HangMan(wordList.getRndWord(), 6);
	logToConsole(hangMan.getGameState());
	askForLetter();
}

function askForLetter(){
	inquirer.prompt(guessALetter)
	.then(answer =>	{
		hangMan.guess(answer.userGuess);
		var state = hangMan.getGameState();
		logToConsole(state);
		state == "playing" ?
			askForLetter() :
			askToPlayAgain();
	});
}

function askToPlayAgain(){
	inquirer.prompt(playAgain)
	.then(answer => {
		answer.userAnswer ?
			startNewGame():
			log("Thanks for playing!");
	});
}

function logToConsole(state){

	if (state === "won") sb.wins++;
	if (state === "lost") sb.loses++;

	clear();
	log('');
	log(chalk.red.bold(art[1]));
	log(` Wins: ${sb.wins}, Loses: ${sb.loses}`);	
	log(chalk.blue(art[0][hangMan.guessesRemaining]));	
	log('');
	log(' ' + chalk.yellow("Target Word:") +
		' ' + chalk.green.bold(hangMan.displayWord()));

	if (state === "playing") {
		hangMan.guessedChars.length > 2 ?
			log(' ' + chalk.cyan(`${hangMan.displayGuesses()}`)) :
			log('');
			log('');
	} else  if (state === "won") {
		log(' ' + chalk.cyan("Congratulations, You Win!!"));
		log(' ' + chalk.green("You're alive, The mob is disappointed .."));
	} else {
		log(' ' + chalk.cyan("Woops, it was " + hangMan.word.wordString));
		log(' ' + chalk.red("You are dead, the crowd cheers!!"));	}

	log('');
}