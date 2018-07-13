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

  this.previous.click(function(ev) {
    var facsActive = util_browser.getParam("facs")
    if (facsActive) {
      that.previous.attr('href', that.previous.attr('href') + "?facs=active")
    }
  })

  this.next.click(function(ev) {
    var facsActive = util_browser.getParam("facs")
    if (facsActive) {
      that.next.attr('href', that.next.attr('href') + "?facs=active")
    }

    $.get(
      {
        url: that.next.attr('href'), 
        dataType: 'text'
      }, 
      function(res) {
        var xmlDoc = $.parseXML(res)
        console.log(xmlDoc)
    })
    
    ev.preventDefault()
  })
}

NavUtil.prototype.setupPrevHref = function() {
  var firstCh = this.current.getChartaFirst()

  if (firstCh.charta == '001' && firstCh.rv == 'r') {
    this.previous.attr('disabled', true)

    return null
  }
  var prevName = firstCh.getPrevCh()
  prevDoc = this.chartaMeta[prevName]

  if (!prevDoc) {
    return 'charta-404.xml?incomplete=true&ch=' + prevName
  }

  if ("document" in prevDoc) {
    url = prevDoc.document

    // Handle Multiple doc scenario... where more than one charta is handled in one xml document
    if (url == this.name) {
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

NavUtil.prototype.setupNextHref = function() {
  var nextName = this.current.getChartaLast().getNextCh()
  nextDoc = this.chartaMeta[nextName]

  if (!nextDoc) {
    return 'charta-404.xml?incomplete=true&ch=' + nextName
  }

  if ("document" in nextDoc) {
    url = nextDoc.document

    // Handle Multiple doc scenario... where more than one charta is handled in one xml document
    if (url == this.name) {
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

