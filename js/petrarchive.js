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
  // deprecate
  PT.toggleElement(undefined, id)
}

var Petrarchive = function() {
  this.toggleElement = function(node, id, display) {
    // If display parameter not supplied then go with default jQuery.toggle()
    if (!display) 
      $('#' + id).toggle()
    else
      $('#' + id).toggleClass('display-' + display)
  }
}

$(document).ready(function() {
  window.PT = new Petrarchive()
})

