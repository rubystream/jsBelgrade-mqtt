'use strict';

var path = require('path'),
  mosca = require('mosca'),
  settings = require(path.resolve('./config/mosca')),
  bunyan = require('bunyan'),
  logger = bunyan.createLogger({
    name: 'jsBelgradeMqtt-Mosca',
    level: 'debug'
  });

module.exports.init = function() {

  var server = new mosca.Server(settings);
  server.on('ready', function() {
    logger.info('Mosca server is up and running');
  });

  // fired when a message is published
  server.on('published', function(packet, client) {
    if (client) {
      logger.debug({
        packet: packet
      });
      logger.info('MQTT Client: %s Publish: [%s] %s', client.id, packet.topic, packet.payload);
    }
  });


  // fired when a client connects
  server.on('clientConnected', function(client) {
    logger.info('Client Connected: %s', client.id);
  });

  // fired when a client disconnects
  server.on('clientDisconnected', function(client) {
    logger.info('Client Disconnected: %s', client.id);
  });

  return server;
};

if (require.main !== 'module') {
  module.exports.init();
}