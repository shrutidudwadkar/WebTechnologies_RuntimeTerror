var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Comments = new Schema(
    {
        animalId: {type: String, required: true},
        user: {type: String, max: 100},
        commentText: {type: String},
        commentImage: {type: String },
        dateOfComment: {type: Number},
        isImage:{type:Boolean, default:false}

    }
);

// the schema is useless so far
// we need to create a model using it
var Comments = mongoose.model('Comments', Comments);

// make this available to our users in our Node applications
module.exports = Comments;