function NavUtil() {  
  if (util_browser.getParam('incomplete')) {
    this.current = new PetrarchiveDocument(undefined, util_browser.getParam('ch'))
  } else {
    this.current = new PetrarchiveDocument(document.URL)
  }

  this.previous = $('#page-nav a.previous')
  this.next = $('#page-nav a.next')

  this._theme = ko.observable('diplomatic')

  this.events()
}

NavUtil.prototype.refresh = function() {
  if (util_browser.getParam('incomplete')) {
    this.current = new PetrarchiveDocument(undefined, util_browser.getParam('ch'))
  } else {
    this.current = new PetrarchiveDocument(document.URL)
  }

  this.next.attr('href', this.setupNextHref())
  this.previous.attr('href', this.setupPrevHref())

  this.next.removeClass('hide')
  this.previous.removeClass('hide')
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

    that.navigateTo(that.previous.attr('href'))

    ev.preventDefault()
  })

  this.next.click(function(ev) {
    var facsActive = util_browser.getParam("facs")
    if (facsActive) {
      that.next.attr('href', that.next.attr('href') + "?facs=active")
    }

    that.navigateTo(that.next.attr('href'))

    ev.preventDefault()
  })
}

NavUtil.prototype.navigateTo = function(href) {
  var that = this

  var newDoc = new PetrarchiveDocument(href)
  
  if (newDoc.name == this.current.name) {
    history.pushState({}, null, href)
    poemInit()
    return
  }

  $.get(
    {
      url: href, 
      dataType: 'text'
    }, 
    function(res) {
      var xmlDoc = $.parseXML(res)

      $.get('./petrarchive.xsl', function(xsl){
        var result = new XSLTProcessor()
        result.importStylesheet(xsl)
        result = result.transformToDocument(xmlDoc)

        var tei = $(result).find('#tei_wrapper tei')
        $('#tei_wrapper tei').html(tei.html())
        history.pushState({}, null, href)
        poemInit()
      })
  })
  
}

NavUtil.prototype.setupPrevHref = function() {
  var firstCh = this.current.getChartaFirst()

  if (firstCh.charta == '001' && firstCh.rv == 'r') {
    this.previous.attr('disabled', true)

    return null
  } else {
    this.previous.removeAttr('disabled')
  }

  var prevName = firstCh.getPrevCh()

  var regex = new RegExp(prevName)

  var links = $('#poem-textindex tbody tr td:first-child a').toArray()
  var prevLink = links.find(function(a) {
    var href = $(a).attr('href')
    return regex.test(href)
  })

 /*

  if (!prevDoc) {
    return 'charta-404.xml?incomplete=true&ch=' + prevName
  }

  if ("document" in prevDoc) {
    url = prevDoc.document

    // Handle Multiple doc scenario... where more than one charta is handled in one xml document
    if (url == this.name) {
      return url = this.setupPrevHref(url.split('-')[0])
    }
  } else {
    url = 'c' + prevName 
  } */

  return $(prevLink).attr('href')
}

NavUtil.prototype.setupNextHref = function() {
  var nextName = this.current.getChartaLast().getNextCh()
  var regex = new RegExp(nextName)

  var links = $('#poem-textindex tbody tr td:first-child a').toArray()
  var nextLink = links.find(function(a) {
    var href = $(a).attr('href')
    return regex.test(href)
  })

  /*if (!nextDoc) {
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
  } */

  return $(nextLink).attr('href')
}

