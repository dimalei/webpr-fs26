
const radius = 10;
const ball = { x: 20, y: 0, dx: 4, dy: 1 };
let old = { x: ball.x, y: ball.y };
const bouncyness = 0.9;
const gravity = 0.2;
const resistance = 0.998;

const pullForce = -5;


function start() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.fillStyle = "black";

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 60);

    addEventListener("pointerdown", pointer => {
        if (pointer.button === 0 && pointer.target === canvas) {
            const mousePos = { x: pointer.offsetX, y: pointer.offsetY }
            const connVec = { x: mousePos.x - ball.x, y: mousePos.y - ball.y };
            const connVecLen = Math.sqrt(connVec.x ** 2 + connVec.y ** 2);
            const connVecUnit = { x: connVec.x / connVecLen, y: connVec.y / connVecLen };
            ball.dx = ball.dx + connVecUnit.x * pullForce;
            ball.dy = ball.dy + connVecUnit.y * pullForce;

            context.beginPath(); // Start a new path
            context.moveTo(mousePos.x, mousePos.y); // Move the pen to (30, 50)
            context.lineTo(ball.x, ball.y); // Draw a line to (150, 100)
            context.stroke(); // Render the path
        }
    });
}

function nextBoard() {
    // keep old ball values for the sake of efficient clearing of the old display
    old = { x: ball.x, y: ball.y };

    // handle ball is hitting the bounds
    //   reverse direction
    //   lose some energy relative to the current inertia (only velocity varies)
    if (ball.x - radius < 0) {
        ball.dx *= -bouncyness;
        ball.x = radius;
    } else if (ball.x + radius > canvas.width) {
        ball.dx *= -bouncyness;
        ball.x = canvas.width - radius;
    }
    if (ball.y + radius > canvas.height) {
        ball.dy *= -bouncyness;
        ball.y = canvas.height - radius;
        ball.dy -= gravity;
    }
    // calculate any changes in velocity due to gravitational pull or medium resistance
    ball.dy += gravity;
    ball.dy *= resistance;
    ball.dx *= resistance;

    // calculate new position
    ball.x += ball.dx;
    ball.y += ball.dy;

}

function display(context) {
    context.clearRect(old.x - radius - 1, old.y - radius - 1, 22, 22);
    fillBox(context)
}

function fillBox(context) {
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, 6.3, false);
    context.fill();
}


