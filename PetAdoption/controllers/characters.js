var bodyParser = require("body-parser");
var req = require('request');
var Character = require('../models/characters');
var path = require('path');


exports.create = function (req, res) {

    var userData = req.body;

    var character = new Character({
        first_name: userData.firstname,
        family_name: userData.lastname,
        dob: userData.year,
        img: req.file.path
    });

    character.save(function (err, results) {
        if (err)
            res.status(500).send('Invalid data!');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(character));
    });
};






