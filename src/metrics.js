"use strict";
exports.__esModule = true;
var leveldb_1 = require("./leveldb");
var level_ws_1 = require("level-ws");
var Metric = /** @class */ (function () {
    function Metric(ts, v) {
        this.timestamp = ts;
        this.value = v;
    }
    return Metric;
}());
exports.Metric = Metric;
var MetricsHandler = /** @class */ (function () {
    function MetricsHandler(dbPath) {
        this.db = leveldb_1.LevelDb.open(dbPath);
    }
    MetricsHandler.prototype.save = function (key, metrics, callback) {
        var stream = level_ws_1["default"](this.db);
        stream.on('error', callback);
        stream.on('close', callback);
        metrics.forEach(function (m) {
            stream.write({ key: "metric:" + key + m.timestamp, value: m.value });
        });
        stream.end();
    };
    MetricsHandler.prototype.get = function (key, callback) {
        var stream = this.db.createReadStream();
        var met = [];
        stream.on('error', callback);
        stream.on('end', function (err) {
            callback(null, met);
        });
        stream.on('data', function (data) {
            var _a = data.key.split(":"), k = _a[1], timestamp = _a[2];
            var value = data.value;
            if (key != k)
                console.log("Level DB error: " + data + " does not match key " + key);
            met.push(new Metric(timestamp, value));
        });
    };
    return MetricsHandler;
}());
exports.MetricsHandler = MetricsHandler;
