function clearPageBreaks(){
	$("pb").css("display","none");
	$(".-teibp-pb").css("display","none");
}

function addPageBreaks(){
	$("pb").css("display","block");	
	$(".-teibp-pb").css("display","block");

}

function showHide (maniculeId, idToShow, idToHide) {
  hide = "#" + idToHide;
  show = "#" + idToShow;
  manicule = "#" + maniculeId;
  $(hide).css("display","none");
  $(show ).css("display","block");
  newFunction = "showHide('" + maniculeId + "','" + idToHide + "','" + idToShow + "');";
  $(manicule).attr("onclick", newFunction);
}