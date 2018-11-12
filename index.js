/*const http = require('http');
const handles = require('./handles');

http.createServer(handles.serverHandle)
    .listen(8080);*/


const express = require('express');
const app = express();
    
app.set('port', 8080);
app.set('head',
    '<head>'+
        '<meta charset="utf8"/>'+
        '<title>TP1 : Hello</title>'+
    '</head>'
);
app.set('name', 'maxime');

app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(
        '<!DOCTYPE html>'+
        '<html>'+
            app.get('head')+
            '<body>'+
                '<h1>Fonctionnement</h1>'+
                '<h2>/</h2> Affiche cette page.'+
                '<h2>/hello</h2>'+
                '<ul>'+
                    '<li><a href="/hello"<kbd>/hello</kbd></a> : affiche "Hello"</li>'+
                    '<li><a href="/hello/test"><kbd>/hello/...</kbd></a> : affiche "Hello ..."</li>'+
                    '<li><a href="/hello/maxime"><kbd>/hello/maxime</kbd></a> : affiche une pr&eacute;sentation de l\'auteur</li>'+
                '</ul>'+
            '</body>'+
        '</html>'
    );
    res.end();
});

app.get('/hello',  (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(
        '<!DOCTYPE html>'+
        '<html>'+
            app.get('head')+
            '<body>'+
                '<h1>Hello</h1>'+
            '</body>'+
        '</html>'
    );
    res.end();
});

app.get('/hello/:name',  (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(
        '<!DOCTYPE html>'+
        '<html>'+
            app.get('head')+
            '<body>'+
                (req.params.name == app.get('name') ?
                    ('<h1>Maxime Vernusset</h1>'+
                    '<section>'+
                        '<h2>Parcours</h2>'+
                        '&Eacute;tudiant en 5&egrave;me ann&eacute;e d\'&eacute;cole d\'ing&eacute;nieurs (<abbr title="&Eacute;cole Centrale d\'&eacute;l&eacute;ctronique">ECE Paris</abbr>) :'+
                        '<ul>'+
                            '<li>Majeure : Cybers&eacute;curit&eacute;</li>'+
                            '<li><abbr title="Option d\'approfondissement">OA</abbr> : Internet Nouvelle G&eacute;n&eacute;ration</li>'+
                        '</ul>'+
                    '</section>'+
                    '<section>'+
                        '<h2>Autre</h2>'+
                        'Tromboniste'+
                    '</section>')
                :
                    (`<h1>Hello ${req.params.name}</h1>`))+
            '</body>'+
        '</html>'
    );
    res.end();
});


app.listen(
    app.get('port'), 
    () => console.log(`server listening on ${app.get('port')}`)
)