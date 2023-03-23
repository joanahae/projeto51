var m,mImg
var p,pImg,pImg2
var peixe, peixeImg
var peixeGroup
var foca,focaImg
var focaGroup
var gameState="Play"
var score
var parede, parede2, parede3, parede4
var gelo, geloImg
var neve, neveImg, neveGroup

function preload(){
mImg=loadImage("assets/m.png")
geloImg=loadImage("assets/gelo.png")
pImg=loadImage("assets/p.png")
pImg2=loadImage("assets/p2.png")
peixeImg=loadImage("assets/peixe.png")
focaImg=loadImage("assets/foca.png")
neveImg=loadImage("assets/nevinha.png")
}

function setup() {
  createCanvas(800,400);

  p=createSprite(700, 300, 30, 50);
  p.addImage(pImg)
  p.scale = 2
  p.debug= false
  p.setCollider("rectangle",-2,0,43,53)

  m=createSprite(400,200,10,10)
  m.addImage(mImg)
  m.scale=2
  m.depth = p.depth;
  p.depth = p.depth + 1;
  

  peixeGroup = new Group()
  focaGroup = new Group()
  geloGroup = new Group()
  neveGroup = new Group()

  score=0

}

function draw() {
  background("blue");  

 textSize(20)
 fill("red")
 text("Pontuação:"+ score, 50,40)

  if(gameState === "Play"){

  aparecerPeixes();
  aparecerFocas();
  aparecerGelo();

  if(neveGroup.isTouching(p)){
    p.velocityY = 0;
  }

if(keyWentDown("UP_ARROW")){
  p.velocityY = -40;
 }
 p.velocityY = p.velocityY + 5

 p.velocityY = p.velocityY + 0.5
if(keyWentDown("SPACE")){
  p.y=p.y+30
 }

if(keyWentDown("LEFT_ARROW")){
 p.x = p.x-30
 p.changeImage(pImg2)
}
if(keyWentDown("RIGHT_ARROW")){
  p.x = p.x+30
 }


if(peixeGroup.isTouching(p)){
  background("pink")
  peixe.destroy()
  score=score+1
}
if(focaGroup.isTouching(p)){
  gameState = "Perdeu"
}
if(geloGroup.isTouching(p)){
  gameState = "Perdeu"
}
if(score==10){
  gameState = "Ganhou"
}

parede=createSprite(820,200,20,400)
p.collide(parede)
parede2=createSprite(-20,200,20,400)
p.collide(parede2)
parede3=createSprite(400,-20,800,20)
p.collide(parede3)
parede4=createSprite(400,410,800,20)
p.collide(parede4)



 function aparecerPeixes(){
  if(frameCount%400===0){

    peixe = createSprite(random(10,20),random(10,390),20,20)
    peixe.addImage(peixeImg)
    peixe.scale = 1
    peixe.velocityX = 10
    peixe.debug= false
    peixe.setCollider("rectangle",0,0,50,25)
   
    peixe.lifetime = 400
    peixeGroup.add(peixe)
  }
}

function aparecerFocas(){
  if(frameCount%500===0){

    foca = createSprite(random(10,20),random(30,380),20,70)
    foca.addImage(focaImg)
    foca.scale = 2
    foca.velocityX  = +(4 + 50* score/100)
    foca.debug= false
    foca.setCollider("rectangle",0,-2,50,50)
   
    foca.lifetime = 400
    focaGroup.add(foca)
  }
}

function aparecerGelo(){
if(frameCount%400===0){

  gelo = createSprite(random(10,20),random(80,380),20,70);
  gelo.addImage(geloImg);
  gelo.scale = 1.5;
  gelo.velocityX = 5;
  gelo.debug= true
  gelo.setCollider("rectangle",0,7,37,22)

  neve = createSprite(200,200,40,10);
  neve.collide(p)
  neve.addImage(neveImg);
  neve.scale = 1.5;
  neve.velocityX  = 5;
  neve.x = gelo.x-2;
  neve.y = gelo.y+8;
  neve.debug= true
  neve.setCollider("rectangle",0,-17,40,15)


  gelo.lifetime = 400;
  neve.lifetime = 400;
  geloGroup.add(gelo);
  neveGroup.add(neve);
}
}
if(neveGroup.isTouching(p)){
  p.velocityY = 0;
}

  }

  if(gameState == "Perdeu"){
  m.destroy()
  p.destroy()
  focaGroup.destroyEach()
  peixeGroup.destroyEach()
  geloGroup.destroyEach()
  neveGroup.destroyEach()
  background("black")
  textSize(50)
  fill("red")
  text("GAME OVER!😭", 200, 200)
  }

  if(gameState == "Ganhou"){
    m.destroy()
    p.destroy()
    focaGroup.destroyEach()
    peixeGroup.destroyEach()
    geloGroup.destroyEach()
    neveGroup.destroyEach()
    background("yellow")
    textSize(50)
    fill("purple")
    text("Você Ganhou!🤩", 200, 200)
    }

  drawSprites();
}