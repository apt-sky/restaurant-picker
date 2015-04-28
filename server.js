var express = require('express');
var restaurants = require('./routes/restaurants');

var app = express();

app.get('/restaurants', restaurants.getAll);
app.get('/restaurants/:id', restaurants.getById);

app.listen(3000);
console.log('Listening on port 3000');
