class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.base=loadImage("assets/cannonBase.png")
    this.canhao= loadImage("assets/canon.png")
  }
  mostrar(){
    image(this.base,70,20,200,200)
    push()
    translate(this.x,this.y)
    rotate(this.angle)
    imageMode(CENTER)
    image(this.canhao,0,0,this.width,this.height)
    pop()
    if(keyIsDown(RIGHT_ARROW) && this.angle<70){
      this.angle+=1
    }
    if(keyIsDown(LEFT_ARROW) && this.angle>-45){
      this.angle-=1
    }
    }
  }
