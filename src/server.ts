import express = require('express');
import { Metric, MetricsHandler } from './metrics';

const app = express();
const dbMet = new MetricsHandler('./db');
const port: string = process.env.PORT || '8080';

app.use(express.json());


app.get('/', (req: any, res: any) => {
  res.write('Hello world');
  res.end();
});

/*Hello world*/
app.get('/metrics/:id', (req: any, res: any) => {
  dbMet.get(req.params.id, (err: Error | null, result?: Metric[]) => {
    if (err)
      throw err;

    if (result === undefined) {
      res.write('no result');
      res.send();
    } 
    else res.json(result);
  });
});

/*Affiche toutes les métriques avec leur clé associée*/
app.get('/metrics', (req: any, res: any) => {
  dbMet.getAll((err: Error | null, result?: {}) => {
    if (err)
      throw err;

    if (result === undefined) {
      res.write('no result');
      res.send();
    } 
    else res.json(result);
  });
});

/*Affiche les métriques pour la clé correspondantes*/
app.post('/metrics/:id', (req: any, res: any) => {
  console.log(req.body);
  dbMet.save(req.params.id, req.body, (err: Error | null) => {
    if (err) {
      res.status(500);
      throw err;
    }
    res.status(200).send();
  });
});


/*Supprime les métriques pour la clé correspondantes*/
app.delete('/metrics/:id', (req: any, res: any) => {
  dbMet.delete(req.params.id, (err: Error | null) => {
    if (err) {
      res.status(500);
      throw err;
    }
    res.status(200).send();
  });
});


app.listen(port, (err: Error) => {
  if (err)
    throw err;
  console.log(`Server is listening on port ${port}`);
});