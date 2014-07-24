var GameObject = function(x,y,type) {
	//this.velocity = velocity;
	this.blocks = new Array();
	this.x = x;
	this.y = y;
	this.elapsedCounter = 0;
	
	this._initializeType1 = function() {
		this.blocks.push(new Block('#000000',0,0));
		this.blocks.push(new Block('#000000',1,0));
		this.blocks.push(new Block('#000000',2,0));
		this.blocks.push(new Block('#000000',1,1));
	}
	
	this._initializeType2 = function() {
		this.blocks.push(new Block('#000000',0,0));
		this.blocks.push(new Block('#000000',0,1));
		this.blocks.push(new Block('#000000',0,2));
		this.blocks.push(new Block('#000000',0,3));
		this.blocks.push(new Block('#000000',1,0));
	}
	
	switch(type) {
		case 'type1':
			this._initializeType1();
			break;
		case 'type2':
			this._initializeType2();
			break;
	}
	this.update = function(elapsed, game) {
		this.elapsedCounter += elapsed;
		if( this.elapsedCounter > 100) {
			this.elapsedCounter = 0;
			this.shift('right', game);
		}
	}
	
	this.shift = function(direction, game) {
		var currentX = this.x;
		
		if( direction === 'left') {
			this.x--;
		}
		else if (direction === 'right') {
			this.x++;
		}
		else {
			throw 'wrong direction';
		}
			
		var colisionType = this.checkCollision(game);
		
		switch(colisionType) {
			case 'left':
			case 'right':
			case 'blocks':
			this.x = currentX;

		}
		
	}
	
	this.checkCollision = function(game) {
		var board = game.board;
		for(i=0; i<this.blocks.length; i++) {
			block = this.blocks[i];
			var worldX = this.x + block.x;
			var worldY = this.y + block.y;
			
			if( worldX >= game.numColls )
				return 'right';
				
			if (worldX < 0)
				return 'left';
			
			for(board_i = 0; board_i<board.length; board_i++) {
				boardBlock = board[board_i];
				if(worldX === boardBlock.x 
					&& worldY === boardBlock.y
					&& boardBlock.isSolid === true) {

					return 'blocks';
				}
			}
		}
		
		return 'none';
	}
	
	this.draw = function(ctx) {
		for(i=0; i<this.blocks.length; i++) {
			var block = this.blocks[i];
			ctx.fillStyle = block.color;
			var worldX = this.x + block.x;
			var worldY = this.y + block.y;
			ctx.fillRect(worldX*10, worldY*10, 10, 10);
		}
	}
}


var Block = function(color,x,y) {
	this.x = x;
	this.y = y;
	this.isSolid = false;
	if(!color)
		this.color = 'transparent'
	else
		this.color = color;
}