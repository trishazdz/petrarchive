
// This is the 'init' function that initiates everything
$(document).ready(function() {
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

  window.PT = new Petrarchive()   


  var pageNum,
  	  $pageNum = $('.-teibp-pageNum');

  if ($pageNum.length == 1) {
  	pageNum = $pageNum.text()
  } else {
    var firstSplit = $($pageNum[0]).text().split(' ').slice(1)
    var firstPage = firstSplit[0] + ' ' + firstSplit[1]
    var lastSplit = $($pageNum[$pageNum.length-1]).text().split(' ').slice(1)
    var lastPage = lastSplit[0] + ' ' + lastSplit[1]
  	pageNum = firstPage + ' - ' + lastPage
  }

  $('#sticky-header .charta-no').text(pageNum)
})