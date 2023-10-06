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
        newElement.addEventListener('mousedown', move(this.type))
        tile.append(newElement);
    }
};

const piece_table = [];

function drawPieces() {
    for (let i = 0; i < 12; i++) {
        piece_table.push(new Array);
        for (let j = 0; j < 8; j++) {
            if(i == 0) {
                piece_table[i][j] = new Piece('black', layout[j], j, i, i*8+j);
                piece_table[i][j].draw();   
            }else if(i == 1) {
                piece_table[i][j] = new Piece('black', 'pawn', j, i, i*8+j);
                piece_table[i][j].draw();
            }else if(i == 10){
                piece_table[i][j] = new Piece('white', 'pawn', j, i, i*8+j);
                piece_table[i][j].draw();
            }else if(i == 11){
                piece_table[i][j] = new Piece('white', layout[j], j, i, i*8+j);
                piece_table[i][j].draw();
            }
        }
    }
    console.log(piece_table);
}