var from2 = require('from2')
var iterate = require('stream-iterate')

function xor (streamA, streamB) {
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
          nextB()
          return cb(null, dataB)
        }

        // dataB exausted
        if (!dataB) {
          nextA()
          return cb(null, dataA)
        }

        var length = dataA.length > dataB.length ? dataA.length : dataB.length

        var xorBuf = Buffer.alloc(length)

        for (var i = 0; i < length; i++) {
          xorBuf[i] = (dataA[i] || 0) ^ (dataB[i] || 0)
        }

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

module.exports = xor
