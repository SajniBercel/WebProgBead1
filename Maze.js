class Maze{
    // 2d array of cells
    mazeMap = [];
    size;

    constructor(n) {
        this.size = n;
        for (let i = 0; i < n; i++) {
            let row = [];
            for (let j = 0; j < n; j++) {
                row.push(new Cell(j, i));
            }
            this.mazeMap.push(row);
        }

        console.log(this.mazeMap);
    }

    // TODO
    getCell(pos){
        return getCell(pos.x, pos.y);
    }

    getCell(X, Y){
        return this.mazeMap[Y][X]
    }

    generateMaze () {
        let cellStack = []
        let currentCell = this.getCell(0,0)

        console.log(cellStack.length);

        cellStack.push(currentCell);

        console.log(cellStack.length);
        /*
        while (cellStack.length > 0) {

        }
        */
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