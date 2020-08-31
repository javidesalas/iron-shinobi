
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
    mapSize: 10000,
    background: undefined,
    player: undefined,
    enemys: [],
    sprites: [],
    frames: 0,
    speed : 1,
    init(){
        this.canvasId = 'gameCanvas'
        this.ctx = document.getElementById(this.canvasId).getContext('2d')
        
        this.fuji = new Image
        this.fuji.src = './images/fuji.png'
        this.background = new Background(this.ctx, './images/background.png')
        console.log(this.background)

    
        this.player = new Player(this.ctx, './images/player.png')
        this.sprites.push(new Sprite(this.ctx, './images/obstacle.png', 400, canvasH - 105, 100, 100))
        this.sprites.push(new Sprite(this.ctx, './images/obstacle.png', 700, canvasH - 55, 50, 50))
        this.gameOn()
    },

    gameOn(){
        setInterval(() => {
            frames++
            this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
            this.movementLoop()
            this.drawLoop()
            this.setEventListeners()
        }, 30)

    },

    
    checkColisionX() {
        this.sprites.forEach(elm => {
            if ((this.player.playerPos.x + (this.player.playerSpeedX ) + this.player.playerSize.w > elm.spritePos.x ) // Left
                && ((this.player.playerPos.x + (this.player.playerSpeedX) < elm.spritePos.x + elm.spriteSize.w)) // Right
                && (this.player.playerPos.y + this.player.playerSize.h > elm.spritePos.y) // Up
                && (this.player.playerPos.y < elm.spritePos.y + elm.spriteSize.h)) { // Right
                 
                    if (this.player.playerPos.y + this.player.playerSize.h > elm.spritePos.y - 2 // Up
                    && this.player.playerPos.y < elm.spritePos.y + elm.spriteSize.h + 2) {
                        this.player.collidesX = 1
                        const protection =  5
                        if (this.player.playerDir === 1) {
                            this.sprites.forEach(elm => {
                                elm.spritePos.x += protection
                                this.mapX -= protection
                            }) 
                        }
                        if (this.player.playerDir === -1) {
                            this.sprites.forEach(elm => {
                                elm.spritePos.x -= protection
                                this.mapX += protection
                            })
                        }
                    }
            }                 
        });
    },

    checkColisionY() {
        this.sprites.forEach(elm => {
            if ((this.player.playerPos.x + this.player.playerSize.w > elm.spritePos.x ) // Left
            && (this.player.playerPos.x < elm.spritePos.x + elm.spriteSize.w) // Right
            && (this.player.playerPos.y + (this.player.playerSpeedY) + this.player.playerSize.h > elm.spritePos.y) // Up
            && (this.player.playerPos.y + (this.player.playerSpeedY) < elm.spritePos.y + elm.spriteSize.h)) { // Right
                if ((this.player.playerPos.x + this.player.playerSize.w > elm.spritePos.x ) // Left
                && (this.player.playerPos.x < elm.spritePos.x + elm.spriteSize.w)) {
                    this.player.collidesY = 1
                    this.player.playerPos.y = elm.spritePos.y -this.player.playerSize.h -2
                }
            }
            if ((this.player.playerPos.y + this.player.playerSize.h < elm.spritePos.y +5)
                && (this.player.playerPos.y + this.player.playerSize.h > elm.spritePos.y)) {
                    this.player.onSprite = 1
                    console.log(this.player.onSprite)
            }
            
            
        });
    },

    movementLoop() {
        // limites laterales
        if ((this.player.playerDir === -1 && this.mapX >= 0 + 20)
                || (this.player.playerDir === 1 && this.mapX <= this.mapSize - this.player.playerSize.w - 20)){
            if(this.player.collidesX === 1) {
                this.player.playerSpeedX = 0
                this.player.collidesX = 0
            }
            else {
                this.sprites.forEach((elm) => {
                    elm.move(this.player.playerSpeedX)
                    this.mapX += this.player.playerSpeedX
                })
                this.checkColisionX()
            }
        }
        //limite suelo
        if (this.player.playerPos.y + this.player.playerSpeedY > canvasH - this.player.playerSize.h -5) {
            this.player.playerPos.y = canvasH - this.player.playerSize.h -5
            this.player.playerSpeedY = 0
            this.player.onFloor = 1
        }
        else {
            if (this.player.collidesY === 1) {
                this.player.playerSpeedY = 0
                this.player.collidesY = 0
                this.player.onSprite = 1
            }
            this.player.playerPos.y += this.player.playerSpeedY //movimiento vertical
            this.checkColisionY()
            
        }

        if ( !this.player.onFloor) {
            this.player.playerSpeedY+= 1.5 //gravedad
        }
    },

    drawLoop() {
        //background
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)

        
        this.ctx.drawImage(this.fuji, 0, 0)
        this.background.draw(this.mapX)
    

        this.player.draw()
        this.sprites.forEach(elm => elm.draw())
        
    }, // KEYCODES

    setEventListeners() {
        document.onkeydown = e => {
           // alert('entra down')
            e.keyCode === 37 ? this.player.move(-1, 5) : null
            e.keyCode === 39 ? this.player.move(+1, 5) : null
            e.keyCode === 32 && (this.player.onFloor || this.player.onSprite)  ? this.player.jump() : null
        }

        document.onkeyup = e => {
           
            e.keyCode === 37 ? this.player.move(-1, 0) : null
            e.keyCode === 39 ? this.player.move(+1, 0) : null
            
        }
    },

};






