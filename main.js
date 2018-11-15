//canvas
var canvas = document.getElementById('game')
var ctx = canvas.getContext('2d')
//variables
var interval
var frames = 0
var images = {
    ready: "still.png",
    roca: "baby1.png",
    bg: "bg.png",
}
var frameRight = 0
var frameLeft = 0
var framesBaby = 0

var right = false
var left = false
var up = false
var bottom = false

var moveL = false 
var moveR = false
var moveD = false
var moveU = false

var moveL2 = false 
var moveR2 = false
var moveD2 = false
var moveU2 = false

var right2 = false
var left2 = false
var up2 = false
var bottom2 = false

var gameOngoing = true

var touches = false
var collided = false

var currentObstacle

var touchingRight = false
var touchingLeft = false

var touchingTop = false
var touchingBottom = false

var touchingRight2 = false
var touchingLeft2 = false

var touchingTop2 = false
var touchingBottom2 = false

var loser

var obstacleProperties = [
    {
        width: 100,
        height: 47,
        origin: "ring.png"
    },
    {
        width: 150,
        height: 112,
        origin: "house.png"
    }
]

var powerProperties = [
    {
        width: 65,
        height: 145,
        origin: "starbucks.png"
    },
    {
        width: 69,
        height: 60,
        origin: "maleta.png"
    }
]

var obstacles = []
var powerUps = []

var cover = document.getElementById('cover')
var canvasContainer = document.getElementById('container')
var startButton = document.getElementById('startButton')

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
        if(frames< 1000) this.y --
        else if(frames > 1000 && frames < 3000) this.y -=3
        else if(frames > 3000) this.y -=5
        if(this.y < - canvas.height) this.y = 0
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx.drawImage(this.image,this.x,this.y + this.height,this.width,this.height)
    }
}

