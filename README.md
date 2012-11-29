    npm install mouse-around

A single event for mouse on, mouse around & mouse out 

    var mouseAround = require('mouse-around');

    // the node u want to trigger on
	var node = document.getElementById('someElement');
	
	var hoverBot = document.getElementById('hoverbot');
	
	mouseAround(node, callback);
	
	// evt = the mouse event (for mouse position, etc)
	// node = the original node you were listening to
	// position = the position of that node [x, y]
	// start & stop = boolean
	
	function callback(evt, node, position, start, end){
		hoverBot.style.left = 50 + evt.clientX + "px";
		hoverBot.style.top = evt.clientY - 25 + 'px';
		if(end) hoverBot.style.left = '-1000px'; 
	};
	
LICENSE: MIT