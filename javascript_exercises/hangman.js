"use strict";

let difficulty = "";
let minLength = 0;
let maxLength = 0;
let lives = 0;
let username = "";
let word = "";
let wordSize = 0;
let blanksFilled = 0;
let guesses = [];
let correctGuesses = [];
let lettersY = 0;
let increasing = true;
let win = false;
let wordFound = false;

let ropeEndPoint = {
    x: 790,
    y: 150
};
let ropeControlPoint = {
    x: 790,
    y: 155
};

let sketch = function (p) {
    let gapWidth = 0;
    let lineSize = 0;
    let currentX = 0;
    p.setup = function () {
        p.createCanvas(1000, 400);
        p.frameRate(40);
    }

    p.draw = function () {
        if (wordFound) {
            let wordWidth = p.width - 450 - 10 * wordSize;
            let blanksY = p.height - 50;
            p.background(72);
            p.stroke(240);
            gapWidth = 150 / wordSize;
            currentX = gapWidth + 10;
            lineSize = ((wordWidth - gapWidth * 2 - (gapWidth) * wordSize) / wordSize) + gapWidth / wordSize;
            lettersY = blanksY - lineSize / 10;
            for (let i = 0; i < wordSize; i++) {
                p.line(currentX, blanksY, currentX + lineSize, blanksY);
                currentX += lineSize + gapWidth;
            }
            wordFound = false;
        }
        //Draw the letters
        p.textSize(lineSize);
        p.noStroke();
        p.fill(220);
        if (lives > 0) {
            correctGuesses.forEach((g) => {
                g.positions.forEach((i) => {
                    currentX = gapWidth + 10 + (lineSize + gapWidth) * i;
                    p.text(g.letter, currentX + (lineSize - p.textWidth(g.letter)) / 2, lettersY);
                });
            });
        } else if (!win && lives == 0) {
            currentX = gapWidth + 10;
            for (let i = 0; i < wordSize; i++) {
                p.text(word[i], currentX + (lineSize - p.textWidth(word[i])) / 2, lettersY);
                currentX += lineSize + gapWidth;
            }
        }
        //Draw the scene
        p.noStroke();
        p.fill(220);
        p.textSize(30);
        p.text("Your guesses:\n" + guesses, 25, 45);
        p.fill(127, 176, 255);
        p.rect(525, 25, 450, 270);
        p.fill(48, 183, 44);
        p.rect(525, 295, 450, 80);
        p.fill(0);
        p.textSize(50);
        if (win) {
            p.text("You survived!", 550, 75);
        } else if (lives > 0) {
            p.text(`Lives left: ${lives}`, 550, 75);
        } else {
            p.text("You Lose", 550, 75);
        }
        //Draw the hanged man
        p.fill(119, 55, 5);
        if (lives < 10)
            p.rect(620, 305, 200, 8);
        if (lives < 9)
            p.rect(650, 105, 5, 200);
        if (lives < 8)
            p.rect(650, 105, 150, 5);
        p.strokeWeight(2);
        p.stroke(56, 52, 8);
        p.noFill();
        if (lives < 7)
            p.curve(790, 100, 790, 110, ropeEndPoint.x, ropeEndPoint.y, ropeControlPoint.x, ropeControlPoint.y);
        p.fill(0);
        p.noStroke();
        if (lives < 6)
            p.ellipse(ropeEndPoint.x, ropeEndPoint.y + 10, 35, 35);
        let torsoEndPoint = {
            x: ropeEndPoint.x + ((790 - ropeEndPoint.x) / 4),
            y: ropeEndPoint.y + 70
        }
        p.stroke(0);
        if (lives < 5)
            p.line(ropeEndPoint.x, ropeEndPoint.y, torsoEndPoint.x, torsoEndPoint.y);
        if (lives < 4)
            p.line(torsoEndPoint.x, torsoEndPoint.y - 40, torsoEndPoint.x + 6, torsoEndPoint.y + 5);
        if (lives < 3)
            p.line(torsoEndPoint.x, torsoEndPoint.y - 40, torsoEndPoint.x - 6, torsoEndPoint.y + 5);
        if (lives < 2)
            p.line(torsoEndPoint.x, torsoEndPoint.y, torsoEndPoint.x + 4, torsoEndPoint.y + 60);
        if (lives == 0) {
            p.line(torsoEndPoint.x, torsoEndPoint.y, torsoEndPoint.x - 4, torsoEndPoint.y + 60);
            p.noStroke();
            p.fill(0);
            p.textSize(50);
            p.text("You Lose", 550, 75);
            if (increasing) {
                ropeEndPoint.x += 0.1;
                ropeControlPoint.x += 0.8;
            } else {
                ropeEndPoint.x -= 0.1;
                ropeControlPoint.x -= 0.8;
            }
            if (ropeEndPoint.x >= 795) {
                increasing = false;
            }
            if (ropeEndPoint.x <= 785) {
                increasing = true;
            }
        }
    }
};

