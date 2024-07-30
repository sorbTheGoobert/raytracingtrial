const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");










// display

const display = {
    map: [
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 0, 0, 0, 1,
        1, 0, 1, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
    ],
    horizontalCellAmount: 8,
    verticalCellAmount: 8,
    cellSize: 100,
    backGroundColor: "grey",
    cellColor: "black",
    draw: function () {
        context.fillStyle = this.backGroundColor;
        context.fillRect(0, 0, this.cellSize * this.horizontalCellAmount, this.cellSize * this.verticalCellAmount);
        for (i = 0; i < this.verticalCellAmount; i++) {
            for (l = 0; l < this.horizontalCellAmount; l++) {
                if (this.map[i * 8 + l] === 1) {
                    context.fillStyle = this.cellColor;
                    context.fillRect(l * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    }
}








// player

const PI = Math.PI;

const player = {
    x: undefined,
    y: undefined,
    size: 15,
    deltax: 0,
    deltay: 0,
    color: "yellow",
    angle: 0,
    turnVelocity: 0.085,
    pointerWidth: 3,
    onMapX: undefined,
    onMapY: undefined,
    draw: function () {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
        context.beginPath();
        context.lineWidth = this.pointerWidth;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.size / 2, this.y + this.size / 2);
        context.lineTo(this.x + this.deltax * 30 + this.size / 2, this.y + this.deltay * 30 + this.size / 2);
        context.stroke();
        context.closePath();
    },
    keys: {
        wPressed: false,
        aPressed: false,
        sPressed: false,
        dPressed: false,
    },
    castRays: function () {
        let range = 0;
        let xNearest, yNearest;
        let xStep, yStep;
        let rayAngle, rayAmount = 1;
        let rayX = player.onMapX;
        let rayY = player.onMapY;
        rayAngle = this.angle;
        // horizontal
        for (i = 0; i < rayAmount; i++) {
            let aTan = -1 / Math.tan(rayAngle);
            if (rayAngle > PI) { // up
                yNearest = ((Math.floor(this.y) >> 6) << 6) - 0.0000001;
                xNearest = (this.y - yNearest) * aTan + this.x;
                yStep = -64;
                xStep = -yStep * aTan;
            } else if (rayAngle < PI) { // down
                yNearest = ((Math.floor(this.y) >> 6) << 6) + 64;
                xNearest = (this.y - yNearest) * aTan + this.x;
                yStep = 64;
                xStep = -yStep * aTan;
            } else if (rayAngle == PI || rayAngle == 0 || rayAngle == 2 * PI) { // left or right
                range = 8;
                xNearest = this.x;
                yNearest = this.y;
            }
            while (range < 8) {
                rayX = Math.floor(xNearest) >> 6;
                rayY = Math.floor(yNearest) >> 6;
                rayPos = rayY * display.horizontalCellAmount + rayX;
                console.log(rayX + " rayX");
                console.log(rayY + " rayY");
                console.log(rayPos + " rayPost");
                if (rayPos < display.horizontalCellAmount * display.verticalCellAmount && display.map[rayPos] == 1) {
                    console.log("hit");
                    range = 8; // hit wall
                } else {
                    xNearest += xStep;
                    yNearest += yStep;
                    range++;
                }
            }
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = "green";
            context.moveTo(this.x + this.size / 2, this.y + this.size / 2);
            context.lineTo(xNearest, yNearest);
            context.stroke();
            context.closePath();
        }
    },
    update: function () {
        if (this.keys.wPressed) {
            this.x += this.deltax * 3;
            this.y += this.deltay * 3;
        }
        if (this.keys.aPressed) {
            this.angle -= this.turnVelocity;
            if (this.angle < 0) {
                this.angle += 2 * PI;
            }
        }
        if (this.keys.sPressed) {
            this.x -= this.deltax * 3;
            this.y -= this.deltay * 3;
        }
        if (this.keys.dPressed) {
            this.angle += this.turnVelocity;
            if (this.angle > 2 * PI) {
                this.angle -= 2 * PI;
            }
        }
        this.deltax = Math.cos(this.angle);
        this.deltay = Math.sin(this.angle);
        this.onMapX = Math.floor(this.x / 100);
        this.onMapY = Math.floor(this.y / 100);
    },
}










//movement

addEventListener("keydown", function (event) {
    switch (event.code) {
        case "KeyW":
            player.keys.wPressed = true;
            break;
        case "KeyA":
            player.keys.aPressed = true;
            break;
        case "KeyS":
            player.keys.sPressed = true;
            break;
        case "KeyD":
            player.keys.dPressed = true;
            break;
    }
});
addEventListener("keyup", function (event) {
    switch (event.code) {
        case "KeyW":
            player.keys.wPressed = false;
            break;
        case "KeyA":
            player.keys.aPressed = false;
            break;
        case "KeyS":
            player.keys.sPressed = false;
            break;
        case "KeyD":
            player.keys.dPressed = false;
            break;
    }
})






// initilize and update


function init() {
    display.draw();
    canvas.width = display.cellSize * display.horizontalCellAmount;
    canvas.height = display.cellSize * display.verticalCellAmount;
    player.x = (display.cellSize * display.horizontalCellAmount - player.size) / 2,
    player.y = (display.cellSize * display.verticalCellAmount - player.size) / 2,
    player.onMapX = Math.floor(player.x / 100);
    player.onMapY = Math.floor(player.y / 100);
    player.draw();
    update();
}

function update() {
    display.draw();
    player.update();
    player.castRays();
    player.draw();
    requestAnimationFrame(update);
}

init();