import { Position } from "./Position.js";
import { Cell } from "./Cell.js";

export class PathFinder {

    /** @type {Maze} */
    #maze;

    /** @type {number[][] | null} */
    #numbers = null;

    /** @type {Position[]} */
    #path = [];

    /** @type {Position} */
    #currentPos = null;

    /**
     * turns every cell unvisited (cuz it'll be used in path finding)
     * @param {Maze} maze
     */
    constructor(maze){
        this.#maze = maze;
        this.#currentPos = maze.startPos;
        this.#numbers = [];
    }

    /**
     * @returns {boolean} true if done otherwise false
     */
    generatePathStep(){
        if(this.#numbers === null || this.#numbers.length < this.#maze.size) {
            this.generateNumberTable();
        }

        if(this.#currentPos.equals(this.#maze.endPos)){
            return true;
        }

        let minPos = this.#currentPos;

        let neighbors = this.#currentPos.getNeighbors()
            .filter(p => p.y >= 0 && p.x >= 0 && p.y < this.#maze.size && p.x <= this.#maze.size)// remove out of range
            .map(p => this.#maze.getCellByPos(p))
            .filter(Boolean);

        if(neighbors.length < 1){
            return true;
        }

        neighbors = neighbors.filter(c => this.isReachable(this.#maze.getCellByPos(this.#currentPos), c))
            .map(c => c.pos);

        for(let i = 0; i < neighbors.length; i++){
            if(this.#numbers[minPos.y][minPos.x] > this.#numbers[neighbors[i].y][neighbors[i].x]){
                minPos = neighbors[i];
            }
        }

        this.#currentPos = minPos;
        this.#path.push(this.#currentPos);

        return false;
    }

    generatePath(){
        while (!this.generatePathStep()){}
    }

    generateNumberTable(){
        // alloc
        this.#numbers = [];
        for (let i = 0; i < this.#maze.size; i++) {
            let temp = [];
            for (let j = 0; j < this.#maze.size; j++) {
                this.#maze.getCellByXY(j,i).visited = false;
                temp.push(-1);
            }
            this.#numbers.push(temp);
        }

        // generate number
        let run = true;
        let currentCell = this.#maze.getCellByPos(this.#maze.endPos);
        let n = 0;
        this.placeNumber(n, currentCell);
        n++;

        let cellsToCheck = this.getValidNeighbours(currentCell.pos);
        while (run) {
            let tempCells = [];

            for(let i = 0; i < cellsToCheck.length; i++){
                currentCell = cellsToCheck[i];

                this.placeNumber(n, currentCell);
                tempCells.push(this.getValidNeighbours(currentCell.pos));

                if(this.#maze.getCellByPos(this.#maze.startPos).visited){
                    run = false;
                    break;
                }
            }

            n++;
            cellsToCheck = tempCells
                .flat(1)
        }
    }

    /**
     * @param {number} n
     * @param {Cell} cell
     */
    placeNumber(n, cell) {
        this.#numbers[cell.pos.y][cell.pos.x] = n;
        cell.visited = true;
    }

    /**
     * @param {Position} pos
     * @returns {(Cell|null)[]}
     */
    // TESTED
    getValidNeighbours(pos){
        const Neighbours = pos.getNeighbors()
            .map((p) => this.#maze.getCellByPos(p))
            .filter(Boolean)
            .filter(c => c.visited === false);

        let cell = this.#maze.getCellByPos(pos);
        return Neighbours.filter(c => this.isReachable(cell, c));
    }

    /**
     * @param {Cell} cellA
     * @param {Cell} cellB
     * @returns {boolean} true if the 2 cell can reach each others, otherwise false
     */
    isReachable(cellA, cellB){
        if(cellA.pos.x > cellB.pos.x){
            if(cellA.leftWall || cellB.rightWall){
                return false;
            }
        } else if (cellA.pos.x < cellB.pos.x){
            if(cellA.rightWall || cellB.leftWall){
                return false;
            }
        }

        if(cellA.pos.y > cellB.pos.y){
            if(cellA.upWall || cellB.downWall){
                return false;
            }
        } else if (cellA.pos.y < cellB.pos.y){
            if(cellA.downWall || cellB.upWall){
                return false;
            }
        }

        return true;
    }


    resetToDefault(){
        this.#maze.resetToDefault();
        this.#path = [];
        this.numbers = [];
        this.#currentPos = maze.startPos;
    }


    /**
     * @returns {string} String that contains the Maze as html tags
     */
    /*
    toHtml() {
        for(let i = 0; i < this.#path.length; i++){
            this.#maze.getCellByPos(this.#path[i]).background = "background: gray;";
        }

        let output = this.#maze.toHtml();

        for(let i = 0; i < this.#path.length; i++){
            this.#maze.getCellByPos(this.#path[i]).background = "";
        }
        return output;
    }
    */

    /**
     * @returns {HTMLElement[][]}
     */
    toElement(){
        /** @type {HTMLElement[][]} */
        let elements = this.#maze.toElement();

        for(let i = 1; i < this.#path.length; i++){
            if (this.#path[i-1].y > this.#path[i].y){
                elements[this.#path[i-1].y][this.#path[i-1].x].style.borderTopColor = "gray";
                elements[this.#path[i].y][this.#path[i].x].style.borderBottomColor = "gray";
            } else if (this.#path[i-1].y < this.#path[i].y) {
                elements[this.#path[i-1].y][this.#path[i-1].x].style.borderBottomColor = "gray";
                elements[this.#path[i].y][this.#path[i].x].style.borderTopColor = "gray";
            }else if (this.#path[i-1].x > this.#path[i].x){
                elements[this.#path[i-1].y][this.#path[i-1].x].style.borderLeftColor = "gray";
                elements[this.#path[i].y][this.#path[i].x].style.borderRightColor = "gray";
            } else if (this.#path[i-1].x < this.#path[i].x) {
                elements[this.#path[i-1].y][this.#path[i-1].x].style.borderRightColor = "gray";
                elements[this.#path[i].y][this.#path[i].x].style.borderLeftColor = "gray";
            }

            elements[this.#path[i-1].y][this.#path[i-1].x].style.backgroundColor = "gray";
        }
        // az első elem legyen zőld (mintha egy csiga húzná a csíkot)
        elements[this.#path[this.#path.length-1].y][this.#path[this.#path.length-1].x].style.backgroundColor = "green";

        return elements;
    }
}