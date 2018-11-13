//canvas
var canvas = document.getElementById('game')
var ctx = canvas.getContext('2d')

var canvasRock = document.getElementById('rock')
var ctxRock = canvasRock.getContext('2d')
//variables
var interval
var frames = 0
var images = {
    runningRight0: "running0.png",
    runningRight1: "running1.png",
    runningRight2: "running2.png",
    runningRight3: "running3.png",
    runningRight4: "running4.png",
    runningRight5: "running5.png",
    runningRight6: "running6.png",
    runningRight7: "running7.png",
    ready: "still.png",
    roca: "https://vignette.wikia.nocookie.net/mario/images/b/b2/Thwomp_gigante.png/revision/latest?cb=20110812113100&path-prefix=es",
    bg: "bg.png",
}
var frameRight = 0
var frameLeft = 0

var right = false
var left = false
var up = false
var bottom = false

//clases
function Board(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image()
    this.image.src = images.bg
    this.image.onload = () => this.draw()
    this.draw = function(){
        this.y --
        if(this.y < - canvas.height) this.y = 0
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx.drawImage(this.image,this.x,this.y + this.height,this.width,this.height)
    }
}

function Character(posX,posY){
    this.x = posX
    this.y = posY
    this.width = 25
    this.height = 76
    this.speedX = 0
    this.speedY = 0
    this.points = 0
    this.image = new Image()
    this.image.src = images.ready
    this.image.onload = () => this.draw()

    
    this.draw = () => {
        this.y --
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    } 

    this.turnDown = () => {
        this.speedY += 0.1
        if(frames%2 === 0){
            frameRight++
                switch(frameRight){
                    case 0:
                        this.image.src = "running0.png"
                    return
                    case 1:
                        this.image.src = "running1.png"
                    return
                    case 2:
                        this.image.src = "running2.png"
                    return
                    case 3:
                        this.image.src = "running3.png"
                    return
                    case 4:
                        this.image.src = "running4.png"
                    return
                    case 5:
                        this.image.src = "running5.png"
                    return
                    case 6:
                        this.image.src = "running6.png"
                    return
                    case 7:
                        this.image.src = "running7.png"
                    return
                    case 8:{
                        this.image.src = "running0.png"
                        frameRight = 0
                    }
                    return
    
                    default:
                    return
                }
            }
    }
    this.turnUp = () => {
        this.speedY -=0.1
        if(frames%2 === 0){
            frameLeft ++
                switch(frameLeft){  
                    case 0:
                        this.image.src = "running0.png"
                    return
                    case 1:
                        this.image.src = "running1.png"
                    return
                    case 2:
                        this.image.src = "running2.png"
                    return
                    case 3:
                        this.image.src = "running3.png"
                    return
                    case 4:
                        this.image.src = "running4.png"
                    return
                    case 5:
                        this.image.src = "running5.png"
                    return
                    case 6:
                        this.image.src = "running6.png"
                    return
                    case 7:
                        this.image.src = "running7.png"
                    return
                    case 8:{
                        this.image.src = "running0.png"
                        frameLeft = 0
                    }
                    return
    
                    default:
                    return
                }
            }
    }

    this.turnLeft = () => {
        this.speedX -= 0.1

        if(frames%2 === 0){
            frameLeft ++
                switch(frameLeft){
                    case 0:
                        this.image.src = "running0L.png"
                    return
                    case 1:
                        this.image.src = "running1L.png"
                    return
                    case 2:
                        this.image.src = "running2L.png"
                    return
                    case 3:
                        this.image.src = "running3L.png"
                    return
                    case 4:
                        this.image.src = "running4L.png"
                    return
                    case 5:
                        this.image.src = "running5L.png"
                    return
                    case 6:
                        this.image.src = "running6L.png"
                    return
                    case 7:
                        this.image.src = "running7L.png"
                    return
                    case 8:{
                        this.image.src = "running0L.png"
                        frameLeft = 0
                    }
                    return
    
                    default:
                    return
                }
            }

    }

    this.turnRight = () => {
        this.speedX += 0.1
        if(frames%2 === 0){
        frameRight++
            switch(frameRight){
                case 0:
                    this.image.src = "running0.png"
                return
                case 1:
                    this.image.src = "running1.png"
                return
                case 2:
                    this.image.src = "running2.png"
                return
                case 3:
                    this.image.src = "running3.png"
                return
                case 4:
                    this.image.src = "running4.png"
                return
                case 5:
                    this.image.src = "running5.png"
                return
                case 6:
                    this.image.src = "running6.png"
                return
                case 7:
                    this.image.src = "running7.png"
                return
                case 8:{
                    this.image.src = "running0.png"
                    frameRight = 0
                }
                return

                default:
                return
            }
        }
    }
    
    this.stopMove = () => {
        this.speedX = 0
        this.speedY = 0
        this.image.src = images.ready
    }

    this.newPosX = () => {
        this.x += this.speedX
    }

    this.newPosY = () => {
        this.y += this.speedY
    }
    
    this.left = () => {return this.x}

    this.right = () => {return this.x + this.width}

    this.top = () => {return this.y}

    this.bottom = ()  => {return this.y + this.height}

    this.crashWith = obstacle => {
        return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right()
        )
    }

    this.checkPoints = frames => {
        if(frames%50 === 0) this.points ++
    }
}

