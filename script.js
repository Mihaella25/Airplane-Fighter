const airplane = document.querySelector(".player");
const gameContainer = document.querySelector(".game-container");
const scoreDisplay = document.querySelector("#score");
const gameOverMessage = document.getElementById("game-over");
const obstacleInterval = 2000;
let score = 0;
let isGameOver = false;
let obstacleSpeed = 5;
let position = 50;

function moveAirplaneLeft() {
    if (position > 0) {
        position -= 10;
        airplane.style.left = `${position}%`;
    }
}

function moveAirplaneRight() {
    if (position < 100) {
        position += 10;
        airplane.style.left = `${position}%`;
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveAirplaneLeft();
    } else if (event.key === "ArrowRight") {
        moveAirplaneRight();
    }
});

function createObstacle() {
    if (!isGameOver) {
        const obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        obstacle.style.left = `${Math.random() * 90 + 5}%`;
        gameContainer.appendChild(obstacle);

        function moveObstacle() {
            if (!isGameOver) {
                let top = parseFloat(window.getComputedStyle(obstacle).top);
                obstacle.style.top = `${top + obstacleSpeed}px`;

                const containerHeight = parseFloat(window.getComputedStyle(gameContainer).height);
                if (top + 30 > containerHeight) {
                    obstacle.remove();
                    ++score;
                    scoreDisplay.innerText = `Score: ${score}`;
                }

                const airplaneRect = airplane.getBoundingClientRect();
                const obstacleRect = obstacle.getBoundingClientRect();

                if (
                    airplaneRect.left < obstacleRect.right &&
                    airplaneRect.right > obstacleRect.left &&
                    airplaneRect.top < obstacleRect.bottom &&
                    airplaneRect.bottom > obstacleRect.top
                ) {
                    gameOver();
                    obstacle.remove();
                } else {
                    requestAnimationFrame(moveObstacle);
                }
            }
        }

        requestAnimationFrame(moveObstacle);
    }
}

function gameOver() {
    isGameOver = true;
    gameOverMessage.innerText = `Game Over! Your score: ${score}`;
    gameOverMessage.style.display = "block";
    airplane.classList.add("destroyed");
}

setInterval(createObstacle, obstacleInterval);