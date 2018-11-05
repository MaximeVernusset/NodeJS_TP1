const url = require('url');
const querystring = require('querystring')

const NAME = 'maxime';

module.exports = {
    serverHandle: function (req, res) {
        //Route
        const path = url.parse(req.url).pathname;
        console.log('Path: ' + path);
        //Parameters
        const params = querystring.parse(url.parse(req.url).query);
        console.log('Parameters: ' + JSON.stringify(params));

        if(path === '/') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(
                '<!DOCTYPE html>'+
                '<html>'+
                    '<head>'+
                        '<meta charset="utf8"/>'+
                        '<title>TP1</title>'+
                    '</head>'+
                    '<body>'+
                        
                    '</body>'+
                '</html>'
            );
        }
        else if(path === '/hello') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(
                '<!DOCTYPE html>'+
                '<html>'+
                    '<head>'+
                    '<meta charset="utf-8"/>'+
                        '<title>TP1</title>'+
                    '</head>'+
                    '<body>'+
                       (('name' in params && params['name'] === NAME) ?
                            ('<h1>Maxime Vernusset</h1>'+
                            '<section>'+
                                '<h2>Parcours</h2>'+
                                '&Eacute;tudiant en 5&egrave;me ann&eacute;e d\'&eacute;cole d\'ing&eacute;nieurs (<abbr title="&Eacute;cole Centrale d\'&eacute;l&eacute;ctronique">ECE Paris</abbr>) :'+
                                '<ul>'+
                                    '<li>Majeure : Cybers&eacute;curit&eacute;</li>'
                                    +'<li><abbr title="Option d\'approfondissement">OA</abbr> : Internet Nouvelle G&eacute;n&eacute;ration</li>'+
                                '</ul>'+
                            '</section>'+
                            '<section>'+
                                '<h2>Autre</h2>'+
                                'Tromboniste'+
                            '</section>')
                            : 
                            ('Hello ' + (('name' in params) ? params['name'] : '')))+
                    '</body>'+
                '</html>'
            );
        }
        else {
            res.writeHead(404, {'Content-Type': 'text/html'});
        }

        res.end();
    }
}
