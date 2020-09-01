class Enemy extends Sprite{
    
    draw() {
        this.ctx.drawImage(this.spriteImg, this.spritePos.x, this.spritePos.y,  this.spriteSize.w , this.spriteSize.h)
    }

}