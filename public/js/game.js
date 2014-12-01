$(document).ready(function() {
  arena = new Arena(1000, 500);
  knight = new Knight(200, 200, arena);
  dragons = [new Dragon(arena), new Dragon(arena), new Dragon(arena)];
  potions = [];
  lastSpawnTime = Date.now();
  lastPotion = Date.now();
  healthbar = document.getElementById("healthbar");

   ['down', 'up', 'left', 'right'].forEach(function(dir) {
    Mousetrap.bind(dir, function() {
      knight.setDirection(dir);
      knight.move();
    }, 'keydown')})

   Mousetrap.bind('space', function() {
    knight.attack();
    dragons.forEach(function(dragon) {
    if (dragon.x >= knight.x && dragon.x <= knight.x + knight.width / 2 && dragon.y >= knight.y - knight.height / 2 && dragon.y <= knight.y + knight.height / 2) {
      dragon.destroy();
      dragons = _(dragons).reject(function(dragon){return !dragon.isAlive});
    }});
   }, 'keyup')

    setInterval(function() {
      dragons.forEach(function(dragon) {
        dragon.track(knight);
        dragon.move();
        if ((dragon.x >= knight.x - knight.width / 2) && (dragon.x <= knight.x + knight.width / 2) && (dragon.y >= knight.y - knight.height / 2) && (dragon.y <= knight.y + knight.height / 2)) {
          knight.health -= 0.0;
          healthbar.value -= 0.05;
        };
      });
      if (Date.now() - lastSpawnTime > 1000) {
      dragons.push(new Dragon(arena));
      lastSpawnTime = Date.now();
      };
      if (Date.now() - lastPotion > 4000) {
        if (Math.random() * 10 > 5){
          potions.push(new Potion(arena));
        };
        lastPotion = Date.now();
      }
      potions.forEach(function(potion) {
        if ((potion.x >= knight.x - knight.width / 2) && (potion.x <= knight.x + knight.width / 2) && (potion.y >= knight.y - knight.height / 2) && (potion.y <= knight.y + knight.height / 2)) {
          potion.destroy();
          knight.health += 20;
          if (healthbar.value >= 80) {
            healthbar.value = 100;
            knight.health = 100;
          }
          else{
            healthbar.value += 20;
            knight.healthbar += 20;
          };
          potions = _(potions).reject(function(potion){return potion.drank});
        }
      });
      if (knight.health < 0) {
        knight.die();
        Mousetrap.reset();
        $('#arena').fadeOut('slow');
      } ;
    });
} )

