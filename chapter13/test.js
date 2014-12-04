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

var btn = document.getElementById("myBtn");
var handler = function() {
	alert("Clicked");
}

btn.onclick = function(e) {
	alert(e.type);
}

var myLink = document.getElementById("myLink");
myLink.onclick = function(event) {
	// alert(event.type);
	return false;
}