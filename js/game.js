
let canvasH = 600
let canvasW = 800
let FRAMES = 0

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
    enemies: undefined,
    sprites: [],
    decorations: [],
    bull: undefined,
    frames: 0,
    speed : 1,
    init(){
        this.canvasId = 'gameCanvas'
        this.ctx = document.getElementById(this.canvasId).getContext('2d')
        
        this.fuji = new Image
        this.fuji.src = './images/fuji.png'
        this.background = new Background(this.ctx, './images/background.png')

        this.decorations.push(new Decoration(this.ctx,'./images/tree.png',700, 75, 450, 450))

        this.player = new Player(this.ctx, './images/player.png')

        this.sprites.push(new Sprite(this.ctx, './images/obstacle.png', 250, canvasH - 105, 100, 100))
        this.sprites.push(new Sprite(this.ctx, './images/obstacle.png', 700, canvasH - 55, 50, 50))
        
        //this.sprites.push(new Enemy(this.ctx, './images/enemy.png', 400, canvasH - 155, 150, 150))
      
        this.gameOn()
        
        //this.bull = new Bullet(this.ctx, './images/shuriken1.png', this.player.playerPos.x + this.player.playerSize.w, this.player.playerPos.y, 10, 10)
        
    },

    gameOn() {
        
        this.setEventListeners()
        setInterval(() => {
            FRAMES++
            if (FRAMES > 10000) FRAMES = 0
            this.manageMap()

            this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
            this.movementLoop()
            this.drawLoop()
        }, 30)  

    },

    manageMap(){
        let mapFlag = [0,0,0]
        let mapCounter = 0

        if (this.mapX > 900 && mapFlag[mapCounter]=== 0) {
            this.sprites.push(new Enemy (this.ctx, './images/enemy.png', 1700, canvasH - 155, 150, 150))
            mapCounter++
        }


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
                        const protection = 5
                        if (elm.fromEnemy === 1 || elm.constructor.name === 'Enemy')
                            alert("GAME OVER")
                        if (this.player.playerDir === 1) {
                            this.sprites.forEach(elm => {
                                elm.spritePos.x += protection
                            }) 
                            this.mapX -= protection
                            this.decorations.forEach(elm => elm.decoPos.x += protection)
                        }
                        if (this.player.playerDir === -1) {
                            this.sprites.forEach(elm => {
                                elm.spritePos.x -= protection
                            })
                            this.mapX += protection
                            this.decorations.forEach(elm => elm.decoPos.x -= protection)
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
                    if (elm.fromEnemy === 1 || elm.constructor.name === 'Enemy')
                    alert("GAME OVER")
                    this.player.collidesY = 1
                    this.player.playerPos.y = elm.spritePos.y -this.player.playerSize.h -2
                }
            }
            if ((this.player.playerPos.y + this.player.playerSize.h < elm.spritePos.y +5)
                && (this.player.playerPos.y + this.player.playerSize.h > elm.spritePos.y)) {
                    this.player.onSprite = 1
            }
            
            
        });
    },
    checkBulletsColision() {
    let count = 0
    this.sprites.forEach((elm) => {
        count++
        if (elm.isBullet === 1) {
            for (let i = count - 2; i >= 0; i--) {
                if (this.sprites[i].constructor.name !== 'Enemy' || elm.fromEnemy !== 1) {
                    if (elm.dirBullet === 1 && this.sprites[i].spritePos.x > elm.spritePos.x - 15
                        && this.sprites[i].spritePos.x < elm.spritePos.x + 15
                        && this.sprites[i].spritePos.y < elm.spritePos.y + elm.spriteSize.h) {
                    
                        elm.retire = 1
                        if (this.sprites[i].constructor.name === 'Enemy')
                            this.sprites[i].retire = 1
                    }
                    else if (elm.dirBullet === - 1 && this.sprites[i].spritePos.x + this.sprites[i].spriteSize.w > elm.spritePos.x - 5
                        && this.sprites[i].spritePos.x < elm.spritePos.x + 5
                        && this.sprites[i].spritePos.y < elm.spritePos.y + elm.spriteSize.h) {
                    
                        elm.retire = 1
                        if (this.sprites[i].constructor.name === 'Enemy')
                            this.sprites[i].retire = 1
                    }
                }
            }
        }
    })
    return 0
    },

    movementLoop() {
        // limites laterales
        this.sprites = this.sprites.filter((elm) => elm.retire === 0)
        if ((this.player.playerDir === -1 && this.mapX >= 0 + 20)
                || (this.player.playerDir === 1 && this.mapX <= this.mapSize - this.player.playerSize.w - 20)){
            if(this.player.collidesX === 1) {
                this.player.playerSpeedX = 0
                this.player.collidesX = 0
                
            }
            else {
                
                this.sprites.forEach((elm, index) => {
                    if (elm.isBullet === 1) {
                        if (!this.checkBulletsColision())
                        elm.moveBullet()
                    }
                    else {
                        elm.move(this.player.playerSpeedX)
                        if (index === 0) 
                        this.decorations.forEach(elm => elm.move(this.player.playerSpeedX))
                    }
                })
                
                this.checkColisionX()
                this.mapX += this.player.playerSpeedX
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
    
        this.decorations.forEach(elm => elm.draw(this.mapX)) 

        this.player.draw()


        this.sprites.forEach(elm => elm.draw(this.player.playerSize.w)) 

        this.sprites.forEach(elm => {
            if (elm.constructor.name === 'Enemy' && FRAMES % 30 === 0) {
                this.createBullet(2, elm.spritePos.x, elm.spritePos.y)
            }
        })


        
    }, // KEYCODES
    createBullet(fromWho, posx, posy) {
        if(fromWho === 1){
            this.bull = new Bullet(this.ctx, './images/shuriken1.png', (this.player.playerPos.x + this.player.playerSize.w / 2 + this.player.playerDir * this.player.playerSize.w * 0.55), this.player.playerPos.y + this.player.playerSize.h / 4, 10, 10,)
            this.bull.dirBullet = this.player.playerDir
            this.sprites.push(this.bull)
        }
        else{
            this.bull = new Bullet(this.ctx, './images/shuriken1.png', posx - 15, posy, 10, 10,)
            this.bull.dirBullet = -1
            this.bull.fromEnemy = 1
            this.sprites.push(this.bull)
        }
    },
    setEventListeners() {
        document.onkeydown = e => {
           // alert('entra down')
            e.keyCode === 37 ? this.player.move(-1, 5) : null
            e.keyCode === 39 ? this.player.move(+1, 5) : null
            e.keyCode === 32 && (this.player.onFloor || this.player.onSprite) ? this.player.jump() : null
            e.keyCode === 65 ? this.createBullet(1) : null
        }

        document.onkeyup = e => {
           
            e.keyCode === 37 ? this.player.move(-1, 0) : null
            e.keyCode === 39 ? this.player.move(+1, 0) : null
            
        }
    },

};






