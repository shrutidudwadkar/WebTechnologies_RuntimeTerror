var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema(
    {
        title: {type: String, required: true},
        firstname: {type: String, required: true, max: 100},
        lastname: {type: String, required: true, max: 100},
        email: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        phone:{type:Number},
        isAdmin: {type:Boolean, default:false}

    }
);

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', User);

// make this available to our users in our Node applications
module.exports = User;