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
    }

    /**
     * @returns {boolean} true if done otherwise false
     */
    // TODO: return ellenörzés (biztos kell ennyi? nem lehetne elhagyni valami?)
    generatePathStep(){
        if(this.#numbers === null)
            this.generateNumberTable();

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
        while (this.generatePathStep()){}
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
        let output = Neighbours.filter(c => this.isReachable(cell, c));

        return output;
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

    /**
     * @returns {string} String that contains the Maze as html tags
     */
    toHtml() {
        console.log("PathFinder toHtml");

        for(let i = 0; i < this.#path.length; i++){
            this.#maze.getCellByPos(this.#path[i]).background = "background: gray;";
        }

        let output = this.#maze.toHtml();

        for(let i = 0; i < this.#path.length; i++){
            this.#maze.getCellByPos(this.#path[i]).background = "";
        }
        return output;
    }
}