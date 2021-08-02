const grid = document.querySelector(".grid")
const startBtn = document.getElementById("start")
const scoreEl = document.getElementById("score")
const gameOverEl = document.getElementById("game-over")
let score = 0
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let appleIndex = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0




function createGrid() {
    for (let i = 0; i < 100; i++) {
        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add("snake"))
squares[currentSnake[0]].classList.add("snakeHead")

function startGame(){
    gameOverEl.style.display = "none"

    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    currentSnake.forEach(index => squares[index].classList.remove("snakeHead"))

    squares[appleIndex].classList.remove("apple")

    clearInterval(timerId)
    currentSnake = [2, 1, 0]

    score = 0
    scoreEl.textContent = score

    direction = 1
    appleIndex = 0
    intervalTime = 600

    currentSnake.forEach(index => squares[index].classList.add("snake"))
    squares[currentSnake[0]].classList.add("snakeHead")
    
    generateApple()
    timerId = setInterval(move, intervalTime)
}


function move() {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        gameOverEl.style.display = "block"
        return clearInterval(timerId)
    }


    
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)

    if (squares[currentSnake[0]].classList.contains("apple")) {

        squares[currentSnake[0]].classList.remove("apple")

        squares[tail].classList.add("snake")

        currentSnake.push(tail)

        generateApple()

        score++
        scoreEl.textContent = score

        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }


    console.log(currentSnake)
    squares[currentSnake[0]].classList.add("snake")
    squares[currentSnake[0]].classList.add("snakeHead")
    squares[currentSnake[1]].classList.remove("snakeHead")
}





function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * (width * width))
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}


function control(e) {
    if (e.key === "ArrowRight" && direction !== -1) {
        direction = 1
    } else if (e.key === "ArrowUp" && direction !== width) {
        
        direction = -width
    } else if (e.key === "ArrowLeft" && direction !== 1) {
        
        direction = -1
    } else if (e.key === "ArrowDown" && direction !== -width) {
        
        direction = +width
    }
}




document.addEventListener("keyup", control)
startBtn.addEventListener("click", startGame)

