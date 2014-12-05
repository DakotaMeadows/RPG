function Boss(x, y, arena) {
  this.arena = arena;
  this.dir = "left";
  this.isAlive = true;
  this.health = 100;
  this.$sprite = $('<div id="boss"><img src="/img/boss_standing.gif"/></div>');
  $('#arena').append(this.$sprite);
  this.height = this.$sprite.height();
  this.width = this.$sprite.width();
  this.x = x;
  this.y = y;
  this.updateSpritePosition();
}

Boss.prototype.updateSpritePosition = Knight.prototype.updateSpritePosition;
Boss.prototype.setDirection = Knight.prototype.setDirection;
Boss.prototype.move = Dragon.prototype.move;

// Boss.prototype.knightCollision = function (knight) {
//   var old_x = this.x;
//   var old_y = this.y;
//   if (this. {
//   this.x = old_x;
//   this.y = old_y;
//   this.collided = true;
//   };
//   this.updateSpritePosition;
// }

Boss.prototype.track = function(knight) {
  diff_x = Math.abs(this.x  - knight.x);
  diff_y = Math.abs(this.y - knight.y);
  if (diff_x > diff_y) {
   if (this.x > knight.x) {
      this.setDirection('left');
    }
    if (this.x < knight.x) {
      this.setDirection('right');
    }
  } else {
   if (this.y < knight.y) {
      this.setDirection('down');
    }
    if (this.y > knight.y) {
      this.setDirection('up');
    }
  }
}

Boss.prototype.attack = function() {
  $('#boss img').attr('src', 'img/boss_attacking.gif');
}
