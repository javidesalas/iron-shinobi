class Player {
    constructor(ctx, img) {
        this.ctx = ctx
        this.playerSize = {
            w: 75,
            h: 75,
        }
        this.playerPos = {
            x: 100,
            y: canvasH - this.playerSize.h
        }
        this.playerImg = undefined
        this.playerSpeedX = 0 // Podemos mandarle y añadirle la velocidad global del juego
        this.playerSpeedY = 0
        this.playerDir = 1
        this.onFloor = 1
        this.onSprite = 1
        this.collidesX = 0
        this.collidesY = 0
        this.initPlayer(img)
    }
    initPlayer (img) {
        this.playerImg = new Image
        this.playerImg.src = img
    }
    draw() {
        const drawOriginX = 200 * this.selectFrame()
       // const drawOriginY = selectLook()
        this.ctx.drawImage(this.playerImg, drawOriginX, 200, 200, 200, this.playerPos.x, this.playerPos.y,  this.playerSize.w , this.playerSize.h)
    }
    selectFrame() {
         let chosenFrame = 0
         if (FRAMES % 20 <= 10) {
             chosenFrame = 0
         }
         else {
             chosenFrame = 1
         }
         return chosenFrame
     }
     selectLook() {
         let chosenLook = 100
        //  if (!this.onFloor && !this.onSprite)
        //  if isju
     }

    move(dir, speed) {
        this.playerDir = dir
        this.playerSpeedX = speed * dir
    }
    jump() {
        this.onFloor = 0
        this.onSprite = 0

        this.playerSpeedY = -30    
    }
}    
