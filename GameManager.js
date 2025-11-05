import { seed } from "./sbRandom.js";
import { Maze } from "./Maze.js";
import { Game } from "./Game.js";
import { PathFinder } from "./PathFinder.js";

const startButton = document.querySelector("#startButton");
const showPathButton = document.querySelector("#showPathButton");
const showSmoothGeneration = document.querySelector("#showSmoothGeneration");

startButton.addEventListener("click", startClick)
showPathButton.addEventListener("click", showPath)
showSmoothGeneration.addEventListener("click", showGeneration)
document.addEventListener("keydown", keyEventHandler)

/** @type {number} */
let seedForRandom = 11;
const sleep = ms => new Promise(r => setTimeout(r, ms));

/** @type {boolean} */
let isProcessing = false;

/** html obj that will contain the maze */
const grid = document.querySelector("#tableContainer");

/** @type {Maze | null} */
let mainMaze = null;

/** @type {Game | null} */
let mainGame = null;

// a startban felül lesz írva úgyhogy nem fog rossz értéket adni
let Timer = performance.now();

function disableButtons() {
    isProcessing = true;
    startButton.disabled = true;
    showPathButton.disabled = true;
    showSmoothGeneration.disabled = true;
}

function enableButtons() {
    isProcessing = false;
    startButton.disabled = false;
    showPathButton.disabled = false;
    showSmoothGeneration.disabled = false;
}


function keyEventHandler(e){
    if (mainMaze === null || mainGame === null || isProcessing) {
        return;
    }

    if (e.code === "KeyW" || e.code === "ArrowUp") {
        mainGame.movePlayerUp()
    } else if (e.code === "KeyS" || e.code === "ArrowDown") {
        mainGame.movePlayerDown()
    } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
        mainGame.movePlayerLeft()
    } else if (e.code === "KeyD" || e.code === "ArrowRight") {
        mainGame.movePlayerRight()
    } else {
        console.log("unknown keycode: " + e.code);
        return;
    }

    if (!mainGame.checkWin()){
        draw(grid, mainGame);
    } else {
        draw(grid, mainGame);
        alert("Gartulálok, nyertél a játék " + (Math.round((performance.now() - Timer) / 100) / 10).toString() + "mp időt vett igénybe");
        mainGame = new Game(mainMaze);
        draw(grid, mainGame);
    }
}

async function showPath(){
    if (mainMaze === null || mainGame === null || isProcessing) {
        return;
    }
    disableButtons();

    mainGame = new Game(mainMaze); // a játékot 'reset'-eli
    let pathFinder = new PathFinder(mainMaze);

    let sleepTime = Number(document.querySelector("#animationStepTimer").value);
    if(sleepTime < 0){
        sleepTime = 0;
    }

    await generatePathAnimated(pathFinder, grid, sleepTime);
    // direkt nem áll vissza játék állapotba hogy tálható maradjon az út
    enableButtons();
}

async function showGeneration(){
    if (mainMaze === null || mainGame === null || isProcessing) {
        return;
    }
    disableButtons();
    mainGame = new Game(mainMaze); // a játékot 'reset'-eli

    // ez így kicsit csúnya de vissza kell állítani eredeti állapotba hogy ugyan az legyen mint az eredeti labirintus (pseudo random)
    seed(seedForRandom);
    mainMaze.resetToDefault();

    let sleepTime = Number(document.querySelector("#animationStepTimer").value);
    if(sleepTime < 0){
        sleepTime = 0;
    }

    await generateMazeAnimated(mainMaze, grid, sleepTime);
    draw(grid, mainGame); // vissza áll a játék állapotba

    enableButtons();

    Timer = performance.now();
}

/**
 * @param {Maze} maze
 * @param grid
 * @param {number} delayMs
 * @returns {Promise<void>}
 */
async function generateMazeAnimated(maze, grid, delayMs) {
    let done = false;
    while (!done) {
        done = maze.generateMazeStep();
        //console.log("done: " + done);
        draw(grid, maze);
        await sleep(delayMs);
    }
}

/**
 * @param {PathFinder} path
 * @param grid
 * @param {number} delayMs
 * @returns {Promise<void>}
 */
async function generatePathAnimated(path, grid, delayMs) {
    let done = false;
    while (!done) {
        done = path.generatePathStep();
        //console.log("done: " + done);
        draw(grid, path);
        await sleep(delayMs);
    }
}

/**
 * Init for the game
 * @returns {void}
 */
function startClick() {
    disableButtons();

    let numberOfRows = Number(document.querySelector("#numberOfRowsAndCols").value);
    if(numberOfRows <= 2){
        alert("A sorok száma nem lehet 2-nél kisebb szám");
        return;
    }

    if(numberOfRows > 50){
        alert("Elképzelhető hogy a nagy pálya méret miatt kicsit lassan fog müködni a játék és a monitor méretéhez igazítás miatt nehezen látható lesz")
    }

    seedForRandom = Number(document.querySelector("#randomizationSeed").value);
    if(seedForRandom <= 0){
        seedForRandom = 11;
    }

    seed(seedForRandom);
    mainMaze  = new Maze(numberOfRows);
    mainGame = new Game(mainMaze);

    grid.style.setProperty('--n', numberOfRows.toString());

    mainMaze.generateMaze();
    draw(grid, mainGame);

    Timer = performance.now();
    enableButtons()
}

/**
 * uses the .toElement() func and "displays" it
 * @param grid
 * @param {Maze | Game | PathFinder} maze
 */
function draw(grid, maze) {
    grid.replaceChildren();
    let mazeElements = maze.toElement();

    let borderSize = 2;
    if(mazeElements.length >= 15 || mazeElements[0].length >= 15){
        borderSize = 1;
    }

    for(let i = 0; i < mazeElements.length; i++){
        for (let j = 0; j < mazeElements[i].length; j++){
            mazeElements[i][j].style.borderWidth = borderSize.toString() + "px";
            grid.appendChild(mazeElements[i][j]);
        }
    }
}