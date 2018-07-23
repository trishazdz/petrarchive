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
    that.navigateTo(that.previous.attr('href'))

    ev.preventDefault()
  })

  this.next.click(function(ev) {
    that.navigateTo(that.next.attr('href'))

    ev.preventDefault()
  })
}

NavUtil.prototype.navigateTo = function(href) {
  var that = this

  var newDoc = new PetrarchiveDocument(href)

  if (util_browser.getParam("facs")) {
    if (newDoc.hash) {
      href = newDoc.url.split('#')[0] + "?facs=active" + "#" + newDoc.hash
    } else {
      href += "?facs=active"
    }
  }
  
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

  return $(nextLink).attr('href')
}

