let hangmanImage = document.querySelector(".hangman-box img")
let wordDisplay = document.querySelector(".word-display")
let keyboardDiv = document.querySelector(".keyboard")
let guessesText = document.querySelector(".guesses-text b")
let gameModals = document.querySelector(".game-modal")
let playAgainBtn = document.querySelector(".play-again")



let currentWord;
let wrongGuessCount;
let correctLetters;
let MaxGuesses = 6;


let resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0
    hangmanImage.src = `/HangMan-Game/images/hangman-${wrongGuessCount}.svg`
    guessesText.innerText = `${wrongGuessCount} / ${MaxGuesses}`
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("")
    gameModals.classList.remove("show")
}


let getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

let gameOver = (isVictory) => {
    setTimeout(() => {
        let modalText = isVictory ? `You Found The Word:` : `The Correct Word Was:`;
        gameModals.querySelector("img").src = `/HangMan-Game/images/${isVictory ? "victory" : "lost"}.gif`
        gameModals.querySelector("h4").innerText = `${isVictory ? "Congrats!" : "Game Over!"}`
        gameModals.querySelector("p").innerText = `${modalText} ${currentWord}`
        gameModals.classList.add("show")
    }, 300)
}


let initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guesses");
            }
        })
    }else {
        wrongGuessCount++
        hangmanImage.src = `/HangMan-Game/images/hangman-${wrongGuessCount}.svg`
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${MaxGuesses}`

    if(wrongGuessCount === MaxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

}


for (let i = 97; i <= 122; i++) {
    let button = document.createElement("button");
    button.innerText = (String.fromCharCode(i));
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord)