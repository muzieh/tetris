
var ts;
var time;

Game = {
	time: 0,
	object1: null,
	object2: null,
	canvas: null,
	fallingBlock: null,
	ctx: null,
	board: null,
	numRows: 30,
	numColls: 20,
	initalize: function() {
		console.log("game initalizing...");
		Game.canvas = document.getElementById("myCanvas");
		Game.canvas.style.background = '#FFD5A4';
		Game.ctx = Game.canvas.getContext("2d");
		ts = document.getElementById("tvalue");
		Game.time = (new Date()).getTime();
		this.board = new Array();
        var coloryfer = 0;
		for(y=0; y < this.numRows; y++) {
            coloryfer = y%2== 0 ? 0 : 1;
			for(x=0; x < this.numColls; x++) { 

				this.board[this._index(x,y)] = new Block( (coloryfer++) %2 == 0 ? 'transparent' : 'transparent', x, y);
            }
		}
		this.fallingBlock = new GameObject(Game, 4,0,'type4');
		
		//this.board[this._index(5,10)].color = '#00ff00';
		//this.board[this._index(5,10)].isSolid = true;

		
		var body = document.getElementsByTagName("body")[0]; 
		if( !body ) {
			throw ('no body');
		}

		var gameObject = this;
		body.onkeypress  = function(event) {
			var event = event || window.event;
			var charCode = ('charCode' in event) ? event.charCode : event.keyCode;
			switch(String.fromCharCode(charCode)) {
				case 'a':
					gameObject.fallingBlock.shift('left');
					console.log('left');
					break;
				case 'd':
					gameObject.fallingBlock.shift('right');
					console.log('right');
					break;
				case 'w':
					gameObject.fallingBlock.rotate('ccw');
					console.log('ccw');
					break;
				case 's':
					gameObject.fallingBlock.rotate('cw');
					console.log('cw');
					break;
                case 'o':
                    gameObject.fallingBlock.update(1);
                    break;
                case ' ':
                    gameObject.fallingBlock.speedUp();
                    break;
			}
		}
		
		console.log("game initalized");
	},
	
	run:function() {
		var elapsed = Game.getElapsedTime();
		Game.draw(elapsed);
		Game.update(elapsed);
	},
	
	update: function(elapsed) {
		//this.readKeys();
		this.fallingBlock.update(elapsed, this);
	},
	
	draw: function(elapsed) {
		ts.innerHTML = elapsed;
		this.canvas.width = this.canvas.width;
		
		this.drawBoard();
		this.fallingBlock.draw(this.ctx);
	},
	
	drawBoard: function() {
		for(y=0; y < this.numRows; y++) {
			for(x=0; x < this.numColls; x++) {
				var block = this.board[this._index(x,y)];
				this.ctx.fillStyle  = block.color;
				this.ctx.fillRect(x*10,y*10,10,10);
			}
		}
	},
	
	getElapsedTime: function() {
		var me = Game;
		var currentTime = (new Date()).getTime();
		var elapsed = currentTime - me.time;
		me.time = currentTime;
		return elapsed;
	},
	
	_index : function(x,y) {
		return y * this.numColls + x;
	}
};

