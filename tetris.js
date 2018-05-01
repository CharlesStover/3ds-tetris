window.tetris = {
		block: 21,
		blocks: [

			// I
			{
				color: "#65c4e9",
				rotations: [
					[
						[1],
						[1],
						[1],
						[1]
					],
					[
						[1, 1, 1, 1]
					]
				]
			},//*

			// J
			{
				color: "#65a2d7",
				rotations: [
					[
						[1, 1],
						[1, 0],
						[1, 0]
					],
					[
						[1, 1, 1],
						[0, 0, 1]
					],
					[
						[0, 1],
						[0, 1],
						[1, 1]
					],
					[
						[1, 0, 0],
						[1, 1, 1]
					]
				]
			},

			// L
			{
				color: "#ffae65",
				rotations: [
					[
						[1, 0],
						[1, 0],
						[1, 1]
					],
					[
						[1, 1, 1],
						[1, 0, 0]
					],
					[
						[1, 1],
						[0, 1],
						[0, 1]
					],
					[
						[0, 0, 1],
						[1, 1, 1]
					]
				]
			},

			// O
			{
				color: "#fee065",
				rotations: [
					[
						[1, 1],
						[1, 1]
					]
				]
			},

			// S
			{
				color: "#a4d87d",
				rotations: [
					[
						[0, 1, 1],
						[1, 1, 0]
					],
					[
						[1, 0],
						[1, 1],
						[0, 1]
					]
				]
			},

			// T
			{
				color: "#be80c0",
				rotations: [
					[
						[1, 1, 1],
						[0, 1, 0]
					],
					[
						[0, 1],
						[1, 1],
						[0, 1]
					],
					[
						[0, 1, 0],
						[1, 1, 1]
					],
					[
						[1, 0],
						[1, 1],
						[1, 0]
					]
				]
			},

			// Z
			{
				color: "#f47e87",
				rotations: [
					[
						[1, 1, 0],
						[0, 1, 1]
					],
					[
						[0, 1],
						[1, 1],
						[1, 0]
					]
				]
			}//*/
		],
		board: [],
		canvas: null,
		clear: function()
		{
			for (var y = 0; y < this.blocks[this.player.block].rotations[this.player.rotation].length; y++)
			{
				if (this.player.position.y + y >= 0)
				{
					for (var x = 0; x < this.blocks[this.player.block].rotations[this.player.rotation][0].length; x++)
					{
						if (this.blocks[this.player.block].rotations[this.player.rotation][y][x] == 1)
							this.context.clearRect(
								(this.player.position.x + x) * this.block + 1,
								(this.player.position.y + y) * this.block + 1,
								this.block - 1,
								this.block - 1
							);
					}
				}
			}
		},
		cls: function()
		{
			this.context.lineWidth = 2;
			this.context.strokeStyle = "rgb(192, 192, 192)";
			this.context.beginPath();
			for (var x = 0; x <= this.width; x++)
			{
				this.context.moveTo(x * this.block + 1, 1);
				this.context.lineTo(x * this.block + 1, this.height * this.block + 1);
			}
			for (var y = 0; y <= this.height; y++)
			{
				this.board.push([]);
				this.context.moveTo(1, y * this.block + 1);
				this.context.lineTo(this.width * this.block + 1, y * this.block + 1);
			}
			this.context.stroke();
			this.context.closePath();
			for (x = 0; x < this.width; x++)
			{
				for (y = 0; y < this.height; y++)
				{
					this.board[y].push(0);
					this.context.clearRect(x * this.block + 1, y * this.block + 1, this.block - 1, this.block - 1);
				}
			}
			this.player.next.canvas.setAttribute("height", 4 * this.block / 2 + 1);
			this.player.next.canvas.setAttribute("width", 4 * this.block / 2 + 1);
			this.player.next.context = this.player.next.canvas.getContext("2d");
			this.player.next.context.lineWidth = 2;
			this.player.next.context.strokeStyle = "rgb(192, 192, 192)";
			this.player.next.context.beginPath();
			for (x = 0; x <= 4; x++)
			{
				this.player.next.context.moveTo(x * this.block / 2 + 1, 1);
				this.player.next.context.lineTo(x * this.block / 2 + 1, 4 * this.block / 2 + 1);
			}
			for (y = 0; y <= 4; y++)
			{
				this.player.next.context.moveTo(1, y * this.block / 2 + 1);
				this.player.next.context.lineTo(4 * this.block / 2 + 1, y * this.block / 2 + 1);
			}
			this.player.next.context.stroke();
			this.player.next.context.closePath();
			for (x = 0; x < 4; x++)
			{
				for (y = 0; y < 4; y++)
					this.player.next.context.clearRect(x * this.block / 2 + 1, y * this.block / 2 + 1, this.block / 2 - 1, this.block / 2 - 1);
			}
		},
		context: null,
		cookies: {
			read: function(name)
			{
				var cookies = document.cookie.split(";");
				name = name + "=";
				for (x = 0; x < cookies.length; x++)
				{
					var c = cookies[x].match(/^\s*(.*)$/)[1];
					if (c.indexOf(name) == 0)
						return c.substring(name.length, c.length);
				}
				return 0;
			},
			set: function(name, value, expires)
			{
				if (typeof(expires) == "undefined")
					expires = 31536000000;
				var d = new Date();
				d.setTime(d.getTime() + expires);
				document.cookie = name + "=" + value + "; expires=" + d.toGMTString() + "; path=/";
			}
		},
		create: function()
		{
			if (!this.pause)
			{
				this.player.block = this.player.next.block;
				this.player.rotation = this.player.next.rotation;
				this.next();
				this.player.position = {
					x: Math.round((this.width - this.blocks[this.player.block].rotations[this.player.rotation][0].length) / 2),
					y: -1 * this.blocks[this.player.block].rotations[this.player.rotation].length
				};
			}
		},
		display: function(text, single)
		{
			this.context.fillStyle = "#ffffff";
			this.context.font = "bold 30px sans-serif";
			this.context.shadowBlur = 5;
			this.context.shadowColor = "rgba(0, 0, 0, 0.25)";
			this.context.shadowOffsetX = 3;
			this.context.shadowOffsetY = 3;
			this.context.strokeStyle = "#000000";
			this.context.textAlign = "center";
			this.context.textBaseline = "middle";
			var x = this.width * this.block / 2,
				y = this.height * this.block / 2;
			this.context.fillText(text, x, y - 100);
			this.context.strokeText(text, x, y - 100);
			if (typeof(single) == "undefined")
			{
				this.context.fillText(text, x, y + 100);
				this.context.strokeText(text, x, y + 100);
			}
			this.context.shadowBlur = 0;
			this.context.shadowOffsetX = 0;
			this.context.shadowOffsetY = 0;
		},
		down: false,
		draw: function()
		{
			if (!this.pause)
			{
				this.context.fillStyle = this.blocks[this.player.block].color;
				for (var y = 0; y < this.blocks[this.player.block].rotations[this.player.rotation].length; y++)
				{
					if (this.player.position.y + y >= 0)
					{
						for (var x = 0; x < this.blocks[this.player.block].rotations[this.player.rotation][0].length; x++)
						{
							if (this.blocks[this.player.block].rotations[this.player.rotation][y][x] == 1)
								this.context.fillRect(
									(this.player.position.x + x) * this.block + 1,
									(this.player.position.y + y) * this.block + 1,
									this.block - 1, this.block - 1
								);
						}
					}
				}
			}
		},
		erase: function(rows)
		{
			if (!this.pause)
			{
				this.pause = true;
				this.lines += rows.length;
				this.score([10, 50, 250, 1250][rows.length - 1]);
				var steps = 5;
				for (var y = rows.length - 1; y >= 0; y--)
				{
					for (var x = 0; x < this.width; x++)
					{
						for (var c = 0; c <= steps; c++)
						{
							setTimeout(
								"tetris.context.fillStyle = \"rgb(255, " + Math.floor(c * 255 / steps) + ", " + Math.floor(c * 255 / steps) + ")\"; " +
								"tetris.context.fillRect(" +
									(x * this.block + 1) + ", " +
									(rows[y] * this.block + 1) + ", " +
									(this.block - 1) + ", " +
									(this.block - 1) +
								");",
								20 * c + 50 * x
							);
						}
					}
					setTimeout(
						"var img = tetris.context.getImageData(0, 0, " + (this.width * this.block) + ", " + (this.block * rows[y]) + "); " +
						"tetris.context.putImageData(img, 0, " + this.block + "); " +
						"for (var x = 0; x < " + this.width + "; x++) " +
						"{ " +
							"tetris.context.clearRect(" +
								"x * " + this.block + " + 1, " +
								"1, " +
								(this.block - 1) + ", " +
								(this.block - 1) +
							"); " +
						"} " +
						"for (var y = " + rows[y] + "; y >= 0; y--) " +
						"{ " +
							"for (x = 0; x < " + this.width + "; x++)" +
							"{" +
								"tetris.board[y][x] = (y == 0 ? 0 : tetris.board[y - 1][x]);" +
							"}" +
						"}" +
						(
							y == 0 ?
							" tetris.pause = false; tetris.create(); tetris.fall();" :
							""
						),
						Math.round((20 * steps + 50 * this.width) * (1 + (rows.length - y) / 2))
					);
				}
			}
		},
		pause: false,
		fall: function(instant)
		{
			if (typeof(instant) == "undefined")
				instant = false;
			if (!tetris.pause)
			{
				if (tetris.isClear(0, 1))
				{
					tetris.clear();
					tetris.player.position.y++;
					tetris.draw();
				}
				else
				{
					instant = false;
					if (tetris.player.position.y < 0)
					{
						tetris.pause = true;
						document.onkeydown = function(){return false;};
						var highScore = tetris.cookies.read("highscore"),
							score = parseInt(tetris.scoreElement.firstChild.nodeValue, 10);
						if (score > highScore)
						{
							tetris.cookies.set("highscore", score);
							tetris.highScoreElement.removeChild(tetris.highScoreElement.firstChild);
							tetris.highScoreElement.appendChild(document.createTextNode(score.toString()));
						}
						tetris.display(score > highScore ? "High Score" : "Game Over");
						setTimeout("document.onkeydown = tetris.start;", 1000);
						return false;
					}
					for (var x = 0; x < tetris.blocks[tetris.player.block].rotations[tetris.player.rotation][0].length; x++)
					{
						for (var y = 0; y < tetris.blocks[tetris.player.block].rotations[tetris.player.rotation].length; y++)
						{
							if (tetris.blocks[tetris.player.block].rotations[tetris.player.rotation][y][x] == 1)
								tetris.board[tetris.player.position.y + y][tetris.player.position.x + x] = 1;
						}
					}
					var rows = [];
					for (y = tetris.height - 1; y >= 0; y--)
					{
						var row = 0;
						for (x = 0; x < tetris.width; x++)
						{
							if (tetris.board[y][x] == 1)
								row++;
							else
								break;
						}

						// The row is full!
						if (row == tetris.width)
							rows.push(y);
					}
					if (rows.length > 0)
					{
						tetris.erase(rows);
						return false;
					}
					tetris.create();
				}
			}
			if (instant)
				tetris.fall(true);
			else
				tetris.timeouts.fall = setTimeout(tetris.fall, Math.round(Math.max(20, tetris.speed - tetris.lines * 10) / (tetris.down ? 4 : 1)));
		},
		fallX: function()
		{
			if (!tetris.pause)
			{
				if (tetris.timeouts.fall !== null)
					clearTimeout(tetris.timeouts.fall);
				tetris.fall(true);
			}
		},
		first: true,
		height: 20,
		isClear: function(x, y)
		{

			// If this will place the piece off the screen, it is not clear.
			if (
				this.player.position.x + x < 0 ||
				this.player.position.x + this.blocks[this.player.block].rotations[this.player.rotation][0].length + x > this.width ||
				this.player.position.y + this.blocks[this.player.block].rotations[this.player.rotation].length + y > this.height
			)
				return false;
			for (var a = 0; a < this.blocks[this.player.block].rotations[this.player.rotation][0].length; a++)
			{
				for (var b = 0; b < this.blocks[this.player.block].rotations[this.player.rotation].length; b++)
				{
					if (
						this.player.position.y + b + y >= 0 &&
						this.blocks[this.player.block].rotations[this.player.rotation][b][a] == 1 &&
						this.board[this.player.position.y + b + y][this.player.position.x + a + x] == 1
					)
						return false;
				}
			}
			return true;
		},
		keyDown: function()
		{
			location.href = "#tetris";
			if (
				typeof(event) == "object" &&
				tetris.player.block !== null
			)
			{
				if (
					event.keyCode == 13 ||		// Enter	A
					event.keyCode == 32 ||		// spacebar
					event.keyCode == 65 		// A
				)
					tetris.rotate(1);

				else if (
					event.keyCode == 37 ||		// left
					event.keyCode == 39			// right
				)
					tetris.move(event.keyCode - 38);
				else if (event.keyCode == 38)	// up
					tetris.fallX();
				else if (event.keyCode == 40)	// down
					tetris.down = true;
				else if (event.keyCode == 80)	// p
					tetris.pause = !tetris.pause;
			}
		},
		keyUp: function()
		{
			if (
				typeof(event) == "object" &&
				event.keyCode == 40
			)
				tetris.down = false;
		},
		lines: 0,
		move: function(direction)
		{
			if (!this.pause)
			{
				if (this.isClear(direction, 0))
				{
					this.clear();
					this.player.position.x += direction;
					this.draw();
				}
			}
		},
		next: function()
		{
			if (this.player.next.block !== null)
			{
				for (var y = 0; y < this.blocks[this.player.next.block].rotations[this.player.next.rotation].length; y++)
				{
					for (var x = 0; x < this.blocks[this.player.next.block].rotations[this.player.next.rotation][0].length; x++)
					{
						if (this.blocks[this.player.next.block].rotations[this.player.next.rotation][y][x] == 1)
							this.player.next.context.clearRect(
								x * this.block / 2 + 1,
								y * this.block / 2 + 1,
								this.block / 2 - 1,
								this.block / 2 - 1
							);
					}
				}
			}
			this.player.next.block = this.random(this.blocks.length - 1);
			this.player.next.rotation = this.random(this.blocks[this.player.next.block].rotations.length - 1);
			this.player.next.context.fillStyle = this.blocks[this.player.next.block].color;
			for (var y = 0; y < this.blocks[this.player.next.block].rotations[this.player.next.rotation].length; y++)
			{
				for (var x = 0; x < this.blocks[this.player.next.block].rotations[this.player.next.rotation][0].length; x++)
				{
					if (this.blocks[this.player.next.block].rotations[this.player.next.rotation][y][x] == 1)
						this.player.next.context.fillRect(
							x * this.block / 2 + 1,
							y * this.block / 2 + 1,
							this.block / 2 - 1,
							this.block / 2 - 1
						);
				}
			}
		},
		player: {
			block: null,
			next: {
				block: null,
				canvas: null,
				context: null,
				rotation: null
			},
			position: {
				x: null,
				y: null
			},
			rotation: null
		},
		random: function(from, to)
		{
			if (typeof(to) != "number")
			{
				to = from;
				from = 0;
			}
			to++;
			return Math.floor(Math.random() * (to - from)) + from;
		},
		rotate: function(direction)
		{
			if (!this.pause)
			{
				var block = this.blocks[this.player.block].rotations,
					temp = this.player.rotation;
				this.clear();
				this.player.rotation += direction;
				while (this.player.rotation < 0)
					this.player.rotation += block.length;
				while (this.player.rotation >= block.length)
					this.player.rotation -= block.length;
				if (!this.isClear(0, 0))
					this.player.rotation = temp;
				this.draw();
			}
		},
		score: function(x)
		{
			var score = parseInt(this.scoreElement.firstChild.nodeValue, 10) + x;
			this.scoreElement.removeChild(this.scoreElement.firstChild);
			this.scoreElement.appendChild(document.createTextNode(score));
		},
		scoreElement: null,
		speed: 400,
		start: function()
		{
			tetris.canvas = document.getElementById("tetris-canvas");
			if (typeof(tetris.canvas.getContext) == "function")
			{
				tetris.board = [];
				tetris.pause = false;
				tetris.highScoreElement = document.getElementById("high-score");
				tetris.highScoreElement.removeChild(tetris.highScoreElement.firstChild);
				tetris.highScoreElement.appendChild(document.createTextNode(tetris.cookies.read("highscore")));
				tetris.player.next.canvas = document.getElementById("tetris-next-canvas");
				tetris.scoreElement = document.getElementById("score");
				tetris.scoreElement.removeChild(tetris.scoreElement.firstChild);
				tetris.scoreElement.appendChild(document.createTextNode("0"));
				tetris.canvas.setAttribute("height", tetris.height * tetris.block + 1);
				tetris.canvas.setAttribute("width", tetris.width * tetris.block + 1);
				tetris.context = tetris.canvas.getContext("2d");
				tetris.cls();
				if (tetris.first)
				{
					var y = 231;
					tetris.first = false;
					tetris.display("Insert Coin", true);
					tetris.context.fillStyle = "#000000";
					tetris.context.font = "bold 12px sans-serif";
					tetris.context.textAlign = "left";
					tetris.context.fillText("Controls:", 28, y + 11);
					tetris.context.font = "normal 12px monospace";
					tetris.context.lineWidth = 7;
					tetris.context.strokeStyle = "#ffffff";
					tetris.context.strokeText("A:           rotate",	33, y + 32);
					tetris.context.strokeText("down:        speed up",	33, y + 53);
					tetris.context.strokeText("left/right:  move",		33, y + 74);
					tetris.context.strokeText("up:          drop",		33, y + 95);
					tetris.context.fillText("A:           rotate",		33, y + 32);
					tetris.context.fillText("down:        speed up",	33, y + 53);
					tetris.context.fillText("left/right:  move",		33, y + 74);
					tetris.context.fillText("up:          drop",		33, y + 95);
					tetris.context.textAlign = "center";
					tetris.context.strokeText("PRESS ANY KEY TO START", tetris.width * tetris.block / 2, y + 137);
					tetris.context.fillText("PRESS ANY KEY TO START", tetris.width * tetris.block / 2, y + 137);
					location.href = "#tetris";
					document.onkeydown = tetris.start2;
				}
				else
					tetris.start2();
			}
		},
		start2: function()
		{
			location.href = "#tetris";
			tetris.cls();
			tetris.next();
			tetris.create();
			tetris.fall();
			document.onkeydown = tetris.keyDown;
			document.onkeyup = tetris.keyUp;
		},
		timeouts: {
			fall: null
		},
		width: 10
	};
