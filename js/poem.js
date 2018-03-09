// This is the 'init'/bootstrap function that gets everything started
$(document).ready(function() {
  setupFacsThumb()
  setupPageNum()
  setupRvf()

  // Too many edge cases to be able to address solely using CSS
  // so doing some styling via JS
  applyStyling()

  window.PT = new Petrarchive()   


  // When hash is clicked we need to give it a vertical cushion equal to 2x the sticky header.
  // This is because browser loads webpage right at <a> of respective hash tag and will be blocked
  // by sticy header
  if (window.location.hash) {
    var currentScroll = $('#tei_wrapper').scrollTop()

    $('#tei_wrapper').scrollTop(currentScroll - ($('#sticky-header').height() * 2))
  }

  if (util_browser.getParam('ch')) {
    var charta = util_browser.getParam('ch')

    setTimeout(function() {
      $('#tei_wrapper').scrollTop(currentScroll - ($('#sticky-header').height() * 2))

      console.log(charta)

      $('#tei_wrapper').animate({
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

    if ($(firstEl).prop('tagName') == 'HI') {
     $(el).addClass('indent')
    } else {
      if (firstEl) {
        if (firstEl.querySelector('hi')) {
          console.log('firstEl true', firstEl, firstEl.querySelector('hi'))
          $(el).addClass('indent')
        }
      }
    }
  })

  // Apply indent to lg[type='trplvrs'] first line when pillcrow is first character  
  var tripl = $("lg[type='trplvrs']")
  tripl.each(function(i, el) {
    var l = el.querySelector('l')
    var firstEl = l.querySelector('*')

    if ($(firstEl).prop('tagName') == 'HI') {
      $(el).addClass('indent')
     } else {
       if (firstEl) {
         if (firstEl.querySelector('hi')) {
           $(el).addClass('indent')
         }
       }
     }
  })

  // Apply indent to l in sestina when pillcrow/h1 first character
  var sestinaL = $("lg[type='sestina'] l")
  sestinaL.each(function(i, el) {
    var firstEl = el.querySelector('*')

    if ($(firstEl).prop('tagName') == 'HI') {
      $(el).addClass('indent')
     } else {
       if (firstEl) {
         if (firstEl.querySelector('hi')) {
           $(el).addClass('indent')
         }
       }
     }
  })
}

function setupRvf() {
  var rvf = $('lg[n]')
  var min = $(rvf[0]).attr('n')
  var max = $(rvf[rvf.length-1]).attr('n')
  
  $('.rvf-range').text('Rvf ' + min + '-' + max)
}