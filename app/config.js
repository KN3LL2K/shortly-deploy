var path = require('path');
var mongoose = require('mongoose');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var url = 'mongodb://localhost:27017/shortly-deploy';

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected ot mongoDB');
});
var Schema = mongoose.Schema;


// define URL schema
var urlsSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  date: { type: Date, default: Date.now }

});

urlsSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});



// define User schema
var usersSchema = new Schema ({
  username: String,
  password: String,
  date: {type: Date, default: Date.now }

});

usersSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password);
  next();
});

usersSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};


var User = mongoose.model('Users', usersSchema);
var Link = mongoose.model('Urls', urlsSchema);

module.exports.Link = Link;
module.exports.User = User;

