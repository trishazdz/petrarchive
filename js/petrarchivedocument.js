import $ from 'jquery'

export default PetrarchiveDocument

function PetrarchiveDocument(url, name) {
  if (url) {
    this.url = url
  } else {
    if (name[0] !== 'c') {
      name = 'c' + name
    }
    this.url = '/' + name + '.xml'
  }

  let urlSplit = this.url.split('/')

  if (this.url.match(/#/)) {
    this.hash = this.url.split('#')[1]
    this.doc = urlSplit[urlSplit.length - 1].split('#')[0]
  } else [
    this.doc = urlSplit[urlSplit.length - 1]
  ]

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
  let splitNames = this.name.split('-') //[0].substring(1,4)
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
  let formatted  
 
  return formatted
} 

function Charta(ch) {
  this.rv = ch.substring(4,5)
  this.charta = ch.substring(1,4)
}

Charta.prototype.getPrettyName = function() {
  let charta = this.charta.replace(/^0+/, ''),
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
  let nextCh, nextRV, nextName;

  if (this.rv == 'r') {
    nextRV = 'v'
    nextCh = this.charta
  } else {
    nextRV = 'r'

    // Turn currentCh string into number then subtract 1
    nextCh = (+this.charta) + 1
  }

  // Then convert nextCh back to string with 3 decimal places
  let s = "00" + nextCh
  nextName = s.substr(s.length - 3) + nextRV

  return nextName
}

Charta.prototype.getPrevCh = function() {
  let prevCh, prevRV, prevName;

  if (this.rv == 'r') {
    prevRV = 'v'
    prevCh = (+this.charta) - 1
  } else {
    prevRV = 'r'
    prevCh = this.charta
  }

  // Then convert nextCh back to string with 3 decimal places
  let s = "00" + prevCh
  prevName = s.substr(s.length - 3) + prevRV

  return prevName
}