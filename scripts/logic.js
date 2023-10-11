let selectedTiles = [];
let phase = 'select'; //white-select -> white-move -> black-select -> black-move ->
let selectedPiece;
//i = sor, j = oszlop
//x = sor, y = oszlop

let prevSelect = '';
function selectTile(piece){
    let round = lastMove == undefined? 'black': '';
    if (lastMove != undefined && phase == 'select' && lastMove.team == 'white') round = 'black'
    if (lastMove != undefined && phase == 'select' && lastMove.team == 'black') round = 'white'
    if(phase != 'select') return;
    if (piece.team == lastMove.team) {
        return
    }
    if (whiteSuper == true && piece.type == 'white') piece.super = true;
    if (blackSuper == true && piece.type == "black") piece.super = true;
    canMove = false; 
    clearTable();
    selectedTiles = [];
    selectedPiece = piece;
    document.getElementsByClassName(posToId(piece.x, piece.y))[0].style.backgroundColor = 'orange';
    switch (piece.type){
        case "knight":
            checkRound(piece);
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
            checkRound(piece);
            if (piece.team === "black") {
                if(!piece.backwards) select(piece, 3, 'down'); else select(piece, 3, 'up');
                
            } else {
                if(!piece.backwards) select(piece, 3, 'up'); else select(piece, 3, 'down');
            }
        break;
        case 'rook':
            checkRound(piece);
            select(piece, 12, 'left,right,up,down');
        break;
        case 'queen':
            checkRound(piece);
            select(piece, 12, 'left,right,up,down,topleft,topright,botleft,botright');
            break;
        case 'king':
            checkRound(piece);
            select(piece, 2, 'left,right,up,down,topleft,topright,botleft,botright');
            break;
        case 'bishop':
            checkRound(piece);
            select(piece, 12, 'topleft,topright,botleft,botright');
        break;
        default:
            break;
        }
    selectedTiles = selectedTiles.filter(id =>{
        if(id <= 95 && id >= 0){
            if(document.getElementsByClassName(id)[0].childElementCount == 0){
                return true;
            }else{
                // console.log(piece_table[idToPos(id)[0]][idToPos(id)[1]].team)
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
    canMove = true;
    // nextPhase();
    phase = 'move';
}


function select(piece, amount = 12, where) {
    dir = where.split(',');
    // console.log(dir);
    if (dir.includes('up')){
        //x=sor, y=oszlop
        for (let row = piece.x-1; row > piece.x-amount-1; row--) { //i = sor
            if (row<0) break;
            item = piece_table[row][piece.y]
            if(item != undefined && piece.type == 'pawn' && item.team != piece.team) break;
            if (item != undefined && item.team == piece.team) {
                break;
            }
            if(item != undefined && item.team != piece.team){
                selectedTiles.push(posToId(row, piece.y));
                break;
            }
            // console.log([i, piece.y]);
            selectedTiles.push(posToId(row, piece.y));
        }
        if (piece.type == 'pawn') {
            selectedTiles.push(posToId(piece.x-1, piece.y-1));
            selectedTiles.push(posToId(piece.x-1, piece.y+1));
        }
    }
    if (dir.includes('down')) {
        for (let row = piece.x+1; row < piece.x+amount+1; row++) { //i = sor
            if (row>11) break;
            item = piece_table[row][piece.y];
            if(item != undefined && piece.type == 'pawn' && item.team != piece.team) break;
            if (item != undefined && item.team == piece.team) {
                break;
            }
            if(item != undefined && item.team != piece.team){
                selectedTiles.push(posToId(row, piece.y));
                break;
            }
            // console.log([i, piece.y]);
            selectedTiles.push(posToId(row, piece.y));
        }
        if (piece.type == 'pawn') {
            selectedTiles.push(posToId(piece.x+1, piece.y-1));
            selectedTiles.push(posToId(piece.x+1, piece.y+1));
        }
    }
    if (dir.includes('left')) {
        for (let col = piece.y-1; col > piece.y-amount-1; col--) { //i = oszlop
            if (col <0) break;
            item = piece_table[piece.x][col]
            if (item != undefined && item.team == piece.team) {
                break;
            }
            if(item != undefined && item.team != piece.team){
                selectedTiles.push(posToId(piece.x, col));
                break;
            }
            selectedTiles.push(posToId(piece.x, col));
        }
    }
    if (dir.includes('right')) {
        for (let col = piece.y+1; col < piece.y+amount+1; col++) { //i = oszlop
            if (col>11) break;
            item = piece_table[piece.x][col]
            if (item != undefined && item.team == piece.team) {
                break;
            }
            if(item != undefined && item.team != piece.team){
                selectedTiles.push(posToId(piece.x, col));
                break;
            }
            selectedTiles.push(posToId(piece.x, col));
        }
    }
    if (dir.includes('topleft')) {
        for (let col = piece.y-1, row = piece.x-1; col < piece.y+amount+1, row > piece.x-amount-1; col--, row--) { //i = oszlop
            if (col>11) break;
            if(row<0) break;
            item = piece_table[row][col]
            if (item != undefined && item.team == piece.team) {
                break;
            }
            if(item != undefined && item.team != piece.team){
                selectedTiles.push(posToId(row, col));
                break;
            }
            selectedTiles.push(posToId(row, col));
        }
    }
    if (dir.includes('topright')) {
        for (let col = piece.y+1, row = piece.x-1; col < piece.y+amount+1, row < piece.x+amount+1; col++, row--) { //i = oszlop
            if (row<0 || col>7) break;
            item = piece_table[row][col];
            if (item != undefined && item.team == piece.team) {
                break;
            }
            if(item != undefined && item.team != piece.team){
                selectedTiles.push(posToId(row, col));
                break;
            }
            selectedTiles.push(posToId(row, col));
        }
    }
    if (dir.includes('botleft')) {
        for (let col = piece.y-1, row = piece.x+1; col > piece.y-amount-1, row > piece.x-amount-1; col--, row++) { //i = oszlop
            if(row>11 || col < 0) break;
            item = piece_table[row][col]
            if (item != undefined && item.team == piece.team) {
                break;
            }
            if(item != undefined && item.team != piece.team){
                selectedTiles.push(posToId(row, col));
                break;
            }
            selectedTiles.push(posToId(row, col));
        }
    }
    if (dir.includes('botright')) {
        for (let col = piece.y+1, row = piece.x+1; col > piece.y-amount-1, row < piece.x+amount+1; col++, row++) { //i = oszlop
            if (row>11) break;
            if(col>7) break;
            item = piece_table[row][col]
            if (item != undefined && item.team == piece.team) {
                break;
            }
            if(item != undefined && item.team != piece.team){
                selectedTiles.push(posToId(row, col));
                break;
            }
            selectedTiles.push(posToId(row, col));
        }
    }
}

function checkRound(piece) {
    console.log('joker');
    if (piece.super && ((piece.team == 'white'&&whitePowers.super == true)||(piece.team == 'black'&&blackPowers.super == true))) {
        select(piece, 12, 'left,right,up,down,topleft,topright,botleft,botright');
        selectedTiles.push(posToId(piece.x-2, piece.y-1));
        selectedTiles.push(posToId(piece.x-1, piece.y-2));
        selectedTiles.push(posToId(piece.x+1, piece.y-2));
        selectedTiles.push(posToId(piece.x+2, piece.y-1));
        selectedTiles.push(posToId(piece.x+2, piece.y+1));
        selectedTiles.push(posToId(piece.x+1, piece.y+2));
        selectedTiles.push(posToId(piece.x-1, piece.y+2));
        selectedTiles.push(posToId(piece.x-2, piece.y+1)); 
    }
}