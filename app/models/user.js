var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcryptjs');


var userSchema = new Schema({
    firstname: { type: String, lowercase:true, required: true},
    lastname: { type: String, lowercase:true, required: true},
    username: { type: String, lowercase:true, required: true, unique: true},
    password: { type: String, lowercase:true, required: true},
    email: { type: String, lowercase:true, required: true, unique: true}
});

userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
        });
    });
    next();
  });


module.exports = mongoose.model('User', userSchema);
