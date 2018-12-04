"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
const levelSession = require("level-session-store");
const LevelStore = levelSession(session);
const metrics_1 = require("./metrics");
const users_1 = require("./users");
const leveldb_1 = require("./leveldb");
const app = express();
const port = process.env.PORT || '8080';
const db = leveldb_1.LevelDb.open('./db/users&metrics');
const dbMet = new metrics_1.MetricsHandler(db);
const dbUser = new users_1.UserHandler(db);
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));
app.use(session({
    secret: 'my very secret secret phrase',
    store: new LevelStore('./db/sessions'),
    resave: true,
    saveUninitialized: true
}));
//Templating views
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');
//Bootstrap
app.use('/', express.static(path.join(__dirname, '/../node_modules/jquery/dist')));
//JQuery
app.use('/', express.static(path.join(__dirname, '/../node_modules/bootstrap/dist')));
/*
  Authentification
*/
const authRouter = express.Router();
var wrongCredentials = false;
authRouter.get('/login', function (req, res) {
    res.render('login', { message: wrongCredentials ? 'Username or password is not valid' : '' });
    wrongCredentials = false;
});
authRouter.post('/login', function (req, res, next) {
    dbUser.get(req.body.username, function (err, result) {
        if (err)
            next(err);
        if (result === undefined || !result.validatePassword(req.body.password)) {
            wrongCredentials = true;
            res.redirect('/login');
        }
        else {
            wrongCredentials = false;
            req.session.loggedIn = true;
            req.session.user = result;
            res.redirect('/');
        }
    });
});
authRouter.get('/signup', function (req, res) {
    res.render('signup');
});
authRouter.get('/logout', function (req, res) {
    if (req.session.loggedIn) {
        delete req.session.loggedIn;
        delete req.session.user;
    }
    res.redirect('/login');
});
app.use(authRouter);
//Middleware
const authMiddleware = function (req, res, next) {
    if (req.session.loggedIn)
        next();
    else
        res.redirect('/login');
};
/*
  Root
*/
app.get('/', authMiddleware, (req, res) => {
    res.render('index', { name: req.session.user.username });
});
/*
  Users
*/
const userRouter = express.Router();
userRouter.get('/:username', function (req, res, next) {
    dbUser.get(req.params.username, function (err, result) {
        if (err || result === undefined)
            res.status(404).send(`User ${req.params.username} not found`);
        else
            res.status(200).json(result);
    });
});
userRouter.post('/', function (req, res, next) {
    dbUser.get(req.body.username, function (err, result) {
        if (!err && result !== undefined) {
            res.status(409).send(`User ${req.body.username} already exists`);
        }
        else {
            const newUser = new users_1.User(req.body.username, req.body.email, req.body.password);
            dbUser.save(newUser, function (err) {
                if (err)
                    next(err);
                else {
                    req.session.loggedIn = true;
                    req.session.user = newUser;
                    res.status(201).send(`User ${req.body.username} persisted`);
                }
            });
        }
    });
});
userRouter.delete('/:username', function (req, res, next) {
    dbUser.get(req.params.username, function (err, result) {
        if (err || result === undefined) {
            res.status(404).send(`User ${req.params.username} does not exist`);
        }
        else {
            dbUser.delete(req.params.username, function (err) {
                if (err)
                    next(err);
                else
                    res.status(200).send(`User ${req.params.username} deleted`);
            });
        }
    });
});
app.use('/user', userRouter);
//Récupérer tous les utilisateurs
app.get('/users', function (req, res, next) {
    dbUser.getAll(function (err, result) {
        if (err)
            next(err);
        else
            res.status(200).json(result);
    });
});
/*
  Metrics
*/
const metricsRouter = express.Router();
//Middleware
metricsRouter.use(function (req, res, next) {
    console.log("Called metrics router");
    next();
});
metricsRouter.get('/:id', (req, res, next) => {
    dbMet.get(req.session.user.username, req.params.id, (err, result) => {
        if (err)
            next(err);
        if (result === undefined) {
            res.write('no result');
            res.send();
        }
        else
            res.json(result);
    });
});
metricsRouter.get('/', (req, res, next) => {
    dbMet.getAll(req.session.user.username, (err, result) => {
        if (err)
            next(err);
        if (result === undefined) {
            res.write('no result');
            res.send();
        }
        else
            res.json(result);
    });
});
metricsRouter.post('/:id', (req, res, next) => {
    dbMet.save(req.session.user.username, req.params.id, req.body, (err) => {
        if (err)
            next(err);
        res.status(200).send();
    });
});
metricsRouter.delete('/:id', (req, res, next) => {
    dbMet.delete(req.session.user.username, req.params.id, (err) => {
        if (err)
            next(err);
        res.status(200).send();
    });
});
app.get('/newMetric', (req, res, next) => {
    res.render('newMetric');
});
app.use('/metrics', authMiddleware, metricsRouter);
/*
  Error handling
*/
app.use(function (err, req, res, next) {
    console.log('got an error');
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(port, (err) => {
    if (err)
        throw err;
    console.log(`Server is listening on port ${port}`);
});
