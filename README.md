# AST NodeJS

## Introduction
A user can retrieve his metrics.
* ``GET`` :
    - ``/`` displays 'Hello world'
    - ``/metrics`` displays all metrics from database
    - ``/metrics/{key}`` displays metrics associated to desired key
* ``POST`` :
    - ``/metrics/{key}`` save metrics to desired key
* ``DELETE`` :
    - ``/metrics/{key}`` delete metrics from desired key


## Run instructions
In your terminal, browse to projet's directory, then run:
```
npm start
```
or
```
npm run dev
```
This done, open ``localhost:8080`` in your internet browser.


## Author
Maxime Vernusset


