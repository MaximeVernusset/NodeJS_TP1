import { expect } from 'chai';
import { Metric, MetricsHandler } from './metrics';
import { LevelDb } from "./leveldb";

const dbPath: string = 'db_test/metrics';
var dbMet: MetricsHandler;
const username: string = "test";
const key: string = "0";

describe('Metrics', function () {
  before(function () {
    LevelDb.clear(dbPath);
    dbMet = new MetricsHandler(dbPath);
  });

  after(function () {
    dbMet.db.close();
  });


  describe('#get', function () {
    it('should get empty array on non existing group', function () {
      dbMet.get(username, key, (err: Error | null, result?: Metric[]) => {
        expect(err).to.be.null;
        expect(result).to.not.be.undefined;
        expect(result).to.be.an('array');
        expect(result).to.be.empty;
      });
    });
  });

  describe('#save', function () {
    it('should save data', function () {
      //Métrique de test
      const testMet = [
        new Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 8),
        new Metric(`${new Date('2013-11-04 15:00 UTC').getTime()}`, 9)
      ];
      
      //Ecrit la métrique test
      dbMet.save(username, key, testMet, (err: Error | null) => {
        expect(err).to.be.undefined;
        
        //Lit la métrique insérée
        dbMet.get(username, key, (err: Error | null, result?: Metric[]) => {
          expect(err).to.be.null;
          expect(result).to.not.be.undefined;
          expect(result).to.be.an('array');
          expect(result).to.not.be.empty;
          expect(result).to.deep.equal(testMet);
        });
      });
    });

    it('should update data', function () {
      //Métrique de test
      const newTestMet = [new Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 99)];

      //Ecrit la métrique test
      dbMet.save(username, key, newTestMet, (err: Error | null) => {
        expect(err).to.be.undefined;
        
        //Lit la métrique insérée
        dbMet.get(username, key, (err: Error | null, result?: Metric[]) => {
          expect(err).to.be.null;
          expect(result).to.not.be.undefined;
          expect(result).to.not.be.empty;
          expect(result).to.be.an('array');
          expect(result).to.deep.equal(newTestMet);
        });
      });
    });
  });


  describe('#delete', function () {
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
  });
});