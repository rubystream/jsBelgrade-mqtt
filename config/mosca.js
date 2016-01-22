'use strict';

/**
 * Mosca MQTT Broker Mongo options:
 *   url: the mongodb url (default: 'mongodb://localhost:27017/ascoltatori?auto_reconnect')
 *   pubsubCollection: where to store the messages on mongodb (default: pubsub)
 *   mongo: settings for the mongodb connection
 */

var moscaMongoDbURL = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + (process.env.NODE_ENV !== 'test' ? '/jsBelgradeMqtt-test' : '/jsBelgradeMqtt');

module.exports = {
  port: 1883,
  backend: {
    type: 'mongo',
    url: moscaMongoDbURL,
    pubsubCollection: 'pubsub',
    mongo: {}
  }
};