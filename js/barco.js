class Barco{
  constructor(x,y,largura, altura, posbarco,barcomatriz){
   this.body = Bodies.rectangle(x, y, largura, altura )
   this.largura = largura
   this.altura = altura
   this.posbarco = posbarco
   this.animation = barcomatriz
   this.speed = 0.05
   //this.image = loadImage ('assets/boat.png')
   World.add(world,this.body)
  }
  mostrar (){
    var pos = this.body.position
    var index =floor(this.speed % this.animation.length) 
    push()
    imageMode(CENTER)
    image(this.animation[index],0,this.posbarco,this.largura,this.altura)
    pop()
  }

remove (index){
  setTimeout(()=>{
    Matter.World.remove(world, barcos[index].body)
    delete barcos[index]
  },2000)
  }
  animar(){
    this.speed = this.speed + 0.05
  }
}