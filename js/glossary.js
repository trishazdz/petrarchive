import $ from 'jquery'

import 'bootstrap'

import util_browser from './utils/browser'

$(document).ready(function() {
    util_browser.turboXml('./glossary.xml', './petrarchive.xsl').then(function(xmlResult) {
        let tei = $(xmlResult).find('text')
        let teiHeader = $(xmlResult).find('teiHeader')

        console.log(xmlResult)
        
        $('main.container').html(teiHeader.html())
        $('main.glossary').html(tei.html())

        insertIntoNav('main.glossary entry', 'aside.nav', 'orth')

        $('aside.nav a').click(function(ev) {
          let headerHeight = $('#sticky-header').height()
          setTimeout(function() {
            $(window).scrollTop($(window).scrollTop() - (headerHeight * 1.4))
          }, 10)
    
          // wait for click even to go through and then readjust the scroll 
          // so that the sticky header does not cover content
          return true
        })
    })
  })

  function insertIntoNav(queryString, nav, navTextQuery) {
    let elements = $(queryString)
    elements.each(function(i, el) {
      let navText,
          $el = $(el),
          href = $el.attr('id');
      
      if (navTextQuery)
        navText = $el.find(navTextQuery)[0] ? $el.find(navTextQuery)[0].innerHTML : undefined;
      
      if (!navText)
        navText = $el.attr('id');
      
      let html = `<a href="#${href}">${navText}</a>`
      $(nav).append(html)
    })
  }