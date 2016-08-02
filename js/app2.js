// ########################################
/*
*	Table of Contents
*	1)	Initialization of Variables
*	2)	Parent Function
*	3)	Child Functions
*			a) initLoad( ) 
*			b) newGame( )
*			c) gameRunning( ) 
*	4)	Sibiling Functions
*			a) randomNumber( )
*           b) guessCounter( )
*           c) validateGuess( )
*           d) gameFeedback( )
*           e) winnerFeedback( )
*           f) trackUserGuess( )
*           g) resetVariables( )
*           h) reloadElements( )
*/

// ####################################################
/* ---------- Initialization of Variables ---------- */
// ####################################################

var max = 100;                                  // represents max value for range of random number generator.
var ran_num;                                    // represents the equation for generating a random number.
var counter = 0;                                // represents the counter for the user's guesses.
var userInput;                                  // represents the user's guess as a string.
var int_Input;                                  // represetns the user's guess as an integer.
var prevGuesses = [];                           // represents the array that will hold user's previous guesses.
var num_Guessed;                                // represents the user's guess for verifying if it has been chosen already.
var userFeedback;                               // represents the strings that provide feedback to the user.
var whatLink = $(".what");                      // represents the html link for opening the instruction box.
var instructionBox = $(".overlay");             // represents the html overlay that fades in & out for the instructions.
var closeWhatLink = $("a.close");               // represents the html link for closing the instruction box.
var newButtonElement = $('a.new');              // represents the html link for a New Game in the script.
var gameForm = $('#hotncold-form');             // represents the html form in the script.
var guessListElement = $('#guessList');         // represents the <ul> that will hold the user's guesses.
var feedbackElement = $('#feedback');           // represents the html area in which the feedback will be printed.
var inputElement = gameForm.find('#userGuess'); // represents the html input in which the user submits the guessed nubmer.
var counterElement = $('#count');               // represents the html span that will keep the number of user guesses made.
var inProgressHtml;                             // represents what will render to the page while game is in progress.
var collection = [
                    {result: "Scortching!",value: "5",},
                    {result: "Hot!",value: "10",},
                    {result: "Warm.",value: "25",},
                    {result: "Lukewarm.",value: "50",},
                    {result: "Cold.",value: "80",},
                    {result: "Ice Cold!",value: "100",},
                ];

// ########################################
/* ---------- Parent Function ---------- */
// ########################################
// This function will be the frist read of the script after the DOM has loaded.
// It will do an initial load of the elements at their starting points.

$(document).ready(initLoad);

// ########################################
/* ---------- Child Functions ---------- */
// ########################################

/* ---------- a) initLoad Function ---------- */
// This function will be the initial load to the DOM.
// All elements will be at their starting point.

