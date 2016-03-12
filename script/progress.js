var loader = function() {
	var width = window.innerWidth,
		height = window.innerHeight,
		delay = 100,
		colors = ["red", "green", "blue", "yellow", "purple", "orange"],
		active = false,
		bgColor = "bgColor",
		iteration = 0;


	var container = document.getElementById("progress_bar");


	var drawColouredProgress = function(color) {
		var span = document.createElement("span");
		span.className = "progress_node " + color;

		container.appendChild(span);

		setTimeout(function() {
			span.className += " animate";
		}, 50);

		setTimeout(function() {
			container.removeChild(span);
		}, 3000);

		var self = this;
		if(active)
			setTimeout(function() {
				iteration++;
				if(iteration >= colors.length) iteration = 0;
				drawColouredProgress(colors[iteration]);
			}, 700);
	}

	var start = function() {
		var self = this;
		active = true;
		requestAnimationFrame(function() {
			drawColouredProgress(colors[iteration]);
		});

		setTimeout(stop, 10000);
	}	

	var stop = function() {
		active = false;

		setTimeout(function() {
			drawColouredProgress(bgColor);
		}, 700);
	}

	this.startAnimation = new CustomEvent(
		"startAnimation", 
		{
			bubbles: true,
			cancelable: true
		}
	);

	this.stopAnimation = new CustomEvent(
		"stopAnimation", 
		{
			bubbles: true,
			cancelable: false
		}
	);

	document.addEventListener("startAnimation", start);
	document.addEventListener("stopAnimation", stop);
}