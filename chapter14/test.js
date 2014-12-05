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

	getClipboardText: function(event) {
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
	},

	setClipboardText: function(event, value) {
		if(event.clipboardData) {
			return event.clipboardData.setData("text/plain", value);
		} 
		else if(window.clipboardData) {
			return window.clipboardData.setData("text", value);
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
};

var form = document.getElementById("myForm");
EventUtil.addHandler(form, "submit", function(event) {
	event = EventUtil.getEvent(event);
	EventUtil.preventDefault(event);
});

var textbox = form.elements[0];

EventUtil.addHandler(textbox, "focus", function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	if(target.style.backgroundColor != "red") {
		target.style.backgroundColor = "yellow";
	}

	target.select();
});

EventUtil.addHandler(textbox, "blur", function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	if(/[^\d]/.test(target.value)) {
		target.style.backgroundColor = "red";
	}
	else {
		target.style.backgroundColor = "";
	}
});

EventUtil.addHandler(textbox, "change", function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	if(/[^\d]/.test(target.value)) {
		target.style.backgroundColor = "green";
	}
	else {
		target.style.backgroundColor = "";
	}
})



var submitForm = form.elements["submit"];
submitForm.disabled = true;

var textarea = document.getElementById("textarea");

EventUtil.addHandler(textarea, "keypress", function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	var charCode = EventUtil.getCharCode(event);

	if(!/\d/.test(String.fromCharCode(charCode)) && event.ctrlKey) {
		EventUtil.preventDefault(event);
	}

});

EventUtil.addHandler(textarea, "paste", function(event) {
	event = EventUtil.getEvent(event);
	var text = EventUtil.getClipboardText(event);

	if(/^\d*$/.test(text)) {
		EventUtil.preventDefault(event);
	}
})
