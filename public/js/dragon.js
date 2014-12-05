function Dragon(arena) {
  this.arena = arena;
  this.dir = "left";
  this.isAlive = true;
  this.$sprite = $('<div id="dragon"><img src="/img/dragon.gif"/></div>');
  $('#arena').append(this.$sprite);
  this.height = this.$sprite.height();
  this.width = this.$sprite.width();
  this.x = this.arena.width - this.width / 2;
  this.y = (this.arena.height - this.height) * Math.random() + this.height / 2;
  this.updateSpritePosition();
}

Dragon.prototype.updateSpritePosition = Knight.prototype.updateSpritePosition;
Dragon.prototype.setDirection = Knight.prototype.setDirection;

Dragon.prototype.move = function() {
  var old_x = this.x;
  var old_y = this.y;
    switch (this.dir) {
    case 'down':
      this.y += 1;
      break;
    case 'up':
      this.y -= 1;
      break;
    case 'left':
      this.x -= 1;
      break;
    case 'right':
      this.x += 1;
      break;
    }
    if (((this.y - this.height / 2) < -30) ||
      ((this.y + this.height / 2) > this.arena.height) ||
      ((this.x - this.width / 2) < -10) ||
      ((this.x + this.width / 2) > this.arena.width)) {
    this.x = old_x;
    this.y = old_y;
    this.collided = true;
  }
  this.updateSpritePosition();
}

Dragon.prototype.destroy = function() {
  this.isAlive = false;
  this.$sprite.remove();
}

Dragon.prototype.track = function(knight) {
  diff_x = Math.abs(this.x - knight.x);
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
