


var express = require('express'), 
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

// start webserver on port 8080
var server =  http.createServer(app);
var io = socketIo.listen(server);
server.listen(8080);
// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");

//player object
var player = function(x,y,name,id){
   this.x=x;
   this.y=y;
   this.xbox=x;
   this.ybox=y;
   this.name=name;
   this.zonearea = 25;
   this.id = id;
};


//new player
var me = new player(500,500,"me");
var player_counter = 0;
var players=[];
// event-handler for new incoming connections



io.on('connection', function (socket) {
   console.log("A user joined! Hooray!");  

      player_counter += 1;
      players.push(new player(500,500,"me",player_counter));         
      socket.emit('id', player_counter);
      
      //move players
      socket.emit('players', players);      
      socket.on('players', function (data) {
         for (var i=0; i<data.length;i+=1){  
            //updates all the existing players
            players[i] = data[i];
            };
            socket.emit('players', players);  
         });
           
      }
      
      
      
      
      
      
   );