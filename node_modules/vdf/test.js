/* nodeunit test for vdf.js */
/*jshint multistr: true */

var vdf = require("./index");

/* De-serialization */
var UNQUOTED_VDF = "\n\
    node \n\
    { \n\
        key value \n\
    } \n\
    ",

    QUOTED_VDF = " \n\
    \"node\" \n\
    { \n\
        \"key\" \"value\" \n\
    } \n\
    ",

    MACRO_UNQUOTED_VDF = " \n\
    node \n\
    { \n\
        key value [$MACRO] \n\
    } \n\
    ",

    MACRO_QUOTED_VDF = " \n\
    \"node\" \n\
    { \n\
        \"key\" \"value\" [$MACRO] \n\
    } \n\
    ",

    COMMENT_QUOTED_VDF = " \n\
    \"node\" \n\
    { \n\
        // Hi I'm a comment. \n\
        \"key\" \"value\" [$MACRO] \n\
    } \n\
    ",

    SUBNODE_QUOTED_VDF = " \n\
    \"node\" \n\
    { \n\
        \"subnode\" \n\
        { \n\
            \"key\" \"value\" \n\
        } \n\
    } \n\
    ",

    MIXED_VDF = " \n\
    node \n\
    { \n\
        \"key\" value \n\
        key2 \"value\" \n\
        \"key3\" \"value\" [$MACRO] \n\
 \n\
        // Comment \n\
        \"subnode\" [$MACRO] \n\
        { \n\
            key value \n\
        } \n\
 \n\
        \"key4\" \"value\" \n\
    } \n\
    ",

    /* Expectations */
    EXPECTED_UNQUOTED_VDF = {
        "node": {
            "key": "value"
            }
        },

    EXPECTED_QUOTED_VDF = EXPECTED_UNQUOTED_VDF,
    EXPECTED_MACRO_UNQUOTED_VDF = EXPECTED_UNQUOTED_VDF,
    EXPECTED_MACRO_QUOTED_VDF = EXPECTED_UNQUOTED_VDF,
    EXPECTED_COMMENT_QUOTED_VDF = EXPECTED_UNQUOTED_VDF,

    EXPECTED_SUBNODE_QUOTED_VDF = {
        "node": {
            "subnode": {
                "key": "value"
                }
            }
        },
    EXPECTED_MIXED_VDF = {
        "node": {
            "key": "value",
            "key2": "value",
            "key3": "value",
            "subnode": {
                "key": "value"
                },
            "key4": "value"
            }
        };

/* Serialization */
var SIMPLE_OBJ = EXPECTED_UNQUOTED_VDF,

    SUBNODE_OBJ = EXPECTED_SUBNODE_QUOTED_VDF,

    ARRAY_OBJ = {
        "array": [
            "a",
            "b",
            "c"]
    },

    NUMERICAL_OBJ = {
        "number": 1,
        "number2": 2
    },

    COMBINATION_OF_ABOVE_OBJ = {
        "node": {
            "key": "value",
            "subnode": {
                "key": "value"
            },
            "array": ["a", "b", "c", 1, 2, 3],
            "number": 1024
        }
    },

    /* Expectations */
    EXPECTED_SIMPLE_OBJ = SIMPLE_OBJ,

    EXPECTED_SUBNODE_OBJ = SUBNODE_OBJ,

    EXPECTED_ARRAY_OBJ = {
        "array": {
            "a": "1",
            "b": "1",
            "c": "1"
        }
    },

    EXPECTED_NUMERICAL_OBJ = {
        "number": "1",
        "number2": "2"
    },

    EXPECTED_COMBINATION_OF_ABOVE_OBJ = {
        "node": {
            "key": "value",
            "subnode": {
                "key": "value"
            },
            "array": {
                "a": "1",
                "b": "1",
                "c": "1",
                "1": "1",
                "2": "1",
                "3": "1"
            },
            "number": "1024"
        }
    };

/* Tests */
exports.deserialization = {
    test_unquoted: function (test) { test.equal(JSON.stringify(EXPECTED_UNQUOTED_VDF), JSON.stringify(vdf.parse(UNQUOTED_VDF))); test.done(); },
    test_quoted: function (test) { test.equal(JSON.stringify(EXPECTED_QUOTED_VDF), JSON.stringify(vdf.parse(QUOTED_VDF))); test.done(); },
    test_macro_unquoted: function (test) { test.equal(JSON.stringify(EXPECTED_MACRO_UNQUOTED_VDF), JSON.stringify(vdf.parse(MACRO_UNQUOTED_VDF))); test.done(); },
    test_macro_quoted: function (test) { test.equal(JSON.stringify(EXPECTED_MACRO_QUOTED_VDF), JSON.stringify(vdf.parse(MACRO_QUOTED_VDF))); test.done(); },
    test_comment_quoted: function (test) { test.equal(JSON.stringify(EXPECTED_COMMENT_QUOTED_VDF), JSON.stringify(vdf.parse(COMMENT_QUOTED_VDF))); test.done(); },
    test_subnode_quoted: function (test) { test.equal(JSON.stringify(EXPECTED_SUBNODE_QUOTED_VDF), JSON.stringify(vdf.parse(SUBNODE_QUOTED_VDF))); test.done(); },
    test_mixed: function (test) { test.equal(JSON.stringify(EXPECTED_MIXED_VDF), JSON.stringify(vdf.parse(MIXED_VDF))); test.done(); }
};

exports.serialization = {
    test_simple_object: function (test) { test.equal(JSON.stringify(EXPECTED_SIMPLE_OBJ), JSON.stringify(vdf.parse(vdf.dump(SIMPLE_OBJ)))); test.done(); },
    test_subnode_object: function (test) { test.equal(JSON.stringify(EXPECTED_SUBNODE_OBJ), JSON.stringify(vdf.parse(vdf.dump(SUBNODE_OBJ)))); test.done(); },
    test_array_object: function (test) { test.equal(JSON.stringify(EXPECTED_ARRAY_OBJ), JSON.stringify(vdf.parse(vdf.dump(ARRAY_OBJ)))); test.done(); },
    test_numerical_object: function (test) { test.equal(JSON.stringify(EXPECTED_NUMERICAL_OBJ), JSON.stringify(vdf.parse(vdf.dump(NUMERICAL_OBJ)))); test.done(); },
    test_combination_of_above: function (test) { test.equal(JSON.stringify(EXPECTED_COMBINATION_OF_ABOVE_OBJ), JSON.stringify(vdf.parse(vdf.dump(COMBINATION_OF_ABOVE_OBJ)))); test.done(); }
};