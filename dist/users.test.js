"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const users_1 = require("./users");
const leveldb_1 = require("./leveldb");
const dbPath = 'db_test/users&metrics';
var dbUser;
describe('Users', function () {
    before(function () {
        dbUser = new users_1.UserHandler(leveldb_1.LevelDb.open(dbPath));
    });
    after(function () {
        dbUser.db.close();
    });
    describe('#get', function () {
        it('should get undefined on non existing User', function (done) {
            dbUser.get("test", (err, result) => {
                chai_1.expect(err).to.be.null;
                chai_1.expect(result).to.be.undefined;
                done();
            });
        });
    });
    describe('#save', function () {
        it('should save a User', function (done) {
            const testUser = new users_1.User("test", "test@test", "test");
            dbUser.save(testUser, (err) => {
                chai_1.expect(err).to.be.null;
                dbUser.get("test", (err, result) => {
                    chai_1.expect(err).to.be.null;
                    chai_1.expect(result).to.deep.equal(testUser);
                    done();
                });
            });
        });
        it('should update a User', function (done) {
            const newTestUser = new users_1.User("test", "newTest@newTest", "newTest");
            dbUser.save(newTestUser, (err) => {
                chai_1.expect(err).to.be.null;
                dbUser.get("test", (err, result) => {
                    chai_1.expect(err).to.be.null;
                    chai_1.expect(result).to.deep.equal(newTestUser);
                    done();
                });
            });
        });
    });
    describe('#delete', function () {
        before(function () {
            dbUser.save(new users_1.User("testDelete", "test@delete", "testDelete"), (err) => { });
        });
        it('should delete a User', function (done) {
            dbUser.delete("testDelete", (err) => {
                chai_1.expect(err).to.be.null;
                dbUser.get("testDelete", (err, result) => {
                    chai_1.expect(err).to.be.null;
                    chai_1.expect(result).to.be.undefined;
                    done();
                });
            });
        });
        it('should not fail if User does not exist', function (done) {
            dbUser.delete("testDelete2", (err) => {
                chai_1.expect(err).to.be.null;
                done();
            });
        });
    });
});
