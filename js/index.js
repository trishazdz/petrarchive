$(document).ready(function() {

$(document).tooltip({
	items: "img",
    content: function() {
    	var el = $( this )
    	var alt = el.attr('alt')
    	var ch = alt.slice(1)

    	var facsSrc = '"images/vat-lat3195-f/vat-lat3195-f-' + ch + '.jpg"'
    	var img = '<img class="facs" src=' + facsSrc + ' />' 

    	var prettyCh = prettify(ch)
    	var p = '<p class="charta">' + prettyCh + '</p>'
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