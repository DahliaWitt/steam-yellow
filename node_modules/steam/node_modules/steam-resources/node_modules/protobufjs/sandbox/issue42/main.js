var ProtoBuf = require("../../index.js");

var root = ProtoBuf.loadProtoFile(__dirname+"/innerextend.proto").build();
console.log(root);

root = ProtoBuf.loadProtoFile(__dirname+"/outerextend.proto").build();
console.log(root);

