var center_win = {//центральные координаты окна
	x:0, 
	y:0
};

var coord_system = {
	left_top: {x: -180.00000000, y: 85.08405953 , x1: 0, y1: 0, x15: 0, y15: 0}, 
	right_bottom: {x: 180.00000000, y: -85.08405953, x1: 512, y1: 512, x15: 4194304, y15: 4194303},
	center: {x: 0, y: 0, x2: 256, y2: 256, x15: 2097152, y15: 2097152},
	min_one: {x: 0, y: -10, x2: 256, y2: 270, x15: 2097152, y15: 2213480},
	min_two: {x: 0, y: -20, x2: 256, y2: 284, x15: 2097152, y15: 2333521},
	min_tree: {x: 0, y: -30, x2: 256, y2: 300, x15: 2097152, y15: 2461602},
	min_four: {x: 0, y: -40, x2: 256, y2: 317, x15: 2097152, y15: 2603552},
	min_five:{x: 0, y: -50, x2: 256, y2: 337, x15: 2097152, y15: 2768399},
	min_six:{x: 0, y: -60, x2: 256, y2: 362, x15: 2097152, y15: 2972402},
	min_seven:{x: 0, y: -70, x2: 256, y2: 396, x15: 2097152, y15: 3251410},
	min_eight:{x: 0, y: -80, x2: 256, y2: 453, x15: 2097152, y15: 3719043},
	one: {x: 0, y: 10, x2: 256, y2: 242, x15: 2097152, y15: 1980823},
	two: {x: 0, y: 20, x2: 256, y2: 228, x15: 2097152, y15: 1860782},
	tree: {x: 0, y: 30, x2: 256, y2: 212, x15: 2097152, y15: 1732701},
	four: {x: 0, y: 40, x2: 256, y2: 195, x15: 2097152, y15: 1590751},
	five:{x: 0, y: 50, x2: 256, y2: 175, x15: 2097152, y15: 1425904},
	six:{x: 0, y: 60, x2: 256, y2: 150, x15: 2097152, y15: 1221901},
	seven:{x: 0, y: 70, x2: 256, y2: 116, x15: 2097152, y15: 942893},
	eight:{x: 0, y: 80, x2: 256, y2: 59, x15: 2097152, y15: 475260}
};

var frame_ugol = { left_top: {x: 0, y: 0}, right_bottom: {x: 0, y: 0} };//координаты левого-верхнего и правого-нижнего углов

var num_krai_frame = { min_num_y: 0, max_num_y: 0, min_num_x: 0, max_num_x: 0 };//номера крайних фреймов

var map = null;
var zoom = 0;
var dragObject = {}; 


window.onload = function () {
	map = document.getElementById("Maps");
	zoom = 1;

	//посчитать центр окна
	considerCenterMap();
	//посчитать и добавить картинки относительно центра
	showMap();
}

function Output_image(par, zoom, i, j, a, b){//отрисовка тайтлов
	var taitl = "Map/" + zoom + "/x"+i+"/"+par+"/y"+j+".png";
	//определить кол-во фреймов по осям в каждом zoom
	$(map).append("<img src='"+taitl+"'></img>");
	var url = 'url('+taitl+')';
	$(map).find("img").last().css({position: 'absolute', width: '256px', height: '256px', left: a, top: b});
}

