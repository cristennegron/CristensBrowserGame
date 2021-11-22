const squares = document.querySelectorAll('.board div')
const scoreDisplay = document.querySelector('span')
const board = document.querySelector('.board')

const width = 20
let currentIndex = 0 
let appleIndex = 0 
let snakePosition = [2,1,0] 
let direction = 1
let score = 0
let speed = 0.9
let intervalTime = 0
let interval = 0

function startGame() {
    snakePosition.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 400
    snakePosition = [2,1,0]
    currentIndex = 0
    snakePosition.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }

function moveOutcomes() {
    if (
      (snakePosition[0] + width >= (width * width) && direction === width) || 
      (snakePosition[0] % width === width -1 && direction === 1) || 
      (snakePosition[0] % width === 0 && direction === -1) || 
      (snakePosition[0] - width < 0 && direction === -width) ||  
      squares[snakePosition[0] + direction].classList.contains('snake') 
    ) {
        return clearInterval(interval) 
    }

    const tail = snakePosition.pop() 
    squares[tail].classList.remove('snake')  
    snakePosition.unshift(snakePosition[0] + direction)


if(squares[snakePosition[0]].classList.contains('apple')) {
    squares[snakePosition[0]].classList.remove('apple')
    squares[tail].classList.add('snake')
    snakePosition.push(tail)
    randomApple()
    score++
    scoreDisplay.textContent = score
    clearInterval(interval)
    intervalTime = intervalTime * speed
    interval = setInterval(moveOutcomes, intervalTime)
  }
  squares[snakePosition[0]].classList.add('snake')
  }

function randomApple() {
    do{
      appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake')) 
    squares[appleIndex].classList.add('apple')
  }

const headPosition = snakePosition[0];
const snakeHead = squares[headPosition];

function control(event) {
  
  if(event.code === 'ArrowRight') {
      direction = 1
      
    } else if (event.code === 'ArrowUp') {
      direction = -width 
      
    } else if (event.code === 'ArrowLeft') {
      direction = -1
      
    } else if (event.code === 'ArrowDown') {
      direction = +width 
    }
  }

  document.addEventListener('keyup', control)
  board.addEventListener('click', startGame)
