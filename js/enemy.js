class Enemy extends Sprite{
    enemyDir = -1
    move(playerSpeedX) {
        this.spritePos.x -= playerSpeedX
        if (FRAMES % 400 <= 200)
            this.enemyDir = -1
        else 
            this.enemyDir = 1
        if (FRAMES % 50 === 0) {
            this.spritePos.x += 2 * this.enemyDir
        }
        else 
            this.spritePos.x += 2 * this.enemyDir
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
    //    if (this.enemyDir === 1) {
    //         chosenLook = 1300
    //         // if (this.startAnim + 20 <= FRAMES) {
    //         //     this.swordAttack = 0
    //         // }
    //    }
    //    else {
    //        chosenLook = 1300
    //     //    if (this.startAnim + 20 <= FRAMES) {
    //     //        this.bulletAttack = 0
    //     //    }
    //    }
        chosenLook += this.enemyDir * 100
        return chosenLook
    }
    draw() {
        let drawOriginX = 200 * this.selectFrame()
        let drawOriginY = this.selectLook()
        this.ctx.drawImage(this.spriteImg, drawOriginX, drawOriginY, 200, 200, this.spritePos.x, this.spritePos.y,  this.spriteSize.w , this.spriteSize.h)
    }
}
