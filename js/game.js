// TODO:
let canvasH = 600
let canvasW = 800


const shinobiApp = {
    name: 'Basic forms drawing app',
    author: 'Javier Salas && Gonzalo Martín',
    version: '1.0.0',
    license: undefined,
    description: 'Shinobi Game',
    canvasId: undefined,
    ctx: undefined,
    canvasSize: {
        w: canvasW,
        h: canvasH
    },
    mapX: 0,
    mapY: undefined,
    player: undefined,
    enemys: [],
    obstacles: [],
    frames: 0,
    speed : 1,
    init(){
        this.canvasId = 'gameCanvas'
        this.ctx = document.getElementById(this.canvasId).getContext('2d')
        this.player = new Player(this.ctx, './images/player.png')
        this.obstacles.push(new Obstacle(this.ctx, './images/obstacle.png'))

        setInterval(() => {
            this.mapX++
            frames++
            this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
            this.movementLoop()
            this.drawLoop()
            this.setEventListeners()
            
        }, 30)
    },
    checkColisionX() {
        //let dirColision = 0
        this.obstacles.forEach(elm => {
            if ((this.player.playerPos.x + (this.player.playerSpeedX ) + this.player.playerSize.w > elm.obsPos.x ) // Left
                && ((this.player.playerPos.x + (this.player.playerSpeedX ) < elm.obsPos.x + elm.obsSize.w)) // Right
                && (this.player.playerPos.y + this.player.playerSize.h > elm.obsPos.y) // Up
                && (this.player.playerPos.y < elm.obsPos.y + elm.obsSize.h)) { // Right
                  

                    if (this.player.playerPos.y + this.player.playerSize.h > elm.obsPos.y - 2 // Up
                    && this.player.playerPos.y < elm.obsPos.y + elm.obsSize.h + 2) {
                        this.player.colidesX = 1
                        if (this.player.playerDir === 1) {
                            this.player.playerPos.x = elm.obsPos.x - this.player.playerSize.w -2
                        }
                        if (this.player.playerDir === -1) {
                            this.player.playerPos.x = elm.obsPos.x + elm.obsSize.w +2
                        }
                    }
            }
        });
        //return dirColision
    },
    checkColisionY() {
        //let dirColision = 0
        this.obstacles.forEach(elm => {
            if ((this.player.playerPos.x + this.player.playerSize.w > elm.obsPos.x ) // Left
                && (this.player.playerPos.x < elm.obsPos.x + elm.obsSize.w) // Right
                && (this.player.playerPos.y + (this.player.playerSpeedY) + this.player.playerSize.h > elm.obsPos.y) // Up
                && (this.player.playerPos.y + (this.player.playerSpeedY) < elm.obsPos.y + elm.obsSize.h)) { // Right
                    if ((this.player.playerPos.x + this.player.playerSize.w > elm.obsPos.x ) // Left
                    && (this.player.playerPos.x < elm.obsPos.x + elm.obsSize.w)) {
                        this.player.colidesY = 1
                        this.player.playerPos.y = elm.obsPos.y -this.player.playerSize.h -2
                    }
                }
            
        });
        //return dirColision
    },
    movementLoop() {
        // limites laterales
        if ((this.player.playerDir === -1 && this.player.playerPos.x >= 0 + 20)
                || (this.player.playerDir === 1 && this.player.playerPos.x <= canvasW - this.player.playerSize.w - 20)){
            if(this.player.colidesX === 1) {
                this.player.playerSpeedX = 0
                this.player.colidesX = 0
            }
            else{
                this.player.playerPos.x += this.player.playerSpeedX //movimiento horizontal
                this.checkColisionX()
            }
        }
        //limite suelo
        if (this.player.playerPos.y > canvasH - this.player.playerSize.h -5) {
            this.player.playerPos.y = canvasH - this.player.playerSize.h -5
            this.player.playerSpeedY = 0
            this.player.onFloor = 1
        }
       
       
        else {
            if (this.player.colidesY === 1) {
                this.player.playerSpeedY = 0
                this.player.colidesY = 0
            }
            this.player.playerPos.y += this.player.playerSpeedY //movimiento vertical
            this.checkColisionY()
        }

        if ( this.player.onFloor === 0) {
            this.player.playerSpeedY+= 1.5 //gravedad
        }
    },

    drawLoop() {
        //background
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)

        //cargar objetos

        //Intervalo


        this.player.draw()
        this.obstacles.forEach(elm => elm.draw())

        
    }, // KEYCODES
    setEventListeners() {
        document.onkeydown = e => {
           // alert('entra down')
            e.keyCode === 37 ? this.move(-1, 5) : null
            e.keyCode === 39 ? this.move(+1, 5) : null
            e.keyCode === 32 && this.player.onFloor ? this.player.jump() : null
        }

        document.onkeyup = e => {
           
            e.keyCode === 37 ? this.move(-1, 0) : null
            e.keyCode === 39 ? this.move(+1, 0) : null
            
        }

    },
    move(dir, speed) {
        this.player.move(dir, speed)
        // this.ctx.enemy.move(dir)
        // this.ctx.obstacle.move(dir)
    }
};

class Player {
    constructor(ctx, img) {
        this.ctx = ctx
        this.playerSize = {
            w: 200,
            h: 300,
        }
        this.playerPos = {
            x: 0,
            y: canvasH - this.playerSize.h
        }
        this.playerImg = undefined
        this.playerSpeedX = 0 // Podemos mandarle y añadirle la velocidad global del juego
        this.playerSpeedY = 0
        this.playerDir = 1
        this.onFloor = 1
        this.collidesX = 0
        this.initPlayer(img)
    }

    initPlayer (img) {
        this.playerImg = new Image
        this.playerImg.src = img
    }
    draw() {
        this.ctx.drawImage(this.playerImg, this.playerPos.x, this.playerPos.y,  this.playerSize.w , this.playerSize.h)
    }

    move(dir, speed) {
        this.playerDir = dir
 
        this.playerSpeedX = speed * dir
 
    }
    jump() {
        this.onFloor = 0

        this.playerSpeedY = -30    
    }
}    


class enemy {
    constructor(ctx) {
        this.ctx = ctx
        this.enemyPos = {
            x: 0,
            y: 0
        }
        this.enemyImg = undefined
        this.enemySize = {
            w: 200,
            h: 300,
        }
        this.enemySpeed = this.ctx.speed
        this.enemyDir = -1

    }
    move() {
        
    }
  
}

class Obstacle {
    constructor(ctx, img) {
        this.ctx = ctx
        this.obsPos = {
            x: 300,
            y: canvasH - 150
        }
        this.obsImg = undefined
        this.obsSize = {
            w: 100,
            h: 150,
        }
        this.obsSpeed = this.ctx.speed
    //  this.obsDir = -1
        this.initObstacle(img)
    }
    initObstacle (img) {
        this.obsImg = new Image
        this.obsImg.src = img
    }
    draw() {
        this.ctx.drawImage(this.obsImg, this.obsPos.x, this.obsPos.y,  this.obsSize.w , this.obsSize.h)
    }
    move() {

    }
}
    
