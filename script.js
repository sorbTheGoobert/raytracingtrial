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
                cell.style.backgroundColor = "#000";
            }else{
                cell.style.backgroundColor = "#FFF";
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

var playerXdelta;
var playerYdelta;
var playerAngle;

function movePlayer() {
    if(event.key == "w" || event.key == "W" || event.key == "ArrowUp"){
        playerY-=5;
        player.style.top = `${playerY}px`;
    }
    if(event.key == "s" || event.key == "S" || event.key == "ArrowDown"){
        playerY+=5;
        player.style.top = `${playerY}px`;
    }
}

drawMap();
drawPlayer();