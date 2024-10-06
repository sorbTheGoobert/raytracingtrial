// * Canvas declorations
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const PI = Math.PI;

// * Map related
const MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

// * Player
// Init
let player_POS = {
  x: 400,
  y: 400,
};
const player_size = 15;
const player_color = "yellow";
const player_speed = 2;
const player_turnspeed = 0.05;
let player_angle = 1.5 * PI;
const player_keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  left: false,
  right: false,
};
const initControls = () => {
  window.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "KeyW":
        player_keys.w = true;
        break;
      case "KeyA":
        player_keys.a = true;
        break;
      case "KeyS":
        player_keys.s = true;
        break;
      case "KeyD":
        player_keys.d = true;
        break;
      case "ArrowLeft":
        player_keys.left = true;
        break;
      case "ArrowRight":
        player_keys.right = true;
        break;
    }
  });
  window.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "KeyW":
        player_keys.w = false;
        break;
      case "KeyA":
        player_keys.a = false;
        break;
      case "KeyS":
        player_keys.s = false;
        break;
      case "KeyD":
        player_keys.d = false;
        break;
      case "ArrowLeft":
        player_keys.left = false;
        break;
      case "ArrowRight":
        player_keys.right = false;
        break;
    }
  });
};
// Functions / Methods
const player_update = () => {
  if (player_keys.w) {
    player_POS.x += player_speed * Math.cos(player_angle);
    player_POS.y += player_speed * Math.sin(player_angle);
  }
  if (player_keys.a) {
    let tempAngle = player_angle - 0.5 * PI;
    if (tempAngle < 0) {
      tempAngle += 2 * PI;
    }
    player_POS.x += player_speed * Math.cos(tempAngle);
    player_POS.y += player_speed * Math.sin(tempAngle);
  }
  if (player_keys.s) {
    player_POS.x -= player_speed * Math.cos(player_angle);
    player_POS.y -= player_speed * Math.sin(player_angle);
  }
  if (player_keys.d) {
    let tempAngle = player_angle + 0.5 * PI;
    if (tempAngle > 2 * PI) {
      tempAngle -= 2 * PI;
    }
    player_POS.x += player_speed * Math.cos(tempAngle);
    player_POS.y += player_speed * Math.sin(tempAngle);
  }
  if (player_keys.left) {
    player_angle -= player_turnspeed;
  }
  if (player_keys.right) {
    player_angle += player_turnspeed;
  }
  if (player_angle > 2 * PI) {
    player_angle -= 2 * PI;
  }
  if (player_angle < 0) {
    player_angle += 2 * PI;
  }
};

// * Drawing methods
const drawPlayerPointer = () => {
  ctx.strokeStyle = player_color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(player_POS.x, player_POS.y);
  ctx.lineTo(
    player_POS.x + Math.cos(player_angle) * 25,
    player_POS.y + Math.sin(player_angle) * 25
  );
  ctx.stroke();
};
const drawPlayer = () => {
  drawPlayerPointer();
  ctx.fillStyle = player_color;
  ctx.fillRect(
    player_POS.x - player_size / 2,
    player_POS.y - player_size / 2,
    player_size,
    player_size
  );
};
const drawMap = () => {
  for (let row = 0; row < MAP.length; row++) {
    for (let col = 0; col < MAP[row].length; col++) {
      if (MAP[row][col] == 1) {
        ctx.fillStyle = "black";
        ctx.fillRect(row * 100, col * 100, 100, 100);
      }
    }
  }
};
const clearCanvas = () => {
  ctx.clearRect(0, 0, 800, 800);
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, 800, 800);
};
const draw1Frame = () => {
  clearCanvas();
  drawMap();
  drawPlayer();
};

// * Init()
const init = () => {
  initControls();
  draw1Frame();
  setInterval(requestAnimationFrame, 1000 / 60, update);
};

// * Update()
const update = () => {
  player_update();
  draw1Frame();
};

window.onload = init;
