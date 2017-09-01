"use strict";

let difficulty = "";
let minLength = 0;
let maxLength = 0;
let lives = 0;
let username = "";
let word = "";

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
        word = words[Math.floor(Math.random() * (words.length + 1))];
        console.log(word);
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
    username = userSelect.options[userSelect.selectedIndex].value;
    if (difficulty != "" && username != "") {
        selectWord();
        let hangmanInput = document.getElementById("hangmanInput");
        // create a-z buttons
        hangmanInput.innerHTML = "";
        for (let i = 97; i <= 122; i++) {
            hangmanInput.innerHTML += `<button type="button" style="margin-bottom: 5px;" onclick="acceptLetter(${i})">&#${i}</button> `
        }
        document.getElementById("hangmanGame").style = "";
        document.getElementById("settings").style = "display: none;";
        document.getElementById("heading").textContent += ` - ${difficulty}`;
    } else {
        alert("Please select username and difficulty.")
    }
}

function acceptLetter(code) {
    let guess = String.fromCharCode(code);
    if(!word.includes(String.fromCharCode(code))) {
        lives -= 1;
    } else {
        //todo
    }
}

function saveStatistics() {
    //todo
}

function exitGame() {
    saveStatistics();
    document.getElementById("heading").textContent = "Hangman";
    document.getElementById("settings").style = "";
    document.getElementById("hangmanGame").style = "display: none;";
}