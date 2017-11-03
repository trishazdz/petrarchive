
function PetrarchiveDocument(url, name) {
  if (url) {
    this.url = url
  } else {
    this.url = '/' + name + '.xml'
  }

  this.urlSplit = this.url.split('/')
  this.doc = this.urlSplit[this.urlSplit.length - 1]
  this.hash = this.doc.split('#')[1]

  this.name = this.doc.split('.')[0]
  this.charta = this.name.split('_')[0].substring(1,4)
  this.rv = this.name.split('_')[0].substring(4,5)

  // When the name of the document is split by underscores,
  // the length will be longer than 1 if it is commentary since file names
  // should be c00x_with_commentary
  this.commentary = this.name.split('_').length > 1
}


PetrarchiveDocument.prototype.getPrettyName = function() {
  var chartaNum = this.charta.substring(0, this.charta.length - 1),
      prettyRV;

  if (this.rv == 'r') {
    prettyRV = 'recto'
  } else {
    prettyRV = 'verso'
  }

  return chartaNum + ' ' + prettyRV
}
