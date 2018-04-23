// This is the 'init'/bootstrap function that gets everything started
$(document).ready(function() {
  setupFacsThumb()
  setupRvf()

  window.PT = new Petrarchive()   

  setupPageNum()
  setupTextindex()

  // Too many edge cases to be able to address solely using CSS
  // so doing some styling via JS
  applyStyling()


  var currentScroll = $('.content-container').scrollTop()

  // When hash is clicked we need to give it a vertical cushion equal to 2x the sticky header.
  // This is because browser loads webpage right at <a> of respective hash tag and will be blocked
  // by sticy header
  if (window.location.hash) {
    setTimeout(function() {
      $('.content-container').scrollTop(currentScroll - ($('#sticky-header').height() * 2))
    }, 1500)
  }

  if (util_browser.getParam('ch')) {
    var charta = util_browser.getParam('ch')

    setTimeout(function() {
      $('.content-container').scrollTop(currentScroll - ($('#sticky-header').height() * 2))

      console.log(charta)

      $('.content-container').animate({
        scrollTop: $("#" + charta).offset().top - ($('#sticky-header').height() * 1.5)
      }, 2500);
    }, 1500)
  } 
})


function setupFacsThumb() {
  if (util_browser.getParam('incomplete')) {
    var baseDir = "../images/thumb-vat-lat3195-f/vat-lat3195-f-"
    var ch = window.PT.getCurrentDoc().charta
    var rv = window.PT.getCurrentDoc().rv

    var facsSrc = baseDir + ch + rv + ".jpg"

    $('#sticky-header .facs-thumb img').attr('src', facsSrc)
  } else {
    // Setup the sticky header
    var thumb = $('.-teibp-thumbnail')
    var thumbCount = thumb.length

    for (var i = 0; i < thumbCount; i++) {
      var imgSrc = $(thumb[i]).attr('src')

      if (i==0) {
        $('#sticky-header .facs-thumb img').attr('src', imgSrc)
      } else {
        $($('#sticky-header .facs-thumb')[i-1]).clone()
          .appendTo('#sticky-header #teibpToolbox')
          .children('img')
          .attr('src', imgSrc)
      }

      $($('.facs-thumb')[i]).attr('data-charta', $($('.-teibp-pageNum')[i]).text())
    }
  }
}

function setupPageNum() {
  var pageNum,
      $pageNum = $('.-teibp-pageNum'),
      pages = window.PT.nav.current.getChartae();

  if (pages.length == 1) {
    pageNum = 'charta ' + pages[0].getPrettyName() //$pageNum.text()
  } 
  else if (pages.length > 1) {
    pageNum = 'chartae ' + pages[0].getPrettyName() + ' - ' + pages[pages.length-1].getPrettyName()
  }

  if (util_browser.getParam('incomplete')) {
    var prettyName = window.PT.getCurrentDoc().getPrettyName()

    pageNum = 'charta ' + prettyName
    return
  }

  $('#sticky-header .charta-no').text(pageNum)
}

function setupTextindex() {
  var button = $('#page-nav .page-number'),
      textindex = $('#poem-textindex');
  button.click(function(ev) {
    if (textindex.attr('data-loaded')) {
      $('.modal').hide()
      afterLoad()
      return
    }    
  
    textindex.find('.modal-body').load('../textindex.html', afterLoad)

    function afterLoad() {
      textindex.attr('data-loaded', true)

      // Let's scroll to currently active charta/e
      var active = PT.nav.current.getChartaFirst().getPrettyNameTextindex()

      var trArray = textindex.find('table tbody').children('tr').children('td:nth-child(2)').toArray()
      var activeTr = trArray.find(function(tr) {
        return tr.innerText == String(active)
      })

      setTimeout(function() {
        var trOffset = $(activeTr).offset().top
        $('.modal').scrollTop(trOffset).show()
        console.log(trOffset)
      }, 700  )
    }
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
  var rvf = $('lg[n]')
  var min = $(rvf[0]).attr('n')
  var max = $(rvf[rvf.length-1]).attr('n')
  
  $('.rvf-range').text('Rvf ' + min + '-' + max)
}