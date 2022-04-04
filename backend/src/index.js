import express from 'express';
import * as routes from './routes';
import * as db from './db/connect';
import cors from 'cors';
import path from 'path';

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017';

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT || 'http://localhost:3000',
}));

const __dirname = path.resolve(path.dirname(''));
const staticPath = path.join(__dirname, '../frontend/build');

app.use(express.static(staticPath));

Object.values(routes).forEach((route) => {
  console.log(route);
  app[route.method](`/${route.path}`, route.handler);
});

app.get('/api/test', (req, res) => res.send({ success: true }));

app.get('/*', function(req, res) {
  res.sendFile(`${staticPath}/index.html`);
});

const handleError = (err) =>{
  console.log('Ohhhh nooo');
  console.log(err);
};

const start = async () => {
  await db.connect(DB_URL);
  app.listen(port);
  console.log(`Express started on port ${port}`);
};
start();


