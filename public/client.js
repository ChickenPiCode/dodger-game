//game vars 
   var id = 0;

document.addEventListener("DOMContentLoaded", function() {
   var mouse = { 
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false
   };

   // get canvas element and create context
   var canvas  = document.getElementById('drawing');
   var context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   var socket  = io.connect();

   // set canvas to full browser width/height
   canvas.width = width;
   canvas.height = height;

   // register mouse event handlers
   canvas.onmousedown = function(e){ mouse.click = true; };
   canvas.onmouseup = function(e){ mouse.click = false; };

   canvas.onmousemove = function(e) {
      // normalize mouse position to range 0.0 - 1.0
      mouse.pos.x = e.clientX / width;
      mouse.pos.y = e.clientY / height;
      mouse.move = true;
   };
     // context.rect(0,0,canvas.width/2,canvas.height/2);
   //   context.stroke();     




	

      //when user joins, draw the rectangle
	
	
   // main loop, running every 25ms

   
   function mainLoop() {  
   
      socket.on('id', function (data) {
         id = data;
         });   
         
         
         
         
         
         
      
      socket.on('players', function (data) {
         context.beginPath();
         context.rect(0,0,width,height);  
         context.fillStyle = "red";     
         context.fill(); 
      for (var i=0; i<data.length;i+=1){     
          
      //movement//controls
      
      if(data[i].id == id){
      data[i].x += ((mouse.pos.x*width) -data[i].x)/40;
      data[i].y += ((mouse.pos.y*height) -data[i].y)/40;       
      }

      if(data[i].x>data[i].xbox+data[i].zonearea || data[i].x<data[i].xbox-data[i].zonearea || data[i].y>data[i].ybox+data[i].zonearea || data[i].y<data[i].ybox-data[i].zonearea){
      data[i].xbox += ((mouse.pos.x*width) -data[i].xbox)/40; 
      data[i].ybox += ((mouse.pos.y*height) -data[i].ybox)/40;   
      }
      
      
      
      
      context.beginPath();      
      context.rect(data[i].xbox-data[i].zonearea*1.1,data[i].ybox-data[i].zonearea*1.1,data[i].zonearea*2.2,data[i].zonearea*2.2); 
      context.fillStyle = "blue";
      context.fill(); 
      context.beginPath();
      context.rect(data[i].xbox-data[i].zonearea,data[i].ybox-data[i].zonearea,data[i].zonearea*2,data[i].zonearea*2);       
      context.fillStyle = "yellow";
      context.fill();   

      context.beginPath();      
      context.rect(data[i].x-data[i].zonearea/10,data[i].y-data[i].zonearea/10,data[i].zonearea/5,data[i].zonearea/5);
      context.fillStyle = "green";
      context.fill(); 
      }   
      
      socket.emit('players', data); 
      });          

   }
   
   mainLoop();
});

