node-vdf
======

A port of [steamodd](https://github.com/Lagg/steamodd/)'s vdf.py to node.js.

Tests are written for use with [nodeunit](https://github.com/caolan/nodeunit), and can be executed with `nodeunit test.js`.

##Methods
### parse(string)
Parses a VDF string and returns an object.

### dump(obj)
Dumps an object to a VDF string.