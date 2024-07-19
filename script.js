

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var map = [
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1
];

// 1, 1, 1, 1, 1, 1, 1, 1,
// 1, 0, 0, 0, 0, 0, 0, 1,
// 1, 0, 1, 1, 1, 0, 0, 1,
// 1, 0, 0, 0, 0, 0, 0, 1,
// 1, 0, 1, 0, 0, 0, 0, 1,
// 1, 0, 1, 1, 0, 1, 1, 1,
// 1, 0, 0, 0, 0, 1, 0, 1,
// 1, 1, 1, 1, 1, 1, 1, 1

var mapX = 8;
var mapY = 8;
var mapSize = 64;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*async*/ function drawMap() {
    for(var i = 0; i < 8; i++){
        for(var l = 0; l < 8; l++){
            if(map[l * 8 + i] == 1){
                ctx.fillStyle = "black";
            }else{
                ctx.fillStyle = "grey";
            }
            ctx.fillRect(i * 64, l * 64, 64, 64);
            // await sleep(1000);
        }
    }
}

var playerX;
var playerY;
playerX = (512 - 10) / 2;
playerY = (512 - 10) / 2;
var playerXcenter = playerX + 7.5;
var playerYcenter = playerY + 7.5;

function drawPlayer() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(playerX, playerY, 10, 10);
    ctx.beginPath();
    ctx.moveTo(playerX + 4, playerY + 4);
    ctx.lineTo(playerXdelta * 5+ playerX + 6, playerYdelta *5 + playerY + 6);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "yellow";
    ctx.stroke();
}

var Pi = Math.PI;
var playerXdelta;
var playerYdelta;
var playerAngle = 0;

playerXdelta = Math.cos(playerAngle) * 5;
playerYdelta = Math.sin(playerAngle) * 5;

function movePlayer() {
    if(event.key == "s" || event.key == "arrowDown"){
        playerX -= playerXdelta;
        playerY -= playerYdelta;
    }
    if(event.key == "w" || event.key == "arrowUp"){
        playerX += playerXdelta;
        playerY += playerYdelta;
    }
    if(event.key == "a" || event.key == "arrowRight"){
        playerAngle -= .1;
        if(playerAngle < 0) {
            playerAngle += 2 * Pi;
        }
        
    }
    if(event.key == "d" || event.key == "arrowLeft"){
        playerAngle += .1;
        if(playerAngle > 2 * Pi) {
            playerAngle -= 2 * Pi;
        }
        // playerXdelta = Math.cos(playerAngle) * 5;
        // playerYdelta = Math.sin(playerAngle) * 5;
    }
    playerXdelta = Math.cos(playerAngle) * 5;
    playerYdelta = Math.sin(playerAngle) * 5;
    // console.log(playerYdelta);
    redrawFrame();
}

var P2 = Pi/2;
var P3 = 3*Pi/2;
var DR = 0.01745329;

function dist(ax, ay, bx, by, ang){
    return (Math.sqrt( ( bx - ax) * (bx - ax) + (by - ay) * (by - ay) ) );
}

