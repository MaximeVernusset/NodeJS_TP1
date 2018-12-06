#!/usr/bin/env ts-node

import { Metric, MetricsHandler } from '../src/metrics';
import { User, UserHandler } from '../src/users';
import { LevelDb } from '../src/leveldb';


const user1: User = new User('user1', 'user@name1', 'user1');
const user2: User = new User('user2', 'user@name2', 'user2');
const user3: User = new User('user3', 'user@name3', 'user3');

const idUser1Met1: string = '1';
const idUser1Met2: string = '2';
const idUser2Met1: string = '1';
const idUser2Met2: string = '2';
const idUser2Met3: string = '3';


const user1Met1: Metric[] = [
  new Metric(`${new Date('2018-12-06 14:00 UTC').getTime()}`, 1),
  new Metric(`${new Date('2018-12-06 14:15 UTC').getTime()}`, 2),
  new Metric(`${new Date('2018-12-06 14:30 UTC').getTime()}`, 3)
];
const user1Met2: Metric[] = [
  new Metric(`${new Date('2018-12-06 16:45 UTC').getTime()}`, 3),
  new Metric(`${new Date('2018-12-06 17:00 UTC').getTime()}`, 2),
  new Metric(`${new Date('2018-12-06 17:15 UTC').getTime()}`, 1)
];

const user2Met1: Metric[] = [
  new Metric(`${new Date('2018-12-08 13:00 UTC').getTime()}`, 2),
  new Metric(`${new Date('2018-12-08 13:15 UTC').getTime()}`, 4),
  new Metric(`${new Date('2018-12-08 13:30 UTC').getTime()}`, 6)
];
const user2Met2: Metric[] = [
  new Metric(`${new Date('2018-12-09 15:00 UTC').getTime()}`, 3),
  new Metric(`${new Date('2018-12-09 15:15 UTC').getTime()}`, 6),
  new Metric(`${new Date('2018-12-09 15:30 UTC').getTime()}`, 9)
];
const user2Met3: Metric[] = [
  new Metric(`${new Date('2018-12-09 15:00 UTC').getTime()}`, 4),
  new Metric(`${new Date('2018-12-09 15:15 UTC').getTime()}`, 9),
  new Metric(`${new Date('2018-12-09 15:30 UTC').getTime()}`, 7),
  new Metric(`${new Date('2018-12-09 15:45 UTC').getTime()}`, 9),
  new Metric(`${new Date('2018-12-09 16:00 UTC').getTime()}`, 5),
  new Metric(`${new Date('2018-12-09 16:15 UTC').getTime()}`, 12)
];

const db: LevelDb = LevelDb.open('./db/users&metrics');
const dbUser: UserHandler = new UserHandler(db);
const dbMet: MetricsHandler = new MetricsHandler(db);

dbUser.save(user1, (err: Error | null) => {
  if (err) throw err;
  console.log(`${user1.username} populated`);
});
dbUser.save(user2, (err: Error | null) => {
  if (err) throw err;
  console.log(`${user2.username} populated`);
});
dbUser.save(user3, (err: Error | null) => {
  if (err) throw err;
  console.log(`${user3.username} populated`);
});

dbMet.save(user1.username, idUser1Met1, user1Met1, (err: Error | null) => {
  if (err) throw err;
  console.log(`Metrics populated for ${user1.username} with key ${idUser1Met1}`);
});
dbMet.save(user1.username, idUser1Met2, user1Met2, (err: Error | null) => {
  if (err) throw err;
  console.log(`Metrics populated for ${user1.username} with key ${idUser1Met2}`);
});

dbMet.save(user2.username, idUser2Met1, user2Met1, (err: Error | null) => {
  if (err) throw err;
  console.log(`Metrics populated for ${user2.username} with key ${idUser2Met1}`);
});
dbMet.save(user2.username, idUser2Met2, user2Met2, (err: Error | null) => {
  if (err) throw err;
  console.log(`Metrics populated for ${user2.username} with key ${idUser2Met2}`);
});
dbMet.save(user2.username, idUser2Met3, user2Met3, (err: Error | null) => {
  if (err) throw err;
  console.log(`Metrics populated for ${user2.username} with key ${idUser2Met3}`);
});