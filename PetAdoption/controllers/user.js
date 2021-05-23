var bodyParser = require("body-parser");
var req = require('request');
var User = require('../models/user');
var path = require('path');

/*
This function is used to create a new entry in the database
i.e. create a new user. It also verifies whether the email
address is already being used and subsequently throws an error
 */

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
        User.findOne({email: user.email}, 'email', function (err, userFound) {
            if (err) {
                res.send(500, err)
            } else {

                if (userFound) {

                    console.log("email exists")
                    res.status(401).send("Email id already registered")
                } else {
                    console.log("email id not found")
                    user.save(function (err, results) {
                        if (err) {
                            res.status(500).send('Invalid data!');
                        } else {
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify(user));
                        }
                    });

                }
            }
        });

            } catch (e) {
        console.log("2nd catch")
        res.status(500).send('error ' + e);
    }
};

/*
This function is for session management, If admin it redirects
to the Admin page else the standard user are directed to the
Home Page
 */

exports.getUser = function (req, res) {
    console.log("inside console")
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        //is admin user
        if(userData.email === 'admin' && userData.password === 'admin') {
            res.setHeader('Content-Type', 'application/json');
            req.session.user = userData.email
            res.send({name: userData.email, title: "PetAdoption"})
        } else {

            User.findOne({email: userData.email}, '_id password email firstname', function (err, userFound) {
                if (err) {
                    return res.send(500, err);
                } else {

                    if (userData.password === userFound.password) {
                        res.setHeader('Content-Type', 'application/json');
                        req.session.user = userFound.firstname

                        //res.send(JSON.stringify(userFound));
                        res.send({name: userFound.firstname, title: "PetAdoption"})
                    } else {
                        console.log("error")
                        res.status(401).send("Invalid username or password")
                    }

                }
            });
        }
    } catch (e) {
        res.status(500).send('error ' + e);
    }

};


