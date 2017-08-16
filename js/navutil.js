

function NavUtil() {
  this.current = new PetrarchiveDocument(document.URL)

  this.previous = $('#page-nav a.previous')
  this.next = $('#page-nav a.next')

  this.next.attr('href', this.setupNextHref()) 
  this.previous.attr('href', this.setupPrevHref())

  this.events()
}

NavUtil.prototype.events = function() {
  this.previous.hover(function(ev) {
    console.log(ev)
  })

  this.next.hover(function(ev) {
    console.log(ev)
  })
}

NavUtil.prototype.setupPrevHref = function() {
  var prevCh, prevRV, prevName, prevDoc;

  if (this.current.rv == 'r') {
    prevRV = 'v'
    prevCh = (+this.current.charta) - 1
  } else {
    prevRV = 'r'
    prevCh = this.current.charta
  }

  // Then convert nextCh back to string with 3 decimal places
  s = "00" + prevCh
  prevName = s.substr(s.length - 3)

  return this.handleAnamolies(prevName, prevRV , 'previous')
}

NavUtil.prototype.setupNextHref = function() {
  var nextCh, nextRV, nextName, nextDoc;

  if (this.current.rv == 'r') {
    nextRV = 'v'
    nextCh = this.current.charta
  } else {
    nextRV = 'r'

    // Turn currentCh string into number then subtract 1
    nextCh = (+this.current.charta) + 1
  }

  // Then convert nextCh back to string with 3 decimal places
  var s = "00" + nextCh
  nextName = s.substr(s.length - 3)

  return this.handleAnamolies(nextName, nextRV, 'next')
}

NavUtil.prototype.handleAnamolies = function(name, rv, direction) {
  // Direction is whether navigation direction is going 'next' or 'previous'

  var forbiddenNames = [
    '000'
  ]

  var isInvalid = forbiddenNames.find(function(el) {
    if (name == el) {
      return true
    }
  })

  if (isInvalid) { return '#' }

  var anamolies = [
    {
      name: '004',
      rv: 'r',
      correction: 'c004r-c005r'
    },
    {
      name: '004',
      rv: 'v',
      correction: 'c005v-c007r'
    },
    {
      name: '005',
      rv: 'v',
      correction: 'c005v-c007r'
    },
    {
      name: '005',
      rv: 'r',
      correction: 'c004r-c005r'
    },
    {
      name: '006',
      rv: 'r',
      correction: 'c007v'
    },
    {
      name: '007',
      rv: 'r',
      correction: 'c005v-c007r'
    },
    {
      name: '008',
      rv: 'v',
      correction: 'c008v-c009v'
    },
    {
      name: '009',
      rv: 'r',
      correction: 'c010r'
    },
    {
      name: '009',
      rv: 'v',
      correction: 'c008v-c009v'
    },
    {
      name: '011',
      rv: 'r',
      correction: 'c011r-c011v'
    },
    {
      name: '011',
      rv: 'v',
      correction: {
        next: 'c012r-c012v',
        previous: 'c011r-c011v'
      }
    },
    {
      name: '012',
      rv: 'v',
      correction: {
        next: 'c013r-c013v',
        previous: 'c012r-c012v'
      }
    },
    {
      name: '013',
      rv: 'v',
      correction: {
        next: 'c014r',
        previous: 'c013r-c013v'
      }
    },
    {
      name: '015',
      rv: 'r',
      correction: 'c015r-c018v'
    },
    {
      name: '015',
      rv: 'v',
      correction: 'c019r'
    },
    {
      name: '018',
      rv: 'v',
      correction: 'c015r-c018v'
    }

  ]

  var isAnamoly = anamolies.find(function(el) {
    if (name == el.name && rv == el.rv) {
      return true
    }
  })

  if (!isAnamoly) {
    return 'c' + name + rv + '.xml'
  } else {

    if (typeof isAnamoly.correction === 'string') {
      return isAnamoly.correction + '.xml'
    } else {
      return isAnamoly.correction[direction] + '.xml'
    }
  }
}
