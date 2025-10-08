export class Position{
    x = -1;
    y = -1;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    getNeighbors(){
        return [
            new Position(this.x - 1, this.y),
            new Position(this.x + 1, this.y),
            new Position(this.x, this.y + 1),
            new Position(this.x, this.y + 1)
        ];
    }
}