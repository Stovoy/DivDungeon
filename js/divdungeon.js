javascript:(function(e,a,g,h,f,c,b,d) {
		if (!(f = e.jQuery) || g > f.fn.jquery || h(f)) { 
			c = a.createElement("script");
			c.type = "text/javascript";
			c.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + g + "/jquery.min.js";
			c.onload = c.onreadystatechange = function() {
				if (!b && (!(d = this.readyState) || d == "loaded" || d == "complete")) {
					h((f=e.jQuery).noConflict(1), b = 1);
					f(c).remove() 
				}
			}; 
			a.documentElement.childNodes[0].appendChild(c)
		}
})
(window, document, "1.3.2", function($,L) { 
	onerror = function(){};
	while ((element = document.getElementsByTagName('script')).length != 0) {
		element[0].parentNode.removeChild(element[0]);
	}
	var canvas = $("<canvas id=\"divdungeoncanvas\" width=\"500\" height=\"500\" style=\"border:1px solid black\"/>");
	$("html").prepend(canvas);
	var canvas = document.getElementById("divdungeoncanvas");
	var context = canvas.getContext("2d");
	context.fillStyle = "#000000";
	context.fillRect(200,200,40,40);
});