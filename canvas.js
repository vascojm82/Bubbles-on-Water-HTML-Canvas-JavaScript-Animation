var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

//  Drawing Multiple Animated Circles

// ** Circle Object **
  function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  Circle.prototype.draw = function(){
    c.beginPath();    //Separates circle from previous line so they don't connect to each other
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.strokeStyle = "black";
    c.fillStyle = "rgba(255, 255, 255, 0.2)";
    c.stroke();
    c.fill();
  }

  Circle.prototype.update = function(){

    //Changes Directions
    if((this.x + this.radius) > innerWidth || (this.x - this.radius) < 0)
      this.dx = -this.dx;
    if((this.y + this.radius) > innerHeight || (this.y - this.radius) < 0)
      this.dy = -this.dy;

    //Changes the X & Y coordinates
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

  // ** End of Circle Object **


  // Circles Array with 200 different circles
  var circleArray = [];

  for(var i = 0; i<200; i++){

    //Constant Circle Radius
    var radius = 20;

    //Random Location in the X/Y Axis
    var x = Math.random() * ((innerWidth - (radius * 2)) + radius);
    var y = Math.random() * ((innerWidth - (radius * 2)) + radius);

    //Radom Velocity
    var dx = Math.random() - 0.5;     //We either get (1 - 0.5) = 0.5   ||    (0 - 0.5) = -0.5
        dx *= 5;    //Multiply speed by a factor of 5
    var dy = Math.random() - 0.5;
        dy *= 5;

    circleArray[i] = new Circle(x, y, dx, dy, radius);
  }


  //  Animation Recursive function
  function animate(){

    c.clearRect(0,0,innerWidth,innerHeight);    //Clear Whole Canvas

    //  Draw all 200 Circles in the array
    for(var i = 0; i < circleArray.length; i++){
      circleArray[i].update();
    }

    requestAnimationFrame(animate);             //Recursive call to itself
  }

  animate();
