
let canvasH = 600
let canvasW = 900
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

    welcomeScreen: undefined,

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
    mapFlag : [0,0,0],
    mapLeftLimit: 200,
    basicObstacleSize: {
        w : 125,
        h : 125
    },
    basicEnemySize: {
        w : 125,
        h : 150
    },
    floorY : 40,
    sounds: [],
    music: undefined,
    points: 0,
    dead: 0,

    init(){
        this.canvasId = 'gameCanvas'
        this.ctx = document.getElementById(this.canvasId).getContext('2d')
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(this.canvasSize.w - 250 , this.canvasSize.h - 590, 225, 30)

        
               
        this.music = document.getElementById('music')
        this.music.play()
        this.music.volume -= 0.3

        this.sounds.push(document.getElementById('jump'))
        this.sounds.push(document.getElementById('sword'))
        this.sounds.push(document.getElementById('dead'))

        this.fuji = new Image
        this.fuji.src = './images/fuji.png'
        
        this.background = new Background(this.ctx, './images/background.png')

        this.decorations.push(new Decoration(this.ctx,'./images/tree.png',-700, 75, 450, 450))
        this.decorations.push(new Decoration(this.ctx,'./images/tori.png',-700, 75, 450, 450))
        this.decorations.push(new Decoration(this.ctx,'./images/tori.png',-700, 75, 450, 450))


        this.player = new Player(this.ctx, './images/player.png')

        this.sprites.push(new Sprite(this.ctx, './images/obstacle.png', -700, canvasH - 105, 100, 100))
       // this.sprites.push(new Sprite(this.ctx, './images/obstacle.png', 700, canvasH - 55, 50, 50))
        
        //this.sprites.push(new Enemy(this.ctx, './images/enemy.png', 400, canvasH - 155, 150, 150))
       // this.manageMap()

       
       this.setEventListeners()
       
       this.gameOn()
        
        //this.bull = new Bullet(this.ctx, './images/shuriken1.png', this.player.playerPos.x + this.player.playerSize.w, this.player.playerPos.y, 10, 10)
        
    },

    gameOn() {
        
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
            //Call instances for sprites and decoration close to the player 
   if (this.mapX > -5 && this.mapFlag[0] === 0) {
  
    this.sprites.push(new Enemy (this.ctx, './images/enemy.png', 750, canvasH - this.basicEnemySize.h - this.floorY, this.basicEnemySize.w, this.basicEnemySize.h))
    this.sprites.push(new Sprite (this.ctx,'./images/obstacle.png', 1100, canvasH - this.basicObstacleSize.h - this.floorY, this.basicObstacleSize.w, this.basicObstacleSize.h ))
    this.sprites.push(new Sprite (this.ctx,'./images/transparent.png', 1250, 260, 675, 15 )) // plataforma árboles
    //this.sprites.push(new Sprite (this.ctx,'./images/obstacle.png', 1400, canvasH - this.basicObstacleSize.h - this.floorY, this.basicObstacleSize.w, this.basicObstacleSize.h ))
    this.sprites.push(new Enemy (this.ctx, './images/enemy.png', 1650, canvasH - this.basicEnemySize.h - this.floorY, this.basicEnemySize.w, this.basicEnemySize.h))
    
    this.decorations.push( new Decoration (this.ctx, './images/tree.png', 1230, 60, 450, 500))
    this.decorations.push( new Decoration (this.ctx, './images/tree.png', 1530, 60, 450, 500))       
    
    this.mapFlag[0] = 1
}

if (this.mapX > 1600 && this.mapFlag[1] === 0) {
    this.sprites.push(new Enemy (this.ctx, './images/enemy.png', 1100, canvasH - this.basicEnemySize.h - this.floorY, this.basicEnemySize.w, this.basicEnemySize.h))
    this.sprites.push(new Sprite (this.ctx,'./images/obstacle.png', 1400, canvasH - this.basicObstacleSize.h - this.floorY, this.basicObstacleSize.w, this.basicObstacleSize.h ))
    this.sprites.push(new Sprite (this.ctx,'./images/transparent.png', 1500, 260, 980, 15 )) // plataforma árboles

    this.decorations.push( new Decoration (this.ctx, './images/tori.png', 1460, 250, 345, 275))
    this.decorations.push( new Decoration (this.ctx, './images/tori.png', 1800, 250, 345, 275))
    this.decorations.push( new Decoration (this.ctx, './images/tori.png', 2140, 250, 345, 275))

    this.mapFlag[1] = 1
}

if (this.mapX > 2400 && this.mapFlag[2] === 0) {
   this.sprites.push(new Enemy (this.ctx, './images/enemy.png', 900, canvasH - this.basicEnemySize.h - this.floorY, this.basicEnemySize.w, this.basicEnemySize.h))
   this.sprites.push(new Enemy (this.ctx, './images/enemy.png', 1400, canvasH - this.basicEnemySize.h - this.floorY, this.basicEnemySize.w, this.basicEnemySize.h))
   this.sprites.push(new Enemy (this.ctx, './images/enemy.png', 1300, 120, this.basicEnemySize.w, this.basicEnemySize.h))
   this.sprites.push(new Sprite (this.ctx,'./images/obstacle.png', 1800, canvasH - this.basicObstacleSize.h - this.floorY, this.basicObstacleSize.w, this.basicObstacleSize.h ))

    this.mapFlag[2] = 1
    console.log[this.sprites]
    console.log[this.decoration]
} 
this.points += this.sprites.filter((elm) => elm.retire === 1 && elm.constructor.name === "Enemy").length
//Remove sprites and decoration far from the player 
this.sprites.forEach ( elm => {
    if (elm.spritePos.x < -1600) {
        elm.retire = 1
    }
})
this.decorations.forEach ( elm => {
    if (elm.decoPos.x < -1600) {
        elm.retire = 1
    }
})
this.sprites = this.sprites.filter((elm) => elm.retire === 0)
this.decorations = this.decorations.filter((elm) => elm.retire === 0)

//Set new left limit
if (this.mapLeftLimit < this.mapX - 1600) {
   this.mapLeftLimit = this.mapX - 1600
}

},
    
    checkColisionX() {
        this.sprites.forEach(elm => {
            if ((this.player.playerPos.x + (this.player.playerSpeedX ) + this.player.playerSize.w > elm.spritePos.x ) // Left
                && ((this.player.playerPos.x + (this.player.playerSpeedX) < elm.spritePos.x + elm.spriteSize.w)) // Right
                && (this.player.playerPos.y + this.player.playerSize.h > elm.spritePos.y) // Up
                && (this.player.playerPos.y < elm.spritePos.y + elm.spriteSize.h)) { // Right
                 
                // If colision is detected and is from enemy => "game over", if is from obstacle => reposition player
                    if (this.player.playerPos.y + this.player.playerSize.h > elm.spritePos.y - 2 // Up
                    && this.player.playerPos.y < elm.spritePos.y + elm.spriteSize.h + 2) {
                        this.player.collidesX = 1
                        const protection = 5
                        if (elm.fromEnemy === 1 || elm.constructor.name === 'Enemy')
                            this.playerDead()
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
                    this.player.collidesY = 1
                    if (elm.fromEnemy === 1 || elm.constructor.name === 'Enemy') {
                        this.playerDead()
                        this.player.collidesY = 0
                    }
                    this.player.playerPos.y = elm.spritePos.y - this.player.playerSize.h - 2
                    if  (this.player.isCrouched === 1) {
                        this.player.playerPos.y = elm.spritePos.y - this.player.playerSize.h + 30

                        /****************************RETOCAR********************************* */
                    }
                        
                   
                }
            }
            if ((this.player.playerPos.y + this.player.playerSize.h < elm.spritePos.y + 5)
                && (this.player.playerPos.y + this.player.playerSize.h > elm.spritePos.y)) {
                this.player.onSprite = 1
                //     if (this.player.isCrouched === 1)
                //         this.player.playerPos.y = elm.spritePos.y - this.player.playerSize.h / 2 -2
                // }
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
                        && this.sprites[i].spritePos.y < elm.spritePos.y + elm.spriteSize.h
                        && this.sprites[i].spritePos.y + this.sprites[i].spriteSize.h > elm.spritePos.y) {
                    
                        elm.retire = 1
                        if (this.sprites[i].constructor.name === 'Enemy') {
                            this.sprites[i].retire = 1
                            this.sounds[2].play()
                        }
                    }
                    else if (elm.dirBullet === - 1 && this.sprites[i].spritePos.x + this.sprites[i].spriteSize.w > elm.spritePos.x - 5
                        && this.sprites[i].spritePos.x < elm.spritePos.x + 5
                        && this.sprites[i].spritePos.y < elm.spritePos.y + elm.spriteSize.h
                        && this.sprites[i].spritePos.y + this.sprites[i].spriteSize.h > elm.spritePos.y){
                    
                        elm.retire = 1
                        if (this.sprites[i].constructor.name === 'Enemy') {
                            this.sprites[i].retire = 1
                            this.sounds[2].play()
                        }
                    }
                }
            }
        }
    })
    return 0
    },

    movementLoop() {
        // limites laterales
        if ((this.player.playerDir === -1 && this.mapX >= this.mapLeftLimit + 200)
                || (this.player.playerDir === 1 && this.mapX <= this.mapSize - this.player.playerSize.w - 20)){
            if(this.player.collidesX === 1) {
                this.player.playerSpeedX = 0
                this.player.collidesX = 0
            }
            else {
                
                this.sprites.forEach((elm, index) => {
                    if (elm.isBullet === 1) {
                        if (!this.checkBulletsColision())
                        elm.moveBullet(this.player.playerSpeedX)
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
        if (this.player.playerPos.y + this.player.playerSpeedY > canvasH - this.floorY - this.player.playerSize.h ) {
            this.player.playerPos.y = canvasH - this.player.playerSize.h - this.floorY
            if  (this.player.isCrouched) {
                this.player.playerPos.y += 40 
            }
            
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

        if (!this.player.onFloor) {
            this.player.playerSpeedY+= 1.5 //gravedad
        }

        
    },

    drawLoop() {
        //background
        this.ctx.drawImage(this.fuji, 0, 0)
        this.background.draw(this.mapX)
    
        this.decorations.forEach(elm => elm.draw(this.mapX)) 

        this.player.draw()


        this.sprites.forEach(elm => elm.draw(this.player.playerSize.w)) 

        this.sprites.forEach(elm => {
            if (elm.constructor.name === 'Enemy' && FRAMES % 100 === 0) {
                if(elm.enemyDir === 1)
                    this.createBullet(2, elm.spritePos.x + elm.spriteSize.w, elm.spritePos.y + 25, elm.enemyDir)
                if (elm.enemyDir === -1)
                    this.createBullet(2, elm.spritePos.x, elm.spritePos.y + 25, elm.enemyDir)
                    this.sounds[1].play()
            }
        })

        this.ctx.strokeStyle = 'red'
        this.ctx.lineWidth = 1
        this.ctx.font = 'Italic 20px Arabic'
        if(FRAMES % 10  > 5)
            this.ctx.strokeStyle = 'red'
        else 
            this.ctx.strokeStyle = 'white'
        this.ctx.strokeText(` 1P    KILLS: ${this.points}     TIME: ${Math.round(FRAMES / 30)}`, this.canvasSize.w - 260, this.canvasSize.h - 567)
        if (this.dead > 0)
        {
            this.ctx.font = '20px'
            this.ctx.strokeText(`YOU DEAD`, this.canvasSize.w / 2, (this.canvasSize.h / 2) - 30 )
            this.ctx.font = 'Italic 20px Arabic'
            this.ctx.strokeText(` 1P    KILLS: ${this.points}     TIME: ${Math.round(this.dead / 30)}`, this.canvasSize.w / 2, this.canvasSize.h / 2)
        }
        
    }, // KEYCODES
    attack() {
        this.sprites.forEach((elm) => {
            if ((this.player.playerPos.x + (this.player.playerSpeedX ) + this.player.playerSize.w + 150 > elm.spritePos.x ) // Left
            && ((this.player.playerPos.x + (this.player.playerSpeedX) - 150 < elm.spritePos.x + elm.spriteSize.w)) // Right
            && (this.player.playerPos.y + this.player.playerSize.h > elm.spritePos.y) // Up
            && (this.player.playerPos.y < elm.spritePos.y + elm.spriteSize.h)
                && elm.constructor.name === 'Enemy') {
                this.player.swordAttack = 1
                this.sounds[1].play()
                this.sounds[2].play()
                this.player.startAnim = FRAMES
                elm.retire = 1
            }
        })
        if (this.player.swordAttack === 0) {
            this.createBullet(1)
            this.sounds[1].play()
            this.player.bulletAttack = 1
            this.player.startAnim = FRAMES
        }
    },
    playerDead() {
        this.dead = FRAMES
        document.onkeydown = e => { 
            e.keyCode === 13 ? location.reload(true) : null
        }
    },
    createBullet(fromWho, posx, posy, enemyDir) {
        if(fromWho === 1){
            this.bull = new Bullet(this.ctx, './images/shuriken1.png', (this.player.playerPos.x + this.player.playerSize.w / 2 + this.player.playerDir * this.player.playerSize.w * 0.60), this.player.playerPos.y + this.player.playerSize.h / 4, 10, 10,)
            this.bull.dirBullet = this.player.playerDir
            this.sprites.push(this.bull)
        }
        else{
            this.bull = new Bullet(this.ctx, './images/shuriken1.png', posx - 15, posy, 10, 10,)
            this.bull.dirBullet = -1
            if(enemyDir === 1)
                this.bull.dirBullet = 1
            if (enemyDir === -1)
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
            if (e.keyCode === 32 && (this.player.onFloor || this.player.onSprite)) {
                this.player.jump() 
                this.sounds[0].play()
            } 
            e.keyCode === 40 && (this.player.onFloor || this.player.onSprite) ? this.player.isCrouched = 1 : null
            e.keyCode === 65 ? this.attack() : null
            if (e.keyCode === 13) {
                
                this.music.play()
            }
        }

        document.onkeyup = e => {
           
            e.keyCode === 37 ? this.player.move(-1, 0) : null
            e.keyCode === 39 ? this.player.move(+1, 0) : null
            e.keyCode === 40 ? this.player.isCrouched = 0 : null
        }
    },

};






