function Knight(x, y, arena) {
  this.arena = arena;
  this.x = x;
  this.y = y;
  this.isAlive = true;
  this.health = 100;
  this.damage = 10;
  this.power = 0;
  this.specialDamage = 20;
  this.dir = "none";
  this.$sprite = $('<div id="knight"><img src="/img/knight_standing.gif"/></div>');
  $('#arena').append(this.$sprite);
  this.height = this.$sprite.height();
  this.width = this.$sprite.width();
  this.updateSpritePosition();
}

Knight.prototype.setDirection = function(direction) {
  this.dir = direction;
}

Knight.prototype.updateSpritePosition = function() {
  this.$sprite.css('left', this.x - this.width / 2);
  this.$sprite.css('top', this.y - this.height / 2);
}

Knight.prototype.move = function() {
  var old_x = this.x;
  var old_y = this.y;
    $('#knight img').attr('src', '/img/knight_walking.gif');
    switch (this.dir) {
    case 'down':
      this.y += 30;
      break;
    case 'up':
      this.y -= 30;
      break;
    case 'left':
      this.x -= 30;
      break;
    case 'right':
      this.x += 30;
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

Knight.prototype.attack = function() {
  $('#knight img').attr('src', '/img/knight_attacking.gif');
  this.dir = "none";
}

Knight.prototype.die = function() {
  this.isAlive = false;
  $('#knight img').attr('src', '/img/knight_dead.gif');
}
