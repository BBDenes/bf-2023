function move(piece){
    const {team, type, x, y, id} = piece;
}


function selectTile(piece){
    clearTable();
    let selectedTiles = [];
    let temp = [];
    console.log([piece.x, piece.y])
    document.getElementsByClassName(posToId(piece.x, piece.y))[0].style.backgroundColor = 'orange';
    switch (piece.type) {
        case "knight":
            selectedTiles.push(posToId(piece.x-2, piece.y-1));
            temp.push([piece.x-2, piece.y-1]);

            selectedTiles.push(posToId(piece.x-1, piece.y-2));
            temp.push([piece.x-1, piece.y-2]);

            selectedTiles.push(posToId(piece.x+1, piece.y-2));
            temp.push([piece.x+1, piece.y-2]);

            selectedTiles.push(posToId(piece.x+2, piece.y-1));
            temp.push([piece.x+2, piece.y-1]);

            selectedTiles.push(posToId(piece.x+2, piece.y+1));
            temp.push([piece.x+2, piece.y+1]);

            selectedTiles.push(posToId(piece.x+1, piece.y+2));
            temp.push([piece.x+1, piece.y+2]);

            selectedTiles.push(posToId(piece.x-1, piece.y+2));
            temp.push([piece.x-1, piece.y+2]);

            selectedTiles.push(posToId(piece.x-2, piece.y+1));    
            temp.push([piece.x-2, piece.y+1]);

        default:
            break;
    }
    selectedTiles = selectedTiles.filter(id =>{
        if(id <= 95 && id >= 0){
            if(document.getElementsByClassName(id)[0].childElementCount == 0){
                return true;
            }else{
                return false;
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


