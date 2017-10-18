// In the near-future, once John and I are more 
// in flow of collaborating, I will suggest that we use 
// ES6 Javascript, which will allow for ES6 modules instead of 
// Loading scripts the old way and sticking everything in one file

function Petrarchive() {
  var that = this

  this.hasMultipleCh = function() {
    return $('.-teibp-pbFacs img').length > 1
  }

  this.init()

  this.toggleElement = function(node, id, display) {
    console.log(node,id,display)
    
    // If display parameter not supplied then go with default jQuery.toggle()
    if (!display) 
      $('#' + id).toggle()
    else
      $('#' + id).toggleClass('display-' + display)
  }

  this.switchCustomCSS = function (theme) {
    var dict = {
      diplomatic: '../css/custom.css',
      edited: '../css/custom_norm.css'
    }

    var stylesheet = dict[theme]
    document.getElementById('customcss').href=stylesheet
  }
}

Petrarchive.prototype.init = function() {
  var that = this

  this.events()

  this.nav = new NavUtil()
  this.commentary = new CommentaryUtil()

  /* ----------------
   Setup Facs
   ----------------*/
  this.facs = new Frame({
    img: $('.-teibp-pbFacs img'),
    frame: $('#pt-facs'),
    recenter: false
  })

  var facs = this.facs
  var facsNav = $('#pt-facs nav')
  var facsInited = false

  facs.show($('#pt-facs'), true)

  facs.$frame.resizable(
    {
      create: function( event, ui ) {
        // Prefers an another cursor with two arrows
        $(".ui-resizable-e").css("cursor","ew-resize")
      },

      stop: function( event, ui) {
        facs.refresh()
      },

      handles: 'w'
    }
  )

  if (that.hasMultipleCh()) {
    
  }

  $('a.facs-thumb').click(function(ev) {
    var img = $($(ev.delegateTarget).children('img'))

    if (!facs.isActive) {
       if (that.hasMultipleCh()) {
        that.facs.img = img
        that.facs.loadImg()
      }

      facs.isActive = true
      facs.$frame.addClass('active')
      localStorage.setItem('facs', 'true')
    } else {
      if (that.hasMultipleCh()) {
        if (that.facs.img !== img) {
          that.facs.img = img
          that.facs.loadImg()
          return
        }
      }

      facs.isActive = false
      facs.$frame.removeClass('active')
      localStorage.setItem('facs', 'false')
    }

    if (!facsInited) {
      facs.containImg()
    }
  })

  if (localStorage.getItem('facs') == 'true') {
    $($('a.facs-thumb')[0]).click()
  }

  facsNav.children('button.zoom').click(function(ev) {
    var tgt = $(ev.delegateTarget)
    tgt.hasClass('in') ? facs.zoomImg(facs._zoom + .03) : facs.zoomImg(facs._zoom - .02)
    ev.stopPropagation()
  })

  facsNav.children('button.new-tab').click(function(ev) {
    // teibp.js TODO : transfer this somewhere else
    var r = confirm("Facsimile will open in a new tab. Is that okay?");

    if (r == true) {
      showFacs()
    } else {
      return
    }
  })

  facsNav.children('button.facs-close').click(function(ev) {
    facs.isActive = false
    facs.$frame.removeClass('active')
    localStorage.setItem('facs', 'false')
  })

  /***********
    /End Setup Facs
  ***********/

  var that = this
  $(window).resize(function() {
    that.onResize()
  })

  this.onResize()
}

Petrarchive.prototype.events = function() {
  var that = this

}

Petrarchive.prototype.onResize = function() {
    let headerHeight = $('#sticky-header').outerHeight()
    $('#pt-facs').css('top', headerHeight)
}