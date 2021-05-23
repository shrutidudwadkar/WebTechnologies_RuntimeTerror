var bodyParser = require("body-parser").json();
var req = require('request');
var Animal = require('../models/animal');
var path = require('path');
var Comments = require('../models/comments');

/*
This functionality is limited only to admin users
to add new animal along with its details.
Once the animal is added successfully the new animal
would be visible to the users on the Filter Animal Page.
 */
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

/*
This function is called on the Animal Page by clicking on
one the animals from teh Filter Page. The animal id which is
transported from the last page is used to query the database
to retrieve all the columns including the image and are then
rendered onto this page.
 */

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

/*
This function would filter the parameters entered on the search bar
present on the Home Page and the Filter Animal Page. The database
is queried based on the location and type of the animal entered from the
dropdown values and also on the description which gets split wrt to space
into tags.
 */

exports.fetchAllAnimals = function (req, res) {

    var animalData = req.body;
    var filterData = {}
    if (animalData.location != null && animalData.location != "")
        filterData["town"] = animalData.location
    if (animalData.animalType != null && animalData.animalType != "")
        filterData["petType"] = animalData.animalType
    if(animalData.tags1 != null && animalData.tags1 != "") {
        var tagsList = animalData.tags1.split(" ");
        filterData["tags"] = {$in: tagsList}
        }
    console.log("filterData", filterData)

    if (animalData == null) {
        res.status(403).send('No data sent!')
    }
    console.log("inside fetch all animals", animalData)
    Animal.find(filterData , '_id name animalImage town', function (err, animals) {
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

/* This function is called on the Filter Animal page and
is the Faceted search implementation where the results obtained
can be further filtered according to the available parameters
 */


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

/*
This function is called from the Animal Page on a button click.
Here the email address of the user and the field isAdopted is
updated in the animal collection.
 */

exports.applyForAdoption = function (req, res) {

    var adoptionData = req.body;
    console.log("??????", adoptionData)
    if (adoptionData == null) {
        res.status(403).send('No data sent!')

    }
    updateinfo = {
        userEmail: adoptionData.email,
        isAdopted: true
    }
    try {
        Animal.findByIdAndUpdate({
            _id: adoptionData.animalId
        }, updateinfo, function (err, animal) {
            if (err) {
                return res.send(500, err);
            } else {
                res.setHeader('Content-Type', 'application/json');

                res.send(JSON.stringify(animal));


            }
        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }


}