function Character(posX,posY,nombre,charColor){
    this.name = nombre
    this.color = charColor
    this.x = posX
    this.y = posY
    this.width = 25
    this.height = 76
    this.speedX = 0
    this.speedY = 0
    this.points = 0
    this.accel = 0
    this.image = new Image()
    this.image.src = images.ready
    this.image.onload = () => this.draw()

    
    this.draw = () => {
        if(frames< 1000) this.y --
        else if(frames > 1000 && frames < 3000) this.y -=3
        else if(frames > 3000) this.y -=5
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx.font = "10px arial" 
        ctx.fillStyle = charColor 
        ctx.fillText(this.name, this.x - this.name.length, this.y - 10) 
    } 

    this.turnDown = () => {
        if(frames%4 === 0){
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
        if(frames%4 === 0){
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
        if(frames%4 === 0){
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
        if(frames%4 === 0){
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
    
    this.stopMoveX = () => {
        this.speedX = 0
        this.image.src = images.ready
    }

    this.stopMoveY = () => {
        this.speedY = 0
        this.image.src = images.ready
    }

    this.moveRight = () => {
        if(!checkCollition()) this.speedX += 0.1 + this.accel
        else{ 
            char.x = currentObstacle.x - char.width
            char2.x = currentObstacle.x - char2.width
        }
        if(checkPowerCol()) this.speedX ++
    }

    this.moveLeft = () => {
        if(!checkCollition())  this.speedX -= 0.1 + this.accel
        else{ 
            char.x = currentObstacle.x + currentObstacle.width
            char2.x = currentObstacle.x + currentObstacle.width
        }
        if(checkPowerCol()) this.speedX --
    }

    this.moveUp = () => {
        if(!checkCollition()) this.speedY -= 0.1 + this.accel
        else {
            char.y = currentObstacle.y + currentObstacle.height
            char2.y = currentObstacle.y + currentObstacle.height
        }
        if(checkPowerCol()) this.speedY --
    }

    this.moveDown = () => {
        if(!checkCollition()) this.speedY += 0.2 + this.accel
        else {
            char.y = currentObstacle.y - char.height
            char2.y = currentObstacle.y - char2.height
        }

        if(checkPowerCol()) this.speedY ++
    }

    this.newPosX = () => {
        this.x += this.speedX
    }

    this.newPosY = () => {
        this.y += this.speedY 
    }

    this.checkPoints = frames => {
        if(frames%50 === 0) this.points ++
    }

    this.isTouching = item => {
     /*return ((this.x < item.x + item.width && this.x > item.x) ||
        (this.x + this.width > item.x && this.x + this.width < item.x + item.width)) &&
        ((this.y < item.y + item.height && this.y > item.y) ||
        (this.y + this.height > item.y && this.y + this.height < item.y + item.width))*/
        return (this.x < item.x + item.width) &&
        (this.x + this.width > item.x) &&
        (this.y < (item.y + item.height/8)) &&
        (this.y + this.height > item.y)
    }
}

function Baby(pos){
    this.x = pos
    this.y = 0
    this.width = 90
    this.height = 100
    this.framesBaby = 0
    this.image = new Image()
    this.image.src = images.roca

    this.image.onload = () => this.draw()

    this.draw = () => ctx.drawImage(this.image,this.x,this.y,this.width,this.height)

    this.crawl = () => {
        if(frames%10 === 0){
                switch(this.framesBaby){
                    case 0:{
                        this.image.src = "baby0.png"
                        this.framesBaby ++
                    }
                    return
                    case 1:{
                        this.image.src = "baby1.png"
                        this.framesBaby ++
                    } 
                    return
                    case 2:{
                        this.image.src = "baby2.png"
                        this.framesBaby = 0
                    }
                    return
                    default:
                    return
                }
            }
    }
}


function Obstaculo(posX,objeto,y){
    this.x = posX || 0
    this.y = y || canvas.height
    this.width = objeto.width
    this.height = objeto.height
    this.image = new Image()
    this.image.src = objeto.origin
    this.image.onload = () => this.draw()

    this.draw = () => {
        this.y --
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

function Power(posX,objeto,y){
    this.x = posX || 0
    this.y = y || canvas.height
    this.width = objeto.width
    this.height = objeto.height
    this.image = new Image()
    this.image.src = objeto.origin
    this.image.onload = () => this.draw()

    this.draw = () => {
        this.y --
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

//instances
var bg = new Board()
var char = new Character(175,400,"Juanpa Zurita","white")
var char2 = new Character(275,400,"Yuyo","yellow")
var baby = new Baby(100)
var baby1 = new Baby(210)
var baby2 = new Baby(320)

//main functions
function start(){
    obstacles = []
    powerUps = []
    gameOngoing = true
    frames = 0
    char = new Character(175,400,"Juanpa Zurita","white")
    char2 = new Character(275,400,"Yuyo","yellow")
    baby = new Baby(100)
    baby1 = new Baby(210)
    baby2 = new Baby(320)

    if(!interval) interval = setInterval(update,1000/60)
    
}
function update(){
    frames++
    ctx.clearRect(0,0,canvas.width, canvas.height)
    bg.draw()
    
    drawObstacles()
    drawPower()

    baby.draw()
    baby.crawl()

    baby1.draw()
    baby1.crawl()
    
    baby2.draw()
    baby2.crawl()
    
    char.draw()
    char.newPosX()
    char.newPosY()
    char.checkPoints(frames)

    
    char2.draw()
    char2.newPosX()
    char2.newPosY()
    char2.checkPoints(frames)

    if(right) char.turnRight()
    if(left) char.turnLeft()
    if(up) char.turnUp()
    if(bottom) char.turnDown()

    if(moveL) char.moveLeft()
    if(moveR) char.moveRight()
    if(moveU) char.moveUp()
    if(moveD) char.moveDown()

    if(moveL2) char2.moveLeft()
    if(moveR2) char2.moveRight()
    if(moveU2) char2.moveUp()
    if(moveD2) char2.moveDown()

    if(right2) char2.turnRight()
    if(left2) char2.turnLeft()
    if(up2) char2.turnUp()
    if(bottom2) char2.turnDown()

    if(char.y < 100){
        loser = char.name
         gameOver()
        }
    if(char.y > canvas.height - char.height) char.y = canvas.height - char.height
    if(char.x < 95) char.x = 95
    if(char.x > 380) char.x = 380

    if(char2.y < 100) {
        loser = char2.name
        gameOver()
    }
    if(char2.y > canvas.height - char2.height) char2.y = canvas.height - char2.height
    if(char2.x < 95) char2.x = 95
    if(char2.x > 380) char2.x = 380
    
    
}
function gameOver(){
    gameOngoing = false
    clearInterval(interval)
    interval = null
    
    ctx.font = "50px arial" 
    ctx.fillStyle = "white" 
    ctx.fillText("GAME OVER", 100,400) 
    ctx.font = "30px monospace" 
    ctx.fillText("Perdedor:", 110,450) 
    ctx.fillText(loser+  " 👎🏻", 110,500) 
}

//aux functions

function createObstacles(){
    if(frames%250===0) {
        var randomX = Math.floor(Math.random() * 156) + 95
        var indexObstacle = Math.floor(Math.random() * 2)
        var selectedObstacle = obstacleProperties[indexObstacle]
        obstacles.push(new Obstaculo(randomX,selectedObstacle))
    }
}

function drawObstacles(){
    createObstacles()
    for(var obstacle of obstacles){
        obstacle.draw()
    }
}

function createPower(){
    if(frames%290===0) {
        var randomX = Math.floor(Math.random() * 156) + 95
        var indexPower = Math.floor(Math.random() * 2)
        var selectedPower = powerProperties[indexPower]
        powerUps.push(new Power(randomX,selectedPower))
    }
}

function drawPower(){
    createPower()
    for(var power of powerUps){
        power.draw()
    }
}

function checkCollition(){
    if(char.isTouching(char2)){
        char.stopMoveY()
        char2.stopMoveY()
    }
    for(var obstacle of obstacles){
        if(char.isTouching(obstacle)){
           
            if(touchingBottom)
            char.stopMoveY()
        }

        if(char2.isTouching(obstacle)){
           
            if(touchingBottom2)
            char2.stopMoveY()
        }

    }
    
}

function checkPowerCol(){
    for(var power of powerUps){
        if(char.isTouching(power)){
           powerUps.shift()
           char.accel = 2
           setTimeout(function(){
               char.accel = 0
           },5000)
        }

        if(char2.isTouching(power)){
            powerUps.shift()
            char2.accel = 2
            setTimeout(function(){
                char2.accel = 0
            },5000)
        }

    }
    
}

//listeners

startButton.addEventListener("click",function(){
    cover.style.opacity = "0"
})

addEventListener('keyup',function(e){

    switch(e.keyCode){
        case 65: //izquierda
            moveL = false
            left = false
            touchingLeft = false
            return
        case 68: //derecha
            moveR = false    
            right = false
            touchingRight = false
            return
        case 83: //abajo
            moveD = false
            bottom = false
            touchingBottom = false
            return
        case 87: //arriba
            moveU = false    
            up = false
            touchingTop = false
            return
        case 74: //izquierda
            moveL2 = false
            left2 = false
            touchingLeft2 = false
            return
        case 76: //derecha
            moveR2 = false    
            right2 = false
            touchingRight2 = false
            return
        case 75: //abajo
            moveD2 = false
            bottom2 = false
            touchingBottom2 = false
            return
        case 73: //arriba
            moveU2 = false    
            up2 = false
            touchingTop2 = false
            return
        default:
            return
    } 
    
})

addEventListener("keyup", function(){
    if(!left && !right) char.stopMoveX() 
    if(!up && !bottom) char.stopMoveY()

    if(!left2 && !right2) char2.stopMoveX() 
    if(!up2 && !bottom2) char2.stopMoveY()
})

addEventListener("keypress",function(e){
    switch(e.keyCode){
        case 13:{

            start()
        }
        return
        default:
            return
    } 
})

addEventListener('keydown',function(e){
    
    if(gameOngoing){
        switch(e.keyCode){
            case 65: //izquierda
                moveL = true
                left = true
                touchingLeft = true
                return
            case 68: //derecha
                moveR = true
                right = true
                touchingRight = true
                return
            case 83: //abajo
                moveD = true
                bottom = true
                touchingBottom = true
                return
            case 87: //arriba
                moveU = true
                up = true
                touchingTop = true
                return
            case 74: //izquierda
                 moveL2 = true
                left2 = true
                touchingLeft2 = true
                return
            case 76: //derecha
                moveR2 = true
                right2 = true
                touchingRight2 = true
                return
            case 75: //abajo
                moveD2 = true
                bottom2 = true
                touchingBottom2 = true
                return
            case 73: //arriba
                moveU2 = true
                up2 = true
                touchingTop2 = true
                return
            default:
                return
        }
    } else{
        return
    }
} )
