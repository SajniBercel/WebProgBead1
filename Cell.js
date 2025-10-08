import { Position } from "./Position.js"

export class Cell{
    pos;

    // WALLS
    up = true;
    down = true;
    left = true;
    right = true;

    visited = false;

    background;

    constructor(x, y){
        this.pos = new Position(x,y);
        this.background = "";
    }

    // HTML FORM
    toHtml(){
        let border = "";

        border += "border-style: solid;";


        border += "border-right-color:" + (this.right ? "black;" : "red;");
        border += "border-bottom-color:" + (this.down ? "black;" : "red;");
        border += "border-left-color:" + (this.left ? "black;" : "red;");
        border += "border-top-color:" + (this.up ? "black;" : "red;");

        return `<div class="cell" style="${border + this.background}"></div>`;
    }

    // FOR DEBUGING
    toString(){
        return
    }
}