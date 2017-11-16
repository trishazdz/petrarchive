function NavUtil() {
  if (util_browser.getParam('incomplete')) {
    this.current = new PetrarchiveDocument(undefined, util_browser.getParam('ch'))
  } else {
    this.current = new PetrarchiveDocument(document.URL)
  }

  this.previous = $('#page-nav a.previous')
  this.next = $('#page-nav a.next')

  this._theme = ko.observable('diplomatic')

  var that = this
  $.getJSON("../charta-meta.json", function(meta) {
    that.chartaMeta = meta

    that.next.attr('href', that.setupNextHref())
    that.previous.attr('href', that.setupPrevHref())

    that.next.removeClass('hide')
    that.previous.removeClass('hide')

    that.events()
  })
}

NavUtil.prototype.events = function() {
  var that = this

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

  console.log(current)

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

  if (current.charta == '001' && current.rv == 'r') {
    this.previous.attr('disabled', true)

    return null
  }

  if (!prevDoc) {
    return 'charta-404.xml?incomplete=true&ch=' + prevName
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
    return 'charta-404.xml?incomplete=true&ch=' + nextName
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

