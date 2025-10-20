export class Position{
    /** @type {number} */
    x = -1;
    /** @type {number} */
    y = -1;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    /**
     * Positions around the cell
     * @returns {Position[]}
     */
    getNeighbors(){
        return [
            new Position(this.x - 1, this.y),
            new Position(this.x + 1, this.y),
            new Position(this.x, this.y - 1),
            new Position(this.x, this.y + 1)
        ];
    }
}