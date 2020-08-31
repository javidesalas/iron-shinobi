class Bullet extends Sprite {
    isBullet = 1
    draw() {
        this.ctx.drawImage(this.spriteImg, this.spritePos.x, this.spritePos.y,  this.spriteSize.w , this.spriteSize.h)
    }
    moveBullet() {
        this.spritePos.x++
    }

}