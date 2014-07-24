
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
		for(y=0; y < this.numRows; y++) {
			for(x=0; x < this.numColls; x++)
				this.board[this._index(x,y)] = new Block('transparent', x, y);
		}
		this.fallingBlock = new GameObject(4,10,'type2');
		
		this.board[this._index(3,11)].color = '#00ff00';
		this.board[this._index(3,11)].isSolid = true;

		
		var body = document.getElementsByTagName("body")[0]; 
		if( !body ) {
			throw ('no body');
		}

		var gameObject = this;
		body.onkeypress  = function(event) {
			var charCode = ('charCode' in event) ? event.charCode : event.keyCode;
			switch(String.fromCharCode(charCode)) {
				case 'a':
					gameObject.fallingBlock.shift('left', gameObject);
					console.log('left');
					break;
				case 'd':
					gameObject.fallingBlock.shift('right', gameObject);
					console.log('right');
					break;
			}
			//console.log(charCode);
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
		//this.fallingBlock.update(elapsed, this);
		// for(i=0; i<30; i++) {
			// var go = this.gameObjects[i];
			// if (go.x > this.canvas.width - 10 && go.velocity > 0.0) {
				// go.velocity = -1.0 * Math.abs(go.velocity);
			// }
			// else if(go.x <0.0 && go.velocity < 0.0) {
				// go.velocity = Math.abs(go.velocity);
			// }
			// go.update(elapsed);
		// }
		
		
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

