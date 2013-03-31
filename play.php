<!DOCTYPE html>
<html>
    <body>
        <div style="bottom: 0;left: 0;position: fixed;right: 0;top: 0;background-color: rgba(1, 1, 1, 0.0);"></div>
		<div id="playerChar" style="position:absolute; width:117px; height:112px;">
			<img src="images/standing1.png" style="width:115px; height:110px;"/>
			<img id="image" style="height:50px; width:50px; z-index:2; position:absolute; left: 12%;top: 12.5%;"/>
		</div>
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
        <script type="text/javascript" src="js/processdom.js"></script>
        <script type="text/javascript" src="js/movement.js"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                var canvas = document.getElementById("divDungeonCanvas");
                canvas.width = document.width;
                canvas.height = document.height;
				var url = get("UserID");
				if (url == "") {
					url = "images/default.gif";
				} else {
					url = "http://graph.facebook.com/" + url + "/picture"
				}
                init(url);
            });
			
			function get(name) {
				if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
					return decodeURIComponent(name[1]);
			}
			
            var event = $(document).click(function (e) {
                e.stopPropagation();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            });
        </script>
        <style type="text/css">
	     body {
	     	  overflow: hidden;
	     }
            a {
                cursor: default;
            }
        </style>
    </body>
</html>

