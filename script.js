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
        playerAngle-=0.1;
        if(playerAngle < 0){
            playerAngle+=2 * Math.PI;
        }
        playerXdelta = Math.cos(playerAngle)*5;
        playerYdelta = Math.sin(playerAngle)*5;
    }
    if(event.key == "d" || event.key == "D" || event.key == "ArrowRight"){
        playerAngle+=0.1;
        if(playerAngle > 2 * Math.PI){
            playerAngle -= 2 * Math.PI;
        }
        playerXdelta = Math.cos(playerAngle)*5;
        playerYdelta = Math.sin(playerAngle)*5;
    }
    // player.style.transform = `rotate(${playerAngle}rad)`;
    document.getElementById("arrow").style.transform = `rotate(${playerAngle}rad)`;
    // document.getElementById("arrow").style.top = "4px"
    // document.getElementById("arrow").style.left = "4px"
}

var ray = document.createElement("div");
ray.className = "ray";
player.appendChild(ray);

function drawRays() {
    var r, mx, my, mp, dof;
    var rx, ry, ra, xo = 0, yo = 0;
    ra = playerAngle;
    for(r = 0; r < 1; r++){
        dof = 0;
        var aTan = -1 * Math.tan(ra);
        if(ra > Math.PI){
            ry = Math.round(playerY)/121-0.00001;
            rx = (playerY - ry) * aTan + playerX;
            yo = -121;
            xo = -1 * yo * aTan;
        }
        if(ra < Math.PI){
            ry = Math.round(playerY)/121 + 121;
            rx = (playerY - ry) * aTan + playerX;
            yo = 121;
            xo = -1 * yo * aTan;
        }
        if(ra == 0 || ra == Math.PI){
            rx = playerX;
            ry = playerY;
            dof = 11;
        }
        console.log(`rx = ${rx}`);
        console.log(`ry = ${ry}`);
        while(dof < 11){
            mx = Math.floor(rx) >> 11;
            my = Math.floor(ry) >> 11;
            mp = my * mapXlength + mx;
            console.log(`${mp} mP111`);
            if(mp < mapXlength * mapYlength && map[mp] == 1){
                dof = 11;
                console.log("hit wall");
            }
            else{
                rx+=xo;
                ry+=yo;
                dof+=1;
            }
        }
        ray.style.width = `${Math.abs(rx - playerX)}px`
        // console.log(Math.abs(rx - playerX));
        ray.style.transform = `rotate(${playerAngle - Math.PI}rad)`;
    }
}
setInterval(drawRays, 1000);
drawMap();
drawPlayer();