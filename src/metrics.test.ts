import { expect } from 'chai';
import { Metric, MetricsHandler } from './metrics';
import { LevelDb } from "./leveldb";

const dbPath: string = 'db_test/metrics';
var dbMet: MetricsHandler;
const username: string = "test";

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
      dbMet.get(username, '0', (err: Error | null, result?: Metric[]) => {
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
        new Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 1),
        new Metric(`${new Date('2013-11-04 15:00 UTC').getTime()}`, 2)
      ];
      
      //Ecrit la métrique test
      dbMet.save(username, '1', testMet, (err: Error | null) => {
        expect(err).to.be.undefined;
        
        //Lit la métrique insérée
        dbMet.get(username, '1', (err: Error | null, result?: Metric[]) => {
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
      const newTestMet = [
        new Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 11),
        new Metric(`${new Date('2013-11-04 15:00 UTC').getTime()}`, 22)
      ];

      //Ecrit la métrique test
      dbMet.save(username, '1', newTestMet, (err: Error | null) => {
        expect(err).to.be.undefined;
        
        //Lit la métrique insérée
        dbMet.get(username, '1', (err: Error | null, result?: Metric[]) => {
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
    const testMet = [
      new Metric(`${new Date('2013-11-05 15:30 UTC').getTime()}`, 0),
      new Metric(`${new Date('2013-11-05 16:00 UTC').getTime()}`, 1)
    ];

    before(function () {
      dbMet.save(username, '3', testMet, (error: Error | null) => {});
    });

    it('should delete data', function () {
      dbMet.delete(username, '3', (err: Error | null) => {
        expect(err).to.be.null;
        
        dbMet.get(username, '3', (err: Error | null, result?: Metric[]) => {
          expect(err).to.be.null;
          expect(result).to.not.be.undefined;
          expect(result).to.be.empty;
          expect(result).to.be.an('array');
        });
      });
    });

    it('should not fail if data does not exist', function () {
      dbMet.delete(username, '4', (err: Error | null) => {
        expect(err).to.be.null;
      });
    });
  });
});