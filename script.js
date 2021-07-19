const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// creating the unit
const box = 32;

// loading the bg img
const bg = new Image();
bg.src = "./images/ground.png";

// loading fruits imgs
const apple = new Image();
const banana = new Image();
const brinjal = new Image();
const brocoli = new Image();
const carrot = new Image();
const cherry = new Image();
const grapes = new Image();
const mushroom = new Image();
const onion = new Image();
const pineapple = new Image();
const pumkin = new Image();
const strawberry = new Image();
const watermelon = new Image();

// setting images path
apple.src = "./images/food/apple.png";
banana.src = "./images/food/banana.png";
brinjal.src = "./images/food/brinjal.png";
brocoli.src = "./images/food/brocoli.png";
carrot.src = "./images/food/carrot.png";
cherry.src = "./images/food/cherry.png";
grapes.src = "./images/food/grapes.png";
mushroom.src = "./images/food/mushroom.png";
onion.src = "./images/food/onion.png";
pineapple.src = "./images/food/pineapple.png";
pumkin.src = "./images/food/pumkin.png";
strawberry.src = "./images/food/strawberry.png";
watermelon.src = "./images/food/watermelon.png";

// select food
foodarr = [apple, banana, brinjal, brocoli, carrot, cherry, grapes, mushroom, onion, pineapple, pumkin, strawberry, watermelon];
foodSelected = foodarr[Math.floor(Math.random() * foodarr.length)];

// loading the audios
const dead = new Audio();
const eat = new Audio();
const down = new Audio();
const up = new Audio();
const right = new Audio();
const left = new Audio();

// creating audios src
dead.src = "./audio/dead.mp3";
eat.src = "./audio/eat.mp3";
down.src = "./audio/down.mp3";
up.src = "./audio/up.mp3";
right.src = "./audio/right.mp3";
left.src = "./audio/left.mp3";

// creating the snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// craeting the food or defining the location of the food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

// creating score
let score = 0;

// controlling the snake
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        up.play();
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        right.play();
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        down.play();
        d = "DOWN";
    }
}

// check collision funtion
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// draw everything in canvas
function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    let ing = ctx.drawImage(foodSelected, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        foodSelected = foodarr[Math.floor(Math.random() * foodarr.length)];
        eat.play();
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        //remove the tail
        snake.pop();
    }

    //add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        dead.play();
        clearInterval(game);
        setTimeout(() => alert("Game Khatam"), 1)
    }

    snake.unshift(newHead);

    // draw score
    ctx.fillStyle = "white";
    ctx.font = "45px Times New Roman";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// call draw function every 200 ms
let game = setInterval(draw, 100);