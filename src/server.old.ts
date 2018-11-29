import express = require('express');
import morgan = require('morgan');
import session = require('express-session');
import levelSession = require('level-session-store');
import { Metric, MetricsHandler } from './metrics';
import { UserHandler, User } from './user';

const app = express();
const dbMet = new MetricsHandler('./db/metrics');
const port: string = process.env.PORT || '8080';

const router = express.Router();
app.use(router);

app.use(express.json());
app.use(morgan('dev'));

const LevelStore = levelSession(session);

app.use(session({
  secret: 'my very secret phrase',
  store: new LevelStore('./db/sessions'),
  resave: true,
  saveUninitialized: true
}));


const path = require('path');
//Templating views
app.set('views', __dirname + "/../views")
app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use('/', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));

const dbUser: UserHandler = new UserHandler('./db/users');
const authRouter = express.Router();
authRouter.get('/login', function(req: any, res: any) {
  res.render('login');
});
authRouter.post('/login', function(req: any, res: any, next: any) {
  dbUser.get(req.body.username, function(err: Error | null, result?: User) {
      if(err) next(err);
      if(result === undefined || !result.validatePassword(req.body.password)) {
        res.redirect('/login');
      }
      else {
        req.sesion.loggedIn = true;
        req.sesion.user = result;
        res.redirect('/');
      }
  });
});
authRouter.get('/signup', function(req: any, res: any) {
  res.render('signup');
});
authRouter.get('/logout', function(req: any, res: any) {
  if(req.session.loggedIn) {
    delete req.session.loggedIn;
    delete req.session.user;
  }
  res.redirect('/login');
});
app.use(authRouter);


const userRouter = express.Router()

userRouter.post('/', (req: any, res: any, next: any) => {
  const { username, password, email } = req.body
  const u = new User(username, password, email)
  dbUser.save(u, (err: Error | null) => {
    if (err) next(err)
    res.satus(200).send("user saved")
  })
})

userRouter.get('/:username', function(req: any, res: any, next: any) {
  
});

userRouter.get('/', (req: any, res: any, next: any) => {
  dbUser.get(req.body.username, (err: Error | null, result?: User) => {
    if (err) next(err)
    if (result === undefined || !result.validatePassword(req.body.username)) {
      res.status(404).send("user not found")
    } else {
      res.status(200).json(result)
    }
  })
});

app.use('/user', userRouter);


//Middleware
router.use(function (req: any, res: any, next: any) {
  console.log(req.method + ' on ' + req.url);
  next();
});


/*Hello world*/
router.get('/', (req: any, res: any) => {
  res.write('Hello world');
  res.end();
});

/*Affiche les métriques associées à la clé demandée*/
router.get('/metrics/:id', (req: any, res: any, next:any) => {
  dbMet.get(req.params.id, (err: Error | null, result?: Metric[]) => {
    if (err) next(err);
    if (result === undefined) {
      res.write('no result');
      res.send();
    } 
    else res.json(result);
  });
});

/*Affiche toutes les métriques avec leur clé associée*/
router.get('/metrics/', (req: any, res: any, next:any) => {
  dbMet.getAll((err: Error | null, result?: {}) => {
    if (err) next(err);
    if (result === undefined) {
      res.write('no result');
      res.send();
    } 
    else res.json(result);
  });
});

/*Affiche les métriques pour la clé correspondantes*/
router.post('/metrics/:id', (req: any, res: any, next:any) => {
  console.log(req.body);
  dbMet.save(req.params.id, req.body, (err: Error | null) => {
    if (err) next(err);
    res.status(200).send();
  });
});


/*Supprime les métriques pour la clé correspondantes*/
router.delete('/metrics/:id', (req: any, res: any, next:any) => {
  dbMet.delete(req.params.id, (err: Error | null) => {
    if (err) next(err);
    res.status(200).send();
  });
});

/*Middleware*/
app.use(function (err: Error, req: any, res: any, next: any) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, (err: Error) => {
  if (err)
    throw err;
  console.log(`Server is listening on port ${port}`);
});