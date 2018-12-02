"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leveldb_1 = require("./leveldb");
const bcrypt = require('bcrypt');
const saltRounds = 10;
class User {
    constructor(username, email, password, passwordHashed = false) {
        this.password = "";
        this.username = username;
        this.email = email;
        if (!passwordHashed)
            this.setPassword(password);
        else
            this.password = password;
    }
    setPassword(toSet) {
        this.password = bcrypt.hashSync(toSet, saltRounds);
    }
    getPassword() {
        return this.password;
    }
    validatePassword(toValidate) {
        return bcrypt.compareSync(toValidate, this.password);
    }
    static fromDb(username, value) {
        const [password, email] = value.split(":");
        return new User(username, email, password, true);
    }
}
exports.User = User;
class UserHandler {
    constructor(path) {
        this.db = leveldb_1.LevelDb.open(path);
    }
    get(username, callback) {
        this.db.get(`user:${username}`, function (err, data) {
            if (err || data === undefined)
                callback(null, undefined);
            else
                callback(null, User.fromDb(username, data));
        });
    }
    getAll(callback) {
        const stream = this.db.createReadStream();
        var users = [];
        stream.on('error', callback);
        stream.on('end', (err) => {
            callback(null, users);
        });
        stream.on('data', (data) => {
            const [, username] = data.key.split(':');
            users.push(User.fromDb(username, data.value));
        });
    }
    save(user, callback) {
        this.db.put(`user:${user.username}`, `${user.getPassword()}:${user.email}`, (err) => {
            if (err)
                callback(err);
            else
                callback(null);
        });
    }
    delete(username, callback) {
        this.db.del(`user:${username}`);
        callback(null);
    }
}
exports.UserHandler = UserHandler;
