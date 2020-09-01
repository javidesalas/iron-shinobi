class Enemy extends Sprite{
    
    draw() {
        console.log("entro")
        this.ctx.drawImage(this.spriteImg, this.spritePos.x, this.spritePos.y,  this.spriteSize.w , this.spriteSize.h)
    }
    // move(playerSpeedX) {
    //         this.enemyPos.x -= playerSpeedX
    // }
    shot() {
        
    }
}