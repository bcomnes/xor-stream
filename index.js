var from2 = require('from2')
var iterate = require('stream-iterate')

function xorStream (streamA, streamB) {
  var readA = iterate(streamA)
  var readB = iterate(streamB)

  var stream = from2(loop)

  function loop (size, cb) {
    readA(function (err, dataA, nextA) {
      if (err) return cb(err)
      readB(function (err, dataB, nextB) {
        if (err) return cb(err)

        if (!dataA && !dataB) return cb(null, null)

        // dataA exausted
        if (!dataA) {
          dataA = new Buffer(dataB.length)
          dataA.fill(0)
        }

        if (!dataB) {
          dataB = new Buffer(dataA.length)
          dataB.fill(0)
        }

        var xorBuf = xor(dataA, dataB)

        nextA()
        nextB()
        cb(null, xorBuf)
      })
    })
  }

  stream.on('close', function () {
    if (streamA.destroy) streamA.destroy()
    if (streamB.destroy) streamB.destroy()
  })

  return stream
}

function xor (bufA, bufB) {
  var length = bufA.length > bufB.length ? bufA.length : bufB.length
  var pairity = new Buffer(length)

  for (var i = 0; i < length; i++) {
    pairity[i] = (bufA[i] || 0) ^ (bufB[i] || 0)
  }

  return pairity
}

module.exports = xorStream
