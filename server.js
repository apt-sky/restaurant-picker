var express = require('express');
var restaurants = require('./routes/restaurants');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', restaurants.getRoot);
app.post('/restaurants', restaurants.createRestaurant);
app.get('/restaurants', restaurants.getAll);
app.get('/restaurants/:id', restaurants.getById);
app.delete('/restaurants/:id', restaurants.deleteById);

var server = app.listen(3000, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Restaurant Picker listening at http://%s:%s', host, port);
});
