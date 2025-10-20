import {Position} from "./Position.js";

export class Player{
    /** @type {Position} */
    pos;

    /**
     * @param {Position} pos Start position
     */
    constructor(pos){
        this.pos = pos;
    }

    moveUp(){
        this.pos.y--;
    }

    moveDown(){
        this.pos.y++;
    }

    moveLeft(){
        this.pos.x--;
    }

    moveRight(){
        this.pos.x++;
    }
}