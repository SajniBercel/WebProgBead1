import { Position } from "./Position.js";
import { Cell } from "./Cell.js";

export class PathFinder {

    /** @type {Maze} */
    #maze;

    /** @type {number[][]} */
    #numbers = [];

    /** @type {Position[]} */
    #path = [];

    /**
     * turns every cell unvisited (cuz it'll be used in path finding)
     * @param {Maze} maze
     */
    constructor(maze){
        this.#maze = maze;
        for (let i = 0; i < maze.size; i++) {
            let temp = [];
            for (let j = 0; j < maze.size; j++) {
                maze.getCellByXY(j,i).visited = false;
                temp.push(-1);
            }
            this.#numbers.push(temp);
        }
    }

    generatePath(){
        this.generateNumberTable();

        let currentPos = this.#maze.startPos;

        /*
        while (!currentPos.equals(this.#maze.endPos)){
            currentPos.getNeighbors()
                .filter(p => p.y >= 0 && p.x >= 0 && p.y < this.#maze.size && p.x <= this.#maze.size)
                .reduce((acc, cur) => {
                    if(this.#numbers[cur.y][cur.x] ){}
                }, this.#maze.size*2)

        }
        */

        console.log(this.#numbers);
    }

    // TODO, zsák utcába nem tud merre menni, mert ahonnan jött ott ugye visited a cell és fal van körbe (az isReachable nélkül egész jól müködik)
    generateNumberTable(){
        console.log("Finding path");

        let run = true;
        let currentPos = this.#maze.endPos;
        let positionsToCheck = [currentPos];
        let n = 0;
        this.placeNumber(n, positionsToCheck);
        currentPos.visited = true;
        n++;

        while (run) {
            let tempPositionsToCheck = [];

            for (let i = 0; i < positionsToCheck.length; i++) {
                currentPos = positionsToCheck[i];

                let validNeighbours = this.getValidNeighbours(currentPos).map(x => x.pos);
                console.log("valid neighbours");
                console.log(validNeighbours);
                if (validNeighbours.length === 0) {
                    break;
                }

                console.log("valid:");
                console.log(validNeighbours);

                this.placeNumber(n, validNeighbours);

                if(currentPos.equals(this.#maze.startPos) || n >= 50){
                    run = false;
                    break;
                }

                tempPositionsToCheck.push(validNeighbours);
            }

            positionsToCheck = tempPositionsToCheck.flat(1);
            n++;

            console.log("n");
            console.log(n);

            if(currentPos.equals(this.#maze.startPos) || n >= 50){
                run = false;
                break;
            }
        }
    }

    /**
     * @param {number} n
     * @param {Position[]} poss
     */
    placeNumber(n, poss){
        for(let i = 0; i < poss.length; i++) {
            this.#numbers[poss[i].y][poss[i].x] = n;
            this.#maze.getCellByPos(poss[i]).visited = true;
        }
    }

    /**
     * @param pos
     * @returns {(Cell|null)[]}
     */
    getValidNeighbours(pos){
        const Neighbours = pos.getNeighbors()
            .map((p) => this.#maze.getCellByPos(p))
            .filter(Boolean)
            .filter(c => c.visited === false);

        console.log("inside:");
        console.log(Neighbours);

        let cell = this.#maze.getCellByPos(pos);
        let output = Neighbours/*.filter(c => this.isReachable(cell, c));*/

        console.log("output:");
        console.log(output);

        return output;
    }

    /**
     * @param {Cell} cellA
     * @param {Cell} cellB
     * @returns {boolean} true if the 2 cell can reach each others, otherwise false
     */
    // TODO
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
        for(let i = 0; i < this.#numbers.length; i++){
            for(let j = 0; j < this.#numbers[i].length; j++) {
                // TODO
            }
        }
        return this.#maze.toHtml();
    }
}