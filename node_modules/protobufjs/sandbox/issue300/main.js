var ProtoBuf = require("../../index.js");

var builder = ProtoBuf.loadProtoFile(__dirname+'/Request.proto');
ProtoBuf.loadProtoFile(__dirname+"/IAuth.proto", builder);

var Request = builder.build('RpcMessage.Request'),
    Name = builder.build('IAuth.Name');

var name = new Name("name"),
    type = Request.Type.RT_REQ;

var msg = new Request({
    type: type,
    signature: 754793469,
    instance : "Auth",
    method : "user",
    pbin : name.encode(),
    serverRouteAddr: "address"
});

// Send it over the wire, but don't use a binary string but base64 here...
var buffer = msg.encode().toBase64();

// Decode it on the receiving end...
var request = Request.decode(buffer, "base64");
console.log(request);
