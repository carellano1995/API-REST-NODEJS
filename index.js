'use strict';

var express = require('express');
var kraken = require('kraken-js');
const lusca = require('lusca');

var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
  onconfig: function(config, next) {
    /*
     * Add any additional config setup or overrides here. `config` is an initialized
     * `confit` (https://github.com/krakenjs/confit/) configuration object.
     */
    next(null, config);
  }
};

app = module.exports = express();
app.use(
  session({
    secret: 'abc',
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: true } //, secure: true } // https only
  })
);
app.use(cookieParser());

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.json({ type: 'application/csp-report' }));
app.use(kraken(options));

app.on('start', function() {
  console.log('Application ready to serve requests.');
  console.log('Environment: %s', app.kraken.get('env:env'));
});
