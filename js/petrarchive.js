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
  var that = this

  this.current = {
    url: document.URL,
    urlSplit: undefined,
    doc: undefined,
    name: undefined,
    charta: undefined,
    rv: undefined
  }

  this.current.urlSplit = this.current.url.split('/')
  this.current.doc = this.current.urlSplit[this.current.urlSplit.length - 1]
  this.current.name = this.current.doc.split('.')[0]
  this.current.charta = this.current.name.split('_')[0].substring(1,4)
  this.current.rv = this.current.name.split('_')[0].substring(4,5)

  this.toggleElement = function(node, id, display) {
    // If display parameter not supplied then go with default jQuery.toggle()
    if (!display) 
      $('#' + id).toggle()
    else
      $('#' + id).toggleClass('display-' + display)
  }

  this.toggleCommentary = function(ev) {
    this.toggleElement(undefined, 'commentary')
  }

  this.switchCustomCSS = function (theme) {
    document.getElementById('customcss').href=theme.options[theme.selectedIndex].value
  }

  this.nav = {
    previous: function() {
      var prevCh, prevRV, prevName;

      if (that.current.rv == 'v') {
        prevRV = 'r'
        prevCh = that.current.charta
      } else {
        prevRV = 'v'

        // Turn currentCh string into number then subtract 1
        prevCh = (+that.current.charta) - 1
        // Then convert prevCh back to string with 3 decimal places
        var s = "00" + prevCh
        prevCh = s.substr(s.length - 3)
      }

      prevName = 'c' + prevCh + prevRV + '.xml'
      window.location.href = prevName
    },

    next: function() {
      var nextCh, nextRV, nextName;

      if (that.current.rv == 'r') {
        nextRV = 'v'
        nextCh = that.current.charta
      } else {
        nextRV = 'r'

        // Turn currentCh string into number then subtract 1
        nextCh = (+that.current.charta) + 1
        // Then convert nextCh back to string with 3 decimal places
        var s = "00" + nextCh
        nextCh = s.substr(s.length - 3)
      }

      nextName = 'c' + nextCh + nextRV + '.xml'
      window.location.href = nextName
    }
  }

}

// This is the 'init' function that initiates everything
$(document).ready(function() {
  window.PT = new Petrarchive()

  events()
  stylingHacks()
})

function events() {
  // Links that toggle commentary section, which is hidden by default
  $('a.commentary-activate').click(function(ev) {
    PT.toggleCommentary(ev)
  })

  // Popup the facs image in a lightbox
  $('a.gallery-facs').magnificPopup({
    type: 'image',
    overflowY: 'scroll'
  })

  // Navigation between different sections of commentary
  $('nav.commentary li').click(function(ev) {

    $('nav.commentary li').removeClass('active')

    $(ev.delegateTarget)
      .addClass('active')
  })
}

function stylingHacks() {
  /***********************
   Using javascript to style elements which aren't able 
   to be reached with CSS due to being uner XML Elements.

   Possibly consider using addClass method and moving all the 
   styling rules to a seaparte css sheet if using jquery.css
   proves unmaintnable. Fine for current edge case/s

   Holding off on styling hacks for now to see if John can fix
   Underlying issues in xslt
  ************************/
}