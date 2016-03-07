# xor-stream
Take two readable streams and return a readable stream that contains chunkB XOR chunkB

```
npm install xor-stream
```

[![Build Status](https://travis-ci.org/bcomnes/xor-stream.svg?branch=master)](https://travis-ci.org/bcomnes/xor-stream)

This can be used to calculate pairty blobs of the contents of two streams.

##  Example

``` js
var xorStream = require('xor-stream')
var streamEqual = require('stream-equal')
var rs = require('fs').createReadStream

var pairty = xorStream(rs('pathA'), rs('pathB'))
var contentOfA = xorStream(pairty, rs('pathB'))

streamEqual(rs('pathA'), contentOfA, function (err, equal) {
  console.log(equal) // true if file A is larger than File B
})
```

Right now, if one file is longer than the other, `xor-stream` pads the shorter stream with 0 bytes, so recovering shorter files from the longer file XOR pairty will have extra byte padding at the end.

## Background

- https://nodejs.org/api/buffer.html#buffer_new_buffer_str_encoding
- https://github.com/feross/safe-buffer
- https://www.npmjs.com/package/through2
- http://www.snapraid.it/compare
- https://en.wikipedia.org/wiki/Parchive
- ((chunkA) || 0byte) xor (chunkB || 0byte )
- https://github.com/mafintosh/stream-iterate
- https://github.com/mafintosh/sorted-union-stream
