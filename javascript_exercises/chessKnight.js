let moves = 0;
let currX = 0;
let currY = 0;
let xMove = 0;
let yMove = 0;

function calcMoves(targetX, targetY) {
    let runs = 0
    while (currX != targetX || currY != targetY) {
        if (currX != targetX) {
            reachCoord("x", targetX, targetY);
        }
        if (currY != targetY) {
            reachCoord("y", targetX, targetY);
        }
        runs += 1;
        if (runs > 20) {
            break;
        }
    }
    console.log(moves + " moves.");
}

function reachCoord(coord, targX, targY) {
    if (coord === "x") {
        while (currX != targX) {
            if (targX > currX) {
                if (targX >= currX + 2) {
                    xMove = 2
                    if (targY > currY) {
                        yMove = 1;
                    } else {
                        yMove = -1;
                    }
                } else {
                    xMove = 1;
                    if (targY > currY) {
                        yMove = 2;
                    } else {
                        yMove = -2;
                    }
                }
            } else if (targX < currX) {
                if (targX <= currX - 2) {
                    xMove = -2;
                    if (targY > currY) {
                        yMove = 1;
                    } else {
                        yMove = -1;
                    }
                } else {
                    xMove = -1;
                    if (targY > currY) {
                        yMove = 2;
                    } else {
                        yMove = -2;
                    }
                }
            }
            currX += xMove;
            currY += yMove;
            moves += 1;
            console.log(currX + " " + currY);
        }
    } else {
        while (currY != targY) {
            if (targY > currY) {
                if (targY >= currY + 2) {
                    yMove = 2
                    if (targX > currX) {
                        xMove = 1;
                    } else {
                        xMove = -1;
                    }
                } else {
                    yMove = 1;
                    if (targX > currX) {
                        xMove = 2;
                    } else {
                        xMove = -2;
                    }
                }
            } else if (targY < currY) {
                if (targY <= currY - 2) {
                    yMove = -2;
                    if (targX > currX) {
                        xMove = 1;
                    } else {
                        xMove = -1;
                    }
                } else {
                    yMove = -1;
                    if (targX > currX) {
                        xMove = 2;
                    } else {
                        xMove = -2;
                    }
                }
            }
            currX += xMove;
            currY += yMove;
            moves += 1;
            console.log(currX + " " + currY);
        }
    }
}

function endMoves() {
    
}

calcMoves(9, 9);