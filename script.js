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
let time = 10;

// Generate Random Line from Array
function getRandomLine() {
    return lines[Math.floor(Math.random() * lines.length)];
};

// console.log(getRandomLine());

// Add Line to DOM
function addLineToDOM() {
    randomLine = getRandomLine();
    word.innerHTML = randomLine;
};

addLineToDOM();

// Updating Score
function updateScore() {
    score+= (randomLine.split(" ").length);
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