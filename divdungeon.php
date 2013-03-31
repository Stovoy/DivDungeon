<!!DOCTYPE html>
<html>
<div id="fb-root"></div>
<head>
</head>
<body>
	<center>
		<img id="logo" src="images/logo.gif"/>
	</center> 
	<br>
	<div id="body">
		<form name="input" action="play" onsubmit="return process();" method="get">
			<div id="error">Invalid URL</div>
			Dungeon (url): <input type="text" id="url" name="URL">
			Facebook Integration: <input type="checkbox" id="facebookCheckbox" checked="true"/>
			<input type="submit" id="loginBtn"/>
			<input type="hidden" id="userID" name="UserID"/>
		</form>
	</div>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>
	<script src="//connect.facebook.net/en_US/all.js"></script>
	<style>
		body {
			background-color: black;
			background-image: url(images/background.jpg);
			background-position: center;
			background-repeat: no-repeat;
		}
		#body {
			background-color: rgba(120,50,0,0.5);
			border-style: solid;
			border-width: 2px;
			border-radius: 5px;
			position: fixed;
			left: 50%;
			width: 300px;
			margin-left: -150px;
			padding-left: 15px;
			padding-right: 15px;
			padding-top: 15px;
			color: white;
			text-shadow: -0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black;
		}
		#error {
			color: rgba(255, 0, 0, 1);
			background-color: rgba(192, 192, 192, .4);	
			visibility: hidden;
			text-align: center;
			padding-top: 4px;
			padding-bottom: 4px;
		}
		#loginBtn {
			left: 50%;
			width: 100px;
			margin-left: 100px;
			margin-top:20px;
			text-align:center;
			border:1px solid #7c5b2b; -webkit-border-radius: 3px; -moz-border-radius: 3px;border-radius: 3px;font-family:arial, helvetica, sans-serif; padding: 10px 10px 10px 10px; text-shadow: -1px -1px 0 rgba(0,0,0,0.3);font-weight:bold; text-align: center; color: #FFFFFF; background-color: #a67939;
			background-image: -webkit-gradient(linear, left top, left bottom, from(#a67939), to(#845108));
			background-image: -webkit-linear-gradient(top, #a67939, #845108);
			background-image: -moz-linear-gradient(top, #a67939, #845108);
			background-image: -ms-linear-gradient(top, #a67939, #845108);
			background-image: -o-linear-gradient(top, #a67939, #845108);
			background-image: linear-gradient(to bottom, #a67939, #845108);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#a67939, endColorstr=#845108);
		}

		#loginBtn:hover {
			border:1px solid #5a421f; background-color: #805d2c;
			background-image: -webkit-gradient(linear, left top, left bottom, from(#805d2c), top(#543305));
			background-image: -webkit-linear-gradient(top, #805d2c, #543305);
			background-image: -moz-linear-gradient(top, #805d2c, #543305);
			background-image: -ms-linear-gradient(top, #805d2c, #543305);
			background-image: -o-linear-gradient(top, #805d2c, #543305);
			background-image: linear-gradient(to bottom, #805d2c, #543305);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#805d2c, endColorstr=#543305);
		}
	</style>
	<script>
		function loginAndLoadImage() {
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					setUserIdAndSubmit();
				}
				else {
					//Not authorized or not logged in
					FB.Event.subscribe('auth.login', function(response) {
						setUserIdAndSubmit();
					});
					login();
				}
			});
		}

		function setUserIdAndSubmit()
		{
			var userID = (FB.getAuthResponse() || {}).userID;
			document.getElementById("userID").value = userID;
			document.input.submit();
		}

		function process() {
			var url = document.getElementById("url").value;
  			var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
 				'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  				'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
	  			'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
				'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
			if (pattern.test(url)) {
				if (document.getElementById("facebookCheckbox").checked == true) {
					loginAndLoadImage();
				} else {
					document.getElementById("userID").value = "";
					document.input.submit();
				}
			} else {
				document.getElementById("error").style.visibility = 	"visible";
				return false;
			}

		}
		
		window.fbAsyncInit = function() {
			// init the FB JS SDK
			FB.init({
			  appId      : '349780001790066', // App ID from the App Dashboard
			  status     : true, // check the login status upon init?
			  cookie     : true, // set sessions cookies to allow your server to access the session?
			  xfbml      : true  // parse XFBML tags on this page?
			});
		};


		function login() {
			FB.login(function(response) {
			});
		}
		
		// Load the SDK Asynchronously
		(function(d){
			var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement('script'); js.id = id; js.async = true;
			js.src = "//connect.facebook.net/en_US/all.js";
			ref.parentNode.insertBefore(js, ref);
		}(document))
	</script>
</body>
</html>