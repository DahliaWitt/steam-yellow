var ProtoBuf = require('../../'),
    ByteBuffer = ProtoBuf.ByteBuffer;
var prototext = String(function() {
/*
package str;

message Value {
  oneof type {
    string string = 1;
    bytes bytes = 2;
  }
}
*/
}).match(/\/\*([^]*)\*\//)[1];

var builder = ProtoBuf.loadProto(prototext);
var messageValue = builder.build('str.Value');
var bb = ByteBuffer.wrap([10, 1, 97, 10, 2, 98, 98, 10, 3, 99, 99, 99]);
bb.printDebug();
var value1 = messageValue.decode(bb);
bb.printDebug();
bb = ByteBuffer.wrap([10, 3, 99, 99, 99]);
bb.printDebug();
var value2 = messageValue.decode(bb);
bb.printDebug();
console.log('value1: %j', value1);
console.log('value2: %j', value2);
