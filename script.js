 //Global vars
  let gameScreen;
  let ctx;

  //Game Settings
  let settings = {
    backgroundColor : 'black', //Background color
    playerX : 10, //Player start position X
    playerY : 10, //Player start position Y
    playerColor : 'green', //Snake color
    speedX : 0, //Player start speed X
    speedY : 0, //Player start speed X
    gridSize : 25, //Grid size
    tileCount : 25, //Tiles in game (game size = grids * tiles)
    borderSize : 2, //grid line size
    goalX : 15, //Goal start position X
    goalY : 15, //Goal start position Y
    goalColor : 'red', //Goal color
    trail : [], //Snake body array
    tail : 5, //Snake min length
    fps : 10 //Game frames per second
  };

  //Defines elements and functions
  window.onload = function() {
      //Define elements
      gameScreen = document.getElementById("game-screen");
      gameScreen.width = settings.gridSize * settings.tileCount;
      gameScreen.height = settings.gridSize * settings.tileCount;
      ctx = gameScreen.getContext("2d");
      //Run
      document.addEventListener("keydown", control);
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

      //Print background on scene
      ctx.fillStyle = settings.backgroundColor;
      ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);

      //Print goal on scene
      ctx.fillStyle = settings.goalColor;
      ctx.fillRect(
        settings.goalX * settings.gridSize,
        settings.goalY * settings.gridSize,
        settings.gridSize - borderSize, 
        settings.gridSize - borderSize
      );
   
      //Print Snake on scene
      ctx.fillStyle = settings.playerColor;
      for(let i = 0; i < settings.trail.length; i++) {
          ctx.fillRect(
            settings.trail[i].x * settings.gridSize,
            settings.trail[i].y * settings.gridSize,
            settings.gridSize - borderSize,
            settings.gridSize - borderSize
          );
          //Check self collision (Game over)
          if (settings.trail[i].x === settings.playerX && settings.trail[i].y === settings.playerY) {
            settings.tail = 5;
          }
      }

      //Move Snake (print new head and exclude last tail)
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
  }

  //Controls
  function control(evt) {
    if (evt.keyCode === 37) { //up
      settings.speedX = -1;
      settings.speedY = 0;
    } else if (evt.keyCode === 38) { //left
      settings.speedX = 0;
      settings.speedY = -1;
    } else if (evt.keyCode === 39) { //down
      settings.speedX = 1;
      settings.speedY = 0;
    } else if (evt.keyCode === 40) { //right
      settings.speedX = 0;
      settings.speedY = 1;
    }
  }