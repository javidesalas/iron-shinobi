// TODO: TESTEAND
console.log(shinobiApp)

window.onload = () => {
    document.onkeyup = e =>{
        document.getElementById('gameCanvas').classList.remove('game')            
        shinobiApp.init()
        startGame()
    }

    function startGame() {
}
}
