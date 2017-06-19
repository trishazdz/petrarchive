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
  this._ui_img = this._ui.find('img.facs')

  this._ui_img.attr('src', this._img.attr('src'))


  this.isActive = false

  this.events()
}

Facsimile.prototype.events = function() {
  var that = this

  this._anchor.click(function(ev) {
  	that.isActive ? that.hide() : that.show()
  })

  this._ui.find('nav.zoom button').click(function(ev) {
  	var tgt = $(ev.delegateTarget)
  	tgt.hasClass('in') ? that.zoom('in') : that.zoom('out')
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
      currentH  = this.imgMeta.resized.h, 
	  currentW  = this.imgMeta.resized.w;
  
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
  	.height(this.imgMeta.resized.h)
}