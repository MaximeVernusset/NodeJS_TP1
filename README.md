# AST NodeJS

[![Build Status](https://travis-ci.org/MaximeVernusset/NodeJS_TP1.svg?branch=master)](https://travis-ci.org/MaximeVernusset/NodeJS_TP1)


## Setup 
```
npm install 
```
Pour peupler la base de données : `npm run populate`.

## Run
```
npm start
```

## Dev
Sources dans `src`.
```
npm run dev
```

## Routes
### Frontend
* ``GET`` :
    - ``/`` index (retrieve metrics). Redirects to ``/login`` if not authenticated
    - ``/login`` login form
    - ``/signup`` create account form
    - ``/newMetric`` create a new metric form
    - ``/logout`` logout connected user. Redirects to ``/login``
### API
* ``GET`` :
    - ``/metrics`` displays all connected user's metrics from database
    - ``/metrics/{key}`` displays connected user's metrics associated to desired key
    - ``/users`` displays all existing users
    - ``/user/{username}`` displays username info
* ``POST`` :
    - ``/login`` authenticate user
    - ``/user`` create user
    - ``/metrics/{key}`` save metrics to desired key, associated whith connected user
* ``DELETE`` :
    - ``/metrics/{key}`` delete connected user's metrics with desired key
    - ``/user/{username}`` delete user 

## Test
Test unitaires : [Mocha](https://mochajs.org/) et [Chai](https://www.chaijs.com/).
Fichiers de test en `.test.ts`.
```
npm test
```


## Author
[Maxime Vernusset](https://github.com/MaximeVernusset)


