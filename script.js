

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var map = [
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1
];

var mapX = 8;
var mapY = 8;
var mapSize = 64;

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

/*async*/ function drawMap() {
    for(var i = 0; i < 8; i++){
        for(var l = 0; l < 8; l++){
            if(map[l * 8 + i] == 1){
                ctx.fillStyle = "black";
            }else{
                ctx.fillStyle = "grey";
            }
            ctx.fillRect(i * 100, l * 100, 100, 100);
            // await sleep(1000);
        }
    }
}

var playerX;
var playerY;
playerX = (800 - 15) / 2;
playerY = (800 - 15) / 2;

function drawPlayer() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(playerX, playerY, 15, 15);
}

function movePlayer() {
    if(event.key == "w" || event.key == "arrowUp"){
        playerY -= 5;
    }
    redrawFrame();
}

function redrawFrame() {
    ctx.clearRect(0, 0, 800, 800);
    drawMap();
    drawPlayer();
}

redrawFrame();
