var bodyParser = require("body-parser");
var req = require('request');
var Comments = require('../models/comments');
var path = require('path');


exports.insertComment = function (req, res) {
    console.log("inside insert comment")
    var comment = req.body;
    if (comment == null) {
        res.status(403).send('No data sent!')
    }
    try {
        var comment = new Comments({

            animalId: comment.animalId,
            user: comment.user,
            commentText: comment.commentText,
            commentImage:".."+req.file.path.substr(req.file.path.indexOf("public")+6 , req.file.path.length),
            dateOfComment: comment.dateOfComment,
            isImage: (comment.commentText == null) ? true: false

        });
        Comments.save(function (err, results) {
            if (err) {
                res.status(500).send('Invalid data!');
                console.log("Invalid data!")

            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(comment));
            }
        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }

};

exports.displayComments = function (req, res) {

    var animalId = req.body.animalId;
    if (animalId == null) {
        res.status(403).send('No data sent!')
    }
    try {
        Comments.find({animalId: animalId}, '_id animalId user commentText commentImage dateOfComment isImage', function (err, comments) {
            if (err) {
                return res.send(500, err);
            } else {
                console.log("Cooments found", comments)
                return res.render('animal', {
                    data: comments
                });

            }
        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }
};
