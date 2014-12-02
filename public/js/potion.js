function Potion(arena) {
  this.arena = arena;
  drank = false;
  this.$sprite = $('<div id="potion"><img src="/img/potion.gif"/></div>');
  $('#arena').append(this.$sprite);
  this.height = this.$sprite.height();
  this.width = this.$sprite.width();
  this.x = (this.arena.width - this.width) * Math.random() + this.width / 2;
  this.y = (this.arena.height - this.height) * Math.random() + this.height / 2;
  this.updateSpritePosition();
}

Potion.prototype.updateSpritePosition = Knight.prototype.updateSpritePosition;


Potion.prototype.destroy = function() {
  this.$sprite.remove();
  this.drank = true;
}
