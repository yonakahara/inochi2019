function hideSingleOrTeam(hide) {
	document.getElementById("toggleForm1").style.display = hide ? "none" : "block";
	document.getElementById("toggleForm1").disabled = hide ? true : false;
}

function disableMemberTextboxes(disable) {
	var nodes = document.getElementById("memberNames").getElementsByTagName("input");
	for(var i = 0; i < nodes.length; i++) nodes[i].disabled = disable;
}