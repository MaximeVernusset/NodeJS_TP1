import { expect } from 'chai';
import { User, UserHandler } from './users';
import { LevelDb } from "./leveldb";

const dbPath: string = 'db_test/users';
var dbUser: UserHandler;

/*describe('Users', function () {
  before(function () {
    LevelDb.clear(dbPath);
    dbUser = new UserHandler(dbPath);
  });

  after(function () {
    dbUser.db.close();
  });

  describe('#get', function () {
    it('should get undefined on non existing User', function () {
      dbUser.get("test", (err, result) => {
        expect(err).to.be.null;
        expect(result).to.be.undefined;
      });
    });
  });

  describe('#save', function () {
    it('should save a User', function () {
      const testUser = new User("test", "test@test", "test");
      dbUser.save(testUser, (err) => {
        expect(err).to.be.null;

        dbUser.get("test", (err, result) => {
          expect(err).to.be.null;
          expect(result).to.deep.equal(testUser);
        });
      });
    });

    it('should update a User', function () {
      const newTestUser = new User("newTest", "newTest@newTest", "newTest");
      dbUser.save(newTestUser, (err) => {
        expect(err).to.be.null;

        dbUser.get("newTest", (err, result) => {
          expect(err).to.be.null;
          expect(result).to.deep.equal(newTestUser);
        });
      });
    });
  });

  describe('#delete', function () {
    it('should delete a User', function () {
      dbUser.delete("newTest", (err) => {
        expect(err).to.be.null;

        dbUser.get("newTest", (err, result) => {
          expect(err).to.be.null;
          expect(result).to.be.undefined;
        });
      });
    });

    it('should not fail if User does not exist', function () {
      dbUser.delete("newTest", (err) => {
        expect(err).to.be.null;
      });
    });
  });
});*/