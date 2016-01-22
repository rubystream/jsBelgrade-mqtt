'use strict';

var mqtt = require('mqtt'),
  host = 'localhost',
  chalk = require('chalk'),
  client = mqtt.connect();
// or , client = mqtt.connect({ port: 1883, host: host, keepalive: 10000});


client.on('connect', function() {
  console.log(chalk.green('Connected as: ' + client.options.clientId));
});

client.on('error', function(err) {
  console.log(chalk.red(err));
  client.end();
});


// subscribe to a particular topic
client.subscribe('command');
client.subscribe('general/#');

// publis some message
client.publish('general/' + client.options.clientId, 'I am alive!!!');

client.on('message', function(topic, message) {
  var msg = message.toString();
  if (topic === 'command') {
    if (msg === 'end') {
      console.log(chalk.blue('Closing the client.'));
      client.end();
    } else {
      console.log(chalk.magenta('unsupported command' + msg));
    }

  } else {
    console.log(chalk.green('Revieved: [') +
      chalk.yellow(topic) + chalk.green('] ') + chalk.cyan(msg));
  }
});