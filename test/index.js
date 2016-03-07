var test = require('tape')
var xorStream = require('../index')
var fromString = require('from2-string')
var path = require('path')
var pump = require('pump')
var fs = require('fs')

var filePathA = path.resolve('./data/cat1.jpg')
var filePathB = path.resolve('./data/cat2.jpg')

test('compare strings', function (t) {
  var stringLength = 36
  var streamA = fromStrCtor(stringLength)
  var streamB = fromStrCtor(stringLength)

  console.log(streamA.string.length)
  console.log(streamB.string.length)

  var aXorB = xorStream(streamA(), streamB())

  aXorB.pipe(process.stdout)

  pump(aXorB, process.stdout, function (err) {
    console.log('pipe finished')
    t.error(err)
    t.end()
  })
})

function generateString (length) {
  return Math.random().toString(length).slice(2)
}

function fromStrCtor (length) {
  var string = generateString(length)

  function getStream () {
    return fromString(string)
  }

  getStream.string = string

  return getStream
}