function findCoords(){//нахождение координат
	$(".point").remove();

	var a = document.getElementById("textBox").value;
	var g = a.split(',');
	
	var x = 100 * (g[1]-(coord_system.left_top.x)) / 360;
	x = Math.sqrt(Math.pow(4, zoom))*256 * x / 100;
	
	if (g[0] >= 0 && g[0] <= 10){
		var y = 100 * (g[0]-0) / (10-0);
		y = y * ((coord_system.one.y15/Math.pow(2, 15-zoom-1))-(coord_system.center.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.center.y15/Math.pow(2, 15-zoom-1)+y;	
	}	
	else if (g[0] > 10 && g[0] <= 20){
		var y = 100 * (g[0]-10) / (20-10);
		y = y * ((coord_system.two.y15/Math.pow(2, 15-zoom-1))-(coord_system.one.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.one.y15/Math.pow(2, 15-zoom-1)+y;	
	}	
	else if (g[0] > 20 && g[0] <= 30){
		var y = 100 * (g[0]-20) / (30-20);
		y = y * ((coord_system.tree.y15/Math.pow(2, 15-zoom-1))-(coord_system.two.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.two.y15/Math.pow(2, 15-zoom-1)+y;	
	}
	else if (g[0] > 30 && g[0] <= 40){
		var y = 100 * (g[0]-30) / (40-30);
		y = y * ((coord_system.four.y15/Math.pow(2, 15-zoom-1))-(coord_system.tree.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.tree.y15/Math.pow(2, 15-zoom-1)+y;	
	}	
	else if (g[0] > 40 && g[0] <= 50){
		var y = 100 * (g[0]-40) / (50-40);
		y = y * ((coord_system.five.y15/Math.pow(2, 15-zoom-1))-(coord_system.four.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.four.y15/Math.pow(2, 15-zoom-1)+y;	
	}	
	else if (g[0] > 50 && g[0] <= 60){
		var y = 100 * (g[0]-50) / (60-50);
		y = y * ((coord_system.six.y15/Math.pow(2, 15-zoom-1))-(coord_system.five.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.five.y15/Math.pow(2, 15-zoom-1)+y;	
	}
	else if (g[0] > 60 && g[0] <= 70){
		var y = 100 * (g[0]-60) / (70-60);
		y = y * ((coord_system.seven.y15/Math.pow(2, 15-zoom-1))-(coord_system.six.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.six.y15/Math.pow(2, 15-zoom-1)+y;	
	}	
	else if (g[0] > 70 && g[0] <= 80){
		var y = 100 * (g[0]-70) / (80-70);
		y = y * ((coord_system.eight.y15/Math.pow(2, 15-zoom-1))-(coord_system.seven.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.seven.y15/Math.pow(2, 15-zoom-1)+y;	
	}	
	else if (g[0] > 80 && g[0] <= coord_system.left_top.y){
		var y = 100 * (g[0]-80) / (coord_system.left_top.y-80);
		y = y * ((coord_system.left_top.y15/Math.pow(2, 15-zoom-1))-(coord_system.eight.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.eight.y15/Math.pow(2, 15-zoom-1)+y;		
	}	
	else if (g[0] < 0 && g[0] >= -10){
		var y = 100 * (g[0]-0) / (0-(-10));
		y = y * ((coord_system.min_one.y15/Math.pow(2, 15-zoom-1))-(coord_system.center.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.center.y15/Math.pow(2, 15-zoom-1)-y;	
	}	
	else if (g[0] < -10 && g[0] >= -20){
		var y = 100 * (g[0]-(-10)) / (-10-(-20));
		y = y * ((coord_system.min_two.y15/Math.pow(2, 15-zoom-1))-(coord_system.min_one.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.min_one.y15/Math.pow(2, 15-zoom-1)-y;	
	}		
	else if (g[0] < -20 && g[0] >= -30){
		var y = 100 * (g[0]-(-20)) / (-20-(-30));
		y = y * ((coord_system.min_tree.y15/Math.pow(2, 15-zoom-1))-(coord_system.min_two.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.min_two.y15/Math.pow(2, 15-zoom-1)-y;	
	}	
	else if (g[0] < -30 && g[0] >= -40){
		var y = 100 * (g[0]-(-30)) / (-30-(-40));
		y = y * ((coord_system.min_four.y15/Math.pow(2, 15-zoom-1))-(coord_system.min_tree.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.min_tree.y15/Math.pow(2, 15-zoom-1)-y;	
	}	
	else if (g[0] < -40 && g[0] >= -50){
		var y = 100 * (g[0]-(-40)) / (-40-(-50));
		y = y * ((coord_system.min_five.y15/Math.pow(2, 15-zoom-1))-(coord_system.min_four.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.min_four.y15/Math.pow(2, 15-zoom-1)-y;	
	}
	else if (g[0] < -50 && g[0] >= -60){
		var y = 100 * (g[0]-(-50)) / (-50-(-60));
		y = y * ((coord_system.min_six.y15/Math.pow(2, 15-zoom-1))-(coord_system.min_five.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.min_five.y15/Math.pow(2, 15-zoom-1)-y;	
	}	
	else if (g[0] < -60 && g[0] >= -70){
		var y = 100 * (g[0]-(-60)) / (-60-(-70));
		y = y * ((coord_system.min_seven.y15/Math.pow(2, 15-zoom-1))-(coord_system.min_six.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.min_six.y15/Math.pow(2, 15-zoom-1)-y;	
	}	
	else if (g[0] < -70 && g[0] >= -80){
		var y = 100 * (g[0]-(-70)) / (-70-(-80));
		y = y * ((coord_system.min_eight.y15/Math.pow(2, 15-zoom-1))-(coord_system.min_seven.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.min_seven.y15/Math.pow(2, 15-zoom-1)-y;	
	}			
	else if (g[0] < -80 && g[0] >= coord_system.right_bottom.y){
		var y = 100 * (g[0]-(-80)) / (-80-(coord_system.right_bottom.y));
		y = y * ((coord_system.right_bottom.y15/Math.pow(2, 15-zoom-1))-(coord_system.min_eight.y15/Math.pow(2, 15-zoom-1))) / 100;
		y = coord_system.min_eight.y15/Math.pow(2, 15-zoom-1)-y;	
	}	
			
	//центрировать относительно найденного места
	var new_g_coord = [x, y];
	var new_coord = [(new_g_coord[0] - parseInt(new_g_coord[0]/256)*256), (new_g_coord[1] - parseInt(new_g_coord[1]/256)*256)];
	var new_num_frm = [parseInt(new_g_coord[0]/256), parseInt(new_g_coord[1]/256)];
	var kol_new = Math.pow(4, zoom);//кол-во фреймов
	$("img").remove();	
	
	//переделать!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	if (new_num_frm[0] - parseInt((center_win.x-new_coord[0])/256) >= 0) {num_krai_frame.min_num_x = new_num_frm[0] - (parseInt((center_win.x-new_coord[0])/256)+1);} else {num_krai_frame.min_num_x = 0;}	
	if (new_num_frm[1] - parseInt((center_win.y-new_coord[1])/256) >= 0) {num_krai_frame.min_num_y = new_num_frm[1] - (parseInt((center_win.y-new_coord[1])/256)+1);} else {num_krai_frame.min_num_y = 0;}	
	if (new_num_frm[0] + ((center_win.x-(256-new_coord[0]))/256+1) < kol_new/4-1) {num_krai_frame.max_num_x = parseInt(new_num_frm[0] + ((center_win.x-(256-new_coord[0]))/256+1));} 
	else {if (kol_new/4-1 == 0) {num_krai_frame.max_num_x = kol_new/4} else {num_krai_frame.max_num_x = kol_new/4-1};}	
	if (new_num_frm[1] + ((center_win.y-(256-new_coord[1]))/256+1) < kol_new/4-1) {num_krai_frame.max_num_y = parseInt(new_num_frm[1] + ((center_win.y-(256-new_coord[1]))/256+1));} 
	else {if (kol_new/4-1 == 0) {num_krai_frame.max_num_y = kol_new/4} else {num_krai_frame.max_num_y = kol_new/4-1};}
	
	frame_ugol.left_top.x = center_win.x - (new_num_frm[0] - num_krai_frame.min_num_x)*256 - new_coord[0];
	frame_ugol.left_top.y = center_win.y - (new_num_frm[1] - num_krai_frame.min_num_y)*256 - new_coord[1];
	frame_ugol.right_bottom.x = center_win.x + (num_krai_frame.max_num_x - new_num_frm[0])*256 + (256-new_coord[0]);
	frame_ugol.right_bottom.y = center_win.y + (num_krai_frame.max_num_y - new_num_frm[1])*256 + (256-new_coord[1]);

	//перерисовываем карту				
	for (var i = num_krai_frame.min_num_x, a = frame_ugol.left_top.x; i <= num_krai_frame.max_num_x; i++, a+=256){
		for (var j = num_krai_frame.min_num_y, b = frame_ugol.left_top.y; j <= num_krai_frame.max_num_y; j++, b+=256){
			Output_image(parseInt(j / 1024), zoom, i, j, a, b);
		}
	}
		
	//добавляем точку
	$(map).append("<div class='point'></div>");
	$(map).find(".point").css({left: center_win.x-9, top: center_win.y-42});
	//$(map).find(".point").css({left: frame_ugol.left_top.x+x-9, top: frame_ugol.left_top.y+y-42});	
}

//http://javascript.ru/files/dnd/final/demo.html
	
function dragDrop(e) {//перетаскивание карты
	var a = ''; var b = '';
	var coords = mousePageXY(e);//координаты мыши
		
	//удаление лишних фреймов
	var storona = [0, 0, 0, 0];
	$("img").each(function () { // удаляем фреймы вышедшие за пределы окна
		var obj = $(this);
		
		if ((parseFloat(getElementComputedStyle(obj[0], 'left'))+256) < 0) {
		$(obj).remove(); storona[0] = 1;
		}
		if ((parseFloat(getElementComputedStyle(obj[0], 'top'))+256) < 0) {
		$(obj).remove(); storona[1] = 2;
		}
		if (parseFloat(getElementComputedStyle(obj[0], 'left')) > $(map).width()) {
		$(obj).remove(); storona[2] = 3;
		}
		if (parseFloat(getElementComputedStyle(obj[0], 'top')) > $(map).height()) {
		$(obj).remove(); storona[3] = 4;
		}
	});
	
	if (storona[0] == 1) {num_krai_frame.min_num_x++;	frame_ugol.left_top.x+=256;}
	if (storona[1] == 2) {num_krai_frame.min_num_y++;	frame_ugol.left_top.y+=256;}
	if (storona[2] == 3) {num_krai_frame.max_num_x--;	frame_ugol.right_bottom.x-=256;}
	if (storona[3] == 4) {num_krai_frame.max_num_y--;	frame_ugol.right_bottom.y-=256;}		
	
	
	$("img").each(function () { // передвижение карты
		var obj = $(this); 
		a = parseFloat(getElementComputedStyle(obj[0], 'left'))+(coords.x-dragObject.downX) + 'px';//новая координата x
		b = parseFloat(getElementComputedStyle(obj[0], 'top'))+(coords.y-dragObject.downY) + 'px';//новая координата y
	  	  
		$(obj).css({left: a, top: b});		
	});
	
	frame_ugol.left_top.x = parseFloat(frame_ugol.left_top.x+(coords.x-dragObject.downX));
	frame_ugol.left_top.y = parseFloat(frame_ugol.left_top.y+(coords.y-dragObject.downY));
	frame_ugol.right_bottom.x = parseFloat(frame_ugol.right_bottom.x+(coords.x-dragObject.downX));
	frame_ugol.right_bottom.y = parseFloat(frame_ugol.right_bottom.y+(coords.y-dragObject.downY));		

	
	if (document.elementFromPoint(0, 1).localName != 'img' && num_krai_frame.min_num_x > 0){
		num_krai_frame.min_num_x--;	
		frame_ugol.left_top.x-=256;
		
		for(var i = num_krai_frame.min_num_y, j = frame_ugol.left_top.y; i <= num_krai_frame.max_num_y; i++, j+=256){
			Output_image(parseInt(i / 1024), zoom, num_krai_frame.min_num_x, i, frame_ugol.left_top.x, j);
		}
	}
	
	if (document.elementFromPoint(1, 0).localName != 'img' && num_krai_frame.min_num_y > 0){
		num_krai_frame.min_num_y--;	
		frame_ugol.left_top.y-=256;	
		
		for(var i = num_krai_frame.min_num_x, j = frame_ugol.left_top.x; i <= num_krai_frame.max_num_x; i++, j+=256){
			Output_image(parseInt(num_krai_frame.min_num_y / 1024), zoom, i, num_krai_frame.min_num_y, j, frame_ugol.left_top.y);
		}
	}
	
	if (document.elementFromPoint(($(map).width()-1), 1).localName != 'img' && num_krai_frame.max_num_x < Math.sqrt(Math.pow(4, zoom))-1){
		num_krai_frame.max_num_x++;	
		frame_ugol.right_bottom.x+=256;	
		
		for(var i = num_krai_frame.min_num_y, j = frame_ugol.left_top.y; i <= num_krai_frame.max_num_y; i++, j+=256){
			Output_image(parseInt(i / 1024), zoom, num_krai_frame.max_num_x, i, frame_ugol.right_bottom.x-256, j);
		}
	}
	
	if (document.elementFromPoint(1, ($(map).height()-1)).localName != 'img' && num_krai_frame.max_num_y < Math.sqrt(Math.pow(4, zoom))-1){	
		num_krai_frame.max_num_y++;	
		frame_ugol.right_bottom.y+=256;
		
		for(var i = num_krai_frame.min_num_x, j = frame_ugol.left_top.x; i <= num_krai_frame.max_num_x; i++, j+=256){
			Output_image(parseInt(num_krai_frame.max_num_y / 1024), zoom, i, num_krai_frame.max_num_y, j, frame_ugol.right_bottom.y-256);
		}
	}
	
	dragObject.downX = coords.x;
	dragObject.downY = coords.y;	
	
}

 
window.onresize = function(){  //При изменениии масштаба/размера окна браузера
	considerCenterMap();
	resizeWindow();
}

function considerCenterMap(){//посчитать центр карты	 
	center_win.x = $(map).width()/2;//центральная координата x
	center_win.y = $(map).height()/2;//центральная координата y
	$(".center_maps").css({position: 'absolute', left: center_win.x, top: center_win.y, margin: '0'});
}

function resizeWindow(){//добавление фреймов при изменении размера окна

	if (document.elementFromPoint(($(map).width()-1), 1).localName != 'img'){
	for (var k = 0; k < (Math.ceil(($(map).width()-frame_ugol.right_bottom.x)/256)+1); k++){
		if (num_krai_frame.max_num_x+1 < Math.pow(4, zoom)/4){		
			for(var i = num_krai_frame.min_num_y, j = frame_ugol.left_top.y; i <= num_krai_frame.max_num_y; i++, j+=256){
				Output_image(parseInt(i / 1024), zoom, num_krai_frame.max_num_x+1, i, frame_ugol.right_bottom.x, j);
			}
		num_krai_frame.max_num_x++;	
		frame_ugol.right_bottom.x+=256;
		}
	}
	}
		
	if (document.elementFromPoint(1, ($(map).height()-1)).localName != 'img'){
	for (var k = 0; k < (Math.ceil(($(map).height()-frame_ugol.right_bottom.y)/256)+1); k++){
		if (num_krai_frame.max_num_y+1 < Math.pow(4, zoom)/4){		
			for(var i = num_krai_frame.min_num_x, j = frame_ugol.left_top.x; i <= num_krai_frame.max_num_x; i++, j+=256){
				Output_image(parseInt((num_krai_frame.max_num_y-1) / 1024), zoom, i, num_krai_frame.max_num_y+1, j, frame_ugol.right_bottom.y);				
			}
		num_krai_frame.max_num_y++;	
		frame_ugol.right_bottom.y+=256;
		}	
	}
	}
}

function zoomNewCenter(znak){//отрисовка карт при изменении zoom
	
	var el = document.elementFromPoint(center_win.x, center_win.y);//тайтл который в центра экрана
	if (el.localName != 'img') { considerCenterMap(); showMap(); el = document.elementFromPoint(center_win.x, center_win.y); return;}
	
	//var img = getElementComputedStyle(el, 'backgroundImage');
	var img = el.src;//получаем путь центрального тайтла
	var num_frm = [parseInt((/\/x([0-9]+)/ig).exec(img)[1]), parseInt((/\/y([0-9]+)/ig).exec(img)[1])];//номер центрального тайтла (x,y)
	
	var old_coord = [center_win.x - parseInt(getElementComputedStyle(el, 'left')), center_win.y - parseInt(getElementComputedStyle(el, 'top'))];//старые координаты центр. тайтла относительно экрана
	var old_g_coord = [(num_frm[0]*256+old_coord[0]), (num_frm[1]*256+old_coord[1])];//старые координаты центр. тайтла относительно всей карты
	
	//посчитать размер всей карты (ширина в пикселях)
	if (znak == 'plus') {//увеличиваем или уменьшаем масштаб карты 
		var kol_old = Math.pow(4, zoom-1); 
	} 
	else { 
		var kol_old = Math.pow(4, zoom+1); 
	}
	var razm_old = (Math.sqrt(kol_old))*256;//размер всей старой карты
	
	var kol_new = Math.pow(4, zoom);//кол-во фреймов в новой карте
	var razm_new = (Math.sqrt(kol_new))*256;//размер всей новой карты
	
	var new_g_coord = [((old_g_coord[0])*razm_new)/razm_old, ((old_g_coord[1])*razm_new)/razm_old];//новые координаты центр. тайтла относительно всей карты
	//var new_coord = [(new_g_coord[0] - parseInt(new_g_coord[0]/256)*256), (new_g_coord[1] - parseInt(new_g_coord[1]/256)*256)];//новые координаты центр. тайтла относительно экрана
	var new_num_frm = [parseInt(new_g_coord[0]/256), parseInt(new_g_coord[1]/256)];//новый номер центрального тайтла (x,y)
	
	//кол-во фреймов слева и сверху 
	var left, top; 
	if ((center_win.x-128)%256 != 0) {left = parseInt((center_win.x-128)/256+1);} else {left = parseInt((center_win.x-128)/256);}
	if ((center_win.y-128)%256 != 0) {top = parseInt((center_win.y-128)/256+1);} else {top = parseInt((center_win.y-128)/256);}
			
	$("img").remove();	
	
	//у каждого зума свое количество фреймов по x и y
	
	num_krai_frame.min_num_x = new_num_frm[0]-left;//номер крайнего левого фрейма
	frame_ugol.left_top.x = (center_win.x-128)+(-left)*256;//координаты левой стороны крайнего левого фрейма	
	if (num_krai_frame.min_num_x < 0) {frame_ugol.left_top.x = (center_win.x-128)+(-left-num_krai_frame.min_num_x)*256; num_krai_frame.min_num_x = 0;}
	
	
	num_krai_frame.min_num_y = new_num_frm[1]-top;//номер крайнего верхнего фрейма
	frame_ugol.left_top.y = (center_win.y-128)+(-top)*256;//координаты верхней стороны крайнего верхнего фрейма
	if (num_krai_frame.min_num_y < 0) { frame_ugol.left_top.y = (center_win.y-128)+(-top-num_krai_frame.min_num_y)*256; num_krai_frame.min_num_y = 0;}
	
	
	num_krai_frame.max_num_x = new_num_frm[0]+left;//номер крайнего правого фрейма
	frame_ugol.right_bottom.x = (center_win.x+128)+(left)*256;//координаты правой стороны крайнего правого фрейма
	if (num_krai_frame.max_num_x > Math.sqrt(kol_new)-1) {frame_ugol.right_bottom.x = (center_win.x+128)+(left-(num_krai_frame.max_num_x-(Math.sqrt(kol_new)-1)))*256; num_krai_frame.max_num_x = Math.sqrt(kol_new)-1;}
	
	
	num_krai_frame.max_num_y = new_num_frm[1]+top;//номер крайнего нижнего фрейма	
	frame_ugol.right_bottom.y = (center_win.y+128)+(top)*256;//координаты нижней стороны крайнего нижнего фрейма
	if (num_krai_frame.max_num_y > Math.sqrt(kol_new)-1) {frame_ugol.right_bottom.y = (center_win.y+128)+(top-(num_krai_frame.max_num_y-(Math.sqrt(kol_new)-1)))*256;  num_krai_frame.max_num_y = Math.sqrt(kol_new)-1;}
	

	
	for (var i = num_krai_frame.min_num_x, a = frame_ugol.left_top.x; i <= num_krai_frame.max_num_x; i++, a+=256)	{
		for (var j = num_krai_frame.min_num_y, b = frame_ugol.left_top.y; j <= num_krai_frame.max_num_y; j++, b+=256){
			Output_image(parseInt(j / 1024), zoom, i, j, a, b);	
		}
	}	
	
}

function showMap(){//посчитать и добавить картинки относительно центра
	$("img").remove();
	
	//определить что будет центром карты
	var kol = Math.pow(4, zoom);//кол-во фреймов
	var left_top = (Math.sqrt(kol))/2;//кол-во фреймов слева и сверху
	var num_fram = left_top - 1;//номер левого-верхнего фрейма у центра
	
	var a = parseInt(center_win.x/256) + 1;//номер центрального фрейма относительно левого края экрана
	var b = parseInt(center_win.y/256) + 1;//номер центрального фрейма относительно верхнего края экрана
	if(a>left_top) {a = left_top;}
	if(b>left_top) {b = left_top;}
	
	var c = num_fram - a + 1;
	var d = num_fram - b + 1;
	var e = num_fram + a;
	if (c < 0){ var g = 0 - c; c = 0; e = e - g;}
	var f = num_fram + b;
	if (d < 0){ var h = 0 - d; d = 0; f = f - h;}
		
	num_krai_frame.min_num_x = c;//номер крайнего левого фрейма
	num_krai_frame.min_num_y = d;//номер крайнего верхнего фрейма
	num_krai_frame.max_num_x = e;//номер крайнего правого фрейма
	num_krai_frame.max_num_y = f;//номер крайнего нижнего фрейма	
	frame_ugol.left_top.x = center_win.x+(-a)*256;//координаты левой стороны крайнего левого фрейма
	frame_ugol.left_top.y = center_win.y+(-b)*256;//координаты верхней стороны крайнего верхнего фрейма
	frame_ugol.right_bottom.x = center_win.x+(a)*256;//координаты правой стороны крайнего правого фрейма
	frame_ugol.right_bottom.y = center_win.y+(b)*256;//координаты нижней стороны крайнего нижнего фрейма
	
	for (var i = num_krai_frame.min_num_x, a = -a; i <= num_krai_frame.max_num_x; i++, a++)	{
		for (var j = num_krai_frame.min_num_y, b = -b; j <= num_krai_frame.max_num_y; j++, b++){
			Output_image(parseInt(j / 1024), zoom, i, j, center_win.x+a*256, center_win.y+b*256);
		}
	}	
}

//-------------------------------------------------------------------------------------------------------------------------

function convertToMercator(latitude, longitude, razm) {
	/*if (abs($latitude) > 80 || abs($longitude) > 180) {
		throw new Exception('Invalid coordinate. Valid range is (-80, 80) for latitude and (-180, 180) for longitude');
	}*/

	var x = parseInt(razm / 2 + (longitude * 85 / 15));
	var y = parseInt(razm / 2 - rad2deg(Math.log(Math.tan((Math.PI / 4) + deg2rad(latitude) / 2))) * 85 / 15);
	
	//var x = parseInt(razm / 2 + (longitude * 85 / 15));
	//var y = parseInt(razm / 2 - (latitude * 85 / 15));

	$(map).append("<div class='point'></div>");
	$(".point").css({position: 'absolute', width: '25px', height: '25px', left: x, top: y, background: 'black'});
}

function rad2deg(angle) {
  return (angle/ Math.PI * 180); // angle / Math.PI * 180
}

function deg2rad(angle) {
  return ((angle/ 180) * Math.PI); // (angle / 180) * Math.PI;
}
/*
protected function _convertToEquirectangular($latitude, $longitude) {
	if (abs($latitude) > 90 || abs($longitude) > 180) {
		throw new Exception('Invalid coordinate. Valid range is (-90, 90) for latitude and (-180, 180) for longitude');
	}

	$x = (int)($this->_width / 2 + ($longitude * 85 / 15));
	$y = (int)($this->_height / 2 - ($latitude * 85 / 15));

	return array('x' => $x, 'y' => $y);
}*/
 


//--------------------------------------------------------------------------------------------------------------------------- 
// Функция для добавления обработчика событий прокрутки
function addHandler(object, event, handler) {
    if (object.addEventListener) {
      object.addEventListener(event, handler, false);
    }
    else if (object.attachEvent) {
      object.attachEvent('on' + event, handler);
    }
    else alert("Обработчик не поддерживается");
  }
  // Добавляем обработчики для разных браузеров
  addHandler(window, 'DOMMouseScroll', wheel);
  /*addHandler(window, 'mousewheel', wheel);*/
  addHandler(document, 'mousewheel', wheel);
  
  // Функция, обрабатывающая событие покрутки
  function wheel(event) {
    var delta; // Направление колёсика мыши
    event = event || window.event;
    // Opera и IE работают со свойством wheelDelta
    if (event.wheelDelta) { // В Opera и IE
      delta = event.wheelDelta / 120;
      // В Опере значение wheelDelta такое же, но с противоположным знаком
      if (window.opera) delta = -delta; // Дополнительно для Opera
    }
    else if (event.detail) { // Для Gecko
      delta = -event.detail / 3;
    }
    // Запрещаем обработку события браузером по умолчанию
    if (event.preventDefault) event.preventDefault();
    event.returnValue = false;
    //alert(delta); // Выводим направление колёсика мыши
	if (delta == 1){
		zoom++;
		zoomNewCenter('plus');
	}
	else{
		if (zoom>1) {zoom--; zoomNewCenter('minus'); }		
	}
  }

//---------------------------------------------------------------------------------------------------------------------------------------------
//перемещение карты  
document.onmousedown = function(e){
	if(e.target.localName != 'img' || e.target.parentNode.id != 'Maps') return;

  if (e.which != 1) {
    return; // нажатие правой кнопкой не запускает перенос
  }
  // запомнить переносимый объект 
  dragObject.elem = e;

  // запомнить координаты, с которых начат перенос объекта
  dragObject.downX = mousePageXY(e).x;
  dragObject.downY = mousePageXY(e).y;
  
  $(map).css({cursor: 'pointer'});
  document.ondragstart = function() { return false; }

	document.onmousemove = function(e) {
		if (!dragObject.elem) return; // элемент не зажат		
		//dragObject.avatar = dragObject.elem;
		dragDrop(e);
	}
	
	document.onmouseup = function(e) {
		document.onmousemove = null;
		dragObject = {};
		$(map).css({cursor: 'default'});		
		document.ondragstart = function(){}
  }
}  


function mousePageXY(e)//координаты мыши (положение курсора мыши) относительно окна документа
{
  var x = 0, y = 0;

  if (!e) e = window.event;

  if (e.pageX || e.pageY)
  {
    x = e.pageX;
    y = e.pageY;
  }
  else if (e.clientX || e.clientY)
  {
    x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
    y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
  }

  return {"x":x, "y":y};
}

function mouseLayerXY(e)//координаты мыши (положение курсора мыши) внутри абсолютно позиционированного элемента
{
  if (!e) {e = window.event; e.target = e.srcElement}
  var x = 0;
  var y = 0;
  
  if (e.layerX)//Gecko
  {
    x = e.layerX - parseInt(getElementComputedStyle(e.target, "border-left-width"));
    y = e.layerY - parseInt(getElementComputedStyle(e.target, "border-top-width"));
  }
  else if (e.offsetX)//IE, Opera
  {
    x = e.offsetX;
    y = e.offsetY;
  }
  
  return {"x":x, "y":y};
}

function getElementComputedStyle(elem, prop)//значение CSS свойства
{
  if (typeof elem!="object") elem = document.getElementById(elem);
  
  // external stylesheet for Mozilla, Opera 7+ and Safari 1.3+
  if (document.defaultView && document.defaultView.getComputedStyle)
  {
    if (prop.match(/[A-Z]/)) prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
    return document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop);
  }
  
  // external stylesheet for Explorer and Opera 9
  if (elem.currentStyle)
  {
    var i;
    while ((i=prop.indexOf("-"))!=-1) prop = prop.substr(0, i) + prop.substr(i+1,1).toUpperCase() + prop.substr(i+2);
    return elem.currentStyle[prop];
  }
  
  return "";
}