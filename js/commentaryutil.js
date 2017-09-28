
function CommentaryUtil() {
  var that = this

  this._active = undefined

  this.$content = $('#commentary main')
  this.navMeta

  this.events()

  this.activate = function(rvf) {
    $('body').addClass('commentary-active')
    var target = '#' + rvf + '-commentary'

    $(target).addClass('active')

    this._active = rvf

   // this.$element.addClass('active')
    //this.refreshNavMeta()
  }
  this.deactivate = function() {
    $('body').removeClass('commentary-active')
    $('.commentary').removeClass('active')
    this._active = undefined
  }

  this.refreshNavMeta = function() {
    this.navMeta = $('nav.commentary a').map(function() {
      var split = this.href.split('#')
      var hash = split[split.length - 1]

      return {
        hash: hash,
        top: document.querySelector('#' + hash).offsetTop
      }
    })
  }


  if (window.location.hash) {
    var hash = window.location.hash
    this.activate()
    window.location.hash = 'dummyhash'

    location.hash = hash
  }
}

CommentaryUtil.prototype.events = function() {
  var that = this

  $('button.commentary-activate').click(function(ev) {
    var rvf = $(ev.delegateTarget).attr('id')

    if (that._active == rvf) {
      that.deactivate()
      return
    }

    that.deactivate()
    that.activate(rvf)
  })

  $('div.commentary header button.close').click(function(ev) {
    that.deactivate()
    window.location.hash = '_'
  })

   // Navigation between different sections of commentary
  $('nav.commentary a').click(function(ev) {

    $('nav.commentary a').removeClass('active')

    $(ev.delegateTarget).addClass('active')
  })

  $(window).resize(function() {
    that.refreshNavMeta()
  })

  that.$content.scroll(function(ev) {
    var scrollTop = ev.target.scrollTop

    var filtered = that.navMeta.filter(function(i, el) {
      return scrollTop >= el.top
    })

    var active = filtered[filtered.length - 1]

    $('nav.commentary a').removeClass('active')
    $('nav.commentary a[href="#' +  active.hash + '"]').addClass('active')
  })
}