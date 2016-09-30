var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());


app.get('/', function (req, res) {
  var log = {
  	headers: req.headers
  };
  res.send(log);
});

app.get('/:id', function (req, res) {
  var log = {
  	headers: req.headers,
  	id: req.params.id,
  	query: req.query
  };
  res.send(log);
});

app.post('/', function (req, res) {
  res.json(req.body);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});