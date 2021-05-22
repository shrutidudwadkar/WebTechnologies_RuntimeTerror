var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Comments = new Schema(
    {
        animalId: {type: "Number", required: true},
        user: {type: String, required: true, max: 100},
        commentText: {type: String},
        commentImage: {type: String },
        dateOfComment: {type: Number},
        isImage:{type:Boolean, required: true}

    }
);

// the schema is useless so far
// we need to create a model using it
var Comments = mongoose.model('Comments', Comments);

// make this available to our users in our Node applications
module.exports = Comments;