function drawRays() {
    var rayAmount, mx, my, mp, dof;
    var rx = 0, ry = 0, rayAngle, xo, yo, disT;
    rayAngle = playerAngle - DR * 30;
    if(rayAngle < 0){
        rayAngle += 2 * Pi;
    }
    if(rayAngle > 2 * Pi){
        rayAngle -= 2 * Pi;
    }
    for(rayAmount = 0; rayAmount < 60; rayAmount++) {
        // dof = 0;
        // var disH = 0;
        // var hx = playerX, hy = playerY;
        // var angleTan = -1 / Math.tan(rayAngle);
        // if(rayAngle > Pi) {
        //     // ry = ((Math.trunc(playerY)>>6)<<6) - 0.0001;
        //     ry = ((Math.floor(playerY)>>6)<<6) - 0.0001;
        //     rx = (playerY - ry) * angleTan + playerX;
        //     yo = -64;
        //     xo = -yo*angleTan;
        // }
        // if(rayAngle < Pi) {
        //     // ry = ((Math.trunc(playerY)>>6)<<6) + 64;
        //     ry = ((Math.floor(playerY)>>6)<<6) + 64;
        //     rx = (playerY - ry) * angleTan + playerX;
        //     yo = 64;
        //     xo = -yo*angleTan;
        // }
        // if(rayAngle == 0 || rayAngle == Pi){
        //     rx = playerX;
        //     ry = playerY;
        //     dof = 8;
        // }
        // while(dof < 8){
        //     mx = Math.floor(rx) >> 6;
        //     my = Math.floor(ry) >> 6;
        //     mp = my * mapX + mx;
        //     if(mp > 0 && mp < mapX * mapY && map[mp] == 1){
        //         hx = rx;
        //         hy = ry;
        //         disH = dist(playerX, playerY, hx, hy, rayAngle);
        //         dof = 8;
        //     }else{
        //         rx+=xo;
        //         ry+=yo;
        //         dof++;
        //     }
        // }
        // ctx.beginPath();
        // ctx.strokeStyle = "red";
        // ctx.lineWidth = 1;
        // ctx.moveTo(playerX + 4.5, playerY + 4.5);
        // ctx.lineTo(rx, ry);
        // ctx.stroke();
        dof = 0;
        var nTan = -Math.tan(rayAngle);
        if(rayAngle > P2 && rayAngle < P3) {
            rx = ((Math.trunc(playerX)>>6)<<6) - 0.0001;
            ry = (playerX - rx) * nTan + playerY;
            xo = -64;
            yo = -xo*nTan;
        }
        if(rayAngle < P2 || rayAngle > P3) {
            rx = ((Math.trunc(playerX)>>6)<<6) + 64;
            ry = (playerX - rx) * nTan + playerY;
            xo = 64;
            yo = -xo*nTan;
        }
        if(rayAngle == 0 || rayAngle == Pi){
            rx = playerX;
            ry = playerY;
            dof = 8;
        }
        while(dof < 8){
            mx = Math.floor(rx) >> 6;
            my = Math.floor(ry) >> 6;
            mp = my * mapX + mx;
            if(mp > 0 && mp < mapX*mapY && map[mp] == 1){
                vx = rx;
                vy = ry;
                disV = dist(playerX, playerY, vx, vy, rayAngle);
                dof = 8;
            }else{
                rx+=xo;
                ry+=yo;
                dof++;
            }
        }
        // if(disV < disH) {
        //     rx = vx;
        //     ry = vy;
        //     disT = disV;
        //     ctx.strokeStyle = "rgb(0, 0, 255)"
        // }
        // if(disV > disH) {
        //     rx = hx;
        //     ry = hy;
        //     disT = disH;
        //     ctx.strokeStyle = "rgb(0, 255, 0)"
        // }
        // var ca = playerAngle - rayAngle;
        // if(ca < 0){
        //     ca += 2 * Pi;
        // }
        // if(ca > 2 * Pi){
        //     ca -= 2 * Pi;
        // }
        // disT = disT * Math.cos(ca);
        // var lineH = (mapSize * 320) / disT;
        // var lineO = 320 - lineH / 2;
        // if(lineH > 320){
        //     lineH = 320;
        // }
        // ctx.beginPath();
        // ctx.lineWidth = 8;
        // ctx.moveTo(rayAmount*8+530, lineO);
        // ctx.lineTo(rayAmount*8+530, lineH + lineO);
        // ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
        ctx.moveTo(playerX + 4.5, playerY + 4.5);
        ctx.lineTo(rx, ry);
        ctx.stroke();
        rayAngle += 1 *DR;
        if(rayAngle < 0){
            rayAngle += 2 * Pi;
        }
        if(rayAngle > 2 * Pi){
            rayAngle -= 2 * Pi;
        }
    }
    // await sleep(1);
    requestAnimationFrame(redrawFrame);
}

function redrawFrame() {
    ctx.clearRect(0, 0, 1400, 600);
    drawMap();
    drawPlayer();
    drawRays();
}

redrawFrame();

