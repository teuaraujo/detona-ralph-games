const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {

        gameVelocity: 1000,
        hitPosition : 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerId : setInterval(randowSquare , 1000),
        countDownTimerId : setInterval(countDown, 1000),
    }
};

function playSound() {
    let audio = new Audio("/game/detona-ralph/src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game over! O seu resultado foi: " +state.values.result);
    }
}

function randowSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randowNumber = Math.floor(Math.random() *9);
    let randowSquare = state.view.squares[randowNumber];

    randowSquare.classList.add("enemy");

    state.values.hitPosition = randowSquare.id;
}


function addListenerHitBox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown" , () => {
            if(square.id === state.values.hitPosition){
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound();
            }
        })
    })
}

function init() {

    addListenerHitBox();
}

init();