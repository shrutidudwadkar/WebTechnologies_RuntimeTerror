var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Animal = new Schema(
    {
        name: {type: String, required: true},
        animalImage :{type: String },
        petType: {type: String, required: true},
        town: {type: String, required: true, max: 100},
        tags: {type: String, required: true, max: 100},
        isAdopted: {type: Boolean, default:false},
        comments: {type: Array},
        adoptedBy: {type: String} ,
        userEmail: {type:String}

    }
);

// the schema is useless so far
// we need to create a model using it
var Animal = mongoose.model('Animal', Animal);

// make this available to our users in our Node applications
module.exports = Animal;