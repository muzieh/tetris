var GameObject = function(game, x,y,type) {
	//this.velocity = velocity;
	this.blocks = new Array();
	this.x = x;
	this.y = y;
	this.elapsedCounter = 0;
	this.game = game;
	this.speed = 300;

	this._initializeType1 = function(color) {
		this.blocks.push(new Block(color,0,0));
		this.blocks.push(new Block(color,-1,0));
		this.blocks.push(new Block(color,-1,-1));
		this.blocks.push(new Block(color,1,0));
	}
	
	this._initializeType2 = function(color) {
		this.blocks.push(new Block(color,-1,0));
		this.blocks.push(new Block(color,0,0));
		this.blocks.push(new Block(color,1,0));
		this.blocks.push(new Block(color,1,-1));
	}

	this._initializeType3 = function(color) {
		this.blocks.push(new Block(color,-1,0));
		this.blocks.push(new Block(color,0,0));
		this.blocks.push(new Block(color,1,0));
		this.blocks.push(new Block(color,0,-1));
	}

	this._initializeType4 = function(color) {
		this.blocks.push(new Block(color,-1,0));
		this.blocks.push(new Block(color,0,0));
		this.blocks.push(new Block(color,1,0));
		this.blocks.push(new Block(color,2,-0));
	}

	this._initializeType5 = function(color) {
		this.blocks.push(new Block(color,0,0));
		this.blocks.push(new Block(color,0,1));
		this.blocks.push(new Block(color,1,0));
		this.blocks.push(new Block(color,1,1));
	}

	this._initializeType6 = function(color) {
		this.blocks.push(new Block(color,-1,0));
		this.blocks.push(new Block(color,0,0));
		this.blocks.push(new Block(color,0,1));
		this.blocks.push(new Block(color,1,1));
	}

	this._initializeType7 = function(color) {
		this.blocks.push(new Block(color,0,0));
		this.blocks.push(new Block(color,1,0));
		this.blocks.push(new Block(color,-1,1));
		this.blocks.push(new Block(color,0,1));
	}

    this.getRandomColor = function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
	
    this.initializeBlock = function(type) {
        var color = this.getRandomColor();
        switch(type) {
            case 'type1':
                this._initializeType1(color);
                break;
            case 'type2':
                this._initializeType2(color);
                break;
            case 'type3':
                this._initializeType3(color);
                break;
            case 'type4':
                this._initializeType4(color);
                break;
            case 'type5':
                this._initializeType5(color);
                break;
            case 'type6':
                this._initializeType6(color);
                break;
            case 'type7':
                this._initializeType7(color);
                break;
        }
    }

    this.initializeBlock(type);

	this.update = function(elapsed) {
		this.elapsedCounter += elapsed;
		if( this.elapsedCounter > this.speed) {
			this.elapsedCounter = 0;
			this.y++;
            var colisionType = this.checkCollision();
            if( colisionType === 'blocks' || colisionType === 'bottom' ) {
                this.y--;
                this.moveBlocksToBoard();
                this.clearFullLines();
                this.x = 6;
                this.y = 2;
                this.speed = 300;
                this.initializeBlock('type' + Math.floor((Math.random() * 7) + 1));
                
            }
		}
	}

    this.clearFullLines = function() {
        var board = this.game.board;
     	for(y=0; y < this.game.numRows; y++) {
            var fullLine = true;
			for(x=0; x < this.game.numColls; x++) { 
				if(!board[this.game._index(x,y)].isSolid) {
                    fullLine = false;
                    break;
                }
            }
            if(fullLine) {
                for(x=0; x < this.game.numColls; x++) { 
                    var block = board[this.game._index(x,y)];
                    block.isSolid = false;
                    block.color = 'transparent';
                    

                }
                for(yy=y; yy > 0; yy--) {
                    for(x=0; x < this.game.numColls; x++) { 
                        var source = board[this.game._index(x,yy-1)];
                        var destination = board[this.game._index(x,yy)];
                        destination.color = source.color;
                        destination.isSolid = source.isSolid;
                        source.isSolid = false;
                        source.color = 'transparent';

                    }
                }
            }
		}
    }

    this.moveBlocksToBoard = function() {
        while(this.blocks.length > 0) {
            var block = this.blocks.pop();
            var worldX = block.x + this.x;
            var worldY = block.y + this.y;
            block.isSolid = true;
            block.x = worldX;
            block.y = worldY;
            this.game.board[this.game._index(worldX,worldY)] = block;
            
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
	

    this.speedUp = function() {
        this.speed = 30;
    }

	this.rotate = function(direction) {
       var xr = 0;
       var yr = 0;
       
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
			var block = this.blocks[i];
			var worldX = this.x + block.x;
			var worldY = this.y + block.y;
			
			if( worldX >= this.game.numColls )
				return 'right';
				
			if (worldX < 0)
				return 'left';
			
			for(board_i = 0; board_i<board.length; board_i++) {
				var boardBlock = board[board_i];
				if(worldX === boardBlock.x 
					&& worldY === boardBlock.y
					&& boardBlock.isSolid === true) {
					return 'blocks';
				}
			}

            if (worldY >= this.game.numRows ) {
                return 'bottom';
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
