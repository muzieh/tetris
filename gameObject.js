var GameObject = function(x,y, velocity) {
	this.velocity = velocity;
	this.x = x;
	this.y = y;
	this.update = function(elapsed) {
		this.x += this.velocity * elapsed;
	}
}


var Block = function(color) {
	if(!color)
		this.color = 'transparent'
	else
		this.color = color;
}