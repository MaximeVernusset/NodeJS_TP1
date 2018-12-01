#!/usr/bin/env ts-node

import { Metric, MetricsHandler } from '../src/metrics';

const met1 = [
  new Metric(`${new Date('2013-11-04 14:00 UTC').getTime()}`, 12),
  new Metric(`${new Date('2013-11-04 14:15 UTC').getTime()}`, 10),
  new Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 8)
];
const met2 = [
  new Metric(`${new Date('2013-11-04 14:00 UTC').getTime()}`, 13),
  new Metric(`${new Date('2013-11-04 14:15 UTC').getTime()}`, 11),
  new Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 9)
];

const db = new MetricsHandler('./db/metrics');

db.save("max", "1", met1, (err: Error | null) => {
  if (err) throw err;
  console.log('Data populated');
});
db.save("max", "2", met2, (err: Error | null) => {
  if (err) throw err;
  console.log('Data populated');
});

db.save("test", "2", met2, (err: Error | null) => {
  if (err) throw err;
  console.log('Data populated');
});
db.save("test", "3", met1, (err: Error | null) => {
  if (err) throw err;
  console.log('Data populated');
});