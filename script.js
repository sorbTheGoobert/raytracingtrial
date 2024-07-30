const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

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

const PI = Math.PI;

const player = {
    x: undefined,
    y: undefined,
    size: 15,
    deltax: 0,
    deltay: 0,
    color: "yellow",
    angle: 0,
    turnVelocity: 0.05,
    pointerWidth: 3,
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
    update: function () {
        if (this.keys.wPressed) {
            this.x += this.deltax;
            this.y += this.deltay;
        }
        if (this.keys.aPressed) {
            this.angle -= this.turnVelocity;
            if (this.angle < 0) {
                this.angle += 2 * PI;
            }
        }
        if (this.keys.sPressed) {
            this.x -= this.deltax;
            this.y -= this.deltay;
        }
        if (this.keys.dPressed) {
            this.angle += this.turnVelocity;
            if (this.angle > 2 * PI) {
                this.angle -= 2 * PI;
            }
        }
        this.deltax = Math.cos(this.angle);
        this.deltay = Math.sin(this.angle);
    },
}

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

function init() {
    display.draw();
    canvas.width = display.cellSize * display.horizontalCellAmount;
    canvas.height = display.cellSize * display.verticalCellAmount;
    player.x = (display.cellSize * display.horizontalCellAmount - player.size) / 2,
    player.y = (display.cellSize * display.verticalCellAmount - player.size) / 2,
    player.draw();
    update();
}

function update() {
    display.draw();
    player.update();
    player.draw();
    requestAnimationFrame(update);
}

init();