window.onload = function() {
	var hei = window.innerHeight,wid = window.innerWidth,login=0;
	$('#start').css({'width':wid,'height':hei});
	$('canvas').css({'width':wid,'height':hei});
	
	var twinkle = setInterval(function(){ 
		$("#start p").fadeOut(500).fadeIn(500);
		if(login==1){
			clearInterval(twinkle);
		}
	},1000);
	$('#start').click(function(){
		$('#start').css('display','none');
		login=1;
	    // 开始游戏
	    cc.game.run("gameCanvas");
	});
	
	cc.game.onStart = function() {
		cc.LoaderScene.preload(["img/bg.png"], function() {
			//新建场景1
			var MyScene1 = cc.Scene.extend({
				onEnter: function() {
					//加载音效
					cc.audioEngine.playMusic('audio/login.wav',true);
	                setTimeout(function(){
	                	cc.audioEngine.stopMusic();
	                },3000)
//*************************************************************************************************************
					this._super();//指向父类中的成员
					var size = cc.director.getWinSize();
					var background = cc.Sprite.create("img/bg.png");
					background.setPosition(size.width / 2, size.height / 2);
					background.setScale(0.8);//四舍五入
					this.addChild(background, 0);
					
					
					var sprite= cc.Sprite.create("img/sprite.png");
					//精灵缩小一半
					sprite.setScale(0.5);
					sprite.attr({
						x:size.width / 2,
						y:size.height,
						anchorX:0.5,//锚点
						anchorY:0.5,
					})
					this.addChild(sprite, 0);
					var moveto = new cc.MoveTo(0.5, cc.p(size.width / 2, size.height / 2));
					sprite.runAction(moveto);
					setTimeout(function(){
						var moveby = new cc.MoveBy(0.1, cc.p(0, 20));
						sprite.runAction(moveby);
					},500)
					setTimeout(function(){
						var moveby = new cc.MoveBy(0.1, cc.p(0, -20));
						sprite.runAction(moveby);
					},600)
//*************************************************************************************************************					
					var box= cc.Sprite.create("img/sprite.png");








					//定位
					//sprite.setPosition(size.width / 2, size.height / 2);
					//文字精灵
					//var label = cc.LabelTTF.create("Hello World!", "Arial", 40);
					//label.setPosition(size.width / 2, size.height * 4/5);
					//this.addChild(label, 1);
					//闪烁
					//var blink = new cc.Blink(100, 100);
					//startButton.runAction(blink);
					//停止闪烁
					//setTimeout(function(){
					//	blink.stop();//3秒后停止闪烁
					//}, 3000);
					//抛物线旋转
					//var bezier = [cc.p(200, 200), cc.p(400, 500), cc.p(600, 200)];
					//var bezierto = new cc.BezierTo(2, bezier);
					//var rotateby = new cc.RotateBy(1, 360).repeatForever();
					//sprite.runAction(rotateby);
					//sprite.runAction(cc.spawn(bezierto, rotateby));

				 	var listener1 = cc.EventListener.create({
				        event: cc.EventListener.TOUCH_ONE_BY_ONE,
				        swallowTouches: true,// 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
				        
				        onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件处理回调函数
				            var target = event.getCurrentTarget();  // 获取事件所绑定的 target, 通常是cc.Node及其子类
				            // 获取当前触摸点相对于按钮所在的坐标
				            var locationInNode = target.convertToNodeSpace(touch.getLocation());    
				            var s = target.getContentSize();
				            var rect = cc.rect(0, 0, s.width, s.height);
				
				            if (cc.rectContainsPoint(rect, locationInNode)) {       // 判断触摸点是否在按钮范围内
				                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
				                target.opacity = 180;
				                return true;
				                console.log(event)
				            }
				            return false;
				        },
				        onTouchEnded: function (touch, event) {         // 实现onTouchEnded事件处理回调函数
				            var target = event.getCurrentTarget();
				            cc.log("sprite onTouchesEnded.. ");
				            
				            target.setOpacity(255);
				            if (target == sprite) {
				            	var action = cc.sequence(
						            cc.moveBy(1.5, cc.p(240, 0)),
						            cc.rotateBy(1.5,360,360),
						            cc.moveBy(1.5,cc.p(-240, 0))
						        );
						    	sprite.runAction(action);
				            	
				                //sprite.setLocalZOrder(100);            // 重新设置 ZOrder，显示的前后顺序将会改变
//				                cc.audioEngine.playMusic('audio/login.wav',true);
//				                setTimeout(function(){
//				                	cc.audioEngine.stopMusic();
////				                	cc.audioEngine.playMusic('audio/bg.wav',true);
//				                },3000)
				                
				                
				            } 
				        }
				    });
				    cc.eventManager.addListener(listener1, background);
			},
			
			});
			
			cc.director.setDisplayStats(false);//不显示左下帧数
			cc.director.runScene(new MyScene1());
		}, this);
	};
	
	
};