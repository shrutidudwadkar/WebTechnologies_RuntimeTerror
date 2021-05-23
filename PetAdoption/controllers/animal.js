var bodyParser = require("body-parser").json();
var req = require('request');
var Animal = require('../models/animal');
var path = require('path');
var Comments = require('../models/comments');


exports.insertAnimal = function (req, res) {
    console.log("inside insert animal")
    var animalData = req.body;
    if (animalData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        var animal = new Animal({

            name: animalData.name,
            animalImage: ".." + req.file.path.substr(req.file.path.indexOf("public") + 6, req.file.path.length),
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
        Animal.findById({_id: animalData.animalId}, '_id isAdopted comments name animalImage petType town tags', function (err, animalFound) {
            if (err) {
                return res.send(500, err);
            } else {
                console.log("YAY animal found", animalFound)

                Comments.find({animalId: animalData.animalId}, '_id animalId user commentText commentImage dateOfComment isImage', function (err, comments) {
                    if (err) {
                        return res.send(500, err);
                    } else {
                        console.log("Comments found", comments)
                        return res.render('animal', {
                            data: animalFound,
                            name: req.session.user,
                            title: "PetAdoption",
                            comments: comments
                        });

                    }
                });

            }
        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }
};


exports.fetchAllAnimals = function (req, res) {

    var animalData = req.body;
    var filterData = {}
    if (animalData.location != null && animalData.location != "")
        filterData["town"] = animalData.location
    if (animalData.animalType != null && animalData.animalType != "")
        filterData["petType"] = animalData.animalType

    if (animalData == null) {
        res.status(403).send('No data sent!')
    }
    console.log("inside fetch all animals", animalData)
    Animal.find(filterData, '_id name animalImage town', function (err, animals) {
        if (err) {
            return res.send(500, err);
        }
        console.log("session user is", req.session.user)
        return res.render('search', {
            data: animals,
            name: req.session.user,
            title: "PetAdoption"
        });

    });
};

exports.filterSearchAnimals = function (req, res) {

    var animalData = req.body;
    console.log("??????", animalData)
    if (animalData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        Animal.find({
            town: animalData.location,
            petType: animalData.animalType
        }, '_id name animalImage town', function (err, animals) {
            if (err) {
                return res.send(500, err);
            } else {
                console.log(">>>>>>>>>>>>", animals)

                res.redirect('/search_view')
            }
        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }
};