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
  PT.facsimile = new Facsimile({
    anchor: $('a.gallery-facs'),
    ui: $('#pt-facs')
  })
})

function Petrarchive() {
  var that = this

  this.events()
  this.stylingHacks()

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

Petrarchive.prototype.events = function() {

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

  next.attr('href', this.setupNextHref()) 
  previous.attr('href', this.setupPrevHref())
}

NavUtil.prototype.setupPrevHref = function() {
  var prevCh, prevRV, prevName, prevDoc;

  if (this.current.rv == 'r') {
    prevRV = 'v'
    prevCh = (+this.current.charta) - 1
  } else {
    prevRV = 'r'
    prevCh = this.current.charta
  }

  // Then convert nextCh back to string with 3 decimal places
  s = "00" + prevCh
  prevName = s.substr(s.length - 3)

  return this.handleAnamolies(prevName, prevRV , 'previous')
}

NavUtil.prototype.setupNextHref = function() {
  var nextCh, nextRV, nextName, nextDoc;

  if (this.current.rv == 'r') {
    nextRV = 'v'
    nextCh = this.current.charta
  } else {
    nextRV = 'r'

    // Turn currentCh string into number then subtract 1
    nextCh = (+this.current.charta) + 1
  }

  // Then convert nextCh back to string with 3 decimal places
  var s = "00" + nextCh
  nextName = s.substr(s.length - 3)

  return this.handleAnamolies(nextName, nextRV, 'next')
}

NavUtil.prototype.handleAnamolies = function(name, rv, direction) {
  // Direction is whether navigation direction is going 'next' or 'previous'

  var forbiddenNames = [
    '000'
  ]

  var isInvalid = forbiddenNames.find(function(el) {
    if (name == el) {
      return true
    }
  })

  if (isInvalid) { return '#' }

  var anamolies = [
    {
      name: '004',
      rv: 'r',
      correction: 'c004r-c005r'
    },
    {
      name: '004',
      rv: 'v',
      correction: 'c005v-c007r'
    },
    {
      name: '005',
      rv: 'v',
      correction: 'c005v-c007r'
    },
    {
      name: '005',
      rv: 'r',
      correction: 'c004r-c005r'
    },
    {
      name: '006',
      rv: 'r',
      correction: 'c007v'
    },
    {
      name: '007',
      rv: 'r',
      correction: 'c005v-c007r'
    },
    {
      name: '008',
      rv: 'v',
      correction: 'c008v-c009v'
    },
    {
      name: '009',
      rv: 'r',
      correction: 'c010r'
    },
    {
      name: '009',
      rv: 'v',
      correction: 'c008v-c009v'
    },
    {
      name: '011',
      rv: 'r',
      correction: 'c011r-c011v'
    },
    {
      name: '011',
      rv: 'v',
      correction: {
        next: 'c012r-c012v',
        previous: 'c011r-c011v'
      }
    },
    {
      name: '012',
      rv: 'v',
      correction: {
        next: 'c013r-c013v',
        previous: 'c012r-c012v'
      }
    },
    {
      name: '013',
      rv: 'v',
      correction: {
        next: 'c014r',
        previous: 'c013r-c013v'
      }
    },
    {
      name: '015',
      rv: 'r',
      correction: 'c015r-c018v'
    },
    {
      name: '015',
      rv: 'v',
      correction: 'c019r'
    },
    {
      name: '018',
      rv: 'v',
      correction: 'c015r-c018v'
    }

  ]

  var isAnamoly = anamolies.find(function(el) {
    if (name == el.name && rv == el.rv) {
      return true
    }
  })

  if (!isAnamoly) {
    return 'c' + name + rv + '.xml'
  } else {

    if (typeof isAnamoly.correction === 'string') {
      return isAnamoly.correction + '.xml'
    } else {
      return isAnamoly.correction[direction] + '.xml'
    }
  }
}

function CommentaryUtil() {
  var that = this

  this.$element = $('#commentary')
  this.$content = $('#commentary main')
  this.navMeta

  this.events()

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


  if (window.location.hash) {
    var hash = window.location.hash
    this.activate()
    window.location.hash = 'dummyhash'

    location.hash = hash
  }
}

CommentaryUtil.prototype.events = function() {
  var that = this

   // Links that toggle commentary section, which is hidden by default
  $('a.commentary-activate').click(function(ev) {
    if (that.$element.hasClass('active')) {
      that.deactivate()
    } else {
      that.activate()
    }
  })

  $('div.commentary header button.close').click(function(ev) {
    that.deactivate()
    window.location.hash = ''
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