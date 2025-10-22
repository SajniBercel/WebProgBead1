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
     * @param {Cell} cell
     * @returns {boolean} true if the object positions are the same (value based)
     */
    equals(cell){
        return cell.pos.equals(this.pos)
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

        return `<div class="cell" style="${border + this.background}"></div>`;
    }
}