const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var bola
var canvas, angle, tower, ground, cannon;
var ball = []
var barco;
var barcos = []
var barcoimage, barcosheet
var barcomatriz = []
var isGameOver = false
var isLaughing = false
var rindo 

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  barcoimage = loadImage('./assets/boat/boat.png');
  barcosheet = loadJSON ('./assets/boat/boat.json');
  rindo = loadSound ('./assets/pirate_laugh.mp3')
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 20
  
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon=new Cannon(180,110,130,100,angle)

  var barcoframe = barcosheet.frames
  for (var i= 0;i<barcoframe.length;i++){
    var pos = barcoframe[i].position
    var img = barcoimage.get(pos.x,pos.y,pos.w,pos.h)
    barcomatriz.push(img)
  }
  
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);

  mostrarBarcos()
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  
  for(var i = 0; i<ball.length;i=i+1){
    mostrarBall(ball[i],i)
    destroi(i)
  }
  cannon.mostrar()
}
function keyReleased(){
  if(keyCode===UP_ARROW){
    ball[ball.length-1].atirar()
  }
}
function keyPressed(){
  if(keyCode===UP_ARROW){
    bola = new Bola(cannon.x,cannon.y)
    bola.trajetoria = []
    Matter.Body.setAngle(bola.body,cannon.angle)
    ball.push(bola)
  }
}
function mostrarBall(bola,index){
 if(bola){
 bola.mostrar()
 if(bola.body.position.x>= width||bola.body.position.y>= height-50){
  bola.remove(index)
 }
 } 
}
function mostrarBarcos(){
  if (barcos.length>0) {
    if (barcos[barcos.length-1]=== undefined || barcos[barcos.length-1].body.position.x<width-300){
     var position = [-70,-20,-30,-80]
     var guardar = random(position)
     barco = new Barco(width, height-50, 170,170, guardar, barcomatriz)
     barcos.push(barco)
    }
    for (var i = 0; i< barcos.length;i=i+1){
      if(barcos[i]){
        Matter.Body.setVelocity(barcos[i].body,{x:-1, y:0})
        barcos[i].mostrar()
        barcos[i].animar()
        var colisao = Matter.SAT.collides(this.tower,barcos[i].body)
        if (colisao.collided&&!barcos[i].isBroken){
          if (!isLaughing&&!rindo.isPlaying()){
            rindo.play()
            isLaughing = true
          }
          isGameOver = true
          gameOver()
        }
      }else {
        barcos[i]
      }
    }
  } else {
    barco = new Barco(width-70, height-50, 170,170, -80, barcomatriz)
    barcos.push(barco)
  }
}
function destroi (index){
  for (var i = 0; i< barcos.length;i=i+1){
      if (ball[index]!==undefined && barcos[i]!==undefined){
        var colizao = Matter.SAT.collides(ball[index].body,barcos[i].body)
        if(colizao.collided){
          barcos[i].remove(i)
          Matter.World.remove(world,ball[index].body)
          delete ball[index]
        }
      }
  }
}
function gameOver() {
  swal({
      title: `Fim de Jogo!!!`,
      text: "Obrigada por jogar!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
