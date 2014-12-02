function Boss(arena) {
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

Boss.prototype.updateSpritePosition = Knight.prototype.updateSpritePosition;

