javascript:(function(e,a,g,h,f,c,b,d)
{
	if (!(f = e.jQuery) || g > f.fn.jquery || h(f)) 
	{ 
		c = a.createElement("script");
		c.type = "text/javascript";
		c.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + g + "/jquery.min.js";
		c.onload = c.onreadystatechange = function() 
		{
			if (!b && (!(d = this.readyState) || d == "loaded" || d == "complete")) 
			{
				h((f=e.jQuery).noConflict(1), b = 1);
				f(c).remove() 
			}
		}; 
		a.documentElement.childNodes[0].appendChild(c)
	}
})
(window, document, "1.3.2", function($,L) 
{ 
	onerror = function(){};
	while ((element = document.getElementsByTagName('script')).length != 0)
	{
		element[0].parentNode.removeChild(element[0]);
	}
	alert($("canvas").size());
	var canvas = $("<canvas width=\"100%\" height=\"100%\"/>");
	$("head").append(canvas);
	alert($("canvas").size());
});