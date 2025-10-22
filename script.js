import { seed } from "./sbRandom.js";
import { Maze } from "./Maze.js";
import { Game } from "./Game.js";
import { PathFinder } from "./PathFinder.js";
import {Position} from "./Position.js";

startButton.addEventListener("click", startClick)
showPathButton.addEventListener("click", showPath)
document.addEventListener("keydown", keyEventHandler)

/** @type {Maze | null} */
let maze = null;

/** html obj that will contain the maze */
const grid = document.querySelector("#tableContainer");

function keyEventHandler(e){
    if (maze === null){
        return;
    }

    let game = new Game(maze);

    if (e.code === "KeyW"){
        game.movePlayerUp()
    } else if (e.code === "KeyS"){
        game.movePlayerDown()
    } else if (e.code === "KeyA"){
        game.movePlayerLeft()
    } else if (e.code === "KeyD"){
        game.movePlayerRight()
    }

    if (!game.checkWin()){
        draw(grid, game);
    } else {
        console.log("\nJáték vége\n");
    }
}


function showPath(){
    let pathFinder = new PathFinder(maze);

    pathFinder.generatePath()

    console.log(pathFinder);

    draw(grid, pathFinder);
}


function startClick() {
    console.log("clicked");

    let numberOfRows = Number(document.querySelector("#numberOfRowsAndCols").value);
    console.log(numberOfRows);

    maze  = new Maze(numberOfRows);
    seed(7);


    grid.style.setProperty('--n', numberOfRows);

    // const id = setInterval(() => {
    //     draw(grid, maze);
    //     const done = maze.generateMazeStep();
    //     if (done === true) clearInterval(id);
    // }, 10);

    console.time("MazeGen");
    maze.generateMaze(maze);
    console.timeEnd("MazeGen");

    draw(grid, maze);
}

function draw(grid, maze) {
    grid.innerHTML = maze.toHtml();
}