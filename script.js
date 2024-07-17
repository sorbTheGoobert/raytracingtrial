var map = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];
var mapXlength = 11;
var mapYlength = 11;
var mapSize = 51;

function drawMap() {
    var x, y, xo, xy;
    for(y = 0; y < mapYlength; y++){
        for(x = 0; x < mapXlength; x++){
            var cell = document.createElement("div");
            cell.style.position = "absolute";
            cell.className = "box";
            document.getElementById("minimap").appendChild(cell);
            xo = x * mapSize;
            yo = y * mapSize;
            cell.style.left = `${xo}px`;
            cell.style.top = `${yo}px`;
            if(map[y * mapXlength + x] == 1){
                cell.style.backgroundColor = "#FFF";
            }else{
                cell.style.backgroundColor = "#000";
            }
        }
    }
}

var player = document.getElementById("player");
var playerX;
var playerY;

function drawPlayer() {
    player.style.top = `${(560 - 10)/2}px`;
    player.style.left = `${(560 - 10)/2}px`;
    playerX = player.offsetLeft;
    playerY = player.offsetTop;
}

var playerXdelta = Math.cos(playerAngle)*5;
var playerYdelta = Math.sin(playerAngle)*5;
var playerAngle = 0;

function movePlayer() {
    if(event.key == "w" || event.key == "W" || event.key == "ArrowUp"){
        playerX-=playerXdelta;
        playerY-=playerYdelta;
        player.style.top = `${playerY}px`;
        player.style.left = `${playerX}px`;
    }
    if(event.key == "s" || event.key == "S" || event.key == "ArrowDown"){
        playerX+=playerXdelta;
        playerY+=playerYdelta;
        player.style.top = `${playerY}px`;
        player.style.left = `${playerX}px`;
    }
    if(event.key == "a" || event.key == "A" || event.key == "ArrowLeft"){
        playerAngle+=12;
        if(playerAngle < 0){
            playerAngle+=360;
        }
        playerXdelta = Math.cos(playerAngle)*5;
        playerYdelta = Math.sin(playerAngle)*5;
        console.log(playerXdelta + " " + playerY);
    }
    if(event.key == "d" || event.key == "D" || event.key == "ArrowRight"){
        playerAngle-=12;
        if(playerAngle > 360){
            playerAngle-=360;
        }
        playerXdelta = Math.cos(playerAngle)*5;
        playerYdelta = Math.sin(playerAngle)*5;
        console.log(playerXdelta + " " + playerY);
    }
    document.getElementById("arrow").style.transform = `rotate(${playerAngle}deg)`;
    document.getElementById("arrow").style.top = "4px"
    document.getElementById("arrow").style.left = "4px"
    // console.log(playerAngle);
}

drawMap();
drawPlayer();