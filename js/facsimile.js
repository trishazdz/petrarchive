function Facsimile(params) {
  // Params 
  // anchor: The <a> Tag of thumbnail
  // ui: HTML container that houses the displa of facs
  this._anchor = params.anchor
  this._img = this._anchor.children('img')
  this.imgMeta = {
  	original: {
	  	w: this._img.prop('naturalWidth'),
	  	h: this._img.prop('naturalHeight')
	},
	resized: {
		w: this._img.prop('naturalWidth'),
	  	h: this._img.prop('naturalHeight')
	}
  }

  this._ui = params.ui

  $(this._ui).resizable(
  	{
  	  create: function( event, ui ) {
        // Prefers an another cursor with two arrows
        $(".ui-resizable-e").css("cursor","ew-resize")
      },

  	  handles: 'w'
  	}
  )

  this._ui_container = this._ui.children('.container')
  this._ui_img = this._ui.find('img.facs')
  this._ui_nav = this._ui.find('nav')

  this._ui_img.attr('src', this._img.attr('src'))


  this.isActive = false

  this.events()
}

Facsimile.prototype.events = function() {
  var that = this

  this._anchor.click(function(ev) {
  	that.isActive ? that.hide() : that.show()
  })

  this._ui_nav.children('nav button.zoom').click(function(ev) {
  	var tgt = $(ev.delegateTarget)
  	tgt.hasClass('in') ? that.zoom('in') : that.zoom('out')
  	ev.stopPropagation()
  })

  this._ui_nav.children('nav button.new-tab').click(function(ev) {
  	// teibp.js TODO : transfer this somewhere else
  	showFacs()
  })

  this._ui.mouseenter(function(ev) {
  	var nav = $(this).find('nav')
  	nav.addClass('active')
  }).mouseleave(function(ev) {
  	console.log(ev)
  	$(this).find('nav').removeClass('active')
  })

  this._ui_nav.find('button.facs-close').click(function(ev) {
  	that.hide()
  })
}

Facsimile.prototype.show = function() {
  this.isActive = true
  this._ui.addClass('active')
}

Facsimile.prototype.hide = function() {
  this.isActive = false
  this._ui.removeClass('active')
}

Facsimile.prototype.zoom = function(direction, resize) {
  // direction: 'in' vs 'out'
  // resize: OPTIONAL percentage

  var resize = resize || 10, 
	  currentW  = this.imgMeta.resized.w,
	  currentH  = this.imgMeta.resized.h;

  
  var currentScroll = {
  	x: this._ui_container.scrollLeft(),
  	y: this._ui_container.scrollTop()
  }

  var currentC = {
  	x: currentScroll.x / currentW,
  	y: currentScroll.y / currentH
  }

  var clientWidth = this._ui_container.prop('clientWidth'),
      clientHeight = this._ui_container.prop('clientHeight');

  if (direction == 'in') {
  	this.imgMeta.resized.h = currentH * (1 + (resize / 100))
  	this.imgMeta.resized.w = currentW * (1 + (resize / 100))
  }
  else if (direction == 'out') {
  	this.imgMeta.resized.h = currentH * (1 - (resize / 100))
    this.imgMeta.resized.w = currentW * (1 - (resize / 100))
  }
  else {
  	console.log('must supply "direction" parameter as either "in" or "out"')
  }
  
  this._ui_img
  	.width(this.imgMeta.resized.w)
  	.height(this.imgMeta.resized.h);

  if (direction == 'in') {
  	var correctionX = (clientWidth * .5 ) * ( 1 + (resize / 100) ),
  		correctionY = (clientHeight * .5 ) * ( 1 + (resize / 100) )
  }
  else if (direction == 'out') {
  	var correctionX = ( (clientWidth / currentW ) * .5 ) * ( 1 - (resize / 100) )
  		correctionY = ( (clientHeight / currentH ) * .5 ) * ( 1 - (resize / 100) )
  }

  var newScroll = {
  	x: currentC.x * this.imgMeta.resized.w,
  	y: currentC.y * this.imgMeta.resized.h
  }

  this._ui_container
  	.scrollLeft(newScroll.x)
  	.scrollTop(newScroll.y);  

}