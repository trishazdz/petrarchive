// This is the 'init'/bootstrap function that gets everything started
$(document).ready(function() {
  setupFacsThumb()
  setupPageNum()
  setupRvf()

  // Too many edge cases to be able to address solely using CSS
  // so doing some styling via JS
  applyStyling()

  window.PT = new Petrarchive()   

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
    var bigThumb = $('.-teibp-thumbnail')
    var bigThumbCount = bigThumb.length

    if (bigThumbCount > 1) {
      for (var i = 0; i < bigThumbCount; i++) {
        var bigThumbSrc = $(bigThumb[i]).attr('src')
        /* Skip this failed optimization for now. Prob won't need it as the rest 
           of the webpage is not overly large

        var split = bigThumbSrc.split('/')
        var thumbDir = 'thumb-' + split[2]
        var compressedThumbSrc =  split[0] + '/' + split[1] + '/' + thumbDir + '/' + split[3]
        */

        if (i==0) {
          $('#sticky-header .facs-thumb img').attr('src', bigThumbSrc)
        } else {
          $($('#sticky-header .facs-thumb')[i-1]).clone()
            .appendTo('#sticky-header #teibpToolbox')
            .children('img')
            .attr('src', bigThumbSrc)
        }
      }
    } else {
      var bigThumbSrc = bigThumb.attr('src')

      /* Skip this optimization for same reason listed above 
      var split = bigThumbSrc.split('/')
      var thumbDir = 'thumb-' + split[2]
      var compressedThumbSrc =  split[0] + '/' + split[1] + '/' + thumbDir + '/' + split[3]
      */
      $('#sticky-header .facs-thumb img').attr('src', bigThumbSrc)
    }
  }
}

function setupPageNum() {
  var pageNum,
      $pageNum = $('.-teibp-pageNum');

  if ($pageNum.length == 1) {
    pageNum = $pageNum.text()
  } 
  else if ($pageNum.length > 1) {
    var firstSplit = $($pageNum[0]).text().split(' ').slice(1)
    var firstPage = firstSplit[0] + ' ' + firstSplit[1]
    var lastSplit = $($pageNum[$pageNum.length-1]).text().split(' ').slice(1)
    var lastPage = lastSplit[0] + ' ' + lastSplit[1]
    pageNum = firstPage + ' - ' + lastPage
  }

  if (util_browser.getParam('incomplete')) {
    var prettyName = window.PT.getCurrentDoc().getPrettyName()

    pageNum = 'charta ' + prettyName
  }

  $('#sticky-header .charta-no').text(pageNum)
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
    }
  })

  // Apply indent to l in sestina when pillcrow/h1 first character
  var sestinaL = $("lg[type='sestina'] l")
  sestinaL.each(function(i, el) {
    var hiFirstTest = recursiveSearch(el, 'hi')
    if (hiFirstTest) { 
      console.log(el)
      $(el).addClass('indent') 
    }
  })

  //Custom blank/whtie space 
  var blankSpace = $("space[ana='#space-stop']"),
      blankSpaceExtent = blankSpace.attr('extent');
    
  blankSpace.css('height', (blankSpaceExtent * 1.8) + 'em')


  // hack for soft launch for rvf142
  var rvf142 = document.querySelector('#rvfasdf142')
  if (rvf142) {
    var firstCol = rvf142.querySelector('div:nth-child(1)') // hide lines greater than 15
    var secondCol = rvf142.querySelector('div:nth-child(2)') // hide lines greater than 30

    firstCol.querySelectorAll('l').forEach(function(e) {
      if ($(e).attr('n') > 15) {
        $(e).css('display', 'none')
      }
    })
    secondCol.querySelectorAll('l').forEach(function(e) {
      if ($(e).attr('n') > 30) {
        $(e).css('display', 'none')
      }
    })

    $(rvf142.querySelectorAll('div:nth-child(4)')).css('display', 'none')
    $(rvf142.querySelectorAll('div:nth-child(5)')).css('display', 'none')

  }

}

function recursiveSearch(el, type) {
  if (!el) { return null }

  type = type.toUpperCase()
  /*if ($(el).prop('tagName') == type) {
    console.log('first break', el)
    return true
  } */

  //is the first tag/element within the provided el 
  // of the type desired
  var typeReg = new RegExp("^<" + type, "i"),
      firstMatch = el.innerHTML.match(typeReg); 

  if (firstMatch) {
    return true
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