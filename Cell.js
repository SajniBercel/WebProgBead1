import { Position } from "./Position.js"

export class Cell{
    /** @type {boolean} */
    visited = false;

    /** @type {Position} */
    pos;

    // WALLS
    /** @type {boolean} */
    upWall = true;
    /** @type {boolean} */
    downWall = true;
    /** @type {boolean} */
    leftWall = true;
    /** @type {boolean} */
    rightWall = true;

    background;

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y){
        this.pos = new Position(x,y);
        this.background = "";
    }

    /**
     * Value Based "==="
     * @param {Position} pos
     * @returns {boolean}
     */
    equals(pos){
        return pos.x === this.pos.x && this.pos.y === this.pos.y;
    }

    /**
     * @returns {string} String that contains the Cell as html tags
     */
    toHtml(){
        let border = "";

        border += "border-right-color:" + (this.rightWall ? "black;" : "red;");
        border += "border-bottom-color:" + (this.downWall ? "black;" : "red;");
        border += "border-left-color:" + (this.leftWall ? "black;" : "red;");
        border += "border-top-color:" + (this.upWall ? "black;" : "red;");

        if(this.background.length > 0){
            console.log("in cell:" + this.background);
        }

        return `<div class="cell" style="${border + this.background}"></div>`;
    }
}