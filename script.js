let gameStarted = false;
let level = 0;
let playerSequence = [];
let gameSequence = [];
const colors = ["green", "red", "yellow", "blue"];
document.getElementById('highest-score').innerText = `Highest Score : ${localStorage.getItem("simon-score") || 0}`;
document.getElementById('highest-score').style.display = 'block';
//blinkColor function will blink a random color sequence and record it in game sequence
function blinkColor (){
    const blinkedColor = parseInt(Math.random() * colors.length);
    document.getElementById(colors[blinkedColor] + "-button").style.backgroundColor = "#d3d3d3";
    setTimeout(() => {
        document.getElementById(colors[blinkedColor] + "-button").style.backgroundColor = colors[blinkedColor];
    }, 500);
    gameSequence.push(colors[blinkedColor]);
}

//added event listner to start the game
window.addEventListener('keypress', ()=>{
    if (!gameStarted) {
        gameStarted = true;
        level = 1;
        playerSequence = [];
        gameSequence = [];
        document.getElementById('title-indicator').style.display = "none";
        document.getElementById('level-indicator').style.display = "block";
        document.getElementById('level-indicator').innerText = `Level : ${level}`;
        blinkColor();
    }
});

//playerInput reads the player selected color and check if the entered order is correct and the level up if the user entered sequence is correct
function playerInput(color){
    if (gameStarted) {
        document.getElementById(color+ "-button").style.borderColor = "#fff";
        document.getElementById(color+ "-button").style.scale = "1.05";
        setTimeout(()=>{
            document.getElementById(color+ "-button").style.borderColor = "#000";
            document.getElementById(color+ "-button").style.scale = "1";
        }, 100)
        playerSequence.push(color);
        playerSequence.forEach((value, index)=>{
            if (playerSequence[index] !== gameSequence[index]) {
                if (level > parseInt(localStorage.getItem("simon-score") || 0)) {
                    document.getElementById('highest-score').innerText = `Highest Score : ${level}`;
                    localStorage.setItem('simon-score', level)
                }
                level = 0;
                gameSequence = [];
                playerSequence = [];
                gameStarted = false;
                document.getElementById('title-indicator').style.display = "block";
                document.getElementById('level-indicator').style.display = "none";
                alert("GAME OVER!");
            }else if(playerSequence[index] === gameSequence[index] && gameSequence.length === index + 1){
                playerSequence = [];
                level++;
                document.getElementById('level-indicator').innerText = `Level : ${level}`;
                blinkColor();
            }
        })
    }
}

//Event listners to button clicking and inputing the respective color to validate;
document.getElementById('green-button').addEventListener('click',(e)=>e.pointerType === "mouse" && playerInput("green"));
document.getElementById('red-button').addEventListener('click',(e)=>e.pointerType === "mouse" && playerInput("red"));
document.getElementById('yellow-button').addEventListener('click',(e)=>e.pointerType === "mouse" && playerInput("yellow"));
document.getElementById('blue-button').addEventListener('click',(e)=>e.pointerType === "mouse" && playerInput("blue"));