function Rock(){
    this.x = 150 - this.width/2
    this.y = 0
    this.width = 150
    this.height = 150
    this.image = new Image()
    this.image.src = images.roca

    this.image.onload = () => this.draw()

    this.draw = () => ctxRock.drawImage(this.image,this.x,this.y,this.width,this.height)
}


//instances
var bg = new Board()
var char = new Character(175,400)
var char2 = new Character(200,400)
var rock = new Rock()
//main functions
function start(){
    frames = 0
    char = new Character(175,400)
    rock = new Rock()
    if(!interval) interval = setInterval(update,1000/60)
    
}
function update(){
    frames++
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctxRock.clearRect(0,0,canvasRock.width,canvasRock.height)
    bg.draw()
    char.draw()
    char.newPosX()
    char.newPosY()
    char.checkPoints(frames)
    
    rotateRock(rock)

    if(right) char.turnRight()
    if(left) char.turnLeft()
    if(up) char.turnUp()
    if(bottom) char.turnDown()

    if(char.y < 20) gameOver()
}
function gameOver(){
    clearInterval(interval)
    interval = null
    ctx.fillStyle = "black" 
      ctx.fillRect(0,0,canvas.width, canvas.height) 
      ctxRock.fillRect(0,0,canvasRock.width, canvasRock.height) 
      ctx.font = "40px arial" 
      ctx.fillStyle = "red" 
      ctx.fillText("GAME OVER", 40,400) 
      ctx.fillStyle = "white" 
      ctx.font = "30px monospace" 
      ctx.fillText("Tu score es: ", 40,500) 
      ctx.fillText(char.points, 40,600) 
}

//aux functions
function rotateRock(rock){
    ctxRock.clearRect(0,0,canvasRock.width,canvasRock.height)
    ctxRock.translate(canvasRock.width/2, canvasRock.height/2)
    ctxRock.rotate(Math.PI/180)
    ctxRock.translate(-canvasRock.width/2, -canvasRock.height/2)
    ctxRock.drawImage(rock.image, rock.width/2, rock.width/2, canvasRock.width/2, canvasRock.height/2)
}

//start()
//listeners
addEventListener('keyup',function(){
    left = false
    right = false
    up = false
    bottom = false
    char.stopMove() 
})


addEventListener('keydown',function(e){
    switch(e.keyCode){
        case 65: //izquierda
            left = true
            return
        case 68: //derecha
            right = true
            return
        case 83: //abajo
            bottom = true
            return
        case 87: //arriba
            up = true
            return
        case 13:{
            start()
        }
        return
        default:
            return
    }
} )
