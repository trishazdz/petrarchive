
function NavUtil() {
  this.current = new PetrarchiveDocument(document.URL)

  this.previous = $('#page-nav a.previous')
  this.next = $('#page-nav a.next')

  this._theme = ko.observable('diplomatic')

  var that = this
  $.getJSON("../charta-meta.json", function(meta) {
    that.chartaMeta = meta

    that.next.attr('href', that.setupNextHref())
    that.previous.attr('href', that.setupPrevHref())

    that.events()
  })
}

NavUtil.prototype.events = function() {
  var that = this

  this.previous.hover(function(ev) {
    console.log(ev)
  })

  this.next.hover(function(ev) {
    console.log(ev)
  })

  $('.themeBox label').click(function(ev) {
    var newValue = $(ev.delegateTarget).children('input').attr('value')
    that._theme(newValue)

    var dict = {
      diplomatic: '../css/custom.css',
      edited: '../css/custom_norm.css'
    }

    var stylesheet = dict[that._theme()]
    document.getElementById('customcss').href=stylesheet
  })

  $('#page-nav .charta-no').click(function(ev) {
    that.toggleChartaViz()
  })
}

NavUtil.prototype.toggleChartaViz = function() {
  
}

NavUtil.prototype.setupPrevHref = function() {
  var prevCh, prevRV, prevName, prevDoc, url;

  var current;

  if (name) {
    current = new PetrarchiveDocument(false, name)
  } else {
    current = this.current
  }

  if (current.rv == 'r') {
    prevRV = 'v'
    prevCh = (+current.charta) - 1
  } else {
    prevRV = 'r'
    prevCh = current.charta
  }

  // Then convert nextCh back to string with 3 decimal places
  s = "00" + prevCh
  prevName = s.substr(s.length - 3) + prevRV

  prevDoc = this.chartaMeta[prevName]
  if (!prevDoc) {
    this.previous.attr('disabled', true)

    return null
  }

  if ("document" in prevDoc) {
    url = prevDoc.document

    // Handle Multiple doc scenario... where more than one charta is handled in one xml document
    if (url == current.name) {
      return url = this.setupPrevHref(url.split('-')[0])
    }

    if (prevDoc.commentary) {
      url += '_with_commentary'
    }
  } else {
    url = 'c' + prevName 

    if (prevDoc.commentary) {
      url += '_with_commentary'
    }
  }

  return url + '.xml'
}

NavUtil.prototype.setupNextHref = function(name) {
  var nextCh, nextRV, nextName, nextDoc;
  var current;

  if (name) {
    current = new PetrarchiveDocument(false, name)
  } else {
    current = this.current
  }

  if (current.rv == 'r') {
    nextRV = 'v'
    nextCh = current.charta
  } else {
    nextRV = 'r'

    // Turn currentCh string into number then subtract 1
    nextCh = (+current.charta) + 1
  }

  // Then convert nextCh back to string with 3 decimal places
  var s = "00" + nextCh
  nextName = s.substr(s.length - 3) + nextRV

  nextDoc = this.chartaMeta[nextName]

  if (!nextDoc) {
    this.next.attr('disabled', true)
    return null
  }

  if ("document" in nextDoc) {
    url = nextDoc.document

    // Handle Multiple doc scenario... where more than one charta is handled in one xml document
    if (url == current.name) {
      return url = this.setupNextHref(url.split('-')[1])
    }

    if (nextDoc.commentary) {
      url += '_with_commentary'
    }
  } else {
    url = 'c' + nextName 

    if (nextDoc.commentary) {
      url += '_with_commentary'
    }
  }

  return url + '.xml'
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
