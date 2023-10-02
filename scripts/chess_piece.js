
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
        
    }
};