class Bola {
  constructor(x, y) {
    var opn = {
      isStatic: true
    }
    this.raio = 30
    this.body = Bodies.circle(x,y,this.raio,opn)
    this.image=loadImage("assets/cannonball.png")
    World.add(world,this.body)
    this.trajetoria = []
  }
  mostrar(){
    var pos = this.body.position
    push()
    imageMode(CENTER)
    image(this.image,pos.x,pos.y,this.raio,this.raio)
    pop()
    if(this.body.velocity.x>0 && pos.x>10){
    var posicao = [pos.x,pos.y]
    this.trajetoria.push(posicao)
    }
    for(var i=0;i<this.trajetoria.length;i=i+1){
    image(this.image, this.trajetoria[i][0],this.trajetoria[i][1],5,5)
    }
    }
    atirar(){
      Matter.Body.setStatic(this.body,false)
      var newAngle = cannon.angle-28
      newAngle = newAngle*(3.14/180)
      var velocidade = p5.Vector.fromAngle(newAngle)
      velocidade.mult(0.5)
      Matter.Body.setVelocity(this.body,{x:velocidade.x*(180/3.14),y:velocidade.y*(180/3.14)})
    }
    remove (index){
      Matter.Body.setVelocity(this.body,{x:0,y:0})
      setTimeout(() => {
        Matter.World.remove(world,this.body)
        delete ball[index]
      }, 1000);
    }
  }
