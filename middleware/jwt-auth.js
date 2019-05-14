'use strict';

var jwt = require('jsonwebtoken');

module.exports = function(config) {
  config = config || {};

  return function jwtauth(req, res, next) {
    var token = req.body.token || req.params.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, config.secret, config.options, function(err, decoded) {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token: ' + err
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  };
};
