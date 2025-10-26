import { rand } from "./sbRandom.js";
import { Cell } from "./Cell.js";
import { Position } from "./Position.js";

export class Maze{
    /** @type {[Cell[]]} */
    #mazeMap = [];

    /**
     * N*N (size = n)
     * @type {number} */
    size;

    /** @type {Position} */
    startPos;

    /** @type {Position} */
    endPos;

    /** @type {Cell} */
    #currentCell;

    /** @type {Cell[]} */
    #cellStack = [];

    /** @param {number} n */
    constructor (n) {
        console.log("maze start");

        const mid = Math.floor(n / 2);
        this.size = n;
        this.endPos = new Position(this.size-1, mid);
        this.startPos = new Position(0, mid);

        this.#mazeMap = [];
        for (let i = 0; i < n; i++) {
            let row = [];
            for (let j = 0; j < n; j++) {
                row.push(new Cell(j, i));
            }
            this.#mazeMap.push(row);
        }

        this.#currentCell = this.#mazeMap[mid][0];
        this.#currentCell.visited = true;
        this.#cellStack = [this.#currentCell];
    }

    resetToDefault(){
        this.#mazeMap = [];
        for (let i = 0; i < this.size; i++) {
            let row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(new Cell(j, i));
            }
            this.#mazeMap.push(row);
        }

        this.#currentCell = this.#mazeMap[Math.floor(this.size / 2)][0];
        this.#currentCell.visited = true;
        this.#cellStack = [this.#currentCell];
    }

    /**
     * @param {number} X
     * @param {number} Y
     * @returns {Cell|null} Cell if the given X, Y position  is valid otherwise null
     */
    getCellByXY(X, Y){
        if((X < this.size && Y < this.size) && (X >= 0 && Y >= 0)) {
            return this.#mazeMap[Y][X];
        }

        return null;
    }

    /**
     * @param {Position} pos
     * @returns {Cell|null} Cell if the given pos is valid otherwise null
     */
    getCellByPos(pos){
        return this.getCellByXY(pos.x, pos.y);
    }

    /**
     * generates maze with "generateMazeStep()" with while
     * @returns {void}
     */
    generateMaze(){
        while (!this.generateMazeStep()){}
    }

    /**
     * @returns {boolean} true if done, otherwise false
     */
    generateMazeStep () {
        if(this.#cellStack.length === 0){
            return true;
        }

        const Neighbours = this.#currentCell.pos.getNeighbors()
            .map((p) => this.getCellByPos(p))
            .filter(Boolean)
            .filter((c) => c.visited === false);

        let randomNum = rand();

        if(Neighbours.length > 0){
            let nextCell = Neighbours[randomNum%Neighbours.length];

            this.#cellStack.push(nextCell);

            this.removeWall(this.#currentCell, nextCell);
            this.#currentCell = nextCell;
        } else {
            this.#cellStack.pop()
            this.#currentCell = this.#cellStack[this.#cellStack.length - 1];
        }

        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++) {
                this.getCellByXY(j,i).background = "";
            }
        }

        if(this.#currentCell != null) {
            this.#currentCell.visited = true;
            this.#currentCell.background = "background: green;";
        }

        this.getCellByPos(this.endPos).background = "background: blue;"

        return false;
    }

    /**
     * @param {Cell} A
     * @param {Cell} B
     */
    removeWall(A, B){
        if (A.pos.y > B.pos.y){
            A.upWall = false;
            B.downWall = false;
        } else if (A.pos.y < B.pos.y) {
            A.downWall = false;
            B.upWall = false;
        }

        if (A.pos.x > B.pos.x){
            A.leftWall = false;
            B.rightWall = false;
        } else if (A.pos.x < B.pos.x) {
            A.rightWall = false;
            B.leftWall = false;
        }
    }

    /**
     * @returns {string} String that contains the Maze as html tags
     */
    toHtml(){
        console.log("maze.toHtml");

        this.#mazeMap[this.endPos.y][this.endPos.x].background = "background: blue;"; // end cell

        let output = "";
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++) {
                output += this.getCellByXY(j, i).toHtml();
            }
        }

        return output;
    }
}