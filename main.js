/*
Game Function
- Player must guess a number between a min and max 
- Player gets a certain amount of guesses 
- Notify player of guesses remaining 
- Notify the player of the correct answer if loose
- Let player choose to play again 
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min,max),
    guessesLeft = 3;
//UI elements
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;
// Play again event listener
game.addEventListener('mousedown', playAgainFun);

//Listen for guess
guessBtn.addEventListener('click', getGuessNumber);

// event function for play again
function playAgainFun(e){
    if(e.target.className ==='play-again'){
      window.location.reload();  
    }
} 
//get guess number
function getGuessNumber(){
    let guess = parseInt(guessInput.value);
    //validate 
    if (isNaN(guess) || guess < min || guess > max ){
       setMessage(`Please enter a number between ${min} and ${max}`,'red'); 
    }else{
        // Check if won
    if(guess === winningNum){
        //Disable input
        guessInput.disabled = true;
        //Change border color to green
        guessInput.style.borderColor = 'green';
        //Set message
        setMessage(`You Win, ${winningNum} is correct.`,'green');
        //Play Again?
        playAgain();
    } else {
        // Wrong guess
        guessesLeft -= 1
        if(guessesLeft === 0){
            guessInput.disabled = true;
            //Change border color to red
            guessInput.style.borderColor = 'red';
            //Set message
            setMessage(`Game Over, you lost. The correct number was ${winningNum}`,'red'); 
            //Play Again?
            playAgain();
        } else {
            //Change border color to blue
            guessInput.style.borderColor = 'blue';
            setMessage(`${guess} is wrong, you have ${guessesLeft} guesses left. Try again`,'blue');
        };
        }
    }
};
//Play Again?
function playAgain(){
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
};

//generate random winning number
function getWinningNum(){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg,color){
    message.style.color = color;
    message.textContent = msg;
} 