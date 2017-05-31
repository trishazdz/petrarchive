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

  this.commentary = {
    toggled: false,
    activeIndex: ko.observable(0),

    isSectionActive: ko.pureComputed(function() {
      return this.commentary.activeIndex()
    }, this)
  }

  this.toggleCommentary = function() {
    this.toggleElement(undefined, 'commentary')
    this.commentary.toggled = !this.commentary.toggled
  }

  this.howdy = function(data, ev) {
    console.log(data, ev)
  }
}

$(document).ready(function() {
  window.PT = new Petrarchive()
  ko.applyBindings(PT)

  $('a.commentary-activate').click(function() {
    PT.toggleCommentary()
  })

})

