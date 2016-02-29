# xor-stream
Take two readable streams and return a readable stream with the xor of the two input chunks

## Background

- https://nodejs.org/api/buffer.html#buffer_new_buffer_str_encoding
- https://github.com/feross/safe-buffer
- https://www.npmjs.com/package/through2
- http://www.snapraid.it/compare
- https://en.wikipedia.org/wiki/Parchive
- ((chunkA) || 0byte) xor (chunkB || 0byte )
- https://github.com/mafintosh/stream-iterate

```
18:54 <bret> ogd/mafintosh finally got home, you around?
18:56 <bret> mafintosh/ogd, when you have time, if you can point me to examples of some kind of two readable streams into a single transform stream?  either using the https://github.com/maxogden/mississippi#each or the crazy onliner stuff would be muy bueno 
19:06 <@mafintosh> bret: https://github.com/mafintosh/sorted-union-stream/blob/master/index.js
19:08 <bret> mafintosh: cool looking
19:13 <bret> in practice, this is the kind of thing that exists now http://www.flexraid.com/ http://www.snapraid.it/
19:52 <bret> mafintosh: can you write down how you see this working again?  we want an xor-stream, that takes two readable streams and returns a readable stream of the xor of the two input streams?
19:52 <bret> https://en.wikipedia.org/wiki/Parchive more info
19:52 <@mafintosh> bret: yea
19:53 <@mafintosh> bret: and i guess it should just pad one of the streams with 0 bytes if its shorter than the other one
19:54 <@mafintosh> bret: https://gist.github.com/mafintosh/74075e6093fbfd30e559
closemafintosh — 28 Feb 2016

19:54 <bret> ((chunkA) || 0byte) xor (chunkB || 0byte )
19:54 <@mafintosh> yea
19:54 <bret> 👍
20:12 <bret> mafintosh: what should I turn the buffers into again?
20:13 <bret> https://nodejs.org/api/buffer.html
20:13 <@mafintosh> bret you can need to read the bytes using buf[i]
20:14 <bret> oh cool thats easy enough
20:14 <bret> sorry totally new to buffers
20:14 <bret> should I use https://github.com/feross/safe-buffer to create a new buffer?
20:14 <bret> and push that?
New messages
20:20 <bret> i should read the buffer docs
```

