# AST NodeJS

[![Build Status](https://travis-ci.org/MaximeVernusset/NodeJS_TP1.svg?branch=master)](https://travis-ci.org/MaximeVernusset/NodeJS_TP1)

Node version: `8.11.2`


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
    - ``/`` index (affichage des métriques en graphe). Redirige vers ``/login`` si non authentifié.
    - ``/login`` formulaire de connexion. Redirige vers ``/`` si déjà authentifié.
    - ``/signup`` formulaire de création de compte.
    - ``/newMetric`` formulaire d'ajout de métrique.
    - ``/logout`` Déconnecte l'utilisateur puis redirige vers ``/login``.
### API (REST)
* ``GET`` :
    - ``/metrics`` retourne toutes les métriques de l'utilisateur connecté.
    - ``/metrics/{key}`` retourne le groupe de métriques de l'utilisateur, associé à l'ID demandé.
    - ``/users`` retourne tous les utilisateurs.
    - ``/user/{username}`` displays username info.
* ``POST`` :
    - ``/login`` authentifie l'utilisateur. Redirige vers ``/`` si l'authentification a réussi, vers ``/login`` sinon.
    - ``/user`` créer un utilisateur.
    - ``/metrics/{key}`` enregistre un tableau de métriques associées avec l'ID de groupe voulu, associé à l'utilisateur connecté.
* ``DELETE`` :
    - ``/metrics/{key}`` supprime le groupe de métriques de l'utilisateur, associé à l'ID donné.
    - ``/user/{username}`` supprime un utilisateur.

## Test
Test unitaires : [Mocha](https://mochajs.org/) et [Chai](https://www.chaijs.com/).
Fichiers de test en `.test.ts`.
```
npm test
```


## Author
[Maxime Vernusset](https://github.com/MaximeVernusset)

## Licence
UNLICENSED