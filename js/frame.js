function Frame(params) {
  var that = this

  this.img = params.img

  this.$frame = params.frame || $('.frame')
  this.$frame.addClass('frame')

  this.$nav = $('nav')

  this._zoom = 1
  this._center = undefined
  this._textLoaded = false
  this._explorable = true

  if (params.hasOwnProperty('recenter')) {
    this._recenter = params.recenter
  } else {
    this._recenter = true
  }

  if (params.text) {
    this.loadText(params.text)
  }

  // show initial scene
  if (params.hasOwnProperty('scene')) {
    this.activeSceneIndex = params.scene
  } else {
    this.activeSceneIndex = 0
  }

  this.scenes = []
  this.defaultScene = 0

  if (window.Scene) {
    this.scenes.push(new Scene(null, function() {
      that.showText(0)
    }))
    this.activeScene = this.scenes[0].id
  }

  setTimeout(function() {
    that.showText(0)
  }, 100)
}

Frame.prototype.activate = function(el) {
  if (el) {
    this.$frame = $(el)
  }
  this.loadImg()
  this.events()
}

Frame.prototype.completed = function(link) {
  if (!this._completed) {
    this.revealImg()
    $('nav a').attr('href', './' + link + '.html')
  }

  this._completed = true
}

Frame.prototype.show = function(el, explore) {
  explore = explore || false

  if (el) {
    this.$frame = $(el)
  }
  this.loadImg()
  this.events()

  if (explore) {
    var that = this

    var checkScenes = debounce(function(ev, ui) {
      console.log(that.getCenter())
      var potentialScene

      var within = that.scenes.filter(function(el, i) {
        if (el.globalScene) {
          return el
        }
        if (el.point && that.withinBorders(el.point)) {
          return el
        }
      })

      if (within.length) {
        var nonGlobal = within.filter(function(el, i) {
          return !el.globalScene
        })

        if (nonGlobal.length) {
          if (!that._completed) {
            potentialScene = nonGlobal[nonGlobal.length - 1]
          }
        } else {
          potentialScene = within[within.length - 1]
        }
      }

      console.log(potentialScene)
      if (potentialScene.id === that.activeScene) {
        return
      }
      that.activeScene = potentialScene.id
      potentialScene.activate()
    }, 150)

    this.$img.draggable({
        stop: function(event, ui) {
          that._center = that.getCenter()
        },
        drag: checkScenes
    })
  }

  this._center = this.getCenter()
}

Frame.prototype.enableExplore = function() {
  this.$img.draggable({disabled: false})
  this._explorable = true
}

Frame.prototype.disableExplore = function() {
  this.$img.draggable({disabled: true})

  this._explorable = false
}

Frame.prototype.events = function() {
  var that = this

  this.$img.off('dblclick').on('dblclick', function(ev) {
    if (!that._explorable) {
      return
    }

    var click = {
      x: ev.offsetX,
      y: ev.offsetY
    }

    var point = that.getProjection(click)

    var zoom = that._zoom
    that.zoomImg(zoom + .1, point)
  })

  this.$img.off('mousewheel').on('mousewheel', function(ev) {   
    if (!that._explorable) {
      return
    }

    var direction = ev.deltaY < 0 ? 'down' : 'up'
    console.log(direction)
    var zoom = that._zoom

    if (direction == 'up') {
      that.zoomImg(zoom + .02)
    }

    if (direction == 'down') {  
      that.zoomImg(zoom - .01)
    }
    ev.preventDefault()
  })

  var recenter = debounce(function() {
      console.log(that.getCenter())
      that.repositionImg(that._center)
    }, 250)

  if (this._recenter) {
    $(window).resize(recenter)
  }
}

Frame.prototype.loadImg = function() {
  var src 

  if (this.img instanceof jQuery) {
    console.log(this.img)
    src = this.img.attr('src')
  } else {
    console.log(this.img)
    src = this.img.src
  }

  if (this.$frame.find('div.img-container').length) {
    var img = this.$frame.find('div.img-container').children('img')
    img.attr('src', src)
  } else {
    var containerHtml = "<div class='img-container'></div>"
    var el = "<img src='" + src + "' />"
    
    var container = $(containerHtml).appendTo(this.$frame)
    var img = $(el).appendTo(container)
  }

  console.log(img, src)

  this.$img = $(this.$frame.find('div.img-container').children('img'))
}

Frame.prototype.refresh = function() {
  this._zoom = this.getZoom()
  this._center = this.getCenter()
}

Frame.prototype.containImg = function() {
  if (!this.$img) { return }
  
  this.$img.attr('width', '100%')
    .attr('left', 0)
    .attr('top', 0);

  this.refresh()

  console.log(this)
}

Frame.prototype.revealImg = function(settings) {
  var that = this

  this.disableExplore()

  settings = settings || {}

  var speed = settings.speed || 8000

   this.$img.animate({
    top: 0,
    left: 0,
    width: '100%'
  }, speed, function() {
    that._zoom = that.getZoom()
    that._center = that.getCenter()
    that.enableExplore()
  })
}

