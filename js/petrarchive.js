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

// currently all the petrarchive JS modules/functions/variables are 
// in this single file. In the near-future, once John and I are more 
// in flow of collaborating together, I will suggest that we use 
// ES6 Javascript, which will allow for ES6 modules instead of 
// Loading scripts the old way and sticking everything in one file

// This is the 'init' function that initiates everything
$(document).ready(function() {
  window.PT = new Petrarchive()
  PT.nav = new NavUtil()
  PT.commentary = new CommentaryUtil()

  PT.setup()
  PT.events()
  PT.stylingHacks()
})

function Petrarchive() {
  var that = this

  this.toggleElement = function(node, id, display) {
    // If display parameter not supplied then go with default jQuery.toggle()
    if (!display) 
      $('#' + id).toggle()
    else
      $('#' + id).toggleClass('display-' + display)
  }

  this.switchCustomCSS = function (theme) {
    document.getElementById('customcss').href=theme.options[theme.selectedIndex].value
  }
}

Petrarchive.prototype.setup = function() {

}

Petrarchive.prototype.events = function() {
  // Popup the facs image in a lightbox
  $('a.gallery-facs').magnificPopup({
    type: 'image',
    overflowY: 'scroll' 
  })
}

Petrarchive.prototype.stylingHacks = function() {
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

function NavUtil() {
  this.current = new PetrarchiveDocument(document.URL)

  var previous = $('#teibpToolbox nav a.previous'),
      next = $('#teibpToolbox nav a.next');

  var nextCh, nextRV, nextName, nextDoc;
  var prevCh, prevRV, prevName, prevDoc;

  if (this.current.rv == 'r') {
    nextRV = 'v'
    nextCh = this.current.charta

    prevRV = 'v'
    prevCh = (+this.current.charta) - 1
  } else {
    nextRV = 'r'

    // Turn currentCh string into number then subtract 1
    nextCh = (+this.current.charta) + 1

    prevRV = 'r'
    prevCh = this.current.charta
  }

  // Then convert nextCh back to string with 3 decimal places
  var s = "00" + nextCh
  nextName = s.substr(s.length - 3)

  s = "00" + prevCh
  prevName = s.substr(s.length - 3)

  nextDoc = 'c' + nextName + nextRV + '.xml'
  prevDoc = 'c' + prevName + prevRV + '.xml'

  next.attr('href', nextDoc)
  previous.attr('href', prevDoc)
}

function CommentaryUtil() {
  var that = this

  this.$element = $('#commentary')
  this.$content = $('#commentary main')
  this.navMeta

  this.events(this)

  this.activate = function() {
    this.$element.addClass('active')
    this.refreshNavMeta()
  }
  this.deactivate = function() {
    this.$element.removeClass('active')
  }

  this.refreshNavMeta = function() {
    this.navMeta = $('nav.commentary a').map(function() {
      var split = this.href.split('#')
      var hash = split[split.length - 1]

      return {
        hash: hash,
        top: document.querySelector('#' + hash).offsetTop
      }
    })
  }
}

CommentaryUtil.prototype.events = function(scope) {
  var that = scope

   // Links that toggle commentary section, which is hidden by default
  $('a.commentary-activate').click(function(ev) {
    if (that.$element.hasClass('active')) {
      that.deactivate()
    } else {
      that.activate()
    }
  })

   // Navigation between different sections of commentary
  $('nav.commentary a').click(function(ev) {

    $('nav.commentary a').removeClass('active')

    $(ev.delegateTarget).addClass('active')
  })

  $(window).resize(function() {
    that.refreshNavMeta()
  })

  that.$content.scroll(function(ev) {
    var scrollTop = ev.target.scrollTop

    var filtered = that.navMeta.filter(function(i, el) {
      return scrollTop >= el.top
    })

    var active = filtered[filtered.length - 1]

    $('nav.commentary a').removeClass('active')
    $('nav.commentary a[href="#' +  active.hash + '"]').addClass('active')
  })
}

function PetrarchiveDocument(url) {
  this.url = url || undefined

  this.urlSplit = this.url.split('/')
  this.doc = this.urlSplit[this.urlSplit.length - 1]
  this.hash = this.doc.split('#')[1]

  this.name = this.doc.split('.')[0]
  this.charta = this.name.split('_')[0].substring(1,4)
  this.rv = this.name.split('_')[0].substring(4,5)

  // When the name of the document is split by underscores,
  // the length will be longer than 1 if it is commentary since file names
  // should be c00x_with_commentary
  this.commentary = this.name.split('_').length > 1
}