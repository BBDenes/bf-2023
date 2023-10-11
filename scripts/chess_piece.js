const layout = ['rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook']
let lastMove = {team: 'black', x: Infinity, y: Infinity};

class Piece{
    constructor(team, type, x, y, id){
        this.team = team;
        this.type = type;
        this.x = x;
        this.y = y;
        this.id = id;
        this.joker = false;
        this.super = false;
        this.backwards = false;
        this.point = this.type=='rook'? 3: this.type=='knight'? 2 : this.type=='bishop'? 2 : this.type=='king'?2 : this.type=='queen' ?5 : 1
    };

    draw(){
        if(this.type == 'pawn'){if((this.team == 'white' && this.x <= 0) || (this.team == 'black' && this.x >= 11)){this.backwards = true}}
        const tile = document.getElementsByClassName(`${String(this.id)}`)[0];
        if(tile.children.length !=0)tile.removeChild(tile.children[0])
        let source = `chess_pieces/${this.team}/chess-${this.type}-regular.svg`;
        let newElement = document.createElement("img");
        newElement.src = source;
        newElement.innerText = `${this.x}, ${this.y}`
        newElement.style.height = "90%";
        if(this.backwards) newElement.style.backgroundColor = 'green'
        newElement.addEventListener('mousedown', ()=>{selectTile(this)});
        tile.append(newElement);
    }
    moveTo(tile){
        if(this.team == lastMove.team) return;
        if(phase != 'move') {return;}
        // if(!canMove) return;
        if(lastMove == undefined || (lastMove.x == this.x && lastMove.y == this.y)) return;
        if(tile.x == this.x && tile.y == this.y) return; //fordítva volt.... fffffffuuuuuuuuuuuuuucccccckkkkk
        if(!selectedTiles.includes(tile.id)) {phase = 'select';return};
        
        let newElement = document.getElementsByClassName(tile.id)[0]
        if ((this.type != 'pawn' && newElement.children.length == 0) || (this.type == 'pawn' && this.y == tile.y && newElement.children.length == 0)) {
            let oldElement = document.getElementsByClassName(piece_table[this.x][this.y].id)[0];
            oldElement.removeChild(oldElement.children[0]);
            piece_table[this.x][this.y] = undefined;
            this.y = tile.y;
            this.x = tile.x;
            piece_table[tile.x][tile.y] = this;
            this.id = this.x*8+this.y;
            this.draw();
        }else{
            if(this.type == 'pawn' && newElement.childElementCount == 0) return;
            let oldElement = document.getElementsByClassName(piece_table[this.x][this.y].id)[0];
            oldElement.removeChild(oldElement.children[0])
            console.log(oldElement);
            this.attack(tile, newElement);
        }
        // nextPhase();
        clearTable();
        if (!whiteJokerRound && !blackJokerRound) {
            rounds --;
            lastMove = this;
        }else if(whiteJokerRound && whitePowers.joker){
            whiteJokerRound = !whiteJokerRound;
            whitePowers.joker = false;
        }else if(blackJokerRound && blackPowers.joker){
            blackJokerRound = !blackJokerRound;
            blackPowers.joker = false;
        }
        console.log(whiteJokerRound)
        console.log(blackJokerRound)
        
        phase = 'select'
    }

    attack(tile, element){
        let attackedPiece = piece_table[tile.x][tile.y];
        if (this.team == 'white') {
            whitePoints += attackedPiece.point;
        } else if(this.team == 'black') {
            blackPoints += attackedPiece.point;
        }
        refreshScore();
        element.removeChild(element.children[0]);
        piece_table[this.x][this.y] = undefined;
        this.x = tile.x;
        this.y = tile.y;
        this.id = this.x*8+this.y;
        piece_table[tile.x][tile.y] = this;
        this.draw();

    }

};
//i=x, j=y
const piece_table = [];

function drawPieces() {
    for (let i = 0; i < 12; i++) {
        piece_table.push(new Array(8));
        for (let j = 0; j < 8; j++) {
            if(i == 0) {
                piece_table[i][j] = new Piece('black', layout[j], i, j, i*8+j);
                piece_table[i][j].draw();   
            }else if(i == 1) {
                piece_table[i][j] = new Piece('black', 'pawn', i, j, i*8+j);
                piece_table[i][j].draw();
            }else if(i == 10){
                piece_table[i][j] = new Piece('white', 'pawn', i, j, i*8+j);
                piece_table[i][j].draw();
            }else if(i == 11){
                piece_table[i][j] = new Piece('white', layout[j], i, j, i*8+j);
                piece_table[i][j].draw();
            }
        }
    }
    piece_table[5][3] = new Piece('white','pawn', 5, 3, 5*8+3);
    piece_table[5][3].draw();
}

