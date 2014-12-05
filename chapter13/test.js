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

	getEvent: function(event) {
		return event? event : window.event;
	},

	getTarget: function(event) {
		return event.target || event.srcElement;
	},

	preventDefault: function(event) {
		if(event.preventDefault) {
			event.preventDefault();
		} 
		else {
			event.returnValue = false;
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
	},

	stopPropagation: function(event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		}
		else {
			event.cancelBubble = true;
		}
	}
}

var btn = document.getElementById("myBtn");
var handler = function() {
	alert("Clicked");
}

btn.onclick = function(event) {
	// alert(event.eventPhase + "btn.onclick");
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	// EventUtil.stopPropagation(event);
	event.stopPropagation();
	alert("target " + target);
}

// document.body.addEventListener("click", function(event) {
// 	alert(event.eventPhase + "document.body.addEventListener");
// }, true);

document.body.onclick = function(event) {
	alert("document.body.onclick");
}


// btn.onclick = function(e) {
// 	alert("Clicked");
// 	e.stopPropagation();
// }

// document.body.onclick = function(event) {
// 	alert("Body clicked");
// }

// var myLink = document.getElementById("myLink");
// myLink.onclick = function(event) {
// 	event = EventUtil.getEvent(event);
// 	EventUtil.preventDefault(event);
// }