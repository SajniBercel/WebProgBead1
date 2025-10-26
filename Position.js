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
     * Positions around the cell (not contains the cells pos)
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

    /**
     * @param {Position} pos
     * @returns {boolean} value based "==="
     */
    equals(pos){
        return pos.x === this.x && pos.y === this.y;
    }
}