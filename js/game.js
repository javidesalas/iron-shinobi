
// TODO: 
let canvasH = 600
let canvasW = 800
let jump = 0

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
        console.log(this.player)
        console.log(this.player.playerImg)
        setInterval(() => {
            this.mapX++
            frames++
            this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
            this.movement()
            this.draw()
            this.setEventListeners()
            
        }, 30)
    },
    movement() {
        this.player.playerPos.x += this.player.playerSpeedX
        this.player.playerPos.y += this.player.playerSpeedY

        //this.player.playerSpeedY+= 1.5
    },

    draw() {
        //background
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)

        //cargar objetos

        //Intervalo

            //tenemos que dibujar todo.
        this.player.draw()
            //detectar colisiones
            //
        
    }, // KEYCODES
    setEventListeners() {
        document.onkeydown = e => {
           // alert('entra down')
            e.keyCode === 37 ? this.move(-1, 5) : null
            e.keyCode === 39 ? this.move(+1, 5) : null
            e.keyCode === 32 ? this.player.jump(this.frames) : null
        }

        document.onkeyup = e => {
            //alert('entra ip')
            e.keyCode === 37 ? this.move(-1, 0.1) : null
            e.keyCode === 39 ? this.move(+1, 0.1) : null
            e.keyCode === 32 ? this.player.jump(this.frames) : null
        }
        // document.onkeyup = e => {
        //     e.keyCode === 32 ? this.player.floor(this.frames) : null
        // }
         // KEY PRESS  r:
            // this.ctx.move(dir) ?
       // KEY PRESS space:
            // this.ctx.jump() ?
    },
    move(dir) {
        this.player.move(dir)
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
        this.gravity = 0.5
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
        this.playerSpeedX = speed * this.playerDir
            
    }
    jump() {
        jump = 1

        this.playerSpeedY = -50

            // if (this.playerPos.y > 100)
            //     this.playerPos += 10 
            // else 
            //     this.playerPos += 1
            // console.log(this.playerPos.y)
            // this.playerPos.y -= this.jumpSpeed
            // this.jumpSpeed += this.gravity
        
    }
}    


class enemy {
    constructor(ctx) {
        this.ctx = ctx
        enemyPos = {
            x: 0,
            y: 0
        }
        enemyImg = undefined
        enemySize = {
            w: 200,
            h: 300,
        }
        enemySpeed = this.ctx.speed
        enemyDir = -1
    }
    move() {
        
    }
  
}

class obstacle {
    constructor(ctx) {
        this.ctx = ctx
        obsPos = {
            x: 0,
            y: 0
        }
        obsImg = undefined
        obsSize = {
            w: 200,
            h: 300,
        }
        obsSpeed = this.ctx.speed
        obsDir = -1
    }
    move() {

    }
}

    

// player = cuadrado verde, 
// enemy = cuadrado marron,
// obstacles = cuadrados amarillos,
// keycodes,
    
    
