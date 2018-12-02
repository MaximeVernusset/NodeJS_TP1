"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const users_1 = require("./users");
const leveldb_1 = require("./leveldb");
const dbPath = 'db_test/users';
var dbUser;
describe('Users', function () {
    before(function () {
        leveldb_1.LevelDb.clear(dbPath);
        dbUser = new users_1.UserHandler(dbPath);
    });
    after(function () {
        dbUser.db.close();
    });
    describe('#get', function () {
        it('should get undefined on non existing User', function () {
            dbUser.get("test", (err, result) => {
                chai_1.expect(err).to.be.null;
                chai_1.expect(result).to.be.undefined;
            });
        });
    });
    describe('#save', function () {
        it('should save a User', function () {
            const testUser = new users_1.User("test", "test@test", "test");
            dbUser.save(testUser, (err) => {
                //expect(err).to.be.null;
                dbUser.get("test", (err, result) => {
                    chai_1.expect(err).to.be.null;
                    chai_1.expect(result).to.deep.equal(testUser);
                });
            });
        });
        it('should update a User', function () {
            const newTestUser = new users_1.User("newTest", "newTest@newTest", "newTest");
            dbUser.save(newTestUser, (err) => {
                //expect(err).to.be.null;
                dbUser.get("newTest", (err, result) => {
                    chai_1.expect(err).to.be.null;
                    chai_1.expect(result).to.deep.equal(newTestUser);
                });
            });
        });
    });
    describe('#delete', function () {
        it('should delete a User', function () {
            dbUser.delete("newTest", (err) => {
                chai_1.expect(err).to.be.null;
                dbUser.get("newTest", (err, result) => {
                    chai_1.expect(err).to.be.null;
                    chai_1.expect(result).to.be.undefined;
                });
            });
        });
        it('should not fail if User does not exist', function () {
            dbUser.delete("newTest", (err) => {
                chai_1.expect(err).to.be.null;
            });
        });
    });
});
