import { seed, rand } from "./sbRandom.js";
import Maze from "./Maze.js";

// TODO tesztelni kell MINDENT
//document.addEventListener("DOMContentLoaded", generateMap)
document.addEventListener("click", clickTest)

function cropPos(cell){
    /*
    let pos = cell.pos.getNeighbors();
    let neighbors = [];

    for(let i = 0; i < pos.length; i++) {
        if(pos[i].x < 0 || pos[i].x >= maze[0].length || pos[i].y < 0 || pos[i].y >= Maze.length){

        } else {
            neighbors.push(pos[i]);
        }
    }

    return neighbors;
    */
}

function clickTest() {
    console.log("clicked");

    let mazeSize = 10;
    let maze = new Maze(10);

    seed(11);

    const id = setInterval(() => {
        draw(maze);
        const done = maze.generateMazeStep();
        if (done === true) clearInterval(id);
    }, 200);

    draw(maze)
}

function draw(maze) {
    let MytableContainer = document.getElementById("tableContainer");

    MytableContainer.innerHTML = '';
    let output = "";
    for(let i = 0; i < maze.size; i++) {
        let row = `<div class="row">`;
        for (let j = 0; j < maze.size; j++) {
            row += maze.getCellByXY(j, i).toHtml();
        }
        row += "</div>";
        output += row;
    }

    MytableContainer.innerHTML = output;
}