class Cell{
    pos = new Position();

    // WALLS
    up = true;
    down = true;
    left = true;
    right = true;

    constructor(x, y){
        this.pos = new Position(x,y);
    }

    // HTML FORM
    toHtml(){
        let border = "";

        border += "border-style: solid;";


        border += "border-right-color:" + (this.down ? "black;" : "green;");
        border += "border-bottom-color:" + (this.left ? "black;" : "green;");
        border += "border-left-color:" + (this.right ? "black;" : "green;");
        border += "border-top-color:" + (this.up ? "black;" : "green;");
        
        return `<div class="cell" style="${border}"></div>`;
    }

    // FOR DEBUGING
    toString(){
        return
    }
}