$(document).ready(function() {
  arena = new Arena(500, 500);
  knight = new Knight(200, 200, arena);
  dragons = [new Dragon(arena), new Dragon(arena), new Dragon(arena)];
  last_spawn_time = Date.now();

   ['down', 'up', 'left', 'right'].forEach(function(dir) {
    Mousetrap.bind(dir, function() {
      knight.setDirection(dir);
      knight.move();
    }, 'keyup')})

   Mousetrap.bind('space', function() {
    knight.attack();
   }, 'keyup')

    setInterval(function() {
    //   if (Date.now() - last_spawn_time > 500) {
    //   enemies.push(new Dragon(arena));
    //   last_spawn_time = Date.now();
    // }
    });
})
