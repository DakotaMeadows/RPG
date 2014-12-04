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
Boss.prototype.updateSpritePosition = Knight.prototype.updateSpritePosition;
Boss.prototype.move = Dragon.prototype.move;
Boss.prototype.track = Dragon.prototype.track;

Boss.prototype.attack = function() {
  $('#boss img').attr('src', 'img/boss_attacking.gif');
}
