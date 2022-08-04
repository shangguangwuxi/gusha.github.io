/*
    game.js: 实现游戏逻辑
*/

function game() {
    // 棋盘的横坐标轴
    const xAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];

    // 棋盘的纵坐标轴
    const yAxis = [1, 2, 3, 4, 5, 6, 7, 8];

    var action = [];

    // 获取网格的ID
    function getPosition(grid) {
        var gridId = $(grid).attr("id");
        var x = gridId[0];
        var y = parseInt(gridId[1]);

        return [x, y];
    }

    // 将军
    function checkmate(piece) {
        var attackableGrids = attackableScope(piece);
        for (var gridId of attackableGrids) {
            var grid = $("#"+gridId);
            if ($(grid.children()[0]).hasClass("baoxiang")) {
                color([gridId], "checkmate");
            }
        }
    }

    // 结束游戏
    function finish() {
        if (document.getElementById("black-baoxiang") == undefined) {
			
            alert("白方胜利");
            return;
        }

        if (document.getElementById("white-baoxiang") == undefined) {
            alert("黑方胜利");
            return;
        }
    }

    // 着色
    function color(grids, className) {
        for (var grid of grids) {
            $("#"+grid).toggleClass(className);
        }
    }

    // 行动前褪色
    function clearBaforeMove() {
        $(".grid").removeClass("active");
        $(".grid.movable-scope").removeClass("movable-scope");
        $(".grid.attackable-scope").removeClass("attackable-scope");
        $(".grid.checkmate").removeClass("checkmate");
    }

    // 行动后褪色
    function clearAfterMove() {
        $(".grid.active").removeClass("active");
        $(".grid.movable-scope").removeClass("movable-scope");
        $(".grid.attackable-scope").removeClass("attackable-scope");
    }

    // 清除行动记录
    function clearAction() {
        while (action.length > 0) {
            action.pop();
        }
    }

    $(".grid").click(function () {
        clearBaforeMove();
		
        var $grid = $(this);
        $grid.toggleClass("active");
        if (action.length == 0) {
            if ($grid.children(".chess").length == 1) {
                var $piece1 = $($grid.children(".chess")[0]);
                
                var movableGrids = movableScope($piece1);
                color(movableGrids, "movable-scope");

                var attackableGrids = attackableScope($piece1);
                color(attackableGrids, "attackable-scope");

                action.push($piece1.attr("color"));
                action.push($piece1.attr("type"));
                action.push($grid.attr("id"));
            }
            return;
        }

        if (action.length == 3) {
            var $fromGrid = $("#"+action[2]);
            var $piece1 = $($fromGrid.children(".chess")[0]);
            var $s = $($fromGrid.children(".chess")[0]);
            var movableGrids = movableScope($piece1);//$piece1容器
            var attackableGrids = attackableScope($piece1);
			if(document.getElementById("black-yandund")!=undefined){
				
				console.log("sss");
			}
			
            var shes=she($s);
			// $piece3=
			 // alert($(".chess.white.yandund"));
            // 目标格子
            var gridId = $grid.attr("id");

            if (gridId != action[2] && (movableGrids.indexOf(gridId) != -1 || attackableGrids.indexOf(gridId) != -1)) {
                // 目标格子处在棋子的可移动范围或者可攻击范围内

                var $fromGrid = $("#"+action[2]);
                var $toGrid = $grid;
					
                // 根据目标格子上有没有敌方的棋子, 选择攻击或者移动
                if ($toGrid.children(".chess").length > 0) {
                    // 目标格子有其他棋子
					 
                    // 目标格子上的棋子
                    var $piece2 = $($toGrid.children(".chess")[0]);
					
                    if ($piece1.attr("color") != $piece2.attr("color")) {
                        // 目标格子上的棋子是敌方的棋子
					
					if(shes=="sheshou"||shes=="leijian"||shes=="huojian"||shes=="bingjian"||shes=="baodan"||shes=="leibao"){
						if($piece2.hasClass("yandun")){
							console.log(gridId)	;
								if(gridId=="E5"||gridId=="E4"||gridId=="D4"||gridId=="D5"){
									if(shes=="bingjian"){
										$fromGrid.remove($piece1);
										$toGrid.empty();
											if($piece2.attr("color")=="white"){
												$toGrid.append($piecewy);
												$wy=$piece2;
												$wtg=$toGrid;
												wtime=0;
											}else{
												$toGrid.append($pieceby);
												$by=$piece2;
												$btg=$toGrid;
												btime=0;
												}
								 
								 
									}else{
										$fromGrid.remove($piece1);							
										$toGrid.empty();
										}	
								}else{
							
									if(shes=="leijian"||shes=="huojian"||shes=="bingjian"){
										alert("岩盾丘丘人抵挡了你的攻击！");
								 
										}else{
											$fromGrid.remove($piece1);
											$toGrid.empty();
											}	
									}
						
						
						}else{
							if($piece2.hasClass("mudun")){
								if(gridId=="E5"||gridId=="E4"||gridId=="D4"||gridId=="D5"){
									if(shes=="bingjian"){
										$fromGrid.remove($piece1);
										$toGrid.empty();
											if($piece2.attr("color")=="white"){
												$toGrid.append($piecewm);
												$wm=$piece2;
												$wtgm=$toGrid;
												wmtime=0;
											}else{
												$toGrid.append($piecebm);
												$bm=$piece2;
												$btgm=$toGrid;
												bmtime=0;
												}
									}else{
										if(shes=="huojian"){
											alert("无法点燃木盾！");
										}else{
														
											$fromGrid.remove($piece1);
											$toGrid.empty();
											}
										}
										 }else{
											if(shes=="leijian"||shes=="bingjian"){
												alert("木盾丘丘人抵挡了你的攻击！");
											}else{
												$fromGrid.remove($piece1);
												$toGrid.empty();
												}
											}
										
						
							}else{
								if($piece2.hasClass("bingdun")){
											
									if(gridId=="E5"||gridId=="E4"||gridId=="D4"||gridId=="D5"){
										if(shes=="bingjian"){
											$fromGrid.remove($piece1);
											$toGrid.empty();
												if($piece2.attr("color")=="white"){
													$toGrid.append($piecewb);
													$wb=$piece2;
													$wtgb=$toGrid;
													wbtime=0;
												}else{
													$toGrid.append($piecebb);
													$bb=$piece2;
													$btgb=$toGrid;
													bbtime=0;
												}
										}else{
														
											$fromGrid.remove($piece1);
											$toGrid.empty();
													
											}
									}else{
												
										if(shes=="leijian"||shes=="bingjian"){
											alert("冰盾丘丘人抵挡了你的攻击！");
										}
										else{
											$fromGrid.remove($piece1);
											$toGrid.empty();
											}
										}
											
								
								}else{
									if($piece2.hasClass("yandund")){
										if(shes=="bingjian"){
											
											if($piece2.attr("color")=="white"){
												$toGrid.append($piecewy);
												wtime=0;
											}else{
												$toGrid.append($pieceby);
												btime=0;
												}
										
										}else{
											$fromGrid.remove($piece1);
											$toGrid.empty();
											wtime=5;
											btime=5;
											}
						
						
									}else{
											
										if($piece2.hasClass("mudund")){
											if(shes=="bingjian"){
											
											    if($piece2.attr("color")=="white"){
													$toGrid.append($piecewm);
													wmtime=0;
												}else{
													$toGrid.append($piecebm);
													bmtime=0;
												}
										
											}else{
												$fromGrid.remove($piece1);
												$toGrid.empty();
												wmtime=5;
												bmtime=5; 
											}
												
										}else{
											if($piece2.hasClass("bingdund")){
												if(shes=="bingjian"){
											
													if($piece2.attr("color")=="white"){
														$toGrid.append($piecewb);
														wbtime=0;
													}else{
														$toGrid.append($piecebb);
														bbtime=0;
													}
										
												}else{
													$fromGrid.remove($piece1);
													$toGrid.empty();
													wbtime=5;
													bbtime=5; 
												}		
											}else{
												$fromGrid.remove($piece1);
												$toGrid.empty();
												
											}
											}
											
										}
								}
							}
						}
	
					}else{
						$fromGrid.remove($piece1);
                        $toGrid.empty();
                        $toGrid.append($piece1);
					}
                        // 攻击	
                    }

                } else {
                    // 目标格子有其他棋子

                    // 移动
                    $fromGrid.remove($piece1);
                    $toGrid.append($piece1);
                }

                // 检查棋子类型是不是离开了初始位置的士兵
                if ($piece1.hasClass("initial")) {
                    $piece1.removeClass("initial");
                }


                /*棋子移动或者攻击完成后, 检查国王是否存在, 是否被将军*/
                checkmate($piece1);
				
				if(btime==4){
					// alert($tg+$y);		
					$btg.empty();
					$btg.append($by);
				}
				if(wtime==4){
					// alert($tg+$y);		
					$wtg.empty();
					$wtg.append($wy);
				}
				if(bmtime==4){
					// alert($tg+$y);		
					$btgm.empty();
					$btgm.append($bm);
				}
				if(wmtime==4){
					// alert($tg+$y);		
					$wtgm.empty();
					$wtgm.append($wm);
				}
				if(bbtime==4){
					// alert($tg+$y);		
					$btgb.empty();
					$btgb.append($bb);
				}
				if(wbtime==4){
					// alert($tg+$y);		
					$wtgb.empty();
					$wtgb.append($wb);
				}
				wtime=wtime+1;
				btime=btime+1;
				wmtime=wmtime+1;
				bmtime=bmtime+1;
				wbtime=wbtime+1;
				bbtime=bbtime+1;
				console.log(wbtime+"sss"+bbtime);
				// alert(time);
                finish();
            } else {
                // 目标格子不处在棋子的可移动范围或者可攻击范围内

                // 清除行动记录
                clearAction();
                return;
            }

            action.push(gridId);
            return;
        }

        if (action.length == 4) {
            if ($grid.children(".chess").length == 1) {
                var $piece1 = $($grid.children(".chess")[0]);

                if ($piece1.attr("color") != action[0]) {
                    var movableGrids = movableScope($piece1);
                    color(movableGrids, "movable-scope");

                    var attackableGrids = attackableScope($piece1);
                    color(attackableGrids, "attackable-scope");

                    clearAction();
                    action.push($piece1.attr("color"));
                    action.push($piece1.attr("type"));
                    action.push($grid.attr("id"));
                }                
            }
            return;
        }
    });

    function movableScope(piece) {
        var scope = [];
        var position = getPosition(piece.parent());	
		if (piece.hasClass("chongfeng")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
				
                tempGrid = direction(centerGrid);
					for(i=1;i<=3;i++){
                    if (tempGrid != undefined) {
                    if (tempGrid.children().length == 0) {
                        scope.push(tempGrid.attr("id"));
                        tempGrid = direction(tempGrid);//跑多格
						// alert(hasClass("sheshou"));
                    } else {
                        break;
                    }
                }
                    }
          
            }

            return scope;
        }
		if (piece.hasClass("leijian")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
				
                tempGrid = direction(centerGrid);
					for(i=1;i<=1;i++){
                    if (tempGrid != undefined) {
                    if (tempGrid.children().length == 0) {
                        scope.push(tempGrid.attr("id"));
                        tempGrid = direction(tempGrid);//跑多格
						// alert(hasClass("sheshou"));
                    } else {
                        break;
                    }
                }
                    }
          
            }

            return scope;
        }
		if (piece.hasClass("huojian")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
				
                tempGrid = direction(centerGrid);
					for(i=1;i<=1;i++){
                    if (tempGrid != undefined) {
                    if (tempGrid.children().length == 0) {
                        scope.push(tempGrid.attr("id"));
                        tempGrid = direction(tempGrid);//跑多格
						// alert(hasClass("sheshou"));
                    } else {
                        break;
                    }
                }
                    }
          
            }

            return scope;
        }
	if (piece.hasClass("bingjian")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
				
                tempGrid = direction(centerGrid);
					for(i=1;i<=1;i++){
                    if (tempGrid != undefined) {
                    if (tempGrid.children().length == 0) {
                        scope.push(tempGrid.attr("id"));
                        tempGrid = direction(tempGrid);//跑多格
						// alert(hasClass("sheshou"));
                    } else {
                        break;
                    }
                }
                    }
          
            }

            return scope;
        }
			if (piece.hasClass("mudun")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
				
                tempGrid = direction(centerGrid);
					for(i=1;i<=1;i++){
                    if (tempGrid != undefined) {
                    if (tempGrid.children().length == 0) {
                        scope.push(tempGrid.attr("id"));
                        tempGrid = direction(tempGrid);//跑多格
						// alert(hasClass("sheshou"));
                    } else {
                        break;
                    }
                }
                    }
          
            }

            return scope;
        }
			if (piece.hasClass("bingdun")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
				
                tempGrid = direction(centerGrid);
					for(i=1;i<=1;i++){
                    if (tempGrid != undefined) {
                    if (tempGrid.children().length == 0) {
                        scope.push(tempGrid.attr("id"));
                        tempGrid = direction(tempGrid);//跑多格
						// alert(hasClass("sheshou"));
                    } else {
                        break;
                    }
                }
                    }
          
            }

            return scope;
        }
			if (piece.hasClass("yandun")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
				
                tempGrid = direction(centerGrid);
					for(i=1;i<=1;i++){
                    if (tempGrid != undefined) {
                    if (tempGrid.children().length == 0) {
                        scope.push(tempGrid.attr("id"));
                        tempGrid = direction(tempGrid);//跑多格
						// alert(hasClass("sheshou"));
                    } else {
                        break;
                    }
                }
                    }
          
            }

            return scope;
        }
			if (piece.hasClass("baodan")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
				
                tempGrid = direction(centerGrid);
					for(i=1;i<=1;i++){
                    if (tempGrid != undefined) {
                    if (tempGrid.children().length == 0) {
                        scope.push(tempGrid.attr("id"));
                        tempGrid = direction(tempGrid);//跑多格
						// alert(hasClass("sheshou"));
                    } else {
                        break;
                    }
                }
                    }
          
            }

            return scope;
        }
				if (piece.hasClass("leidan")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
				
                tempGrid = direction(centerGrid);
					for(i=1;i<=1;i++){
                    if (tempGrid != undefined) {
                    if (tempGrid.children().length == 0) {
                        scope.push(tempGrid.attr("id"));
                        tempGrid = direction(tempGrid);//跑多格
						// alert(hasClass("sheshou"));
                    } else {
                        break;
                    }
                }
                    }
          
            }

            return scope;
        }
    }

    function attackableScope(piece) {
        var scope = [];

        // 士兵

        // 国王
 

        // 王后


        // 主教
   

        // 骑士


        // 城堡

		      if (piece.hasClass("chongfeng")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
                var tempGrid = direction(centerGrid);    
            for(i=1;i<=3;i++){
	        if (tempGrid != undefined) {
                    if (tempGrid.children().length == 1) {
                        if ($(tempGrid.children()[0]).attr("color") != piece.attr("color")) {
                            scope.push(tempGrid.attr("id")); 
							
                        }
                        break;                   
                    } else {
                        tempGrid = direction(tempGrid);
                    }
                }
			}	
           
            }

            return scope;
        }
		 if (piece.hasClass("leijian")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
                var tempGrid = direction(centerGrid);    
			for(i=1;i<=3;i++){
				if (tempGrid != undefined) {
                    if (tempGrid.children().length == 1) {
                        if ($(tempGrid.children()[0]).attr("color") != piece.attr("color")) {
                            scope.push(tempGrid.attr("id")); 
							
                        }
                        break;                   
                    } else {
                        tempGrid = direction(tempGrid);
                    }
                }
				}	
           
            }

            return scope;
        }
			 if (piece.hasClass("bingjian")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
                var tempGrid = direction(centerGrid);    
			for(i=1;i<=3;i++){
				if (tempGrid != undefined) {
                    if (tempGrid.children().length == 1) {
                        if ($(tempGrid.children()[0]).attr("color") != piece.attr("color")) {
                            scope.push(tempGrid.attr("id")); 
							
                        }
                        break;                   
                    } else {
                        tempGrid = direction(tempGrid);
                    }
                }
				}	
           
            }

            return scope;
        }
			 if (piece.hasClass("huojian")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
                var tempGrid = direction(centerGrid);    
			for(i=1;i<=3;i++){
				if (tempGrid != undefined) {
                    if (tempGrid.children().length == 1) {
                        if ($(tempGrid.children()[0]).attr("color") != piece.attr("color")) {
                            scope.push(tempGrid.attr("id")); 
							
                        }
                        break;                   
                    } else {
                        tempGrid = direction(tempGrid);
                    }
                }
				}	
           
            }

            return scope;
        }
					 if (piece.hasClass("mudun")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
                var tempGrid = direction(centerGrid);    
			for(i=1;i<=1;i++){
				if (tempGrid != undefined) {
                    if (tempGrid.children().length == 1) {
                        if ($(tempGrid.children()[0]).attr("color") != piece.attr("color")) {
                            scope.push(tempGrid.attr("id")); 
							
                        }
                        break;                   
                    } else {
                        tempGrid = direction(tempGrid);
                    }
                }
				}	
           
            }

            return scope;
        }
					 if (piece.hasClass("yandun")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
                var tempGrid = direction(centerGrid);    
			for(i=1;i<=1;i++){
				if (tempGrid != undefined) {
                    if (tempGrid.children().length == 1) {
                        if ($(tempGrid.children()[0]).attr("color") != piece.attr("color")) {
                            scope.push(tempGrid.attr("id")); 
							
                        }
                        break;                   
                    } else {
                        tempGrid = direction(tempGrid);
                    }
                }
				}	
           
            }

            return scope;
        }
					 if (piece.hasClass("bingdun")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
                var tempGrid = direction(centerGrid);    
			for(i=1;i<=1;i++){
				if (tempGrid != undefined) {
                    if (tempGrid.children().length == 1) {
                        if ($(tempGrid.children()[0]).attr("color") != piece.attr("color")) {
                            scope.push(tempGrid.attr("id")); 
							
                        }
                        break;                   
                    } else {
                        tempGrid = direction(tempGrid);
                    }
                }
				}	
           
            }

            return scope;
        }
				 if (piece.hasClass("baodan")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
                var tempGrid = direction(centerGrid);    
			for(i=1;i<=2;i++){
				if (tempGrid != undefined) {
                    if (tempGrid.children().length == 1) {
                        if ($(tempGrid.children()[0]).attr("color") != piece.attr("color")) {
                            scope.push(tempGrid.attr("id")); 
							
                        }
                        break;                   
                    } else {
                        tempGrid = direction(tempGrid);
                    }
                }
				}	
           
            }

            return scope;
        }
				 if (piece.hasClass("leidan")) {
            var centerGrid = piece.parent();
            var tempGrid;
            var directions = [top, right, bottom, left];

            for (var direction of directions) {
                var tempGrid = direction(centerGrid);    
			for(i=1;i<=2;i++){
				if (tempGrid != undefined) {
                    if (tempGrid.children().length == 1) {
                        if ($(tempGrid.children()[0]).attr("color") != piece.attr("color")) {
                            scope.push(tempGrid.attr("id")); 
							
                        }
                        break;                   
                    } else {
                        tempGrid = direction(tempGrid);
                    }
                }
				}	
           
            }

            return scope;
        }
    }

    function isMarginTop(grid) {
        var position = getPosition(grid);
        return position[1] == yAxis[7];
    }

    function isMarginBottom(grid) {
        var position = getPosition(grid);
        return position[1] == yAxis[0];
    }

    function isMarginLeft(grid) {
        var position = getPosition(grid);
        return position[0] == xAxis[0];
    }

    function isMarginRight(grid) {
        var position = getPosition(grid);
        return position[0] == xAxis[7];
    }

    function top(grid) {
        var position = getPosition(grid);
        if (isMarginTop(grid) == true) {
            return undefined;
        } else {
            return $("#"+position[0]+(position[1]+1));
        }
    }
 function topshe(grid) {
        var position = getPosition(grid);
        if (isMarginTop(grid) == true) {
            return undefined;
        } else {
          return $("#"+position[0]+(position[1]+1));
        }
    }
    function bottom(grid) {
        var position = getPosition(grid);
        if (isMarginBottom(grid) == true) {
            return undefined;
        } else {
            return $("#"+position[0]+(position[1]-1));
        }
    }
  function bottomshe(grid) {
        var position = getPosition(grid);
        if (isMarginBottom(grid) == true) {
            return undefined;
        } else {
             return $("#"+position[0]+(position[1]-1));
        }
    }
    function left(grid) {
        var position = getPosition(grid);
        if (isMarginLeft(grid) == true) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])-1]+position[1]);
        }        
    }
  function leftshe(grid) {
        var position = getPosition(grid);
        if (isMarginLeft(grid) == true) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])-1]+position[1]);
        }        
    }
    function right(grid) {
        var position = getPosition(grid);
        if (isMarginRight(grid) == true) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])+1]+position[1]);
        }
    }
  function rightshe(grid) {
        var position = getPosition(grid);
        if (isMarginRight(grid) == true) {
            return undefined;
        } else {
		
				return $("#"+xAxis[xAxis.indexOf(position[0])+1]+position[1]);
			
            
        }
    }
    function topleft(grid) {
        var position = getPosition(grid);
        if (isMarginTop(grid) || isMarginLeft(grid)) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])-1]+(position[1]+1));
        }
    }

    function topright(grid) {
        var position = getPosition(grid);
        if (isMarginTop(grid) || isMarginRight(grid)) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])+1]+(position[1]+1));
        }
    }

    function bottomleft(grid) {
        var position = getPosition(grid);
        if (isMarginBottom(grid) || isMarginLeft(grid)) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])-1]+(position[1]-1));
        }
    }

    function bottomright(grid) {
        var position = getPosition(grid);
        if (isMarginBottom(grid) || isMarginRight(grid)) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])+1]+(position[1]-1));
        }
    }
	function she(piece) {
	if (piece.hasClass("sheshou")) {
		return "sheshou";
	}
	if (piece.hasClass("leijian")) {
		return "leijian";
	}
	if (piece.hasClass("bingjian")) {
		return "bingjian";
	}
	if (piece.hasClass("huojian")) {
		return "huojian";
	}
	if (piece.hasClass("baodan")) {
		return "baodan";
	}
	if (piece.hasClass("leidan")) {
		return "leibao";
	}
}
}
var $pieceby=$(document.getElementById("black-yandund"));
var $piecewy=$(document.getElementById("white-yandund"));
var $piecebm=$(document.getElementById("black-mudund"));
var $piecewm=$(document.getElementById("white-mudund"));
var $piecebb=$(document.getElementById("black-bingdund"));
var $piecewb=$(document.getElementById("white-bingdund"));
var $tg;
var $y;
wtime=5;
btime=5;
wmtime=5;
bmtime=5;
wbtime=5;
bbtime=5;


game();

