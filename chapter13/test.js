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

	getButton: function(event) {
		if(document.implementation.hasFeature("MouseEvents", "2.0")) {
			return event.button;
		}
		else {
			switch(event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4: 
					return 1;
			}
		}
	},

	getCharCode: function(event) {
		if(typeof event.charCode == "number") {
			return event.charCode;
		}
		else {
			return event.keyCode;
		}
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
	alert("Event button is " + EventUtil.getButton(event));
}

EventUtil.addHandler(btn, "click", handler);

// btn.onclick = function(event) {
// 	// alert(event.eventPhase + "btn.onclick");
// 	event = EventUtil.getEvent(event);
// 	var target = EventUtil.getTarget(event);
// 	// EventUtil.stopPropagation(event);
// 	event.stopPropagation();
// 	alert("target " + target);
// }

// document.body.addEventListener("click", function(event) {
// 	alert(event.eventPhase + "document.body.addEventListener");
// }, true);

// document.body.onclick = function(event) {
// 	alert("document.body.onclick");
// }

var myDiv = document.getElementById("myDiv");
EventUtil.addHandler(myDiv, "click", function(event) {
	event = EventUtil.getEvent(event);
	alert("Event button is " + EventUtil.getButton(event));
});

var myText = document.getElementById("myText");
if(myText){
	EventUtil.addHandler(myText, "keypress", function(event) {
		event = EventUtil.getEvent(event);
		alert(event.data);
	})
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