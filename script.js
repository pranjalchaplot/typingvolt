const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const skip = document.getElementById('skip');
const containerEl = document.getElementById('container')

/// List of Words
const lines = [
    'ornament bizarre soda net relation',
    'shut like erase save tired',
    'the lyrics of the song sounded like fingernails on a chalkboard',
    'shingle color was not something the couple had ever talked about',
    'the pigs were insulted that they were named hamburgers',
    'the secret code they created made no sense, even to them',
    'the fox in the tophat whispered into the ear of the rabbit',
    'the light that burns twice as bright burns half as long',
    'the crowd yells and screams for more memes'
];

// Init word
let randomLine

// Init score
let score = 0;

// Init time
let time = 30;

// Set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Setting Time
function setTime() {
    if (difficultySelect.value === "easy"){
        time = 30;
    } else if(difficultySelect.value === "medium"){
        time = 60;
    } else {
        time = 120;
    }
    timeEl.innerHTML = time + 's';
}
setTime();

// Start Timer
text.addEventListener('click', () => {
    const timeInterval = setInterval(updateTime, 1000)

    // Update Time;
    function updateTime() {
        time--;
        timeEl.innerHTML = time + 's'; 
    
        if(time === 0) {
            clearInterval(timeInterval);
    
            //EndGame
            gameOver();
        }
    }
}, {once : true});

// Generate Random Line from Array
function getRandomLine() {
    return lines[Math.floor(Math.random() * lines.length)];
};


// Add Line to DOM
function addLineToDOM() {
    randomLine = getRandomLine();
    word.innerHTML = randomLine;
};

addLineToDOM();

// Updating Score
function updateScore() {
    console.log(randomLine.split(" ").length);
    if (difficultySelect.value === "easy"){
        score+= 2*(randomLine.split(" ").length);
    } else if(difficultySelect.value === "medium"){
        score+= (randomLine.split(" ").length);
    } else {
        score+= (randomLine.split(" ").length)/2;
    }
    
    scoreEl.innerHTML = `${score}`;
};

// Skip Line
document.body.addEventListener('click', e => {
    if(e.target.id === 'skip') {
        
        //Add Line to DOM
        addLineToDOM();
        insertedText = '';
        // Clear
        document.getElementById('text').value = '';
        return;
    }
});

// Adding Event Listener to Input Text
let insertedText;
text.addEventListener('input', e => {
    insertedText = e.target.value;
    if (insertedText === randomLine) {
        addLineToDOM();
        updateScore();
        
        // Clear
        e.target.value = '';
    }
});

// Game Over Function
function gameOver(){
    containerEl.innerHTML = `
    <h1 id="timeout">Time Ran Out!!</h1>
    <p id="result">Your TypingVolt⚡ Speed is ${score} WPM</p>
    <button id="reload" onclick = "location.reload()">Reload</button>
    `
    endgameEl.style.display = 'flex';
}

// Settings Button Click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings Select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
    location.reload();
  });