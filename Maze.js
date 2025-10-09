import { rand } from "./sbRandom.js";
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
        this.#currentCell.visible = true;
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
        return this.getCellByXY(pos.x, pos.y);
    }

    // returns true when done, otherwise false
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
            console.log("backing")
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

        return false;
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

    toHtml(){
        let output = "";
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++) {
                output += this.getCellByXY(j, i).toHtml();
            }
        }

        return output;
    }
}