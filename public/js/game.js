$(document).ready(function() {
  arena = new Arena(1000, 500);
  knight = new Knight(200, 200, arena);
  dragons = [new Dragon(arena), new Dragon(arena), new Dragon(arena)];
  potions = [];
  bossMode = true;
  startTime = Date.now();
  lastSpawnTime = Date.now();
  lastPotion = Date.now();
  healthbar = document.getElementById("healthbar");
  powerbar = document.getElementById("powerbar");
  bosshealthbar = document.getElementById("bosshealthbar");
  victory = false;

   ['down', 'up', 'left', 'right'].forEach(function(dir) {
    Mousetrap.bind(dir, function() {
      knight.setDirection(dir);
      knight.move();
    }, 'keydown')})

   Mousetrap.bind('space', function() {
    knight.attack();
    if (bossMode) {
      if (boss.x >= knight.x && boss.x <= knight.x + knight.width / 2 && boss.y >= knight.y - knight.height / 2 && boss.y <= knight.y + knight.height / 2) {
        boss.health -= knight.damage;
      }
    }
    dragons.forEach(function(dragon) {
    if (dragon.x >= knight.x && dragon.x <= knight.x + knight.width / 2 && dragon.y >= knight.y - knight.height / 2 && dragon.y <= knight.y + knight.height / 2) {
      dragon.destroy();
      dragons = _(dragons).reject(function(dragon){return !dragon.isAlive});
    }});
   }, 'keyup')

   Mousetrap.bind('shift', function () {
    if (knight.power >= 100) {
      knight.power = 0;
      powerbar.value = 0;
      // if (bossMode === true) {
      boss.health -= knight.specialDamage;
      // }
      dragons.forEach(function(dragon) {
        dragon.destroy();
        dragons = _(dragons).reject(function(dragon){return dragon});
      })
      $('#lightning img').css('display', 'block').delay(500).fadeOut('slow');
    }
   })

    setInterval(function() {
      if (knight.power < 100) {
        knight.power += 0.1;
        powerbar.value += 0.1;
      };
      dragons.forEach(function(dragon) {
        dragon.track(knight);
        dragon.move();
        if ((dragon.x >= knight.x - knight.width / 2) && (dragon.x <= knight.x + knight.width / 2) && (dragon.y >= knight.y - knight.height / 2) && (dragon.y <= knight.y + knight.height / 2)) {
          knight.health -= 0.05;
          healthbar.value -= 0.05;
        };
      });
      if (!bossMode) {
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
      }

      if (bossMode) { //lol hacky - can make if/else w/potions outside
        dragons.forEach(function(dragon) { //destroy dragons on the board when hypothetical boss mode activation is triggered
            dragon.destroy();
            dragons = _(dragons).reject(function(dragon){return !dragon.isAlive});
          });

        if (Date.now() - lastPotion > 4000) {
          if (Math.random() * 10 > 5){
            potions.push(new Potion(arena));
          };
          lastPotion = Date.now();
        }
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
      if (Date.now() - startTime > 1000) {
        if (bossMode === false) {
          boss = new Boss(700, 150, arena);
        };
        bossMode = true;
        boss.track(knight);
        boss.move();
      }
      if (knight.health <= 0) {
        knight.die();
        Mousetrap.reset();
        // $('#arena').fadeOut('slow');
      } ;
    });
} )

