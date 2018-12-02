"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const metrics_1 = require("./metrics");
const leveldb_1 = require("./leveldb");
const dbPath = 'db_test/metrics';
var dbMet;
const username = "test";
const key = "0";
describe('Metrics', function () {
    before(function () {
        leveldb_1.LevelDb.clear(dbPath);
        dbMet = new metrics_1.MetricsHandler(dbPath);
    });
    after(function () {
        dbMet.db.close();
    });
    describe('#get', function () {
        it('should get empty array on non existing group', function () {
            dbMet.get(username, key, (err, result) => {
                chai_1.expect(err).to.be.null;
                chai_1.expect(result).to.not.be.undefined;
                chai_1.expect(result).to.be.an('array');
                chai_1.expect(result).to.be.empty;
            });
        });
    });
    describe('#save', function () {
        it('should save data', function () {
            //Métrique de test
            const testMet = [
                new metrics_1.Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 8),
                new metrics_1.Metric(`${new Date('2013-11-04 15:00 UTC').getTime()}`, 9)
            ];
            //Ecrit la métrique test
            dbMet.save(username, key, testMet, (err) => {
                //expect(err).to.be.undefined;
                //Lit la métrique insérée
                dbMet.get(username, key, (err, result) => {
                    chai_1.expect(err).to.be.null;
                    chai_1.expect(result).to.not.be.undefined;
                    chai_1.expect(result).to.be.an('array');
                    chai_1.expect(result).to.not.be.empty;
                    chai_1.expect(result).to.deep.equal(testMet);
                });
            });
        });
        it('should update data', function () {
            //Métrique de test
            const newTestMet = [new metrics_1.Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 99)];
            //Ecrit la métrique test
            dbMet.save(username, key, newTestMet, (err) => {
                //expect(err).to.be.undefined;
                //Lit la métrique insérée
                dbMet.get(username, key, (err, result) => {
                    chai_1.expect(err).to.be.null;
                    chai_1.expect(result).to.not.be.undefined;
                    chai_1.expect(result).to.not.be.empty;
                    chai_1.expect(result).to.be.an('array');
                    chai_1.expect(result).to.deep.equal(newTestMet);
                });
            });
        });
    });
    /*describe('#delete', function () {
      it('should delete data', function () {
        dbMet.delete(username, key, (err: Error | null) => {
          expect(err).to.be.null;
          
          //Lit la métrique insérée
          dbMet.get(username, key, (err: Error | null, result?: Metric[]) => {
            expect(err).to.be.null;
            expect(result).to.not.be.undefined;
            expect(result).to.be.empty;
            expect(result).to.be.an('array');
          });
        });
      });
  
      it('should not fail if data does not exist', function () {
        dbMet.delete(username, key, (err: Error | null) => {
          expect(err).to.be.null;
        });
      });
    });*/
});
