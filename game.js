
var ts;
var time;

Game = {
	time: 0,
	object1: null,
	object2: null,
	canvas: null,
	gameObjects: new Array(),
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
			this.board[y] = new Array();
			for(x=0; x < this.numColls; x++)
				this.board[y][x] = new Block();
		}
		this.board[5][2].color = '#CBACFF';

		console.log("game initalized");
	},
	
	run:function() {
		var elapsed = Game.getElapsedTime();
		Game.draw(elapsed);
		Game.update(elapsed);
	},
	
	update: function(elapsed) {
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
		this.ctx.fillStyle = "#FF0000";

			
		
	},
	drawBoard: function() {
		//this.ctx.fillRect(
			//	this.gameObjects[i].x,this.gameObjects[i].y,10, 10);
		for(y=0; y < this.numRows; y++) {
			for(x=0; x < this.numColls; x++) {
				var block = this.board[y][x];
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
	}
};

