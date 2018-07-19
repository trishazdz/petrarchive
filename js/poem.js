// This is the 'init'/bootstrap function that gets everything started
$(document).ready(function() {
  poemInit()
})

function poemInit() {
  if (!window.PT) {
    window.PT = new Petrarchive()
  } else {
    window.PT.refresh()
  }

  setupRvf()

  setupPageNum()
  setupTextindex()

  // Too many edge cases to address solely using CSS
  // using JS for some styling
  applyStyling()


  // When hash is clicked we need to give it a vertical cushion equal to 2x the sticky header.
  // This is because browser loads webpage right at <a> of respective hash tag and will be blocked
  // by sticy header
  if (window.location.hash) {
    setTimeout(function() {
     window.PT.scrollTo(window.location.hash)

     var currentScroll = $('.content-container').scrollTop()

    // $('.content-container').scrollTop(currentScroll - ($('#sticky-header').height() * 2))
    }, 0)
  } else {
    window.PT.scrollTo()
  }

  if (util_browser.getParam('ch')) {
    var charta = util_browser.getParam('ch')

    window.PT.scrollTo(charta)
  } 
}



function setupPageNum() {
  var pageNum,
      $pageNum = $('.-teibp-pageNum'),
      pages = window.PT.nav.current.getChartae();

  if (pages.length == 1) {
    pageNum = 'charta ' + pages[0].getPrettyName()
  } 
  else if (pages.length > 1) {
    pageNum = 'chartae ' + pages[0].getPrettyName() + ' - ' + pages[pages.length-1].getPrettyName()
  }

  $('#sticky-header .charta-no').text(pageNum)
}

function setupTextindex() {
  var element = '#poem-textindex',
      button = $('#page-nav .page-number'),
      textindex = $(element);
    
  if (textindex.attr('data-loaded') && textindex.attr('data-events-loaded')) {
    return
  } 

  if (!textindex.attr('data-events-loaded')) {
    // put this into petrarchive.xsl
    $.get('../textindex.html', function(html) {
      var $html = $(html),
          header = $html.children('header'),
          table = $html.find('table');

      textindex.find('.modal-content').html('<table></table>')
      textindex.find('.modal-content table').append(table.html())

      PT.convertUrl()

      window.PT.nav.refresh()
    })

    textindex.click(function(ev) {
      if (ev.target.localName == 'a') {
        window.PT.nav.navigateTo($(ev.target).attr('href'))
        ev.preventDefault()
      }
    })

    textindex.attr('data-events-loaded', true)
  }

  $(element).on('shown.bs.modal', function () {
    if (textindex.attr('data-loaded')) {
      return
    } 

    textindex.attr('data-loaded', true) 

    var table = textindex.find('tbody')

    // Fix header and format it
    var header = textindex.find('thead')
    header.css('position', 'fixed')
      .css('background', 'white')

    var columns = table.find('tr:first-child td')
    
    columns.each(function(i, col) {
      var child = i + 1
      header.find('th:nth-child(' + child + ')').css('width', $(col).width())
    })

    // Scroll to current active charta
    var active = PT.nav.current.getChartaFirst().getPrettyNameTextindex()
    table.find('tr:first-child td').css('padding-top', header.height())

    var trArray = table.children('tr').toArray()
    var activeTr = trArray.find(function(tr) {
      let charta = $(tr).children('td:nth-child(2)')
      return charta.text() == String(active)
    })

    var scrollTo = $(activeTr).offset().top - $(activeTr).height()
    $('.modal-content').scrollTop(scrollTo)
  })
}

function applyStyling() {
  // Apply indent to lg[type='dblvrs'] first line when pillcrow is first character  
  var lg = $("lg[type='dblvrs']")
  lg.each(function(i, el) {
    var l = el.querySelector('l')
    var firstEl = l.querySelector('*')

    var hiFirstTest = recursiveSearch(l, 'hi')
    if (hiFirstTest) { 
      console.log(el)
      $(el).addClass('indent') 

      if (el.querySelector('.pilcrow')) {
        $(el).addClass('pilcrow')
      }
    }
  })

  // Apply indent to lg[type='trplvrs'] first line when pillcrow is first character  
  var tripl = $("lg[type='trplvrs']")
  tripl.each(function(i, el) {
    var l = el.querySelector('l')
    var firstEl = l.querySelector('*')

    var hiFirstTest = recursiveSearch(l, 'hi')
    if (hiFirstTest) { 
      console.log(el)
      $(el).addClass('indent')
      
      if (el.querySelector('.pilcrow')) {
        $(el).addClass('pilcrow')
      }
    }
  })

  // Apply indent to l in sestina when pillcrow/h1 first character
  var sestinaL = $("lg[type='sestina'] l")
  sestinaL.each(function(i, el) {
    var hiFirstTest = recursiveSearch(el, 'hi')
    if (hiFirstTest) { 
      $(el).addClass('indent') 

      if (el.querySelector('.pilcrow')) {
        $(el).addClass('pilcrow')
      }
    }
  })

  //Custom blank/white space 
  var blankSpace = $("space[ana='#space-stop']"),
      blankSpaceExtent = blankSpace.attr('extent');
    
  blankSpace.css('height', (blankSpaceExtent * 1.8) + 'em')

}

function recursiveSearch(el, type) {
  if (!el) { return null }

  type = type.toUpperCase()

  //is the first tag/element within the provided el 
  // of the type desired
  var typeReg = new RegExp("^<" + type, "i"),
      firstMatch = el.innerHTML.match(typeReg); 

  if (firstMatch) {
    return firstMatch
  }

  var firstEl = el.querySelector('*')

  if (!firstEl) { 
    return null
  }

  return recursiveSearch(firstEl, type)
}

function setupRvf() {
  if (util_browser.getParam('incomplete')) { return }

  var rvf = $('lg[n]')
  var min = $(rvf[0]).attr('n')
  var max = $(rvf[rvf.length-1]).attr('n')
  
  $('.rvf-range').text('Rvf ' + min + '-' + max)
}