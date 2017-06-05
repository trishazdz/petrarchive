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

  this.toggleCommentary = function() {
    this.toggleElement(undefined, 'commentary')
  }
}

$(document).ready(function() {
  window.PT = new Petrarchive()

  events()
  stylingHacks()
})

function events() {
  $('a.commentary-activate').click(function() {
    PT.toggleCommentary()
  })

  $('a.gallery-facs').magnificPopup({
    type: 'image',
    overflowY: 'scroll'
  })
}

function stylingHacks() {
  /***********************
   Using javascript to style elements which aren't able 
   to be reached with CSS due to being uner XML Elements.

   Possibly consider using addClass method and moving all the 
   styling rules to a seaparte css sheet if using jquery.css
   proves unmaintnable. Fine for current edge case/s
  ************************/

  // First <span class="poem-number"> mysteriously got misstyled
  // Once I switched the <DOCTYPE> declaration to HTML
}