// In the near-future, once John and I are more 
// in flow of collaborating, I will suggest that we use 
// ES6 Javascript, which will allow for ES6 modules instead of 
// Loading scripts the old way and sticking everything in one file

function Petrarchive() {
  var that = this

  this.header = $('#sticky-header')

  this.hasMultipleCh = function() {
    return $('.-teibp-pbFacs img').length > 1
  }

  this.chartae = []

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

  this.facsInited = false

  this.events()

  if (window.NavUtil) {
    this.nav = new NavUtil()
  }
  if (window.CommentaryUtil) {
    this.commentary = new CommentaryUtil()
  }

  if (window.Frame) {
  /* ----------------
   Setup Facs
   ----------------*/
  this.facs = new Frame({
    frame: $('#pt-facs'),
    recenter: false
  })

  this.facsIsActive = false

  var facs = this.facs
  var facsNav = $('#pt-facs nav')

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

    // scroll to the pertinent chartae


    var pageBreaks = $.makeArray($('.-teibp-pageNum').map(function(i, el) {
      // must account for the the Y length that fixed header obscures
      return el.offsetTop - that.header.height() - $(el).height()
    }))

    var debouncedPbActivate = util_browser.debounce(function(ev) {
      var scrollTop = $(ev.delegateTarget).scrollTop()

    
      var filteredPbs = pageBreaks.filter(function(pb) {
        return scrollTop > pb
      })

      var activePbsIndex = filteredPbs.length - 1

      $('a.facs-thumb').removeClass('activePb')
      $($('a.facs-thumb')[activePbsIndex]).addClass('activePb')
    }, 80)
    
    $('.content-container').scroll(debouncedPbActivate)
  }

  $('a.facs-thumb').click(function(ev) {
    console.log(ev)
    var img = $($(ev.delegateTarget).children('img'))
    var charta = $(ev.delegateTarget).attr('data-charta')

    that.activateFacs(img, charta)
  })

  if (this.facsIsActive) {
    if (util_browser.getParam('incomplete')) {
     setTimeout(function() {
      $('a.facs-thumb').click() 
     }, 3000)
    } else {
      this.activateFacs()
    }
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
    that.deactivateFacs()
  })

  /***********
    /End Setup Facs
  ***********/
  }

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
    var headerHeight = this.header.outerHeight()
    $('#pt-facs').css('top', headerHeight)

    var commentaryHeaderHeight = $('.commentary.active header').height()
    $('.commentary.active main').css('top', commentaryHeaderHeight * 1.2)
}

Petrarchive.prototype.getCurrentDoc = function() {
  return this.nav.current
}

Petrarchive.prototype.activateFacs = function(img, charta) {
  if (this.facs.getImgSrc() == $(img).attr('src')) { 
    this.deactivateFacs()
    return 
  }

  //this.facs.img = img
  this.facs.loadImg(img)
  
  $('html > body').addClass('facs-active')

  this.facs.$frame.addClass('active')
  util_browser.setParam('facs', 'active')
  localStorage.setItem('facs', 'true')

  $('#pt-facs .meta').text(charta)  

  $('a.facs-thumb').removeClass('activeFacs')
  $('a.facs-thumb[data-charta="' + charta + '"').addClass('activeFacs')

  if (!this.facsInited) {
    this.facs.containImg()
  }

  this.facsInited = true
  this.facsIsActive = true
}

Petrarchive.prototype.deactivateFacs = function() {
  $('html > body').removeClass('facs-active')

  this.facs.$frame.removeClass('active')
  util_browser.removeParam('facs')
  localStorage.setItem('facs', 'false')

  $('a.facs-thumb').removeClass('activeFacs')

  this.facs.img = undefined

  this.facsIsActive = false
}

Petrarchive.prototype.showHide = function(maniculeId, idToShow, idToHide) {
  var hide = "#" + idToHide;
  var show = "#" + idToShow;
  var manicule = "#" + maniculeId;

  var n = $(hide).attr("n") || $(show).attr("n")


  $(hide).siblings('.poem-number').text(n)
  $(show).siblings('.poem-number').text(n)

  $(hide).css("display","none")
    .siblings().css("display", "none");
  $(show).css("display","block")
    .siblings().css("display", "block");

  var newFunction = "PT.showHide('" + maniculeId + "','" + idToHide + "','" + idToShow + "');";
  $(manicule).attr("onclick", newFunction);
}

Petrarchive.prototype.addCharta = function(ch) {
  this.chartae.push(ch)
}