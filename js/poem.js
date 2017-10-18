
// This is the 'init' function that initiates everything
$(document).ready(function() {
  // Setup the sticky header
  var bigThumb = $('.-teibp-thumbnail')
  var bigThumbCount = bigThumb.length

  if (bigThumbCount > 1) {
    for (var i = 0; i < bigThumbCount; i++) {
      var bigThumbSrc = $(bigThumb[i]).attr('src')

      var split = bigThumbSrc.split('/')
      var thumbDir = 'thumb-' + split[2]
      var compressedThumbSrc =  split[0] + '/' + split[1] + '/' + thumbDir + '/' + split[3]

      if (i==0) {
        $('#sticky-header .facs-thumb img').attr('src', compressedThumbSrc)
      } else {
        $($('#sticky-header .facs-thumb')[i-1]).clone()
          .appendTo('#sticky-header #teibpToolbox')
          .children('img')
          .attr('src', compressedThumbSrc)
      }
    }
  } else {
    var bigThumbSrc = bigThumb.attr('src')
    var split = bigThumbSrc.split('/')
    var thumbDir = 'thumb-' + split[2]
    var compressedThumbSrc =  split[0] + '/' + split[1] + '/' + thumbDir + '/' + split[3]
    $('#sticky-header .facs-thumb img').attr('src', compressedThumbSrc)
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
    console.log(lastPage)
  	pageNum = firstPage + ' - ' + lastPage
  }

  $('#sticky-header .charta-no').text(pageNum)
})