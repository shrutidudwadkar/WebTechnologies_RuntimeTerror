var bodyParser = require("body-parser");
var req = require('request');
var User = require('../models/user');
var path = require('path');


exports.registerUser = function (req, res) {

    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        var user = new User({
            title: userData.title,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            phone: userData.phone,
            city: userData.city,
            password: userData.password,
            isAdmin: userData.isAdmin

        });
        console.log('received: ' + user);

        user.save(function (err, results) {
            if (err) {
                res.status(500).send('Invalid data!');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(user));
            }
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
};

exports.getUser = function (req, res) {
    console.log("inside console")
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        User.findOne({email: userData.email}, 'email password', function (err, userFound) {
            if (err) {
                return res.send(500, err);
            } else {
                console.log("form",userData.password)
                console.log("DB",userFound.password)
                if (userData.password === userFound.password) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(userFound));
                } else {
                    console.log("error")
                    res.status(401).send("Invalid username or password")
                }

            }
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }

};


