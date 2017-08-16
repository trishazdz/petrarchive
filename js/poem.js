
// This is the 'init' function that initiates everything
$(document).ready(function() {
  window.PT = new Petrarchive()   

  // Setup the sticky header
  var thumbSrc = $('.-teibp-thumbnail').attr('src')
  $('#sticky-header img').attr('src', thumbSrc)

  var pageNum = $('.-teibp-pageNum').text()

  $('#sticky-header .charta-no').text(pageNum)


  // Must apply knockout bindings to the created PT object
  ko.applyBindings(window.PT)
})