function selectWord() {
    let requestURl = 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt';
    let request = new XMLHttpRequest();
    let words = [""];
    request.open('GET', requestURl);
    request.send();
    request.onload = function () {
        let data = request.response;
        words = data.split("\n");
        for (let i = words.length - 1; i >= 0; i--) {
            if (!(words[i].length <= maxLength && words[i].length >= minLength)) {
                words.splice(i, 1);
            }
        }
        word = words[Math.floor(Math.random() * (words.length))];
        wordSize = word.length;
        wordFound = true;
        ropeEndPoint.x = 790;
        ropeEndPoint.y = 150;
        ropeControlPoint.x = 790;
        ropeControlPoint.y = 155;
    }
}

function createUser() {
    let usernameInput = document.getElementById("usernameInput");
    let userSelect = document.getElementById("userSelect");
    let userExists = false;
    let username = usernameInput.value;
    for (let i = 0; i < userSelect.length; i++) {
        if (userSelect.options[i].value == username) {
            userExists = true;
        }
    }
    if (!userExists) {
        userSelect.innerHTML += `<option value="${username}">${username}</option>`;
        userSelect.options[userSelect.length - 1].selected = true;
    }
    usernameInput.textContent = "";
}

function deleteUser() {
    let userSelect = document.getElementById("userSelect");
    if (confirm("Are you sure you want to delete the selected user? (This will also delete saved statistics)")) {
        userSelect.remove(userSelect.selectedIndex);
    }
}

function setDifficulty(diff) {
    let easyButton = document.getElementById("easyButton");
    let mediumButton = document.getElementById("mediumButton");
    let hardButton = document.getElementById("hardButton");
    difficulty = diff;
    easyButton.style = "";
    mediumButton.style = "";
    hardButton.style = "";
    switch (diff) {
        case "easy":
            easyButton.style = "background-color: #484848; color: #FFFFFF;";
            minLength = 7;
            maxLength = 10;
            lives = 10;
            break;
        case "medium":
            mediumButton.style = "background-color: #484848; color: #FFFFFF;";
            minLength = 3;
            maxLength = 6;
            lives = 7;
            break;
        case "hard":
            hardButton.style = "background-color: #484848; color: #FFFFFF;";
            minLength = 3;
            maxLength = 6;
            lives = 5;
            break;
    }
}

function startGame() {
    let userSelect = document.getElementById("userSelect");
    if (userSelect.options.length > 0) {
        username = userSelect.options[userSelect.selectedIndex].value;
        if (difficulty != "" && username != "") {
            selectWord();
            let hangmanInput = document.getElementById("hangmanInput");
            // create a-z buttons
            hangmanInput.innerHTML = "";
            for (let i = 97; i <= 122; i++) {
                hangmanInput.innerHTML += `<button type="button" class="hangman-input" onclick="acceptLetter(${i})">&#${i}</button> `
            }
            document.getElementById("hangmanGame").style = "";
            document.getElementById("settings").style = "display: none;";
            document.getElementById("heading").textContent += ` - ${difficulty}`;
        } else {
            alert("Please select difficulty.");
        }
    } else {
        alert("Please enter and/or select username.");
    }
}

function acceptLetter(code) {
    if (lives > 0 && !win) {
        let guess = String.fromCharCode(code);
        if (!word.includes(String.fromCharCode(code)) && !guesses.includes(guess)) {
            lives -= 1;
        } else {
            let positions = [];
            for (let i = 0; i < word.length; i++) {
                if (word.charAt(i) == guess) {
                    positions.push(i);
                }
            }
            blanksFilled += positions.length;
            correctGuesses.push({
                letter: guess,
                positions: positions
            });
        }
        if (!guesses.includes(guess)) {
            guesses.push(guess);
        }
        if (blanksFilled == wordSize) {
            win = true;
        }
    }
}

function saveStatistics() {
    //todo
}

function exitGame() {
    saveStatistics();
    difficulty = "";
    minLength = 0;
    maxLength = 0;
    lives = 0;
    username = "";
    word = "";
    wordSize = 0;
    blanksFilled = 0;
    guesses = [];
    correctGuesses = [];
    lettersY = 0;
    increasing = true;
    win = false;
    wordFound = false;
    document.getElementById("heading").textContent = "Hangman";
    document.getElementById("settings").style = "";
    document.getElementById("hangmanGame").style = "display: none;";
}

new p5(sketch, "canvas");