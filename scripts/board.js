class Tile{
    constructor(color, id, x, y){
        this.color = color;
        this.id = id;
        this.x = x;
        this.y = y;
    };

    draw(){
        const white = "#ffffff";
        const black = "#5c5e5d";
        const parent = document.querySelector(".board");
        let newElement = document.createElement("div");
        this.color== "black" ? newElement.style.backgroundColor = black : newElement.style.backgroundColor = white;
        //newElement.innerHTML = this.id;
        newElement.classList.add("tile");
        newElement.addEventListener('mouseover', ()=>{console.log('asd')})
        newElement.classList.add(this.id);
        parent.append(newElement);

    }
};

const table = [];

function drawBoard(){
    for (let i = 0; i < 12; i++) {
        table.push(new Array());
        for (let j = 0; j < 8; j++) {
            let id = i*8+j;
            let color;
            if (i==0) {
                color = id%2==0?"white":"black";
            } else if(i != 0) {
                if (table[i-1][j].color == "black") {
                    color = "white";
                }else{
                    color = "black";
                }
            }
            table[i].push(new Tile(color, id, j, i));
            table[i][j].draw();
            
        }
        
    }
    // console.log(table);
}