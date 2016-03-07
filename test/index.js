var test = require('tape')
var xorStream = require('../index')
var fs = require('fs')
var path = require('path')
var streamEqual = require('stream-equal')
var fromString = require('from2-string')
var crypto = require('crypto')

var pathA = path.resolve(path.join(__dirname, 'data', 'cat1.jpg'))
var pathB = path.resolve(path.join(__dirname, 'data', 'cat2.jpg'))

var streamACtor = fsStreamCtor(pathA)
var streamBCtor = fsStreamCtor(pathB)

var aXorBCtor = xorStreamCtor(streamACtor, streamBCtor)

function fsStreamCtor (path) {
  return function () {
    return fs.createReadStream(path)
  }
}

function xorStreamCtor (streamACtor, streamBCtor) {
  return function () {
    return xorStream(streamACtor(), streamBCtor())
  }
}

test('compare longer file to shorter file', function (t) {
  // this fails right now
  t.plan(2)

  var xorB = xorStream(aXorBCtor(), streamBCtor())

  streamEqual(streamACtor(), xorB, function (err, equal) {
    t.error(err, 'streams compared without error')
    t.ok(equal, 'equal pairity output')
  })
})

test.skip('compare shorter file to longer file', function (t) {
  t.plan(2)

  var xorA = xorStream(aXorBCtor(), streamACtor())

  streamEqual(streamBCtor(), xorA, function (err, equal) {
    t.error(err, 'streams compared without error')
    t.ok(equal, 'equal pairity output')
  })
})

test('compare stings', function (t) {
  t.plan(2)

  var strA = crypto.randomBytes(1000).toString('hex')
  var strB = crypto.randomBytes(1000).toString('hex')

  var strXor = xorStream(fromString(strA), fromString(strB))
  var strXorA = xorStream(strXor, fromString(strA))

  streamEqual(fromString(strB), strXorA, function (err, equal) {
    t.error(err, 'streams compared without error')
    t.ok(equal, 'equal pairity output')
  })
})
