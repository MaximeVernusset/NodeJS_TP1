import { LevelDb } from './leveldb';
import WriteStream from 'level-ws';

export class Metric {
    public timestamp: string;
    public value: number;
  
    constructor(ts: string, v: number) {
      this.timestamp = ts;
      this.value = v;
    }
}
  
export class MetricsHandler {
    public db: any;

    constructor(dbPath: string) {
      this.db = LevelDb.open(dbPath);
    }

    /*Enregistre des métriques dans la BDD*/
    public save(username: string, key: string, metrics: Metric[], callback: (error: Error | null) => void) {
        const stream = WriteStream(this.db);

        stream.on('error', callback);
        stream.on('close', callback);

        metrics.forEach((m: Metric) => {
            stream.write({ key: `metric:${username}:${key}:${m.timestamp}`, value: m.value });
        });

        stream.end();
    }

    /*Récupère toutes les métriques*/
    public getAll(username: string, callback: (err: Error | null, result?: {}) => void) {
        const stream = this.db.createReadStream();
        var met = {};
    
        stream.on('error', callback);
        stream.on('end', (err: Error) => {
            callback(null, met);
        });
        stream.on('data', (data: any) => {
            const [, usrnme, k, timestamp] = data.key.split(":");
            const value = data.value;
            if(usrnme === username) {
                if(met[k] === undefined)
                    met[k] = [];
                met[k].push(new Metric(timestamp, value));
            }
        });
    }

    /*Récupère les métriques associées à la clé donnée*/
    public get(username: string, key: string, callback: (err: Error | null, result?: Metric[]) => void) {
        const stream = this.db.createReadStream();
        var met: Metric[] = [];
    
        stream.on('error', callback);
        stream.on('end', (err: Error) => {
            callback(null, met);
        });
        stream.on('data', (data: any) => {
            const [, usrnme, k, timestamp] = data.key.split(":");
            const value = data.value;
            if(usrnme === username && k === key)
                met.push(new Metric(timestamp, value));
        });
    }

    /*Supprime les métriques associées à la clé donnée*/
    public delete(username: string, key: string, callback: (err: Error | null) => void) {
        const stream = this.db.createReadStream();
    
        stream.on('error', callback);
        stream.on('end', (err: Error) => {
            callback(null);
        });
        stream.on('data', (data: any) => {
            const [, usrnme, k, timestamp] = data.key.split(":");
            if (usrnme === username && k === key)
                this.db.del(data.key);
        });
    }
}