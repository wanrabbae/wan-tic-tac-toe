const x_class = 'x'
const c_class = 'c'
const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const selElements = document.querySelectorAll('[data-cell]')
const papan = document.getElementById('papan')
const winningMsg = document.querySelector('[data-winning-message-text]')
const winningMsgElement = document.getElementById('winningMsg')
const restartButton = document.getElementById('restart')
let circleTurn

startGame()

// restart tombol handle
restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    selElements.forEach(sel => {
        sel.classList.remove(x_class)
        sel.classList.remove(c_class)
        sel.removeEventListener('click', handleClick)
        sel.addEventListener('click', handleClick, {
            once: true
        })
    })

    setBoardHoverClass()
    winningMsgElement.classList.add('show')
}

function handleClick(e) {
    const sel = e.target
    const currentClass = circleTurn ? c_class : x_class
    placeMark(sel, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function placeMark(sel, currentClass) {
    sel.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    papan.classList.remove(x_class)
    papan.classList.remove(c_class)

    if (circleTurn) {
        papan.classList.add(c_class)
    } else {
        papan.classList.add(x_class)
    }
}
// fungsi cek winner
function checkWin(currentClass) {
    return winning.some(combinasi => {
        return combinasi.every(index => {
            return selElements[index].classList.contains(currentClass)
        })
    })
}

// end game
function endGame(draw) {
    if (draw) {
        winningMsg.innerText = 'Draw!'
    } else {
        winningMsg.innerText = `${circleTurn ? "O's" : "X's"} Win!`
    }

    winningMsgElement.classList.remove('show')
}

// klo draw
function isDraw() {
    return [...selElements].every(sel => {
        return sel.classList.contains(x_class) || sel.classList.contains(c_class)
    })
}


// Typing effect

const txtElement = [' to WAN Tic Tac Toe']
let count = 0;
let txtIndex = 0;
let currentTxt = '';
let words = '';

(function ngetik() {

    if (count == txtElement.length) {
        count = 0;
    }

    currentTxt = txtElement[count];

    words = currentTxt.slice(0, ++txtIndex)
    console.log(words);
    document.querySelector('.typing-effect').textContent = words;

    if (words.length == currentTxt.length) {
        count++;
        txtIndex = 0;
    }

    setTimeout(ngetik, 170);

})();
