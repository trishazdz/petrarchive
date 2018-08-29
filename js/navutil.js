import $ from 'jquery'
import ko from 'knockout'

import util_browser from './utils/browser'
import PetrarchiveDocument from './petrarchivedocument'

export default NavUtil

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

  this.setupPrevHref()
  this.setupNextHref()

  this.next.removeClass('hide')
  this.previous.removeClass('hide')
}

NavUtil.prototype.events = function() {
  const that = this

  $('.themeBox label').click(function(ev) {
    let newValue = $(ev.delegateTarget).children('input').attr('value')
    that._theme(newValue)

    let dict = {
      diplomatic: '../css/custom.css',
      edited: '../css/custom_norm.css'
    }

    let stylesheet = dict[that._theme()]
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
  const that = this

  let newDoc = new PetrarchiveDocument(href)

  if (util_browser.getParam("facs")) {
    if (newDoc.hash) {
      href = newDoc.url.split('#')[0] + "?facs=active" + "#" + newDoc.hash
    } else {
      href += "?facs=active"
    }
  }
  
  if (newDoc.name == this.current.name) {
    history.pushState({}, null, href)
    $(document).trigger('Petrarchive:async-load')

    return
  }

  $.get(
    {
      url: href, 
      dataType: 'text'
    }, 
    function(res) {

      let xmlDoc = $.parseXML(res)

      if (this.xsl) {
        //TODO : Figure out why this still
        //evokes extra network calls
        applyXsl(this.xsl)
      }
      else {
        $.get(
          {
            url: './petrarchive.xsl',
            dataType: 'xml'
          },
          function(xsl){
            that.xsl = xsl
            applyXsl(xsl)
          }
        )
      }

      function applyXsl(xsl) {
        let result = new XSLTProcessor()
        result.importStylesheet(xsl)
        result = result.transformToDocument(xmlDoc)

        let tei = $(result).find('#tei_wrapper')

        $('#tei_wrapper').html(tei.html())
        history.pushState({}, null, href)
        $(document).trigger('Petrarchive:async-load')
      }
    }
  )

}

NavUtil.prototype.setupPrevHref = function() {
  let firstCh = this.current.getChartaFirst()

  if (firstCh.charta == '001' && firstCh.rv == 'r') {
    this.previous.attr('disabled', true)

    return null
  } else {
    this.previous.removeAttr('disabled')
  }

  let prevName = firstCh.getPrevCh(),
      regex = new RegExp(prevName),
      links = $('#poem-textindex tbody tr td:first-child a').toArray();
    
  let prevLink = links.find(function(a) {
    let href = $(a).attr('href')
    return regex.test(href)
  })

  let href = $(prevLink).attr('href') 

  this.previous.attr('href', href)
}

NavUtil.prototype.setupNextHref = function() {
  let nextName = this.current.getChartaLast().getNextCh(),
      regex = new RegExp(nextName),
      links = $('#poem-textindex tbody tr td:first-child a').toArray();
  
      console.log(links)

  let nextLink = links.find(function(a) {
    let href = $(a).attr('href')
    //console.log(href, regex.test(href))
    return regex.test(href)
  })

  let href = $(nextLink).attr('href')

  this.next.attr('href', href)
}

