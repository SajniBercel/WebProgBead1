import { seed } from "./sbRandom.js";
import { Maze } from "./Maze.js";
import { Game } from "./Game.js";
import { PathFinder } from "./PathFinder.js";
import {Position} from "./Position.js";

startButton.addEventListener("click", startClick)
showPathButton.addEventListener("click", showPath)
showSmoothGeneration.addEventListener("click", showGeneration)
document.addEventListener("keydown", keyEventHandler)

const SEED = 11;

/** @type {Maze | null} */
let maze = null;

/** @type {Game | null} */
let game = null;

/** html obj that will contain the maze */
const grid = document.querySelector("#tableContainer");

function keyEventHandler(e){
    if (maze === null){
        return;
    }

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

function showGeneration(){
    seed(SEED);
    maze.resetToDefault();

    const id = setInterval(() => {
        draw(grid, maze);
        const done = maze.generateMazeStep();
        if (done === true) clearInterval(id);
    }, 50);
}

function showPath(){
    let pathFinder = new PathFinder(maze);
    //pathFinder.generatePath()

    const id = setInterval(() => {
        draw(grid, pathFinder);
        const done = pathFinder.generatePathStep();
        if (done === true) clearInterval(id);
    }, 50);

    draw(grid, pathFinder);
}


function startClick() {
    console.log("Start click");
    let numberOfRows = Number(document.querySelector("#numberOfRowsAndCols").value);
    seed(SEED);

    maze  = new Maze(numberOfRows);

    grid.style.setProperty('--n', numberOfRows);

    console.time("MazeGen");
    maze.generateMaze(maze);
    console.timeEnd("MazeGen");

    game = new Game(maze);
    draw(grid, game);
}

function draw(grid, maze) {
    grid.innerHTML = maze.toHtml();
}