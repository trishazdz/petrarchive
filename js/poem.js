
// This is the 'init' function that initiates everything
$(document).ready(function() {
  window.PT = new Petrarchive()   

  // Setup the sticky header
  var bigThumbSrc = $('.-teibp-thumbnail').attr('src')
  var split = bigThumbSrc.split('/')
  var thumbDir = 'thumb-' + split[2]
  var compressedThumbSrc =  split[0] + '/' + split[1] + '/' + thumbDir + '/' + split[3]
  $('#sticky-header img').attr('src', compressedThumbSrc)

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