function showMessage() {
	alert("Hello");
}
var btn = document.getElementById("myText");
btn.onclick = function(event) {
	console.log(event.keyCode);
}
// btn.removeEventListener("click", showMessage, false);

// var handler = function(event) {
// 	switch(event.type) {
// 		case "click":
// 			alert("clicked");
// 			break;
// 		case "mouseover":
// 			event.target.style.backgroundColor = "red";
// 			break;
// 		case "mouseout":
// 			event.target.style.backgroundColor = "";
// 			break;
// 	}
// };

// btn.onclick = handler;
// btn.onmouseover = handler;
// btn.onmouseout = handler;

var EventUtil = {

	addHandler: function(element, type, handler) {
		if(element.addEventListener) {
			element.addEventListener(type, handler, false);
		} 
		else if(element.attachEvent) {
			element.attachEvent("on" + type, handler);
		}
		else {
			element["on" + type] = handler;
		}
	},

	removeHandler: function(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		}
		else if(element.detachEvent) {
			element.detachEvent("on" + type, handler);
		}
		else {
			element["on" + type] = null;
		}
	}
}


