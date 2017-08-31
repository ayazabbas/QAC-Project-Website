

let words;
let currWord;
let myH1 = document.createElement('h1');
let displayedWord = "";
let images = ["img/0.png",
    "img/1.png",
    "img/2.png",
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/7.png"]
let life = 0;
let level = 0;

function loadWords() {
    let requestURl = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';
    let request = new XMLHttpRequest();
    request.open('GET', requestURl);
    request.send();
    request.onload = function () {
        let data = request.response;
        words = data.split("\n");
    }
}
//to use recursion to find a word for the chosel level.
function selectWords() {
    let rand = Math.floor(Math.random() * words.length);
    currWord = words[rand];
    if (level === 0) {
        if (currWord.length <= 7) {
            selectWords();
        }
    } else if (level === 1) {
        if (currWord.length >= 7 || currWord.length <= 5) {
            selectWords();
        }
    } else if (level === 2) {
        if (currWord.length >= 5) {
            selectWords();
        }
    }
}

function pickWord() {
    gameStart();
    displayedWord = "";
    if (document.getElementById('easy').checked) {
        level = 0;
    } else if (document.getElementById('medium').checked) {
        level = 1;
    } else if (document.getElementById('hard').checked) {
        level = 2;
    }
    selectWords();
    console.log(currWord);
    for (let i = 0; i < currWord.length - 1; i++) {
        displayedWord += '_';
    }
    displayWord();
    document.getElementById('startButton').value = "Refresh";
}

function displayWord() {
    console.log(images[life]);
    document.getElementById('imgID').src = images[life];
    document.getElementById("myword").innerHTML = "";
    for (let i = 0; i < displayedWord.length; i++) {
        document.getElementById("myword").innerHTML += (" " + displayedWord.charAt(i) + " ");
    }
}

function gameOver() {
    document.getElementById('a').disabled = true;
    document.getElementById('b').disabled = true;
    document.getElementById('c').disabled = true;
    document.getElementById('d').disabled = true;
    document.getElementById('e').disabled = true;
    document.getElementById('f').disabled = true;
    document.getElementById('g').disabled = true;
    document.getElementById('h').disabled = true;
    document.getElementById('i').disabled = true;
    document.getElementById('j').disabled = true;
    document.getElementById('k').disabled = true;
    document.getElementById('l').disabled = true;
    document.getElementById('m').disabled = true;
    document.getElementById('n').disabled = true;
    document.getElementById('o').disabled = true;
    document.getElementById('p').disabled = true;
    document.getElementById('q').disabled = true;
    document.getElementById('r').disabled = true;
    document.getElementById('s').disabled = true;
    document.getElementById('t').disabled = true;
    document.getElementById('u').disabled = true;
    document.getElementById('v').disabled = true;
    document.getElementById('w').disabled = true;
    document.getElementById('x').disabled = true;
    document.getElementById('y').disabled = true;
    document.getElementById('z').disabled = true;
}
function gameStart() {
    document.getElementById('banner').innerHTML = "";
    document.getElementById('a').disabled = false;
    document.getElementById('b').disabled = false;
    document.getElementById('c').disabled = false;
    document.getElementById('d').disabled = false;
    document.getElementById('e').disabled = false;
    document.getElementById('f').disabled = false;
    document.getElementById('g').disabled = false;
    document.getElementById('h').disabled = false;
    document.getElementById('i').disabled = false;
    document.getElementById('j').disabled = false;
    document.getElementById('k').disabled = false;
    document.getElementById('l').disabled = false;
    document.getElementById('m').disabled = false;
    document.getElementById('n').disabled = false;
    document.getElementById('o').disabled = false;
    document.getElementById('p').disabled = false;
    document.getElementById('q').disabled = false;
    document.getElementById('r').disabled = false;
    document.getElementById('s').disabled = false;
    document.getElementById('t').disabled = false;
    document.getElementById('u').disabled = false;
    document.getElementById('v').disabled = false;
    document.getElementById('w').disabled = false;
    document.getElementById('x').disabled = false;
    document.getElementById('y').disabled = false;
    document.getElementById('z').disabled = false;
}

function checkFor(letter) {
    document.getElementById(letter).disabled = true;
    let lettersLeft = 0;
    let found = false;
    console.log();
    for (let i = 0; i < currWord.length; i++) {
        if (currWord[i] == letter) {
            found = true;
            displayedWord = displayedWord.substr(0, i) + letter + displayedWord.substr(i + 1);
        } else if (displayedWord[i] == '_') {
            lettersLeft++;
        }
    }
    if (lettersLeft === 0) {
        document.getElementById('banner').innerHTML = "That was lucky.";
        gameOver();
    }
    if (!found) {
        life++;
        if (life === 7) {
            document.getElementById('banner').innerHTML = "You are such a loser.";
            gameOver();
        }
    }
    console.log(displayedWord);
    displayWord();
}





loadWords();