let canMove = false;


function move(piece){
    const {team, type, x, y, id} = piece;
}


function selectTile(piece){
    clearTable();
    let selectedTiles = [];
    let temp = [];
    let maxRadius = 0
    // console.log([piece.x, piece.y])
    document.getElementsByClassName(posToId(piece.x, piece.y))[0].style.backgroundColor = 'orange';
    switch (piece.type){
        case "knight":
            maxRadius = 2;
            selectedTiles.push(posToId(piece.x-2, piece.y-1));

            selectedTiles.push(posToId(piece.x-1, piece.y-2));

            selectedTiles.push(posToId(piece.x+1, piece.y-2));

            selectedTiles.push(posToId(piece.x+2, piece.y-1));

            selectedTiles.push(posToId(piece.x+2, piece.y+1));

            selectedTiles.push(posToId(piece.x+1, piece.y+2));

            selectedTiles.push(posToId(piece.x-1, piece.y+2));

            selectedTiles.push(posToId(piece.x-2, piece.y+1));    
        break;
        case 'pawn':
            maxRadius = 2;
            if (piece.team == 'black') {
                selectedTiles = select(piece, 2, 'down');
            } else {
                selectedTiles = select(piece, 2, 'up');
            }
        break;
        default:
            break;
    }
    selectedTiles = selectedTiles.filter(id =>{
        if(id <= 95 && id >= 0 && Math.abs(idToPos(id)[0] - piece.x) <= maxRadius && Math.abs(idToPos(id)[1] - piece.y) <= maxRadius){
            if(document.getElementsByClassName(id)[0].childElementCount == 0){
                return true;
            }else{
                console.log(piece_table[idToPos(id)[0]][idToPos(id)[1]].team)
                if (piece_table[idToPos(id)[0]][idToPos(id)[1]].team != piece.team) {
                    return true;
                }
                else{
                    return false;
                }
            }
        }else{
            return false
        }
    });
    console.log(selectedTiles)

    for (const i in selectedTiles) {
        let tile = document.getElementsByClassName(String(selectedTiles[i]))[0];
        tile.style.backgroundColor = "red";
    }

}

function posToId(i, j) {
    return i*8+j;
}

function idToPos(id){
    return [Math.floor(id/8), id%8];
}

function select(piece, amount, where) {
    dir = where.split(',');
    if (dir.includes('up')) {
        for (let i = piece.y; i > amount; i--) {
            if (document.getElementsByClassName(posToId(piece.x, i)[0].fir)) {
                
            }
        }
    }
}
