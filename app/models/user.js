// var db = require('../config');
// var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

// var mongoose = require('mongoose');



// var User = mongoose.model('Users', db.usersSchema);

// // User.initialize = function() {
// //   this.on('creating', this.hashPassword);
// // };

// // User.comparePassword = function(attemptedPassword, callback) {
// //   bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
// //     callback(isMatch);
// //   });
// // };

// // User.hashPassword = function() {
// //   var cipher = Promise.promisify(bcrypt.hash);
// //   return cipher(this.get('password'), null, null).bind(this)
// //     .then(function(hash) {
// //       this.set('password', hash);
// //     });
// // };







// // var User = db.Model.extend({
// //   tableName: 'users',
// //   hasTimestamps: true,
// //   initialize: function() {
// //     this.on('creating', this.hashPassword);
// //   },
// //   comparePassword: function(attemptedPassword, callback) {
// //     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
// //       callback(isMatch);
// //     });
// //   },
// //   hashPassword: function() {
// //     var cipher = Promise.promisify(bcrypt.hash);
// //     return cipher(this.get('password'), null, null).bind(this)
// //       .then(function(hash) {
// //         this.set('password', hash);
// //       });
// //   }
// // });

// module.exports = User;
