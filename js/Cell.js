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
     * @returns {HTMLDivElement}
     */
    toElement() {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.style.borderStyle = "solid";

        // a szélességét majd a manager állítja a mérethez

        cell.style.borderRightColor = this.rightWall ? "black" : "red";
        cell.style.borderBottomColor = this.downWall ? "black" : "red";
        cell.style.borderLeftColor  = this.leftWall ? "black" : "red";
        cell.style.borderTopColor   = this.upWall ? "black" : "red";

        return cell;
    }

}