// Array of possible words
const words = ['apple', 'banana', 'cherry', 'orange', 'grape', 'kiwi', 'melon', 'pear', 'plum', 'peach','strawberry','mango','pear'];
const selectedWord = words[Math.floor(Math.random() * words.length)];

const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const feedbackDiv = document.getElementById('feedback');
function isValidGuess(guess) {
    return /^[a-zA-Z]{5}$/.test(guess) && words.includes(guess.toLowerCase());
}
function checkGuess(guess) {
    let feedback = '';
    for (let i = 0; i < guess.length; i++) {
        if (selectedWord.includes(guess[i])) {
            if (selectedWord.indexOf(guess[i]) === i) {
                feedback += 'O';
            } else {
                feedback += '-';
            }
        } else {
            feedback += 'X';
        }
    }
    return feedback;
}
submitBtn.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    if (isValidGuess(guess)) {
        const feedback = checkGuess(guess);
        feedbackDiv.textContent = feedback;
        if (feedback === 'OOOOO') {
            feedbackDiv.textContent = 'You win! The word was ' + selectedWord.toUpperCase();
            submitBtn.disabled = true;
            guessInput.disabled = true;
        }
    } else {
        alert('Please enter a valid 5-letter word from the list.');
    }
    guessInput.value = '';
});
