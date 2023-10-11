function posToId(i, j) { //i=x, j=y
    if (i > 11 || j > 7 || i < 0 || j < 0) {
        return Infinity;
    }
    return i*8+j;
}


function idToPos(id){
    return [Math.floor(id/8), id%8];
}

let canMove = false;
let whiteJokerRound = false;
let blackJokerRound = false;
let ind=0;
function nextPhase(){
    if (whiteJokerRound || blackJokerRound) {
        return;
    }
    let p = ['white-select', 'white-move', 'black-select', 'black-move'];
    ind++;
    if (ind > 3) ind=0;
    phase = p[ind];
    if (ind == 1 || ind == 3) {
        canMove = true;
    }else{
        canMove = false;
    }
    console.log(`Next phase, current phase: ${p[ind]}`)
}





// todo
//körszámolás
//képességek
