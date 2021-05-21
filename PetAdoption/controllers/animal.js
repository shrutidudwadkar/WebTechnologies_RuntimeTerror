var bodyParser = require("body-parser").json();
var req = require('request');
var Animal = require('../models/animal');
var path = require('path');


exports.insertAnimal = function (req, res) {
    console.log("inside insert animal")
    var animalData = req.body;
    if (animalData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        var animal = new Animal({

            name: animalData.name,
            animalImage: req.file.path.replace("PetAdoption/public", ".."),
            petType: animalData.petType,
            town: animalData.town,
            tags: animalData.tags,
            isAdopted: false

        });
        console.log("animal object created")
        animal.save(function (err, results) {
            if (err) {
                res.status(500).send('Invalid data!');
                console.log("Invalid data!")

            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(animal));
            }
        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }

};

exports.displayAnimal = function (req, res) {

    var animalData = req.body;
    if (animalData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        Animal.findById({_id: animalData._id}, '_id', function (err, animalFound) {
            if (err) {
                return res.send(500, err);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(animalFound));
            }
        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }
};


exports.fetchAllAnimals = function (req, res) {

    var animalData = req.body;
    var filterData = { }
       if(animalData.location != null && animalData.location != "")
           filterData["town"] = animalData.location
        if (animalData.animalType != null && animalData.animalType != "")
            filterData["petType"] = animalData.animalType

    if (animalData == null) {
        res.status(403).send('No data sent!')
    }
    console.log("inside fetch all animals", animalData)
        Animal.find(filterData, 'name animalImage town',  function (err, animals) {
            if (err) {
                return res.send(500, err);
            }
            console.log(animals)
            res.render('search', {
                data: animals
            });

        });
};

exports.filterSearchAnimals = function (req, res) {

    var animalData = req.body;
    console.log("??????",animalData)
    if (animalData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        Animal.find({town: animalData.location, petType: animalData.animalType}, 'name animalImage town', function (err, animals) {
            if (err) {
                return res.send(500, err);
            } else {
                console.log(">>>>>>>>>>>>",animals)

                res.redirect('/search_view')
            }
        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }
};