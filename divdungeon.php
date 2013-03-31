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
			Dungeon (url): <input type="text" id="url" name="URL">
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
		#loginBtn {
			left: 50%;
			width: 60px;
			margin-left: 120px;
			margin-top:20px;
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
				loginAndLoadImage();
			}
			return false;
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