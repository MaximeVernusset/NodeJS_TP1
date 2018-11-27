# AST NodeJS

[![Build Status](https://travis-ci.org/MaximeVernusset/NodeJS_TP1.svg?branch=master)](https://travis-ci.org/MaximeVernusset/NodeJS_TP1)

## Introduction
A user can retrieve, save and delete his metrics.
* ``GET`` :
    - ``/`` displays 'Hello world'
    - ``/metrics`` displays all metrics from database
    - ``/metrics/{key}`` displays metrics associated to desired key
* ``POST`` :
    - ``/metrics/{key}`` save metrics to desired key
* ``DELETE`` :
    - ``/metrics/{key}`` delete metrics from desired key


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

## Test
Test unitaires : [Mocha](https://mochajs.org/) et [Chai](https://www.chaijs.com/).
Fichiers de test en `.test.ts`.
```
npm test
```


## Author
[Maxime Vernusset](https://github.com/MaximeVernusset)


