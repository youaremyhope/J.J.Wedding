 class Obj {
   constructor(x, y, type) {
     this.x = x;
     this.y = y;
     this.speed = 1;
     this.type = type;
   }

   draw() {
     this.x -= this.speed;

     if (this.type == 0) {
       fill("red");
     }
     if (this.type == 1) {
       fill("green");
     }

     rect(this.x, this.y, 50, 50);
   }
 }

 class Myself {
   constructor(x, y) {
     this.x = x;
     this.y = y;
   }

   draw() {
     fill("white");
     rect(this.x, this.y, 50, 50);
   }

   move() {
     if (keyIsDown(UP_ARROW)) {
       this.y -= 5;
     }
     if (keyIsDown(DOWN_ARROW)) {
       this.y += 5;
     }
     if (keyIsDown(LEFT_ARROW)) {
       this.x -= 5;
     }
     if (keyIsDown(RIGHT_ARROW)) {
       this.x += 5;
     }
   }

   catch(obj) {
     return this.x < obj.x + 50 &&
            this.x + 50 > obj.x &&
            this.y < obj.y + 50 &&
            this.y + 50 > obj.y;
   }
 }

 var objects = [];
 var myself = new Myself(10, 200);
 var lives = 3;

 function setup() {
   createCanvas(600, 400);
   objects.push(new Obj(width, 50, 0));
   objects.push(new Obj(width * 1.5, 250, 1));
 }

 function draw() {
   background("lightblue");

   myself.draw();
   myself.move();

   for (var i = objects.length - 1; i >= 0; i--) {
     objects[i].draw();

     if (myself.catch(objects[i])) {
       objects.splice(i, 1);
     } else if (objects[i].x < -50) {
       objects.splice(i, 1);
       lives--;
       if (lives <= 0) {
         noLoop(); // Stop the game if lives run out
         textSize(32);
         fill("black");
         text("Game Over", width / 2 - 80, height / 2);
         return;
       }
     }
   }

   // Add new objects periodically
   if (frameCount % 120 === 0) {
     let type = Math.floor(Math.random() * 2); // 0 or 1
     let y = Math.random() * (height - 50); // random y position
     objects.push(new Obj(width, y, type));
   }

   // Display the number of lives
   textSize(24);
   fill("black");
   text("Lives: " + lives, 10, 30);
 }