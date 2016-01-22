'use strict';

var mqtt = require('mqtt'),
  host = 'localhost',
  chalk = require('chalk'),
  inquirer = require("inquirer"),
  connected = false,
  client = mqtt.connect();
// or , client = mqtt.connect({ port: 1883, host: host, keepalive: 10000});
var publish = function(answers) {
  // publish some message
  client.publish('general/' + client.options.clientId, answers.news);
  if (connected) {
    inquirer.prompt([{
      type: "input",
      name: "news",
      message: "Publish: "
    }], publish);
  }
};

client.on('connect', function() {
  connected = true;
  console.log(chalk.green('Connected as: ' + client.options.clientId));
  inquirer.prompt([{
    type: "input",
    name: "news",
    message: "Publish: "
  }], publish);
});

client.on('error', function(err) {
  console.log(chalk.red(err));
  client.end();
});

client.on('close', function() {
  connected = false;
  process.exit(0);
});

// subscribe to a particular topic
client.subscribe('command');


client.on('message', function(topic, message) {
  var msg = message.toString();
  if (topic === 'command') {
    if (msg === 'no news') {
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