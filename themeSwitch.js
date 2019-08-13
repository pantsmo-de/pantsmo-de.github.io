function switchTheme() {
	var check = document.getElementById("darkMode");
	if(check.checked == true) {
		document.getElementById("pagestyle").setAttribute("href", "css/styleDark.css");
	} else {
		document.getElementById("pagestyle").setAttribute("href", "css/styleLight.css");
	}
}