function initLoad()
{
    console.log('page load');

    /*--- Display information modal box ---*/
    whatLink.click(function()
    {
        instructionBox.fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    closeWhatLink.click(function()
    {
        instructionBox.fadeOut(1000);
    });

    /*--- Begins the game & reloads spedific DOM elements that will change throughout the game. ---*/
    newButtonElement;
    gameForm;
    feedbackElement;
    inputElement;
    guessListElement;
    counterElement;
    newGame();

    /*--- Events for the browser to listen for ---*/
    gameForm.submit(function(e)  				   // Listen for user submission.
    {
        e.preventDefault();
        gameRunning();
    });
    newButtonElement.click(newGame);               // Listen for user click on New Game html.
};

/* ---------- b) newGame Function ---------- */
// This function will be what loads when the user selects to start a new game or what will run the first time after the initial page load.
// It will reload the page and reset all variables and arrays as well as generate a new random number.

function newGame()
{
    gameForm.find('input[type=submit]'); 
    resetVariables();
    reloadElements();
    randomNumber();
};

/* ---------- c) gameRunning Function ---------- */
// This function is the actual running process of the game as the user interacts.
// It will take in the user's guess, run the guess against a validation check,
// provide feedback to the user, record the guess in an array that prints to the screen,
// and increase the user's guess count by +1 for every iteration.

function gameRunning()
{

    userInput = inputElement.val();        		// user's guess.
    inputElement.val('');                  	 	// clears the input box for next user guess.
    if (validateGuess())						// runs validation check of user's guess.
    {
    	gameFeedback();                         // provides feedback to user about guess.
    	trackUserGuess();                       // records user's guess.
    	guessCounter();                         // counts user's guess to total guesses for the game.
    	reloadElements();                       // updates browser with user's previous guess, guess count.
    }; 					
   
};

// ###########################################
/* ---------- Sibiling Functions ---------- */
// ###########################################

/* ---------- a) randomNumber Function ---------- */
// This function is our random number generator for the game.

function randomNumber()
{
    console.log('random number generated');
    ran_num = Math.floor(Math.random() * max) + 1;
    console.log('random number is ' + ran_num);
};

/* ---------- b) guessCounter Function ---------- */
// This function counts the attemps made by the user in the current game.

function guessCounter()
{
    console.log('counter +1');
    counter++; // increase var counter by +1 every iteration.
};

/* ---------- c) validateGuess Function ---------- */
// This function will validate that the user's guess is within the parameters needed to run the program properly.

function validateGuess()
{
	var int_Input = parseFloat(userInput);					 // changes from string to integer.
    console.log('validation started');
    											     // switch statement evaluates each case as true if conditional is met
    											     // the function returns it as a false value to say the user's choice is an invalid input.
    switch(true)									
    {
    												 // case 1: Evaluates if user has input a whole number using modulus operand.
        case (int_Input % 1 !== 0):
            console.log('Not a whole number');
            alert('Please input a whole number.');
            break;
            										  // case 2: Evaluates if the user's input is between 1 & 100.
        case (int_Input < 1 || int_Input > 100):
            console.log('Not between 1 & 100');
            alert('Please input a number between 1 & 100.');
            break;
            										  // case 3: Evaluates if:
            										  //		a) user has input anything at all before submitting.
            										  //		b) user's input has been used already.
        case (prevGuesses.length > 0):
        	num_Guessed = false;
            $.each(prevGuesses,function(guess, value)
            {
                if(userInput === value)
                {
                    num_Guessed = true;
                };
            });
            if(num_Guessed == false)
            {
            	return true;
            }
        	else
        	{
        		console.log('Already guessed');
            	num_Guessed = false;
            	alert('You have already guessed this number.');
        	}
            break;
            										  // default case: Evaluates as true if all prior cases are false.
        default:
        	return true;
    };
return false;
};

/* ---------- d) gameFeedback Function ---------- */
// This function will validate the user's guess against our random number.
// There are multiple condition checks for how "hot" or "cold" the user is to the random number.
// This function does not yield a winning feedback, only incorrect guess feedback.

function gameFeedback()
{
	var int_Input = parseFloat(userInput);				// changes from string to integer.
    
    (function()
        {
            "use strict";

            var collection = 
            [
                {
                    result: "Scortching!",
                    value: "5",
                },
                {
                    result: "Hot!",
                    value: "10",
                },
                {
                    result: "Warm.",
                    value: "25",
                },
                {
                    result: "Lukewarm.",
                    value: "50",
                },
                {
                    result: "Cold.",
                    value: "80",
                },
                {
                    result: "Ice Cold!",
                    value: "100",
                },
            ]

            var result = _.find(collection, function(result)
            {
                return Math.abs(ran_num - int_Input) < 5;
                return Math.abs(ran_num - int_Input) < 10;
                return Math.abs(ran_num - int_Input) < 25;
                return Math.abs(ran_num - int_Input) < 50;
                return Math.abs(ran_num - int_Input) < 80;
                return Math.abs(ran_num - int_Input) < 100;
            });
            console.log(result);
        }());
};

/* ---------- e) winnerFeedback Function ---------- */
// This function will validate that the user's guess matches the random number.
// The function will then yield a winning feedback message to the user.

function winnerFeedback()
{
    console.log("winner");
    userFeedback = "You guessed the correct number! Click New Game to play again.";
    gameForm.find('input[type=submit]');
};

/* ---------- f) trackUserGuess Function ---------- */
// This function will track the user's guesses throughout the game.
// It will then take the user's previous guesses and store them in an array.
// That array will print the value to the screen for the user's benefit of knowing what they have chosen.

function trackUserGuess()
{
    prevGuesses.push(userInput);                            // Pushes userInput to the array prevGuesses[ ].
    if (prevGuesses[0].length)
    {
    	inProgressHtml = '';                                // Clears the html element to prevent array from printing x, then x & y, then x, y, & z, etc.
        $.each(prevGuesses,function(guess,value)
        {
            inProgressHtml += '<li>' + value + '</li>';     // Prints the userInput represented by value to the <ul> as a <li> element.
        });
    }
};

/* ---------- g) resetVariables Function ---------- */
// This function will reset all variables that are visually represented to the user during the game to their initial values.

function resetVariables()
{
    console.log('variables reset');
    counter = 0;
    console.log('counter = ' + counter);
    prevGuesses = [];
    console.log('array = ' + prevGuesses);
    inProgressHtml = '';
    console.log('inProgressHtml = ' + inProgressHtml);
    userInput = '';
    console.log('userInput = ' + userInput);
    userFeedback = 'Make your Guess!';
    console.log('userFeedback = ' + userFeedback);
};

/* ---------- h) reloadElements Function ---------- */
// This function will reload the following html elements after every iteration of the 'if' statement in gameRunning( ).
// It's purpose is to refresh the page with the new data entered by the user and provide the feedback to continue playing.

function reloadElements()
{
    guessListElement.html(inProgressHtml);                  // Pushes user's list of already used guesses to #guessList html element.
    feedbackElement.html(userFeedback);                     // Pushes user feedback to #feedback html element.
    counterElement.html(counter);                           // Pushes users number of guesses to #count html element.
};



