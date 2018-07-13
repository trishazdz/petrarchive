$(document).ready(function() {
var $window = $(window),
	$stickyHeader = $('header.sticky'),
	$threshHold = $('#vizindex').offset().top;

var debouncedStickyHeader = util_browser.debounce(function(ev) {	
	var scroll = $window.scrollTop()
	if (scroll >= $threshHold) {
		$stickyHeader.removeClass('hide')
		return
	}
	$stickyHeader.addClass('hide')
}, 100)

$(window).scroll(debouncedStickyHeader)

$(document).tooltip({
	items: $(".built-vizindex a"),
   /* hide: {
        effect: "explode",
        delay: 30000
      },*/
    content: function() {
    	var a = $( this )
        var noFile = a.hasClass('no-file')

    	var alt = a.find('img').attr('alt')
    	var ch = alt.slice(1)

    	var facsSrc = '"images/thumb-vat-lat3195-f/vat-lat3195-f-' + ch + '.jpg"'
    	var img = '<img class="facs" src=' + facsSrc + ' />' 

    	var prettyCh = prettify(ch)
    	var p = '<p class="charta">' + prettyCh

        if (noFile) {
            p += ' <cite>Text encoding in progress</cite>'
        }

        p += '</p>'
    	var html = p + img
    	return html
    }
})

function prettify(ugly) {
	var base = 'charta' 
	var noZero = ugly.slice(0,3).replace(/^0+/, '')
	var rv

	if (ugly[3] == 'r') {
		rv = 'recto'
	} else {
		rv = 'verso'
	}

	return base + ' ' + noZero + ' ' + rv
}

})