class enemy {
    constructor(ctx) {
        this.ctx = ctx
        this.enemyPos = {
            x: 0,
            y: 0
        }
        this.enemyImg = undefined
        this.enemySize = {
            w: 200,
            h: 300,
        }
        this.enemySpeed = this.ctx.speed
        this.enemyDir = -1

    }
    move(playerSpeedX) {
            this.enemyPos.x -= playerSpeedX
    }
  
}