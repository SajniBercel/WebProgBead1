import {seed, rand} from "./sbRandom.js";
import {Cell} from "./Cell.js";

export default class Maze{
    // 2d array of cells
    #mazeMap = [];
    #currentCell;
    #cellStack = [];

    size;

    constructor (n) {
        this.size = n;

        for (let i = 0; i < n; i++) {
            let row = [];
            for (let j = 0; j < n; j++) {
                row.push(new Cell(j, i));
            }
            this.#mazeMap.push(row);
        }
        this.#currentCell = this.#mazeMap[this.size/2][0];
        this.#cellStack = [this.#currentCell]
        console.log(this.#mazeMap);
    }

    // TODO
    getCellByXY(X, Y){
        if((X < this.size && Y < this.size) && (X >= 0 && Y >= 0)) {
            return this.#mazeMap[Y][X];
        }

        return null;
    }

    getCellByPos(pos){
        if((pos.x < this.size && pos.y < this.size) && (pos.x >= 0 && pos.y >= 0)){
            return this.getCellByXY(pos.x, pos.y);
        }

        return null;
        //throw new Error("Positon out of range: X:" + pos.x + ", Y:" + pos.y);
    }

    // returns true when done, otherwise false
    generateMazeStep () {
        let nextCell = null;

        console.log(this.#currentCell);

        let Neighbours = this.#currentCell.pos.getNeighbors()
            .map(p => this.getCellByPos(p))
            .filter(c => c != null)
            .filter(c => c.visited === false);

        console.log("szomszédok:");
        console.log(Neighbours);

        if(Neighbours.length > 0){
            nextCell = Neighbours[rand()%Neighbours.length];

            this.#cellStack.push(nextCell);
            this.#currentCell.visited = true;

            this.removeWall(this.#currentCell, nextCell);
            this.#currentCell = nextCell;
        } else {
            this.#cellStack.pop()
            this.#currentCell = this.#cellStack[this.#cellStack.length - 1];
        }

        //this.#currentCell.background = "background: green";

        return this.#cellStack.length === 0;
    }

    // TODO
    removeWall(A, B){
        // TODO pos.equals
        /*
        if(!(A.pos.getNeighbors().includes(B.pos))){
            console.log("NEM SZOMSZÉDOS A 2 CELL")
            return;
        }
        */

        if (A.pos.y > B.pos.y){
            A.up = false;
            B.down = false;
        } else if (A.pos.y < B.pos.y) {
            A.down = false;
            B.up = false;
        }

        if (A.pos.x > B.pos.x){
            A.left = false;
            B.right = false;
        } else if (A.pos.x < B.pos.x) {
            A.right = false;
            B.left = false;
        }
    }
}