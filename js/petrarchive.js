function showHide (maniculeId, idToShow, idToHide) {
  hide = "#" + idToHide;
  show = "#" + idToShow;
  manicule = "#" + maniculeId;
  $(hide).css("display","none");
  $(show ).css("display","block");
  newFunction = "showHide('" + maniculeId + "','" + idToHide + "','" + idToShow + "');";
  $(manicule).attr("onclick", newFunction);
}

function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
}

function switchCustomCSS(theme) {
	document.getElementById('customcss').href=theme.options[theme.selectedIndex].value;
}

function revealCommentary(mode,id) {
    var e = document.getElementById(id);
    if (mode.options[mode.selectedIndex].value == 'show') {
	console.log(mode.selectedIndex);
        e.style.display = 'block';
    } else {
      	console.log(mode.selectedIndex);
        e.style.display = 'none';
    }
}
