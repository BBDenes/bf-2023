let canMove = false;
let selectedTiles = [];
//i = sor, j = oszlop
//x = sor, y = oszlop

function move(piece){
    const {team, type, x, y, id} = piece;
}


function selectTile(piece){
    clearTable();
    selectedTiles = [];
    // console.log([piece.x, piece.y])
    document.getElementsByClassName(posToId(piece.x, piece.y))[0].style.backgroundColor = 'orange';
    switch (piece.type){
        case "knight":
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
            if (piece.team == 'black') {
                select(piece, 2, 'down');
            } else {
                select(piece, 2, 'up');
            }
        break;
        default:
            break;
        }
    console.log(selectedTiles)
    selectedTiles = selectedTiles.filter(id =>{
        if(id <= 95 && id >= 0){
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

    for (const i in selectedTiles) {
        let tile = document.getElementsByClassName(String(selectedTiles[i]))[0];
        tile.style.backgroundColor = "red";
    }

}

function posToId(i, j) { //i=x, j=y
    if (i > 11 || j > 7 || i < 0 || j < 0) {
        return Infinity;
    }
    return i*8+j;
}

function idToPos(id){
    return [Math.floor(id/8), id%8];
}

function select(piece, amount, where) {
    dir = where.split(',');
    if (dir.includes('up')){
        
        for (let i = piece.x-1; i > piece.x-amount-1; i--) {
            console.log(i)
            if (piece_table[piece.x][i] != undefined && piece_table[piece.x][i].team == piece.team) {
                break;
            }
            console.log([i, piece.y]);
            selectedTiles.push(posToId(i, piece.y));
        }
    }
}
