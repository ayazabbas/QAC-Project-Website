let word = "hello";
let wordSize = word.length;
let lettersX = [];
let lettersY = 0;

function setup() {
    createCanvas(1300, 400);
    let wordWidth = width - 500 - 10*wordSize;
    frameRate(5);
    let gapWidth = 150/wordSize;
    let lineSize = ((wordWidth - gapWidth*2 - (gapWidth)*wordSize) / wordSize) + gapWidth / wordSize;
    let currentX = gapWidth;
    let yCoord = height - 50;
    background(72);
    textSize(lineSize);
    fill(220)
    for (let i = 0; i < wordSize; i++) {
        stroke(220);
        line(currentX, yCoord, currentX+lineSize, yCoord);
        text(word[i], currentX+(lineSize-textWidth(word[i]))/2, yCoord-lineSize/10);
        lettersX.push(currentX+(lineSize-textWidth(word[i]))/2);
        lettersY = yCoord-lineSize/10;
        currentX += lineSize + gapWidth;
    }
    fill(0);
    rect(825, 25, 450, 350);
}

function draw() {
    
}