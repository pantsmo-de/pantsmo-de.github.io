var dark = false;


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var mode = getCookie("mode");
if(mode == "dark") {
	dark = true;
	document.getElementById("pagestyle").setAttribute("href", "css/styleDark.css");
}

function switchTheme() {
	if(!dark) {
		document.getElementById("pagestyle").setAttribute("href", "css/styleDark.css");
		document.cookie = "mode=dark";
	}
	else {
		document.getElementById("pagestyle").setAttribute("href", "css/styleLight.css");
		document.cookie = "mode=light";
	}
	dark = !dark;
}