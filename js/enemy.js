class Enemy extends Sprite{
    enemyDir = -1
    draw() {
        this.ctx.drawImage(this.spriteImg, this.spritePos.x, this.spritePos.y,  this.spriteSize.w , this.spriteSize.h)
    }
    move(playerSpeedX) {
        this.spritePos.x -= playerSpeedX
        if (FRAMES % 500 >= 250)
            this.enemyDir = -1
        else 
            this.enemyDir = 1
        if (FRAMES % 50 === 0) {
            this.spritePos.x += 2 * this.enemyDir
        }
        else 
            this.spritePos.x += 2 * this.enemyDir
    }
}