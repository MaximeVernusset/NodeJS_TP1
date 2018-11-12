//Express
const express = require('express');
const app = express();

app.set('port', 8080);
//Special name to display short introduction
app.set('authorName', 'maxime');
//Templating views
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');

//Route / : explains how /hello works
app.get('/', (req, res) => {
    res.render('fonctionnement');
});

//Route /hello : says hello
app.get('/hello',  (req, res) => {
    res.render('hello/hello', {name: ''});
});

//Route /hello/name : says hello name (if name='maxime' displays a short introduction of me)
app.get('/hello/:name',  (req, res) => {
    if(req.params.name == app.get('authorName'))
    res.render('hello/maxime');
    else
        res.render('hello/hello', {name: req.params.name});
});


app.listen(
    app.get('port'), 
    () => console.log(`Server listening on ${app.get('port')}`)
);