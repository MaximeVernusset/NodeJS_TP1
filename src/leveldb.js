"use strict";
exports.__esModule = true;
var encoding_down_1 = require("encoding-down");
var leveldown_1 = require("leveldown");
var levelup_1 = require("levelup");
var LevelDb = /** @class */ (function () {
    function LevelDb() {
    }
    LevelDb.open = function (path) {
        var encoded = encoding_down_1["default"](leveldown_1["default"](path), { valueEncoding: 'json' });
        return levelup_1["default"](encoded);
    };
    return LevelDb;
}());
exports.LevelDb = LevelDb;
