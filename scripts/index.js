let whitePoints = 0;
let blackPoints = 0;
let blackPowers = {'joker': true, 'super': true};
let whitePowers = {'joker': true, 'super': true};
let blackSuper = false;
let whiteSuper = false;
let rounds;

function refreshScore(){
    document.querySelector('#whitePoints').innerHTML = `Fehér: ${whitePoints}`;
    document.querySelector('#blackPoints').innerHTML = `Fekete: ${blackPoints}`;
    if (rounds == 0) {
        phase = 'beendet';
        if(whitePoints > blackPoints){
            winner = 'Fehér';
        }else if(blackPoints > whitePoints){
            winner = 'Fekete';
        }else{
            winner = 'Döntetlen';
        }

    }
}

function toggleDouble() {
    if(lastMove.team == 'white') blackJokerRound = !blackJokerRound;
    if(lastMove.team == 'black') whiteJokerRound = !whiteJokerRound;
    console.log(`toggled ${blackJokerRound} ${whiteJokerRound}`)
}
function toggleJoker() {
    if(lastMove.team == 'white') blackSuper = !blackSuper;
    if(lastMove.team == 'black') whiteSuper = !whiteSuper;
    console.log(`toggled ${blackSuper} ${whiteSuper}`)
}

function start() {
    rounds = 2*Number(document.getElementById('in').value);
    drawBoard();
    drawPieces();
    refreshScore();
    
}