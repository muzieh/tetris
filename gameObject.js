var GameObject = function(game, x,y,type) {
	//this.velocity = velocity;
	this.blocks = new Array();
	this.x = x;
	this.y = y;
	this.elapsedCounter = 0;
	this.game = game;
	
	this._initializeType1 = function() {
		this.blocks.push(new Block('#000000',0,0));
		this.blocks.push(new Block('#000000',-1,0));
		this.blocks.push(new Block('#000000',-1,-1));
		this.blocks.push(new Block('#000000',1,0));
	}
	
	this._initializeType2 = function() {
		this.blocks.push(new Block('#000000',-1,0));
		this.blocks.push(new Block('#000000',0,0));
		this.blocks.push(new Block('#000000',1,0));
		this.blocks.push(new Block('#000000',1,-1));
	}

	this._initializeType3 = function() {
		this.blocks.push(new Block('#000000',-1,0));
		this.blocks.push(new Block('#000000',0,0));
		this.blocks.push(new Block('#000000',1,0));
		this.blocks.push(new Block('#000000',0,-1));
	}

	this._initializeType4 = function() {
		this.blocks.push(new Block('#000000',-1,0));
		this.blocks.push(new Block('#000000',0,0));
		this.blocks.push(new Block('#000000',1,0));
		this.blocks.push(new Block('#000000',2,-0));
	}

	this._initializeType5 = function() {
		this.blocks.push(new Block('#000000',0,0));
		this.blocks.push(new Block('#000000',0,1));
		this.blocks.push(new Block('#000000',1,0));
		this.blocks.push(new Block('#000000',1,1));
	}

	this._initializeType6 = function() {
		this.blocks.push(new Block('#000000',-1,0));
		this.blocks.push(new Block('#000000',0,0));
		this.blocks.push(new Block('#000000',0,1));
		this.blocks.push(new Block('#000000',1,1));
	}

	this._initializeType7 = function() {
		this.blocks.push(new Block('#000000',0,0));
		this.blocks.push(new Block('#000000',1,0));
		this.blocks.push(new Block('#000000',-1,1));
		this.blocks.push(new Block('#000000',0,1));
	}
	
	switch(type) {
		case 'type1':
			this._initializeType1();
			break;
		case 'type2':
			this._initializeType2();
			break;
		case 'type3':
			this._initializeType3();
			break;
		case 'type4':
			this._initializeType4();
			break;
		case 'type5':
			this._initializeType5();
			break;
		case 'type6':
			this._initializeType6();
			break;
		case 'type7':
			this._initializeType7();
			break;
	}

	this.update = function(elapsed) {
		this.elapsedCounter += elapsed;
		if( this.elapsedCounter > 100) {
			this.elapsedCounter = 0;
			this.shift('right');
		}
	}
	
	this.shift = function(direction) {
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
			
		var colisionType = this.checkCollision();
		
		switch(colisionType) {
			case 'left':
			case 'right':
			case 'blocks':
			this.x = currentX;
		}
	}
	
	this.rotate = function(direction) {
       var xr = 0;
       var yr = 0;
       //debugger;
       
       for(i=0; i<this.blocks.length; i++) {
           var block = this.blocks[i];
           var v_x = block.x - xr;
           var v_y = block.y - yr;
           var xx = 0;
           var yy = 0;
           if (direction === 'cw') {
               xx = -v_y;
               yy = v_x;
           } else {
               xx = v_y;
               yy = -v_x;
           }
           xx += xr;
           yy += yr;
           block.x = xx;
           block.y = yy;
            
       }
	}
	
	this.checkCollision = function() {
		var board = this.game.board;
		for(i=0; i<this.blocks.length; i++) {
			block = this.blocks[i];
			var worldX = this.x + block.x;
			var worldY = this.y + block.y;
			
			if( worldX >= this.game.numColls )
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
