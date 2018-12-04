"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const metrics_1 = require("./metrics");
const leveldb_1 = require("./leveldb");
const dbPath = 'db_test/users&metrics';
var dbMet;
const username = "test";
describe('Metrics', function () {
    before(function () {
        leveldb_1.LevelDb.clear(dbPath);
        dbMet = new metrics_1.MetricsHandler(leveldb_1.LevelDb.open(dbPath));
    });
    after(function () {
        dbMet.db.close();
    });
    describe('#get', function () {
        it('should get empty array on non existing group', function (done) {
            dbMet.get(username, '0', (err, result) => {
                chai_1.expect(err).to.be.null;
                chai_1.expect(result).to.not.be.undefined;
                chai_1.expect(result).to.be.an('array');
                chai_1.expect(result).to.be.empty;
                done();
            });
        });
    });
    describe('#save', function () {
        it('should save data', function (done) {
            //Métrique de test
            const testMet = [
                new metrics_1.Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 1),
                new metrics_1.Metric(`${new Date('2013-11-04 15:00 UTC').getTime()}`, 2)
            ];
            //Ecrit la métrique test
            dbMet.save(username, '1', testMet, (err) => {
                chai_1.expect(err).to.be.undefined;
                //Lit la métrique insérée
                dbMet.get(username, '1', (err, result) => {
                    chai_1.expect(err).to.be.null;
                    chai_1.expect(result).to.not.be.undefined;
                    chai_1.expect(result).to.be.an('array');
                    chai_1.expect(result).to.not.be.empty;
                    chai_1.expect(result).to.deep.equal(testMet);
                    done();
                });
            });
        });
        it('should update data', function (done) {
            //Métrique de test
            const newTestMet = [
                new metrics_1.Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 11),
                new metrics_1.Metric(`${new Date('2013-11-04 15:00 UTC').getTime()}`, 22)
            ];
            //Ecrit la métrique test
            dbMet.save(username, '1', newTestMet, (err) => {
                chai_1.expect(err).to.be.undefined;
                //Lit la métrique insérée
                dbMet.get(username, '1', (err, result) => {
                    chai_1.expect(err).to.be.null;
                    chai_1.expect(result).to.not.be.undefined;
                    chai_1.expect(result).to.not.be.empty;
                    chai_1.expect(result).to.be.an('array');
                    chai_1.expect(result).to.deep.equal(newTestMet);
                    done();
                });
            });
        });
    });
    describe('#delete', function () {
        const testMet = [
            new metrics_1.Metric(`${new Date('2013-11-05 15:30 UTC').getTime()}`, 0),
            new metrics_1.Metric(`${new Date('2013-11-05 16:00 UTC').getTime()}`, 1)
        ];
        before(function () {
            dbMet.save(username, '3', testMet, (error) => { });
        });
        it('should delete data', function (done) {
            dbMet.delete(username, '3', (err) => {
                chai_1.expect(err).to.be.null;
                dbMet.get(username, '3', (err, result) => {
                    chai_1.expect(err).to.be.null;
                    chai_1.expect(result).to.not.be.undefined;
                    chai_1.expect(result).to.be.empty;
                    chai_1.expect(result).to.be.an('array');
                    done();
                });
            });
        });
        it('should not fail if data does not exist', function (done) {
            dbMet.delete(username, '4', (err) => {
                chai_1.expect(err).to.be.null;
                done();
            });
        });
    });
});
