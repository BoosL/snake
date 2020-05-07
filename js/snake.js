var data = {
	x: 5,
	y: 5,
	size: 10,
	timeout: 120,
};
var score = 0;
init();


// 初始化画布
function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d")
	snake = new Snake(data.x, data.y)
	food = new Food()
	getKey()
	draw();
	document.getElementById('start').onclick = function() {
		snake.stop();
		snake.move()
	}

	document.getElementById('stop').onclick = function() {
		snake.stop();
	}

	document.getElementById('restart').onclick = function() {
		snake.stop();
		snake = new Sanke(data.x, data.y);
		food = new Food();
		score = 0;
		snake.move();
	}
}


// 通过按钮操作🐍移动
function getKey() {
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		console.log(e.keyCode, '11')
		if (e && e.keyCode == 38) { //下
			if (snake.direction !== 'top')
				snake.direction = 'bottom'
		}
		if (e && e.keyCode == 37) { //左
			if (snake.direction !== 'right')
				snake.direction = 'left'
		}

		if (e && e.keyCode == 39) { //右
			if (snake.direction !== 'left')
				snake.direction = 'right'
		}

		if (e && e.keyCode == 40) { //上
			if (snake.direction !== 'bottom')
				snake.direction = 'top'
		}
	}
}


// 绘图
function draw() {
	ctx.fillStyle = 'blanchedalmond';
	ctx.fillRect(0, 0, 500, 300);
	// 绘制蛇于画布上
	for (var i = 0; i < snake.body.length; i++) {
		ctx.save();
		ctx.translate(snake.body[i][0] * data.size, snake.body[i][1] * data.size);
		if (i === 0) {
			ctx.fillStyle = 'blue';
		} else {
			ctx.fillStyle = 'green'
		}

		ctx.fillRect(0, 0, data.size, data.size);
		ctx.restore();
	}

	// 绘制食物与画布上
	ctx.save();
	ctx.translate(food.x * data.size, food.y * data.size);
	ctx.fillStyle = 'OrangeRed';
	ctx.fillRect(0, 0, data.size, data.size);
	ctx.restore();
	requestAnimationFrame(draw);
}


// 创建一条蛇
function Snake(x, y) {
	this.moving = true;
	this.body = [
		[x, y]
	]; // 蛇的身体
	this.direction = 'right'; //初始方向
	this.time = null; //定时器
	// 让🐍动起来
	this.move = function() {
		var that = this;
		this.time = setInterval(function() {
			var last = [].concat(that.body[that.body.length - 1]);
			for (var i = that.body.length - 1; i >= 1; i--) {
				that.body[i][0] = that.body[i - 1][0];
				that.body[i][1] = that.body[i - 1][1];
			};
			switch (that.direction) {
				case 'right':
					that.body[0][0] += 1
					break
				case 'bottom':
					that.body[0][1] -= 1
					break
				case 'left':
					that.body[0][0] -= 1
					break
				case 'top':
					that.body[0][1] += 1
					break
			};
			// 检查是否遇到食物
			if (that.body[0][0] === food.x && that.body[0][1] === food.y) {
				that.eat(last);
			}

			// 检查是否遇到自己身体
			var index = that.body.findIndex(function(e, i) {
				return i !== 0 && (that.body[0][0] === e[0] && that.body[0][1] === e[1])
			});
			if (index !== -1 || (that.body[0][0] === last[0] && that.body[0][1] === last[1])) {
				alert('游戏结束');
				that.stop();
			}
			// 检查是否撞墙
			if (that.body[0][0] < 0 || that.body[0][0] > 49 || that.body[0][1] < 0 || that.body[0][1] > 29) {
				alert('游戏结束');
				that.stop();
			}
		}, data.timeout);
	};

	// eat
	this.eat = function(last) {
		this.body.push(last);
		score += 1;
		food = new Food();
		document.getElementsByClassName('score')[0].innerHTML = score;
	}

	this.stop = function() {
		clearInterval(this.time);
	};
};




// 创建食物
function Food() {
	this.x = Math.floor(Math.random() * 50);
	this.y = Math.floor(Math.random() * 30);
}
