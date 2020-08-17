const express = require('express')
const exphbs  = require('express-handlebars');
const app = express();

const PORT = process.env.PORT || 5000;

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.use(express.static('public'));

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} ${req.ip}`);
    next();
}
app.use(logger);


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'fifa19';

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  client.close();
});

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
});