Frame.prototype.findImgPoint = function(click) {
  var imgPos = {
    x: -this.$img.position().left,
    y: -this.$img.position().top
  }
  var x = imgPos.x + click.x
  var y = imgPos.y + click.y

  return {
    x: x,
    y: y
  }
}

Frame.prototype.getZoom = function() {
  var zoom = this.$img.prop('width') / this.$img.prop('naturalWidth')
  return zoom
}

Frame.prototype.getCenter = function() {
  var frame = {
    x: this.$frame.prop('clientWidth') / 2,
    y: this.$frame.prop('clientHeight') / 2
  }

  var position = this.$img.position()

  var img = {
    x: -position.left,
    y: -position.top,
    width: this.$img.prop('width'),
    height: this.$img.prop('height')
  }

  var center = {
    x: (img.x + frame.x) / img.width,
    y: (img.y + frame.y) / img.height
  }

  return center
}

Frame.prototype.getProjection = function(point) {
  var projection = {
    x: point.x / this.$img.prop('width'),
    y: point.y / this.$img.prop('height')
  }
  console.log('projection:', projection)
  return projection
}

Frame.prototype.repositionImg = function(point, speed) {
  console.log('reposition', point)

  speed = speed || undefined

  var frame = {
    x: this.$frame.prop('clientWidth') / 2,
    y: this.$frame.prop('clientHeight') / 2
  }

  var w = this.$img.prop('width')
  var h = this.$img.prop('height')

  var x = -((point.x * w) - frame.x),
      y = -((point.y * h) - frame.y);

  if (speed) {
    var that = this

    this.disableExplore()
    this.$img.animate({
      left: x,
      top: y,
    }, speed, function() {
      that._zoom = that.$img.prop('width') / that.$img.prop('naturalWidth')
      that._center = that.getCenter()
      that.enableExplore()
    })
  } else {
    this.$img.css('left', x)
      .css('top', y)
    this._center = this.getCenter()
  }
}

Frame.prototype.zoomImg = function(zoom, point, cb) {
  if (!this.$img.prop('width')) {
    var that = this
    return setTimeout(function() {
      that.zoomImg(zoom, point)
    }, 300)
  }

  this._zoom = zoom
  var oldCenter = this.getCenter()

  var newWidth = this.$img.prop('naturalWidth') * zoom
  this.$img.css('width', newWidth)
  var newHeight = this.$img.prop('height') 

  if (point) {
    // Go kind of towards point as center, but not fully
    // Trying to mimic the way google mapz zoom works
    var pointRatio = {
      x: Math.abs(oldCenter.x - point.x),
      y: Math.abs(oldCenter.y - point.y)
    }

    this.repositionImg(point)
    this._center = point
  } else {
    this.repositionImg(oldCenter)
  }
}

Frame.prototype.loadText = function(textTitle) {
  var that = this

  utils.loadMarkdown(textTitle, function(md) {
    if (that.$frame.find('div.text-hidden').length) {
      that.$frame.find('div.text-hidden').html(md)
    } else {
      var textHidden = $('<div class="text-hidden"></div>')
      textHidden.appendTo(that.$frame)
      textHidden.html(md)
    }

    that.$text = $('.text-hidden')

    that._textLoaded = true
  })
}

Frame.prototype.showText = function(index) {
  if (!this._textLoaded) {
   return
  }

  this.activeSceneIndex = index
  
  console.log('active scene:', this.activeSceneIndex)

  if (index) {
    var theText = this.$text.find('p').eq(index).html()
  } else {
    var theText = this.$text.find('p').first().html()
  }
  
  if (this.$nav.find('p.text').length) {
    this.$nav.find('p.text').css('display', 'none')
                    .html(theText).fadeIn('slow')
  } else {
    var container = $('<div class="text"></div>')
    var p = $('<p class="text" style="display: none"></p>')
        .html(theText)

    p.appendTo(container)
    container.appendTo(this.$nav)
    p.fadeIn('slow')
    console.log(this)
  }
}

Frame.prototype.getBorders = function() {
  var w = this.$img.prop('width'),
      h = this.$img.prop('height');
  var t = -this.$img.position().top,
      l = -this.$img.position().left;
  var frame = {
    w: this.$frame.prop('clientWidth'),
    h: this.$frame.prop('clientHeight')
  }
  return [
    t / h, 
    (l + frame.w) / w,
    (t + frame.h) / h,
    l / w
  ]
}

Frame.prototype.withinBorders = function(point) {
  var borders = this.getBorders()
  return borders[2] >= point.y && point.y >= borders[0] && 
    borders[3] <= point.x && point.x <= borders[1]
}

Frame.prototype.setScene = function(point, cb, settings) {
  var that = this

  var scene = new Scene(point, cb, settings)
  this.scenes.push(scene)
}

Frame.prototype.setActiveScene = function() {

}

Frame.prototype.removeScene = function(scene) {
  $(scene).off('drag')
}

Frame.prototype.setDefaultScene = function(i) {
  this.scenes[i].globalScene = true
  console.log(this.scenes)
}

// https://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  function debounce(func, wait, immediate) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  };
