 //Global vars
  let gameScreen;
  let ctx;

  //Game Settings
  let settings = {
    backgroundColor : 'black',
    playerX : 10, //Player start position X
    playerY : 10, //Player start position Y
    playerColor : 'green',
    speedX : 0, //Player start speed X
    speedY : 0, //Player start speed X
    gridSize : 20, //Grid size
    tileCount : 20, //Tiles in game (game size = grids * tiles)
    goalX : 15, //Goal start position X
    goalY : 15, //Goal start position Y
    goalColor : 'red',
    trail : [], //Snake body array
    tail : 5, //Snake min length
    fps : 10 //Game frames per second
  };

  //Defines elements and functions
  window.onload = function() {
      gameScreen = document.getElementById("game-screen");
      gameScreen.width = settings.gridSize * settings.tileCount;
      gameScreen.height = settings.gridSize * settings.tileCount;
      ctx = gameScreen.getContext("2d");
      document.addEventListener("keydown", keyPush);
      setInterval(game, 1000/settings.fps);
  }

  //Game play function
  function game() {
      //Sets player position
      settings.playerX += settings.speedX;
      settings.playerY += settings.speedY;

      //Make player jump screen borders
      if(settings.playerX < 0) {
          settings.playerX =  settings.tileCount - 1;
      }
      if(settings.playerX > settings.tileCount - 1) {
          settings.playerX = 0;
      }
      if(settings.playerY < 0) {
        settings.playerY = settings.tileCount - 1;
      }
      if(settings.playerY > settings.tileCount - 1) {
        settings.playerY = 0;
      }

      //Print background
      ctx.fillStyle = settings.backgroundColor;
      ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);
   
      //Print Snake
      ctx.fillStyle = settings.playerColor;
      for(let i = 0; i < settings.trail.length; i++) {
          ctx.fillRect(
            settings.trail[i].x * settings.gridSize,
            settings.trail[i].y * settings.gridSize,
            settings.gridSize - 2,
            settings.gridSize - 2
          );
          //Check self collision
          if (settings.trail[i].x === settings.playerX && settings.trail[i].y === settings.playerY) {
            settings.tail = 5;
          }
      }

      //Move Snake
      settings.trail.push({x: settings.playerX , y: settings.playerY});
      while(settings.trail.length > settings.tail) {
        settings.trail.shift();
      }
      
      //Check player feed (goal)
      if(settings.goalX === settings.playerX && settings.goalY === settings.playerY) {
        settings.tail++;
        settings.goalX = Math.floor(Math.random() * settings.tileCount);
        settings.goalY = Math.floor(Math.random() * settings.tileCount);
      }

      //Print goal
      ctx.fillStyle = settings.goalColor;
      ctx.fillRect(
        settings.goalX * settings.gridSize,
        settings.goalY * settings.gridSize,
        settings.gridSize - 2, 
        settings.gridSize - 2
      );
  }

  //Controls
  function keyPush(evt) {
    if (evt.keyCode === 37) {
      settings.speedX = -1;
      settings.speedY = 0;
    } else if (evt.keyCode === 38) {
      settings.speedX = 0;
      settings.speedY = -1;
    } else if (evt.keyCode === 39) {
      settings.speedX = 1;
      settings.speedY = 0;
    } else if (evt.keyCode === 40) {
      settings.speedX = 0;
      settings.speedY = 1;
    }
  }