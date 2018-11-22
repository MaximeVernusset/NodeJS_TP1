#!/usr/bin/env ts-node
"use strict";
exports.__esModule = true;
var metrics_1 = require("../src/metrics");
var met1 = [
    new metrics_1.Metric("" + new Date('2013-11-04 14:00 UTC').getTime(), 12),
    new metrics_1.Metric("" + new Date('2013-11-04 14:15 UTC').getTime(), 10),
    new metrics_1.Metric("" + new Date('2013-11-04 14:30 UTC').getTime(), 8)
];
var db = new metrics_1.MetricsHandler('./db');
db.save("1", met1, function (err) {
    if (err)
        throw err;
    console.log('Data populated');
});
