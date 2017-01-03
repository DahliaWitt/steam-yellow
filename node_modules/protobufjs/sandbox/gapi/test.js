var Suite = require("testjs"),
    ProtoBuf = require("../../dist/ProtoBuf.js");

Suite.run({
    "gapi": function(test) {
        var builder = ProtoBuf.loadProtoFile("./test.proto");
        var Value = builder.build("Value");
        var value1 = new Value({
            boolean_value: false
        });
        test.strictEqual(value1.value_type, "boolean_value");

        var value2 = Value.decode(value1.encode());
        test.strictEqual(value2.value_type, "boolean_value");
        test.done();
    }
});
