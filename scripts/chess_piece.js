const layout = ['rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook']


class Piece{
    constructor(team, type, x, y, id){
        this.team = team;
        this.type = type;
        this.x = x;
        this.y = y;
        this.id = id;
    };

    draw(){
        const tile = document.getElementsByClassName(`${String(this.id)}`)[0];
        console.log(tile);
        let source = `chess_pieces/${this.team}/chess-${this.type}-regular.svg`;
        let newElement = document.createElement("img");
        newElement.src = source;
        newElement.style.height = "90%";
        newElement.addEventListener('mousedown', ()=>{selectTile(this)});
        tile.append(newElement);
    }
};

const piece_table = [];

function drawPieces() {
    for (let i = 0; i < 12; i++) {
        piece_table.push(new Array);
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
    piece_table[4][3] = new Piece('white','knight', 4, 3, 4*8+3);
    piece_table[4][3].draw();
    console.log(piece_table);
}