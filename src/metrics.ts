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
    private db: any 

    constructor(dbPath: string) {
      this.db = LevelDb.open(dbPath);
    }

    public save(key: string, metrics: Metric[], callback: (error: Error | null) => void) {
        const stream = WriteStream(this.db);

        stream.on('error', callback);
        stream.on('close', callback);

        metrics.forEach((m: Metric) => {
            stream.write({ key: `metric:${key}:${m.timestamp}`, value: m.value });
        });

        stream.end();
    }

    public getAll(callback: (err: Error | null, result?: Metric[]) => void) {
        const stream = this.db.createReadStream();
        var met: Metric[] = [];
    
        stream.on('error', callback);
        stream.on('end', (err: Error) => {
            callback(null, met);
        });
        stream.on('data', (data: any) => {
            const [, , timestamp] = data.key.split(":");
            const value = data.value;
            met.push(new Metric(timestamp, value));
        });
    }

    public get(key: string, callback: (err: Error | null, result?: Metric[]) => void) {
        const stream = this.db.createReadStream();
        var met: Metric[] = [];
    
        stream.on('error', callback);
        stream.on('end', (err: Error) => {
            callback(null, met);
        });
        stream.on('data', (data: any) => {
            const [, k, timestamp] = data.key.split(":");
            const value = data.value;
            if (key != k)
                console.log(`Level DB error: ${data} does not match key ${key}`);
            else
                met.push(new Metric(timestamp, value));
        });
    }
}
