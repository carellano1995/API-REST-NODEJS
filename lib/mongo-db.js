const mongoose = require('mongoose');

const mongodb = function() {
  return {
    config: function(conf) {
      console.log('MongoDb URL:' + conf.mongoDbUrl);
      console.log('MongoDb dbName:' + conf.dbName);

      mongoose.set('debug', conf.mongooseDebug);
      mongoose.Promise = global.Promise;

      var dbConnectionString = conf.mongoDbUrl + conf.dbPortAndHost + '/' + conf.dbName;
      console.log(dbConnectionString);
      mongoose.connect(dbConnectionString, {
        useFindAndModify: false,
        useNewUrlParser: true,
        autoReconnect: true,
        useCreateIndex: true
      });

      var database = mongoose.connection;

      database.on('error', function(error) {
        console.error(error);
      });

      database.once('open', function callback() {
        console.log('db connection open');
      });
    }
  };
};
module.exports = mongodb();
