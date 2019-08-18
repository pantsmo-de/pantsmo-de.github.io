var dark = false;
function switchTheme() {
	if(!dark) document.getElementById("pagestyle").setAttribute("href", "css/styleDark.css");
	else document.getElementById("pagestyle").setAttribute("href", "css/styleLight.css");
	dark = !dark;
}