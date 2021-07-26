var score=0
var distance=0;
var gameState="loading"
var roof;
var villan2;
var token=1;

function preload(){

ninjaImg=loadAnimation("images/ninja1.png","images/ninja2.png","images/ninja3.png")
ninjaAttack=loadAnimation("images/ninjaattack.png")
mainvillimg=loadAnimation("images/mainvill2.png")
bgImg=loadImage("images/forest.png")
villan1=loadImage("images/villan1.png")
villan2=loadAnimation("images/villan2.png")
ninjadie=loadImage("images/ninjadead.png")
//turtledie=loadAnimation("images/turtledie.png")
coin=loadImage("images/coins.png")
killer=loadAnimation("images/killer.png")
gif_loadImg = loadImage("loader-gif-blue-2.gif");
  gif_createImg = createImg("loader-gif-blue-2.gif");
  introimage=loadImage("images/loadingbg1.jpg")
  buttonimg=loadImage("images/playbutton.png")
  templeimg=loadImage("images/templedupalt.jpg")
  restartbutton=loadImage("tryagain_button.png")
  completedlevel=loadImage("images/completedlevel1image.png")
  overimage=loadImage("images/overimage.jpg")
  bgsound=loadSound("background-sound.mp3")
  attacksound=loadSound("attacking-sound.mp3")
  swordsound=loadSound("sword-sound.mp3")
  cheersound=loadSound("cheeringsound.mp3")
  lastimage=loadImage("images/temple.jpg")
 treasureimg=loadImage("images/treasure.png")
 levelup=loadImage("images/levelup.jpg")
 gametitle=loadImage("NINJARUNNER.png")
}


function setup() {
  createCanvas(displayWidth,displayHeight);
  console.log(displayWidth)
  console.log(displayHeight)
  

//intro=createSprite(displayWidth/2,displayHeight/2)


forest=createSprite(displayWidth/2,displayHeight/2)
forest.addImage("load",introimage)
forest.addImage("jungle",bgImg)
forest.addImage("mandir",templeimg)

playbutton=createSprite(displayWidth/2,displayHeight/2)

ninja= createSprite(150, displayHeight-180, 50, 50);
ninja.addAnimation("ninja1",ninjaImg);
ninja.addImage("ndie",ninjadie)
ninja.addAnimation("ninjaatt",ninjaAttack);
ninja.addAnimation("kill",killer)
ninja.setCollider("rectangle",0,0,100,150)
ninja.debug=false

inviground=createSprite(displayWidth/2,displayHeight-130,4*displayWidth,5)
inviground.visible=false

lastimagesprite=createSprite(displayWidth/2,displayHeight/2)
lastimagesprite.addImage("last",lastimage)
lastimagesprite.visible=false;

treasuresprite=createSprite(displayWidth-350,500)

treasuresprite.visible=false
treasuresprite.scale=0.6
treasuresprite.debug=false

//treasuresprite.depth=ninja.depth;
//ninja.depth=ninja.depth+1

mainvillsprite=createSprite(displayWidth-750,565)
  mainvillsprite.visible=false
mainvillsprite.scale=0.5

gametitlesprite=createSprite(displayWidth/2,displayHeight/2-200)
gametitlesprite.addImage("gt",gametitle)
 
roofgroup=createGroup();
for(var r=650;r<10000;r=r+600){
  roof=createSprite(r,displayHeight/2+5,480,10)
  roof.visible=false
  roofgroup.add(roof)
  //console.log(roof.x)
  r=r+40;
}

restart=createSprite(displayWidth/2,displayHeight/2,250,150)

icon=createSprite(displayWidth/2,displayHeight/2)
icon.visible=false



oversprite=createSprite(displayWidth/2,displayHeight/2)
oversprite.visible=false

turtlegroup=createGroup()
coingroup=createGroup()
villan2group=createGroup()
//bgsound.loop() 
}

