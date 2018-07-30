const pixelSize = 5;            
const canvasWidth = 900;
const canvasHeight = 500;

function StarGate() { 
    var x1 = ((Math.round(Math.random() * ((canvasWidth / pixelSize) - 4)) + 2) * pixelSize);
    var y1 = ((Math.round(Math.random() * ((canvasHeight / pixelSize) - 4)) + 2) * pixelSize);

    var x2 = ((Math.round(Math.random() * ((canvasWidth / pixelSize) - 4)) + 2) * pixelSize);
    var y2 = ((Math.round(Math.random() * ((canvasHeight / pixelSize) - 4)) + 2) * pixelSize);

    return {
        x1: x1, 
        y1: y1, 
        x2: x2, 
        y2: y2,
        remove: function() {
            rectangle(this.x1, this.y1, pixelSize, pixelSize, "black");
            rectangle(this.x2, this.y2, pixelSize, pixelSize, "black");
        },
        draw: function() {
            rectangle(this.x1, this.y1, pixelSize, pixelSize, "white");
            rectangle(this.x2, this.y2, pixelSize, pixelSize, "white");
        }
        };
    };

function BodyCell(x,y) { return {x: x, y: y}; }           

function Snake(){
    return {
        starGate: null,
        x: 100,
        y: 100,                    
        speedX: pixelSize,
        speedY: 0,                    
        cellSize: pixelSize,
        bodyCells:[],                    
        lengthToGrow: 10,                    
        init: function(x, y) {
            this.bodyCells = [BodyCell(x,y)];
            this.lengthToGrow = 10;
        },
        grow: function(n) { this.lengthToGrow += n; },
        move: function() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.starGate != null) {
                if ((this.x == this.starGate.x1) && (this.y == this.starGate.y1)) {
                    this.x = this.starGate.x2 + this.speedX;
                    this.y = this.starGate.y2 + this.speedY;
                    this.grow(3);
                } if ((this.x == this.starGate.x2) && (this.y == this.starGate.y2)) {
                    this.x = this.starGate.x1 + this.speedX;
                    this.y = this.starGate.y1 + this.speedY;
                    this.grow(3);
                }
            }

            if (getPixel(this.x, this.y).green != 0) start();
            else {

                rectangle(this.x, this.y, this.cellSize, this.cellSize, "green");
                this.bodyCells.push(BodyCell(this.x,this.y));                            
                if (this.lengthToGrow > 0) this.lengthToGrow--;
                else {
                    var removedCell = this.bodyCells.shift();
                    rectangle(removedCell.x, removedCell.y, this.cellSize, this.cellSize, "black");
                }
            }
        },

        newStarGate: function() {                           
            if (this.starGate !== null) this.starGate.remove();
            this.starGate = StarGate();
            this.starGate.draw();
        },

        turnUp: function() {
            if (this.speedY == 0){
                this.speedY = -pixelSize;
                this.speedX = 0;
            }
        },

        turnDown: function() {
            if (this.speedY == 0){
                this.speedY = pixelSize;
                this.speedX = 0;
            }
        },

        turnLeft: function() {
            if (this.speedX == 0){
                this.speedY = 0;
                this.speedX = -pixelSize;
            }
        },

        turnRight: function() {
            if (this.speedX == 0){
                this.speedY = 0;
                this.speedX = pixelSize;
            }
        }

    }
}

start();

starGateCounter = 0;


            
function update()
{
    // if (growthCounter > 100){
    //     growthCounter = 0;
    //     player.grow(1);
    // } else growthCounter++;
    
    if (starGateCounter > 300){
        starGateCounter = 0;
        player.newStarGate();                    
    } else starGateCounter++;

    player.move();
    
    if (keyboard.w)
    {
        player.turnUp();
    }
    
    if (keyboard.up)
    {
        player.turnUp();
    }

    if (keyboard.s)
    {
        player.turnDown();
    }
    
    if (keyboard.down)
    {
        player.turnDown();
    }

    if(keyboard.a)
    {  
        player.turnLeft();
    }  
    
    if(keyboard.left)
    {  
        player.turnLeft();
    }

    if(keyboard.d)
    {  
        player.turnRight();
    }

    if(keyboard.right)
    {  
        player.turnRight();
    }

    if(keyboard.space) stopUpdate();
}

function start()
{
    fill("green");
    rectangle(pixelSize, pixelSize, totalWidth - (pixelSize + pixelSize), totalHeight - (pixelSize + pixelSize), "black");
    player = Snake();
    player.init();
}
