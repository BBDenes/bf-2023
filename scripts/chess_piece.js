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
        const tile = document.querySelector(String(this.id));
        let source = `${this.team}/chess-${this.type}-regular.svg`;
        let newElement = document.createElement("img");
        newElement.src = source;
        newElement.height = "3rem";
        tile.append(newElement);
    }
};

const piece_table = [];

function drawPieces() {
    piece_table.push(new Array);
    for (let i = 0; i < 8; i++) {
        piece_table[0][i] = new Piece('black', layout[i], 0, i, i);
    }
    
}