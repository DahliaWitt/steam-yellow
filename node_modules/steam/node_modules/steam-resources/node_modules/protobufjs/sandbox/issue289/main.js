var ProtoBuf = require("../../");

var builder = ProtoBuf.newBuilder({ convertFieldsToCamelCase: true });
ProtoBuf.loadProtoFile("A.proto", builder);
ProtoBuf.loadProtoFile("B.proto", builder);

builder.build();
