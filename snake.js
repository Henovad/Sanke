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
let speed = 0.85
let timerId = 0




function createGrid() {
    //create 100 of these elements with a for loop
    for (let i = 0; i < 100; i++) {
        //create element
        const square = document.createElement("div")
        //add styling to the element
        square.classList.add("square")
        //put the element into our grid
        grid.appendChild(square)
        //push it into a new squares array    
        squares.push(square)
    }
}

// create grid and set snake on top left
createGrid()
currentSnake.forEach(index => squares[index].classList.add("snake"))
//generate snake haed
squares[currentSnake[0]].classList.add("snakeHead")


function startGame(){
    gameOverEl.style.display = "none" // hide game over element

    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    currentSnake.forEach(index => squares[index].classList.remove("snakeHead"))
    //remove the apple  
    squares[appleIndex].classList.remove("apple")

    // stop sand restart snake
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    //re add new score to browser
    score = 0
    scoreEl.textContent = score

    direction = 1
    appleIndex = 0
    intervalTime = 1000
    //re add the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    squares[currentSnake[0]].classList.add("snakeHead")
    
    generateApple()
    timerId = setInterval(move, intervalTime)
}


function move() {
    if (
        (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        gameOverEl.style.display = "block"
        return clearInterval(timerId)
    }


    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove("snake")
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)

    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove("apple")
        //grow our snake by adding class of snake to it
        squares[tail].classList.add("snake")
        //grow our snake array
        currentSnake.push(tail)

        generateApple()

        score++
        scoreEl.textContent = score

        //speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }


    //add styling so we can see it
    squares[currentSnake[0]].classList.add("snake")
    squares[currentSnake[0]].classList.add("snakeHead")
    squares[currentSnake[1]].classList.remove("snakeHead")
}





function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * (width * width))
    } while (currentSnake.includes(appleIndex))
    squares[appleIndex].classList.add("apple")
}



// change direction for each arrow key press if direction not going backward
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

