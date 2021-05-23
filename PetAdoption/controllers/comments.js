var bodyParser = require("body-parser");
var req = require('request');
var Comments = require('../models/comments');
var path = require('path');
var animal = require('../controllers/animal');

/*
This function is used to add/update the comments entered
by the user on the Animal Page.
 */
exports.insertComment = function (req, res) {
    console.log("inside insert comment")
    var comment = req.body;
    if (comment == null) {
        res.status(403).send('No data sent!')
    }
    try {
        var userComment = new Comments({

            animalId: comment.animalId,
            user: req.session.user,
            commentText: comment.newComment,
            commentImage: comment.dataUrl,
            dateOfComment: new Date().getFullYear(),
            isImage: comment.isImageComment

        });

        userComment.save(function (err, results) {
            if (err) {
                res.status(500).send('Invalid data!');
                console.log("Invalid data!")

            } else {

                animal.displayAnimal(req,res)
               
            }
        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }

};


/*
exports.displayComments = function (req, res) {

    var animalId = req.body.data._id;
    if (animalId == null) {
        res.status(403).send('No data sent!')
    }
    try {
        Comments.find({animalId: animalId}, '_id animalId user commentText commentImage dateOfComment isImage', function (err, comments) {
            if (err) {
                return res.send(500, err);
            } else {
                console.log("Comments found", comments)

                return res.render('animal', {
                    comments: comments,
                    title: "Pet Adoption",
                    data: req.body.data
                });

            }
        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }
};
*/