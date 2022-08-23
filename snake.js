const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width = 500;
canvas.height = 500;

let field = {
    x: 0, 
    y: 0, 
    width: 500, 
    height: 500, 
    draw(){
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let snakeHead = {
    x: 0, 
    y: 0, 
    width: 50, 
    height: 50, 
    body: 0, 
    draw(){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class SnakeBody {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Rat {
    constructor(){
        this.x = 50 * getRandomInt(0, 10);
        this.y = 50 * getRandomInt(0, 10);
        this.width = 50
        this.height = 50
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let snakeBodyArr = [];
let rat;
do{
    rat = new Rat();
}while(rat.x == snakeHead.x && rat.y == snakeHead.y)


allDraw();

document.addEventListener('keydown', (e)=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(e.code == 'ArrowLeft'){
        if(snakeHead.x > 0){
            snakeHead.x -= 50;
            if(snakeHead.body > 0){
                let snakeBody = new SnakeBody(snakeHead.x+50, snakeHead.y);
                snakeBodyArr.push(snakeBody);
            }
        }
    }else if(e.code == 'ArrowRight'){
        if(snakeHead.x < (field.width - snakeHead.width) ){
            snakeHead.x += 50;
            if(snakeHead.body > 0){
                let snakeBody = new SnakeBody(snakeHead.x-50, snakeHead.y);
                snakeBodyArr.push(snakeBody);
            }
        }
    }else if(e.code == 'ArrowDown'){
        if(snakeHead.y < (field.height - snakeHead.height) ){
            snakeHead.y += 50;
            if(snakeHead.body > 0){
                let snakeBody = new SnakeBody(snakeHead.x, snakeHead.y-50);
                snakeBodyArr.push(snakeBody);
            }
        }
    }else if(e.code == 'ArrowUp'){
        if(snakeHead.y > 0 ){
            snakeHead.y -= 50;
            if(snakeHead.body > 0){
                let snakeBody = new SnakeBody(snakeHead.x, snakeHead.y+50);
                snakeBodyArr.push(snakeBody);
            }
        }
    }

    if(snakeBodyArr.length > snakeHead.body){
        snakeBodyArr.splice(0, 1);
    }

    if(snakeHead.x == rat.x && snakeHead.y == rat.y){
        rat = new Rat();
        snakeHead.body += 1;
    }
    
    allDraw();
})

function allDraw(){
    field.draw();
    snakeHead.draw();
    if(snakeBodyArr.length > 0){
        snakeBodyArr.forEach((a, i, o)=>{
            a.draw();
        })
    }
    rat.draw();

}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min)) + min;
}