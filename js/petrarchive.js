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
        // Prefers another cursor with two arrows
        $(".ui-resizable-e").css("cursor","ew-resize")
      },

      stop: function( event, ui) {
        facs.refresh()
      },

      handles: 'w'
    }
  )

  if (that.hasMultipleCh()) {
    $('.-teibp-pb:first-child').css('display', 'initial')

    if (util_browser.getParam('ch')) {
      var charta = util_browser.getParam('ch')

      setTimeout(function() {
        $('html, body').animate({
          scrollTop: $("#" + charta).offset().top - ($('#sticky-header').height() * 1.5)
        }, 2500);
      }, 1500)
    }

    // scroll to the pertinent chartae
    
  }

  $('a.facs-thumb').click(function(ev) {
    var img = $($(ev.delegateTarget).children('img'))

    if (!facs.isActive) {
      // If Facs is inactive, then we first want to activate it

       if (that.hasMultipleCh()) {
        // Within documents with multiple Chartae, we must load the 
        // correct facs img before activating the facsviewer.
        // the variable img from above is the facs img of the charta user clicked on
        // , which is then loaded into the facs viewer here
        that.facs.img = img
        that.facs.loadImg()
      }

      facs.isActive = true
      facs.$frame.addClass('active')
      util_browser.setParam('facs', 'active')
    } else {
      // if Facs is already active.
      if (that.hasMultipleCh()) {
        // this usecase is simple with single charta documents.
        // Multiple chartae documents must contain conditional logic
        if (that.facs.img !== img) {
          // user is activating a separate facs. Don't close facs viewer on them.
          // instead load newly activated facs img
          that.facs.img = img
          that.facs.loadImg()
          return
        }
      }

      facs.isActive = false
      facs.$frame.removeClass('active')
      util_browser.removeParam('facs')
    }

    if (!facsInited) {
      facs.containImg()
    }
  })

  if (util_browser.getParam('facs')) {
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
    util_browser.removeParam('facs')
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
    var headerHeight = $('#sticky-header').outerHeight()
    $('#pt-facs').css('top', headerHeight)

    var commentaryHeaderHeight = $('.commentary.active header').height()
    $('.commentary.active main').css('top', commentaryHeaderHeight * 1.2)
}

Petrarchive.prototype.getCurrentDoc = function() {
  return this.nav.current
}