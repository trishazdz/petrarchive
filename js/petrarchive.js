// In the near-future, once John and I are more 
// in flow of collaborating, I will suggest that we use 
// ES6 Javascript, which will allow for ES6 modules instead of 
// Loading scripts the old way and sticking everything in one file

function Petrarchive() {
  var that = this
  this.inited = false
  this.activeFacs = undefined

  this.header = $('#sticky-header')

  // Figurer out if document hsa more than one charta
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

  if (this.inited) {return}
  
  this.inited = true

  if (window.NavUtil) {
    this.nav = new NavUtil()
  }
  if (window.CommentaryUtil) {
    this.commentary = new CommentaryUtil()
  }

  this.convertUrl()

  this.facsInited = false

  this.events()

  /* ----------------
   Setup Facs
   ----------------*/
  this.facs = new Frame({
    frame: $('#pt-facs'),
    recenter: false
  })

  var facs = this.facs
  var facsNav = $('#pt-facs nav')

  this.setupFacsThumb()


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

  var facsNav = $('#pt-facs nav')

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

  var that = this
  $(window).resize(function() {
    that.onResize()
  })

  this.onResize()
}

Petrarchive.prototype.refresh = function() {
  var that = this

  this.nav.refresh()
  this.setupFacsThumb()

  this.commentary.refresh()

  this.onResize()
}

Petrarchive.prototype.events = function() {
  var that = this

}

Petrarchive.prototype.convertUrl = function() {
  // reformat URLs 
  // relative and absolute urls not working
  // because sometimes we use same html url from root
  // othertimes in /content directory
  var isContentDirectory = location.href.search(/content/i)

  if (isContentDirectory == -1) {
    return
  }

  var links = $('.convert-url a')
      
  links.toArray().forEach(function(el) {
    var old = el.getAttribute('href')
    el.setAttribute('href', '../' + old)
  })
  
  $('.convert-url').removeClass('convert-url')
}

Petrarchive.prototype.setupFacsThumb = function() {
  // Refresh the facs button and img
  var cloned = $($('.facs-thumb')[0])
  $('.facs-thumb').remove()

  cloned.removeClass('activeFacs').removeClass('activePb')
  $('#teibpToolbox').append(cloned)

  if (util_browser.getParam('incomplete')) {
    var baseDir = "../images/thumb-vat-lat3195-f/vat-lat3195-f-"
    var ch = this.getCurrentDoc().getChartaFirst().charta
    var rv = this.getCurrentDoc().getChartaLast().rv

    var facsSrc = baseDir + ch + rv + ".jpg"

    $('#sticky-header .facs-thumb img').attr('src', facsSrc)
  } else {
    // Setup the sticky header
    var thumb = $('.-teibp-thumbnail')
    var thumbCount = thumb.length

    for (var i = 0; i < thumbCount; i++) {
      var imgSrc = $(thumb[i]).attr('src')

      if (i==0) {
        $('#sticky-header .facs-thumb img').attr('src', imgSrc)
      } else {
        $($('#sticky-header .facs-thumb')[i-1]).clone()
          .appendTo('#sticky-header #teibpToolbox')
          .children('img')
          .attr('src', imgSrc)
      }

      $($('.facs-thumb')[i]).attr('data-charta', $($('.-teibp-pageNum')[i]).text())
    }
  }

  var that = this

  $('button.facs-thumb').click(function(ev) {
    var img = $($(ev.delegateTarget).children('img'))
    var charta = $(ev.delegateTarget).attr('data-charta')

    console.log(ev, img, charta)

    that.activateFacs(img, charta)
  })

  if (this.hasMultipleCh()) {
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

      $('button.facs-thumb').removeClass('activePb')
      $($('button.facs-thumb')[activePbsIndex]).addClass('activePb')
    }, 80)
    
    $('.content-container').scroll(debouncedPbActivate)
  }

  this.facsIsActive = util_browser.getParam('facs') == 'active' ? true : false

  if (this.facsIsActive) {
    $('button.facs-thumb')[0].click() 
  }
}

Petrarchive.prototype.scrollTo = function(hash) {
  if (!hash) {
    $('.content-container').scrollTop(0)
    return
  }

  setTimeout(function() {
    $('.content-container').animate({
      scrollTop: $(hash).position().top
    }, 1200);
  }, 0)
}

Petrarchive.prototype.onResize = function() {
  var that = this
  setTimeout(function() { 
    var headerHeight = that.header.outerHeight()
    console.log(headerHeight)
    $('#pt-facs').css('top', headerHeight)

    var commentaryHeaderHeight = $('.commentary.active header').height()
    $('.commentary.active main').css('top', commentaryHeaderHeight * 1.2)
  }, 0)
}

Petrarchive.prototype.getCurrentDoc = function() {
  return this.nav.current
}

Petrarchive.prototype.activateFacs = function(img, charta) {
  console.log(img, charta)
  if (charta == this.activeFacs) { 
    this.deactivateFacs()
    return 
  }

  this.facs.loadImg(img)
  
  $('html > body').addClass('facs-active')

  this.facs.$frame.addClass('active')
  util_browser.setParam('facs', 'active')

  $('#pt-facs .meta').text(charta)  

  $('button.facs-thumb').removeClass('activeFacs')
  $('button.facs-thumb[data-charta="' + charta + '"]').addClass('activeFacs')

  if (!this.facsInited) {
    this.facs.containImg()
  }

  this.facsInited = true
  this.facsIsActive = true
  this.activeFacs = charta
}

Petrarchive.prototype.deactivateFacs = function() {
  $('html > body').removeClass('facs-active')

  this.facs.$frame.removeClass('active')
  util_browser.removeParam('facs')

  $('button.facs-thumb').removeClass('activeFacs')

  this.facs.img = undefined

  this.facsIsActive = false
  this.activeFacs = undefined
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
