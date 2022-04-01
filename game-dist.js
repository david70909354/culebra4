;(function(){


  class Random{
      static get(inicio, final){
          return Math.floor(Math.random()* final) + inicio
  
      }
   }
  
  
  
  class Food{
       constructor(x,y){
          this.x = x
          this.y = y
          this.whidth = 10
          this.height = 10
       }
  
  
  
   draw(){
       ctx.fillRect(this.x,this.y,this.whidth,this.height)
   }
  
  static generate(){
      return new Food(Random.get(0,500),Random.get(0,300))
  }
  
  
  }
  
  
  
  class Square{
       constructor(x,y){
          this.x = x
          this.y = y
          this.whidth = 10
          this.height = 10
          this.back = null
       }
       draw(){
           ctx.fillRect(this.x,this.y,this.whidth,this.height)
           if(this.hasback()){
               this.back.draw()
           }
       }
       add(){
           if(this.hasback()) return this.back.add();
           this.back = new Square(this.x,this.y)
       }
       hasback(){
           return this.back !== null
       }
  
  
  
   copy(){
      if(this.hasback()){
      this.back.copy()
      this.back.x =this.x
      this.back.y =this.y
      }
   }
  
   right(){
       this.copy()
       this.x += 10
   }
    left(){
        this.copy()
       this.x -= 10
   }
    up(){
        this.copy()
       this.y -= 10
   }
    down(){
        this.copy()
       this.y += 10
   }
  
  
  }
  
  
  
  class Snake{
      constructor(){
          this.head = new Square(100,0)
          this.draw()
          this.direction = "right"
          this.head.add()
          this.head.add()
          this.head.add()
         
          
      }

  
     
  
  draw(){
    this.head.draw()
  }
  
  right(){
      this.direction = "right"
  }
  left(){
      this.direction = "left"
  }
  down(){
      this.direction = "down"
  }
  up(){
      this.direction = "up"
  }
  move(){
      if(this.direction === "up") return this.head.up()
      if(this.direction === "down") return this.head.down()
      if(this.direction === "left") return this.head.left()
      if(this.direction === "right") return this.head.right()
  }
  
  eat(){
    this.head.add()
   

  }
  
  
  }
  
  
  
  const canvas =  document.getElementById('canvas')
   const ctx = canvas.getContext('2d')
  
  
  
  const snake = new Snake()
  
  
  
  let foods = []
  
  
  
  window.addEventListener("keydown",function(ev){
                                              ev.preventDefault()
  
  
  
                                          if(ev.keyCode === 40) return snake.down();
                                          if(ev.keyCode === 39) return snake.right();
                                          if(ev.keyCode === 38) return snake.up();
                                          if(ev.keyCode === 37) return snake.left();
  
                                          return false
                                          })
  
  
  setInterval(function(){
                        snake.move()
                        ctx.clearRect(0,0,canvas.width,canvas.height)
                        snake.draw()
                        drawFood()
                        },1000 / 5)
  
  
                        setInterval(function(){
                          const food = Food.generate()
                          foods.push(food)
                          
                          setTimeout(function(){
                          removeFromfoods(food)
                          },10000)
                      
                        },4000)
  
  
  function drawFood(){
        for(const index in foods){
            const food = foods[index]
            food.draw()
   if(hit(food,snake.head)){
            snake.eat()
            removeFromfoods(food)
        }
    }
  
    
  }
  
  
  
  function removeFromfoods(food){
        foods = foods.filter(function(f){
        return food !== f
                                      })
                                    
                                      }
    function hit(a,b){
        var hit = false
        //Colsiones horizontales
        if(b.x + b.width >= a.x && b.x < a.x + a.width)
        {
          //Colisiones verticales
          if(b.y + b.height >= a.y && b.y < a.y + a.height)
            hit = true
        }
        //Colisión de a con b
        if(b.x <= a.x && b.x + b.width >= a.x + a.width)
        {
          if(b.y <= a.y && b.y + b.height >= a.y + a.height)
            hit = true
        }
        //Colisión b con a
        if(a.x <= b.x && a.x + a.width >= b.x + b.width)
        {
          if(a.y <= b.y && a.y + a.height >= b.y + b.height)
            hit = true
        }

        console.log(hit,"soy el valor de hit")
      console.log(b.x,"soy b")
      console.log(a.x,"soy a")

        return hit;
      }
 
   
  
  
        })() 
            
            
      