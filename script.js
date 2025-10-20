import { seed } from "./sbRandom.js";
import { Maze } from "./Maze.js";

startButton.addEventListener("click", clickTest)
document.addEventListener("keydown", keyEventHandler)

/** @type {Maze | null} */
let maze = null;

/** html obj that will contain the maze */
const grid = document.querySelector("#tableContainer");

function keyEventHandler(e){
    if (maze === null){
        return;
    }

    if (e.code === "KeyW"){
        maze.movePlayerUp()
    } else if (e.code === "KeyS"){
        maze.movePlayerDown()
    } else if (e.code === "KeyA"){
        maze.movePlayerLeft()
    } else if (e.code === "KeyD"){
        maze.movePlayerRight()
    }

    draw(grid, maze);
}

function clickTest() {
    console.log("clicked");

    let numberOfRows = Number(document.querySelector("#numberOfRowsAndCols").value);
    console.log(numberOfRows);

    maze  = new Maze(numberOfRows);
    seed(11);


    grid.style.setProperty('--n', numberOfRows);


    const id = setInterval(() => {
        draw(grid, maze);
        const done = maze.generateMazeStep();
        if (done === true) clearInterval(id);
    }, 10);


    console.time("MazeGen");
    //maze.generateMaze(maze);
    console.timeEnd("MazeGen");

    draw(grid, maze)
}

function draw(grid, maze) {
    grid.innerHTML = maze.toHtml();
}