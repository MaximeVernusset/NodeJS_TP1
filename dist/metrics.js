"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leveldb_1 = require("./leveldb");
const level_ws_1 = __importDefault(require("level-ws"));
class Metric {
    constructor(ts, v) {
        this.timestamp = ts;
        this.value = v;
    }
}
exports.Metric = Metric;
class MetricsHandler {
    constructor(dbPath) {
        this.db = leveldb_1.LevelDb.open(dbPath);
    }
    /*Enregistre des métriques dans la BDD*/
    save(username, key, metrics, callback) {
        const stream = level_ws_1.default(this.db);
        stream.on('error', callback);
        stream.on('close', callback);
        metrics.forEach((m) => {
            stream.write({ key: `metric:${username}:${key}:${m.timestamp}`, value: m.value });
        });
        stream.end();
    }
    /*Récupère toutes les métriques*/
    getAll(username, callback) {
        const stream = this.db.createReadStream();
        var met = {};
        stream.on('error', callback);
        stream.on('end', (err) => {
            callback(null, met);
        });
        stream.on('data', (data) => {
            const [, usrnme, k, timestamp] = data.key.split(":");
            const value = data.value;
            if (usrnme === username) {
                if (met[k] === undefined)
                    met[k] = [];
                met[k].push(new Metric(timestamp, value));
            }
        });
    }
    /*Récupère les métriques associées à la clé donnée*/
    get(username, key, callback) {
        const stream = this.db.createReadStream();
        var met = [];
        stream.on('error', callback);
        stream.on('end', (err) => {
            callback(null, met);
        });
        stream.on('data', (data) => {
            const [, usrnme, k, timestamp] = data.key.split(":");
            const value = data.value;
            if (usrnme === username && k === key)
                met.push(new Metric(timestamp, value));
        });
    }
    /*Supprime les métriques associées à la clé donnée*/
    delete(username, key, callback) {
        const stream = this.db.createReadStream();
        stream.on('error', callback);
        stream.on('end', (err) => {
            callback(null);
        });
        stream.on('data', (data) => {
            const [, usrnme, k, timestamp] = data.key.split(":");
            if (usrnme === username && k === key)
                this.db.del(data.key);
        });
    }
}
exports.MetricsHandler = MetricsHandler;
