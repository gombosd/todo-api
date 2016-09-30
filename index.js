var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });

// alap
app.use(bodyParser.json());


app.get('/', function (req, res) {
  Cat.find({}, function(err, cicak){
  	if(err){
  		return res.send(err);
  	}

  	res.send(cicak);

  });
});

app.get('/:id', function (req, res) {
  Cat.findById(req.params.id, function(err, cica){
  	if(err){
  		return res.send(err);
  	}

  	res.send(cica);

  });
});

app.post('/', function (req, res) {

	var name = req.body.name

	var kitty = new Cat({ name: name });
	kitty.save(function (err) {
	  if (err) {
	    return res.send(err);
	  } 

	  res.send(kitty)
	});

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
