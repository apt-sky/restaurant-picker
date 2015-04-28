var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/restaurant-picker';

var mongodb;
mongoClient.connect(url, function (err, db) {
    if (!err) {
        console.log("Connected successfully to the restaurant-picker db");
        mongodb = db;
    }
});


exports.getRoot = function (req, res) {
    res.send("Welcome to the Restaurant Picker");
};

exports.createRestaurant = function (req, res) {
    var restaurant = req.body;
    console.log('Adding a Restaurant: ' + JSON.stringify(restaurant));
    mongodb.createCollection('restaurants', function (err, collection) {
        collection.insert(restaurant, {safe: true}, function (err, result) {
            if (err) {
                console.log("Error posting data");
                res.send({Error: "Error adding an data to the restaurants collection"});
            } else {
                console.log("Success posting data");
                res.send(result[0]);
            }
        });
    });

};

exports.getAll = function (req, res) {
    console.log("Getting all Restaurants");
    mongodb.collection('restaurants', function (err, collection) {
        collection.find({}).toArray(function (err, items) {
            res.send(items);
        });
    });
};

exports.getById = function (req, res) {
    var id = req.params.id;
    console.log("Getting Restaurant by id : " + id);
    mongodb.collection('restaurants', function (err, collection) {

        if (id === 'random') {
            console.log("Generating random id for getting restaurant");
            collection.stats(function(err, stats){
                var random = Math.random() * (stats.count - 0) + 0;
                console.log("Random number generated : " + random);
                collection.find().limit(-1).skip(random).next(function(err, item){
                    console.log("Returning restaurant : " + item.name);
                    res.send(item);
                })
            });
        } else {
            collection.findOne({_id:id}).toArray(function (err, item) {
                console.log("Returning restaurant : " + item.name);
                res.send(item);
            });
        }
    });
};

exports.deleteById = function (req, res) {
    var id = req.params.id;
    console.log("Deleting Restaurant by id : " + id);
    mongodb.collection('restaurants', function (err, collection) {
        collection.remove({_id:id}, function(err, result){
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        })
    });
};