// In the near-future, once John and I are more 
// in flow of collaborating, I will suggest that we use 
// ES6 Javascript, which will allow for ES6 modules instead of 
// Loading scripts the old way and sticking everything in one file

function Petrarchive() {
  var that = this

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


  $('a.facs-thumb').click(function(ev) {
    if (!facs.isActive) {
      facs.isActive = true
      facs.$frame.addClass('active')
      localStorage.setItem('facs', 'true')
    } else {
      facs.isActive = false
      facs.$frame.removeClass('active')
      localStorage.setItem('facs', 'false')
    }

    if (!facsInited) {
      facs.containImg()
    }
  })

  if (localStorage.getItem('facs') == 'true') {
    $('a.facs-thumb').click()
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
    $('a.facs-thumb').click()
  })
  /***********
    /End Setup Facs
  ***********/
}

Petrarchive.prototype.events = function() {
  var that = this

}
