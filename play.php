<!DOCTYPE html>
<html>
	<body>
	<div style="bottom: 0;left: 0;position: fixed;right: 0;top: 0;background-color: rgba(1, 1, 1, 0.0);"></dv>
	<canvas id="divDungeonCanvas" style="top: 0;left: 0;position: fixed;"></canvas>
	<?php
		$url = $_GET['URL'];
		$normal = "http://";
		$secure = "https://";
		if (strncmp($url, $normal, strlen($normal)) !== 0 ||
		    strncmp($url, $secure, strlen($secure)) !== 0) { 
			$url = "http://" . $url; 
		}
		$html = file_get_contents($url);
		$html = preg_replace("/(href|src)\=\"([^(http)])(\/)?/", "$1=\"$url$2", $html);
		echo '<div id="loadedwebsite">';
		echo $html;
		echo '</div>';
	?>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script type="text/javascript" src="js/movement.js"></script>
	<script type="text/javascript">
		if (window.addEventListener) { // Mozilla, Netscape, Firefox
				window.addEventListener('load', WindowLoad, false);
		} else if (window.attachEvent) { // IE
				window.attachEvent('onload', WindowLoad);
		}

		function WindowLoad(event) {
			$(document).ready(function () {
				var canvas = document.getElementById("divDungeonCanvas");
				canvas.width = document.width;
				canvas.height = document.height;
				init();
			});
		}
		var event = $(document).click(function(e) {
				e.stopPropagation();
				e.preventDefault();
				e.stopImmediatePropagation();
				return false;
		});
	</script>
	<style type="text/css">
		a {
		  cursor: default;
		}
	</style>
	</body>
</html>