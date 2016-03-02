var from2 = require('from2')
var iterate = require('stream-iterate')

function xor(streamA, streamB) {
  var readA = iterate(streamA)
  var readB = iterate(streamB)

  var stream = from2(loop)

  function loop (size, cb) {
    readA(function (err, dataA, nextA) {
      if (err) return cb(err)
      readB(function (err, dataB, nextB) {
        if (err) return cb(err)

        if (!dataA && !dataB) return cb(null, null)


        var bufLen = dataA && data.len
        var xorBuf = new Buffer
      }
    }

  }
}

module.exports = union
