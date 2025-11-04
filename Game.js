import { Maze } from './Maze.js';
import { Player } from "./Player.js";
import { Position } from "./Position.js";

export class Game{
    /** @type {Maze} */
    #maze;

    /** @type {Player} */
    #player;

    /**
     * @param {Maze} maze
     */
    constructor(maze){
        const mid = Math.floor(maze.size / 2);

        this.#maze = maze;
        this.#player = new Player(new Position(0, mid));
    }

    movePlayerUp(){
        let cell = this.#maze.getCellByPos(this.#player.pos);

        if(!cell.upWall) {
            cell.background = "";
            this.#player.moveUp()
            this.#maze.getCellByPos(this.#player.pos).background = "background: Green;"
        }
        this.checkWin();
    }

    movePlayerDown(){
        let cell = this.#maze.getCellByPos(this.#player.pos);

        if(!cell.downWall) {
            cell.background = "";
            this.#player.moveDown()
            this.#maze.getCellByPos(this.#player.pos).background = "background: Green;"
        }
        this.checkWin();
    }

    movePlayerLeft(){
        let cell = this.#maze.getCellByPos(this.#player.pos);

        if(!cell.leftWall) {
            cell.background = "";
            this.#player.moveLeft()
            this.#maze.getCellByPos(this.#player.pos).background = "background: Green;"
        }
        this.checkWin();
    }

    movePlayerRight(){
        let cell = this.#maze.getCellByPos(this.#player.pos);
        if(!cell.rightWall) {
            cell.background = "";
            this.#player.moveRight()
            this.#maze.getCellByPos(this.#player.pos).background = "background: Green;"
        }
        this.checkWin();
    }

    /**
     * @returns {boolean} true if the player reached the endPos (so the player won)
     */
    checkWin(){
        return this.#player.pos.equals(this.#maze.endPos);
    }

    /**
     * @returns {string} String that contains the Maze as html tags
     */
    /*
    toHtml() {
        this.#maze.getCellByPos(this.#player.pos).background = "background: Green;";
        let output = this.#maze.toHtml();
        this.#maze.getCellByPos(this.#player.pos).background = "";

        return output;
    }
    */

    /**
     * @returns {HTMLElement[][]}
     */
    toElement(){
        let elements = this.#maze.toElement();
        elements[this.#player.pos.y][this.#player.pos.x].style.backgroundColor = "green";
        return elements;
    }
}