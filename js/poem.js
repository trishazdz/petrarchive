
// This is the 'init' function that initiates everything
$(document).ready(function() {
  window.PT = new Petrarchive()   

  setupFacsThumb()
  setupPageNum()

  if (window.location.hash) {
    var currentScroll = $('#tei_wrapper').scrollTop()

    $('#tei_wrapper').scrollTop(currentScroll - ($('#sticky-header').height() * 2))
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