function draw() {
  background("white");
 
 // console.log("forest :",forest.x)
if(gameState==="loading"){
 
  restart.visible=false
  forest.addImage("load",introimage)
  
  forest.scale=2.5
 image(gif_loadImg, 550, 550);
  gif_createImg.position(550,550)
  playbutton.addImage("btt",buttonimg)
  playbutton.scale=1
  image(gametitle,550,550)
  ninja.visible=false
  if(touches.length>0||mousePressedOver(playbutton)){
    gif_createImg.hide()
    playbutton.visible=false
    gameState="play"
    bgsound.loop()
    touches=[]
    gametitlesprite.destroy();
  }

}
  if(gameState==="play"){
     //bgsound.play()
    // bgsound.loop() 
    distance=distance+1
   // console.log(distance)
    ninja.visible=true
   restart.visible=false
   forest.changeImage("jungle",bgImg)

   
   forest.scale=1.3
   forest.velocityX=-(9+5*distance/300)
    if(forest.x<displayWidth/2-400){
      forest.x=displayWidth/2
    }
      if(touches.length>0||keyDown("space")){
          attacksound.play()
        ninja.velocityY=-20  
        ninja.changeAnimation("ninjaatt",ninjaAttack);   
     
      }
 
     turtle();
     
      if(ninja.y<560){
          var token=0;
          
          
      }
      if(ninja.isTouching(inviground)&&ninja.y>=560) {
          var token=1;
         
      }
      
     // console.log(ninja.y)
      ninja.velocityY=ninja.velocityY+1;

      for(j=0;j<turtlegroup.length;j++){
       if(token===0&&ninja.isTouching(turtlegroup[j])){
          swordsound.play()
            turtlegroup[j].destroy();
            
        }
     else if(turtlegroup[j].isTouching(ninja)&&token===1&&ninja.isTouching(inviground))
        {
        gameState="end"
}
        
}

if(ninja.isTouching(inviground)){


  ninja.changeAnimation("ninja1",ninjaImg)
}


createcoins() 
for(x=0;x<coingroup.length;x++){
 if(coingroup[x].isTouching(ninja)){

coingroup[x].destroy()
score=score+1
 }
}
 
//console.log(distance)
if(distance>=2000){
   forest.velocityX=0;
  icon.visible=true
  icon.addImage("l1com",completedlevel)
  ninja.changeAnimation("kill",killer)
  turtlegroup.destroyEach();
  coingroup.destroyEach()
  if(mousePressedOver(icon)||touches.length>0){
gameState="level2"
distance=0
touches=[]
  }
  
}
  }
  drawSprites();
  if(gameState==="level2"){
  
    distance=distance+1
  
    console.log("distance=",distance  )
 icon.visible=false; 
forest.changeImage("mandir",templeimg)
forest.scale=1.6
forest.velocityX=0

camera.position.x=ninja.x+500
camera.position.y=displayHeight/2

lastimagesprite.x=camera.position.x
lastimagesprite.y=camera.position.y
treasuresprite.x=lastimagesprite.x+350
//treasuresprite.y=lastimagesprite.y

mainvillsprite.x=lastimagesprite.x
//mainvillsprite.y=lastimagesprite.y

ninja.changeAnimation("ninja1",ninjaImg);
ninja.scale=0.7
ninja.velocityX=5


if(touches.length>0||keyDown("space")){
  ninja.velocityX=8 
    ninja.velocityY=-11
    ninja.changeAnimation("ninjaatt",ninjaAttack);   
 
  }
  blackvillan() 
 if(ninja.y>700){
    gameState="gameover"
  }
  if(ninja.y<309){
      var token=0;  
  }
  if(ninja.isTouching(roofgroup)&&ninja.y>=309) {
      var token=1;
     
  }
  
  console.log("level22y: ",ninja.y)
  ninja.velocityY=ninja.velocityY+1;

  for(x=0;x<villan2group.length;x++){
   if(token===0&&ninja.isTouching(villan2group[x])){

    villan2group[x].destroy();
        
    }
 else if(villan2group[x].isTouching(ninja)&&token===1&&ninja.isTouching(roofgroup))
    {
    gameState="gameover"
    
}
  }
ninja.collide(roofgroup)
inviground.x=50
inviground.width=displayWidth/2+100;
ninja.setCollider("rectangle",0,0,50,200)

if(ninja.isTouching(roofgroup)){

  ninja.changeAnimation("ninja1",ninjaImg)
}

createcoins() 
for(x=0;x<coingroup.length;x++){
  if(coingroup[x].isTouching(ninja)){
 
 coingroup[x].destroy()
 score=score+1
  }
  

 }
 if(distance>=1000){
   fill("black")
   textSize(40)
   text("LEVEL2 COMPLETED",ninja.x+300,displayHeight/2-200)
   text("UNLOCK TREASURE",ninja.x+300,displayHeight/2-130)
 // icon2.visible=true
ninja.velocityX=0;
ninja.velocityY=0;
//console.log(icon2.x)
if(distance>1050){
  gameState="level3"

}
ninja.changeAnimation("kill",killer)
villan2group.destroyEach();
coingroup.destroyEach()
/*if(mousePressedOver(icon2)||touches.length>0){
gameState="level3"
coingroup.destroyEach()
villan2group.destroyEach()
}*/
}
  
}

 if(gameState==="level3"){
 forest.visible=false
 roofgroup.destroyEach();
 invig2=createSprite(lastimagesprite.x,lastimagesprite.y+350,displayWidth*2,20)
 invig2.visible=false;
 if(ninja.isTouching(invig2)){
  ninja.changeAnimation("ninja1",ninjaImg)
  }
 lastimagesprite.visible=true
 // lastimagesprite.x=ninja.x+400

  lastimagesprite.scale=0.65
  icon2=createSprite(lastimagesprite.x,lastimagesprite.y+100,30,30)
  icon2.addImage("l2com",levelup)
  icon2.visible=false
  
  
  ninja.x=ninja.x+5
 //console.log("lastninja.x:",ninja.x)
  ninja.collide(invig2)
  //treasuresprite.velocityY=3
  mainvillsprite.velocityY=3
  treasuresprite.collide(invig2)
  mainvillsprite.collide(invig2)
  treasuresprite.visible=true
  treasuresprite.addImage("box",treasureimg)
  ninja.collide(treasuresprite)
  
  mainvillsprite.visible=true
  mainvillsprite.addAnimation("monster",mainvillimg)
  mainvillsprite.x=mainvillsprite.x+random(-2,2)
  if(ninja.isTouching(mainvillsprite)){
mainvillsprite.destroy()

  }
   //console.log(ninja.x)
   //console.log(ninja.y)
   
   //ninja.x=ninja.x+3
   if(touches.length>0||keyDown("space")){
    attacksound.play()
  ninja.velocityY=-20 
  ninja.changeAnimation("ninjaatt",ninjaAttack);   

}
ninja.velocityY=ninja.velocityY+1 
console.log(ninja.x)
if(ninja.x>6200){
  bgsound.stop();
cheersound.play();
  ninja.changeImage("kill",killer)
  ninja.scale=1
  icon2.visible=true
  ninja.velocityX=0;
  
 
 
}
 
 

 }
if(gameState==="end"){
  bgsound.stop()
  ninja.changeImage("ndie",ninjadie)
forest.velocityX=0
ninja.velocityY=ninja.velocityY+2
ninja.collide(inviground)
coingroup.destroyEach()
restart.addImage("reset",restartbutton)
restart.visible=true
if(touches.length>0||mousePressedOver(restart)){
  bgsound.play();

  forest.x=displayWidth/2
  gameState="play"

  turtlegroup.destroyEach();
  score=0;
  distance=0;
}
}

ninja.collide(inviground)


textSize(50)
fill("gold")
text("COINS "+score,ninja.x+800,displayHeight/2-200)
if(gameState==="gameover"){
  bgsound.stop();
  restart.visible=false;
ninja.changeImage("ndie",ninjadie)
forest.velocityX=0
ninja.velocityY=ninja.velocityY+2
ninja.collide(inviground)
coingroup.destroyEach()
villan2group.destroyEach()
  oversprite.addImage("gmeover",overimage)
  oversprite.x=ninja.x+300;
  oversprite.visible=true;
  ninja.velocityX=0
}

}


function blackvillan(){
  //var i=Math.round(random(10,200))
  if(frameCount%100===0){
    fighter=createSprite(ninja.x+800,displayHeight-450)
    fighter.addAnimation("blackturtle",villan2)
    fighter.velocityX=-(5+8*distance/200)
    fighter.scale=0.43
    fighter.debug=false
    villan2group.add(fighter)
    
      }

}
  

function createcoins(){
if(frameCount%40===0){
coins=createSprite(ninja.x+900,random(ninja.y-25,ninja.y-30))
coins.addImage("rupee",coin)
coins.velocityX=-6
coins.scale=0.1
coingroup.add(coins)

for(i=0;i<coingroup.length;i++){
coingroup[i].depth=ninja.depth
ninja.depth=ninja.depth+1
//coingroup[i].lifetime=500
}
}

}
function turtle(){
  var i=Math.round(random(10,500))

  if(frameCount%i===0||frameCount%100===0){
villan=createSprite(random(displayWidth-10,displayWidth-100),displayHeight-250)
villan.addImage("turtle",villan1)
villan.velocityX=-(8+5*distance/100)
villan.scale=1.3
villan.debug=false
turtlegroup.add(villan)

  }
}
