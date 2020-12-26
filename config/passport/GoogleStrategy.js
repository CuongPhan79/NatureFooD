'use strict';

var passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth2').Strategy;

//var verifyHandler = function(req, token, tokenSecret, profile, done) {
var verifyHandler = function (accessToken, refreshToken, profile, cb, done) {

  var data = {
    id: cb.id,
    name: cb.displayName,
    email: cb.emails[0].value,
    emailVerified: cb.emails[0].verified
  };

  return done(null, data);
};

passport.use(new GoogleStrategy({
  clientID: '876488602025-29j6ebg0e4qvs8tdsp5mdtf3mdr9spdc.apps.googleusercontent.com',
  clientSecret: 'UJF7recfyFOSZNDoLtVod-9E',
  callbackURL: 'http://localhost:1337/api/v1/auth/google/callback',
  passReqToCallback: true
}, verifyHandler));