  fill("green");
  rectangle(5, 5, totalWidth-10, totalHeight-10, "black");
  
  var player = {x: 100, y: 100, size: 5, xSpeed: 5, ySpeed: 0,};
  
  function update()
  {
    rectangle(player.x, player.y, player.size, player.size, "green");
    
    player.x += player.xSpeed;
    player.y += player.ySpeed;
    
    if (keyboard.w)
    {
      player.ySpeed = -5;
      player.xSpeed = 0;
    }
    
    if (keyboard.s)
    {
      player.ySpeed = 5;
      player.xSpeed = 0;
    }
    
    if(keyboard.a)
    {  
      player.ySpeed = 0;
      player.xSpeed = -5;
    }  
    
    if(keyboard.d)
    {  
      player.ySpeed = 0;
      player.xSpeed = 5;
    }
    
    if (getPixel(player.x, player.y).green != 0)
      stopUpdate();
  }
