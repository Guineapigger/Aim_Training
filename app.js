const startBtn = document.querySelector("#start")
const screens = document.querySelectorAll('.screen')
const timelist = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const finishScreenScore = document.querySelector('#score')
const finishmain = document.querySelector('#main-finish-btn')
const finishagain = document.querySelector('#again-finish-btn')
const rules = document.querySelector('#rules')
const rulesback = document.querySelector('#rulesback')
const circle = document.querySelector('#circle')
const scorenumber = document.querySelector('#scorenumber')
const countcircle = document.querySelector('#balls')


let time = 0
let score = 0
let countballs = 0

rules.addEventListener('click', (event) => {
    screens[0].classList.remove('up')
})

rulesback.addEventListener('click', (event) => {
    console.log(8)
    screens[0].classList.add('up')
})

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[1].classList.add('up')
})

timelist.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute ('data-time'))
        screens[2].classList.add('up')
        startGame()
        console.log(time)
        score = 0
        countballs = 0
        setScore(0)
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score = score + 3
        countballs++
        event.target.remove()
        createRandomCircle()
    } else if (score > 0){
        score--
    }
    setScore(score)
})

finishmain.addEventListener('click', event => {
    console.log(time)
    screens[1].classList.remove('up')
    screens[2].classList.remove('up')
    screens[3].classList.remove('up')
})

finishagain.addEventListener('click', event => {
    console.log(time)
    screens[2].classList.remove('up')
    screens[3].classList.remove('up')
})

function startGame() {
    createRandomCircle()
    interval = setInterval(decreaseTime, 1000)
    setTime(time)
}

function decreaseTime() {
    console.log('decreaseTime')
    if (time === 0) {
        finishGame()
        --time
        clearInterval(interval)
    } else if (time > 0) {
        let current = --time
        setTime(current)
    }
}

function setScore(value) {
    scorenumber.innerHTML = `${value}`
}

function setTime(value) {
    if (value < 10) {
        value = `0${value}`
    }
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    console.log('finishGame')
    screens[3].classList.add('up')
    finishScreenScore.innerHTML = `<span class="scoreAndCircles">Cчёт: <span class="primary">${score}</span></span>`
    countcircle.innerHTML = `<span class="scoreAndCircles">Шары: <span class="primary">${countballs}</span></span>`
}

function createRandomCircle() {
    const size = getRandomNumber(15, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}