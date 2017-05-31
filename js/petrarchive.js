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

// This list contains:
// 1. Top level Headers for the commentary navigation
// 2. Children sections which will be contained within headers               
var commentaryNav = [
  {
    name: 'Introduction &amp; prosody',
    sections: [
      'introduction',
      'prosodic'
    ]
  },
  {
    name: 'Genesis &amp; diplomatic condition',
    sections: [
      'syntactic',
      'historical',
      'physical'
    ]
  },
  {
    name: 'Syntax, variants, &amp; language',
    sections: [
      'variants',
      'language'
    ]
  },
  {
    name: 'Thematics',
    sections: [
      'thematic'
    ]
  },
  {
    name: 'Translation',
    sections: ['translation']
  }
]

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

    nav: commentaryNav.map(function(el, i, arr) {
      // check if ele
    })
  }

  this.toggleCommentary = function() {
    this.toggleElement(undefined, 'commentary')
    this.commentary.toggled = !this.commentary.toggled
  }
}

$(document).ready(function() {
  window.PT = new Petrarchive()
  ko.applyBindings(PT)

  $('a.commentary-activate').click(function() {
    PT.toggleCommentary()
  })

})

