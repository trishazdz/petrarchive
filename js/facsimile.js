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
  $(this._ui_img).draggable({

  })

  this._ui_nav = this._ui.find('nav')

  this._ui_img.attr('src', this._img.attr('src'))


  this.isActive = false

  this.events()

  this.zoom('out', 60, [0,0])
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

  this._ui_img.dblclick((function(ev) {
    that.zoom('in')
  }))

  this._ui_nav.children('nav button.new-tab').click(function(ev) {
  	// teibp.js TODO : transfer this somewhere else
    var r = confirm("Facsimile will open in a new tab. Is that okay?");

    if (r == true) {
      showFacs()
    } else {
      return
    }
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

Facsimile.prototype.zoom = function(direction, resize, position) {
  // direction: 'in' vs 'out'
  // resize: OPTIONAL percentage
  // position: OPTIONAL ARRAY [top, left]

  var explicitPos = position || null,
      resize = resize || 10, 
      oldW  = this.imgMeta.resized.w,
      oldH  = this.imgMeta.resized.h;

  var oldPos = {
    left: this._ui_img.position().left,
    top: this._ui_img.position().top
  }

  if (direction == 'in') {
  	this.imgMeta.resized.w = oldW * (1 + (resize / 100))
    this.imgMeta.resized.h = oldH * (1 + (resize / 100))
  }
  else if (direction == 'out') {
    this.imgMeta.resized.w = oldW * (1 - (resize / 100))
    this.imgMeta.resized.h = oldH * (1 - (resize / 100))
  }
  else {
  	console.log('must supply "direction" parameter as either "in" or "out"')
  }
  
  this._ui_img
  	.width(this.imgMeta.resized.w)
  	.height(this.imgMeta.resized.h);

  if (direction == 'in') {  
    var correctionX = -(this.imgMeta.resized.w - oldW) / 2,
        correctionY = -(this.imgMeta.resized.h - oldH) / 2;
  }
  else if (direction == 'out') {
  	var correctionX = (oldW - this.imgMeta.resized.w) / 2,
  		  correctionY = (oldH - this.imgMeta.resized.h) / 2;
  } 

  if (explicitPos) {
    var newPos = {
      left: explicitPos[1],
      top: explicitPos[0]
    }
  } else {
    var newPos = {
      left: oldPos.left + correctionX,
      top: oldPos.top + correctionY
    }
  }

  this._ui_img.css({
    left: newPos.left,
    top: newPos.top
  })
}