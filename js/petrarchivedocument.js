
function PetrarchiveDocument(url, name) {
  if (url) {
    this.url = url
  } else {
    if (name[0] !== 'c') {
      name = 'c' + name
    }
    this.url = '/' + name + '.xml'
  }

  this.urlSplit = this.url.split('/')
  this.doc = this.urlSplit[this.urlSplit.length - 1]
  this.hash = this.doc.split('#')[1]

  this.name = this.doc.split('.')[0]
  this.chartae
  this.rv = this.name.split('_')[0].substring(4,5)

  // When the name of the document is split by underscores,
  // the length will be longer than 1 if it is commentary since file names
  // should be c00x_with_commentary
  this.commentary = this.name.split('_').length > 1

  this.setupChartae()
}

PetrarchiveDocument.prototype.setupChartae = function() {
  var splitNames = this.name.split('-') //[0].substring(1,4)
  if (splitNames.length > 1) {
    this.chartae = [
      new Charta(splitNames[0]), 
      new Charta(splitNames[1])
    ]
  } else {
    this.chartae = [new Charta(splitNames[0])]
  }
}

PetrarchiveDocument.prototype.getChartae = function() {
  return this.chartae
}

PetrarchiveDocument.prototype.getChartaFirst = function() {
  return this.chartae[0]
}
PetrarchiveDocument.prototype.getChartaLast = function() {
  return this.chartae[this.chartae.length - 1]
}

// Get the charta and rvf in accordance to the textindex format
PetrarchiveDocument.prototype.getChartaTextindex = function() {
  var formatted,
      hasMultipleCh = Array.isArray(this.charta);
  
 
  return formatted
} 

function Charta(ch) {
  this.rv = ch.substring(4,5)
  this.charta = ch.substring(1,4)
}

Charta.prototype.getPrettyName = function() {
  var charta = this.charta.replace(/^0+/, ''),
      prettyRV;

  if (this.rv == 'r') {
    prettyRV = 'recto'
  } else {
    prettyRV = 'verso'
  }

  return charta + ' ' + prettyRV
}

Charta.prototype.getPrettyNameTextindex = function() {
  return this.charta.replace(/^0+/,'') + this.rv
}

Charta.prototype.getNextCh = function() {
  var nextCh, nextRV, nextName, nextDoc;
  var current;

  if (this.rv == 'r') {
    nextRV = 'v'
    nextCh = this.charta
  } else {
    nextRV = 'r'

    // Turn currentCh string into number then subtract 1
    nextCh = (+this.charta) + 1
  }

  // Then convert nextCh back to string with 3 decimal places
  var s = "00" + nextCh
  nextName = s.substr(s.length - 3) + nextRV

  return nextName
}

Charta.prototype.getPrevCh = function() {
  var prevCh, prevRV, prevName, prevDoc;

  if (this.rv == 'r') {
    prevRV = 'v'
    prevCh = (+this.charta) - 1
  } else {
    prevRV = 'r'
    prevCh = this.charta
  }

  // Then convert nextCh back to string with 3 decimal places
  s = "00" + prevCh
  prevName = s.substr(s.length - 3) + prevRV

  return prevName
}