var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
// var User = require('../app/models/user');
// var Link = require('../app/models/link');
// var Users = require('../app/collections/users');
// var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  db.Link.find().then(function(links) {
    res.status(200).send(links);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.sendStatus(404);
  }

  db.Link.findOne({url: uri}).then(function(found) {
    if (found) {
      res.status(200).send(found);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.sendStatus(404);
        }
        db.Link.create({ 
          url: uri,
          title: title,
          baseUrl: req.headers.origin
        })
          .then(function(newLink) {
            res.status(200).send(newLink);
          });
      });
    }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  db.User.findOne({ username: username })
    .then(function(user) {
      if (!user) {
        res.redirect('/login');
      } else {
        user.comparePassword(password, function(match) {
          if (match) {
            util.createSession(req, res, user.username);
          } else {
            res.redirect('/login');
          }
        });
      }
    });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  db.User.findOne({username: username})
    .then(function(user) {
      if (!user) {
        db.User.create({username: username, password: password}, function(err, username) {
          if (err) {
            throw err;
          }
        })
          .then(function(newUser) {
            util.createSession(req, res, newUser.username);
          });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
};

exports.navToLink = function(req, res) {
  db.Link.find({ code: req.params[0] }).then(function(link) {
    if (!link) {
      res.redirect('/');
    } else {
      res.redirect(link[0].url);
      link[0].__v = link[0].__v + 1;
      link[0].save(function(err, link) {
      });

      
    }
  });
}; 
     




