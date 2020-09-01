class Player {
    constructor(ctx, img) {
        this.ctx = ctx
        this.playerSize = {
            w: 150,
            h: 150,
        }
        this.playerPos = {
            x: 150,
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
        const drawOriginY = this.selectLook()
        this.ctx.drawImage(this.playerImg, drawOriginX, drawOriginY, 200, 200, this.playerPos.x, this.playerPos.y,  this.playerSize.w , this.playerSize.h)
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
         if (!this.onFloor && !this.onSprite) {
             chosenLook = 500
         } else if (this.playerSpeedX != 0) {
             chosenLook = 900
         } else {
             chosenLook =100
         }
         chosenLook += this.playerDir * 100
         return chosenLook
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
